import type { Question } from '../../src/domain/engine';
const ints = (s: string) => (s.match(/\d+/g) ?? []).map(Number);
export function boundaryOracle(q: Question) {
  const ranges = q.table!.rows.map((row) => ints(row[1]));
  const target = new Set<number>();
  for (let i = 0; i < ranges.length - 1; i++) {
    if (ranges[i][1] + 1 !== ranges[i + 1][0])
      throw new Error('Non-adjacent ranges');
    for (const boundary of [ranges[i][1], ranges[i + 1][0]])
      for (const delta of [-1, 0, 1]) target.add(boundary + delta);
  }
  const match = /Existing tests are ([\d, ]+)\./.exec(q.text.en);
  if (!match) throw new Error('Missing executed data');
  const existing = new Set(ints(match[1]));
  const missing = [...target]
    .filter((n) => !existing.has(n))
    .sort((a, b) => a - b);
  return {
    target: [...target].sort((a, b) => a - b),
    existing: [...existing],
    missing,
    solutions: q.options
      .filter((o) => {
        const values = ints(o.text.en);
        return (
          values.length === missing.length &&
          new Set(values).size === values.length &&
          missing.every((n) => values.includes(n))
        );
      })
      .map((o) => o.id),
  };
}
export function decisionOracle(q: Question) {
  const rows = q.table!.rows.slice(0, 3),
    count = q.table!.headers.length - 1;
  const rule = (values: string[]) => {
    const matches = Array.from({ length: count }, (_, c) => c).filter((c) =>
      rows.every((row, i) => row[c + 1] === '–' || row[c + 1] === values[i]),
    );
    if (matches.length !== 1)
      throw new Error('Incomplete or contradictory rule table');
    return matches[0];
  };
  const all = Array.from({ length: 8 }, (_, n) =>
    [4, 2, 1].map((bit) => (n & bit ? 'T' : 'F')),
  );
  all.forEach(rule);
  const cases = [...q.text.en.matchAll(/\(([TF]),([TF]),([TF])\)/g)].map((m) =>
    m.slice(1),
  );
  const covered = new Set(cases.map(rule));
  const percentage = (covered.size / count) * 100;
  return {
    inputCombinations: all.length,
    coveredRules: [...covered].sort().map((c) => q.table!.headers[c + 1]),
    percentage,
    solutions: q.options
      .filter((o) => {
        const match = /\(([TF]),([TF]),([TF])\)/.exec(o.text.en);
        return (
          parseFloat(o.text.en) === percentage &&
          match !== null &&
          new Set([...covered, rule(match.slice(1))]).size === count
        );
      })
      .map((o) => o.id),
  };
}
export function transitionOracle(q: Question) {
  const map = new Map<string, string>();
  for (const row of q.table!.rows)
    for (let c = 1; c < q.table!.headers.length; c++)
      map.set(`${row[0]}:${q.table!.headers[c]}`, row[c]);
  const run = (events: string[]) => {
    let state = 'Locked';
    const covered: string[] = [];
    for (let i = 0; i < events.length; i++) {
      const key = `${state}:${events[i]}`,
        next = map.get(key);
      if (!next) throw new Error('Undefined pair');
      covered.push(key);
      if (next === 'INVALID')
        return { valid: i === events.length - 1, covered };
      state = next;
    }
    return { valid: true, covered };
  };
  const executed = /Existing tests are (.+?) and (.+?);/.exec(q.text.en);
  if (!executed) throw new Error('Missing executed paths');
  const baseline = new Set(
    executed.slice(1).flatMap((s) => {
      const result = run(s.split(', '));
      if (!result.valid) throw new Error('Invalid baseline');
      return result.covered;
    }),
  );
  return {
    totalPairs: map.size,
    existingCoverage: baseline.size,
    missing: [...map.keys()].filter((key) => !baseline.has(key)),
    solutions: q.options
      .filter((o) => {
        const runs = o.text.en
          .split('; ')
          .map((part) => run(part.split(': ')[1].split(', ')));
        return (
          runs.every((r) => r.valid) &&
          new Set([...baseline, ...runs.flatMap((r) => r.covered)]).size ===
            map.size
        );
      })
      .map((o) => o.id),
  };
}
export function estimationOracle(q: Question) {
  const values = q.table!.rows.map((row) => row.slice(1).map(Number));
  const weighted = values.map(([a, m, b]) => (a + 4 * m + b) / 6);
  const percent = /B takes (\d+)%/.exec(q.text.en),
    fixed = /fixed setup of (\d+) person-hours/.exec(q.text.en);
  if (!percent || !fixed) throw new Error('Missing effort constraints');
  const bIndex = q.table!.rows.findIndex((row) => row[0] === 'B');
  const repeat = (weighted[bIndex] * Number(percent[1])) / 100,
    setup = Number(fixed[1]);
  const total = weighted.reduce((a, b) => a + b, 0) + repeat + setup;
  const aggregate = values.reduce(
    (a, row) => a.map((value, i) => value + row[i]),
    [0, 0, 0],
  );
  const secondMethod =
    (aggregate[0] + 4 * aggregate[1] + aggregate[2]) / 6 + repeat + setup;
  return {
    weighted,
    repeat,
    setup,
    total,
    secondMethod,
    solutions: q.options
      .filter((o) => parseFloat(o.text.en) === total)
      .map((o) => o.id),
  };
}
export function defectReportOracle(q: Question) {
  const pre = q.table!.rows.find((r) => r[0].startsWith('Precondition'))![1],
    input = q.table!.rows.find((r) => r[0].startsWith('Input/action'))![1],
    observed = q.table!.rows.find((r) => r[0].startsWith('Actual'))![1];
  const initial = Number(/stock (\d+)/.exec(pre)![1]),
    quantity = Number(/quantity (\d+)/.exec(input)![1]),
    actual = Number(/stock (\d+)/.exec(observed)![1]),
    status = /; (\w+); HTTP/.exec(observed)![1],
    http = Number(/HTTP (\d+)/.exec(observed)![1]);
  const expected = initial - quantity;
  return {
    initial,
    quantity,
    expected,
    actual,
    status,
    http,
    solutions: q.options
      .filter((o) => {
        const text = o.text.en,
          exp = /expected: (\d+), (\w+)/.exec(text),
          got = /actual: (\d+), (\w+), HTTP (\d+)/.exec(text);
        return (
          text.includes(`SKU-4 stock ${initial}`) &&
          text.includes(`create draft T-91 quantity ${quantity}`) &&
          text.includes('stock-clerk') &&
          text.includes('Confirm once') &&
          exp &&
          Number(exp[1]) === expected &&
          exp[2] === 'Confirmed' &&
          got &&
          Number(got[1]) === actual &&
          got[2] === status &&
          Number(got[3]) === http &&
          text.includes('req-b7 + shot-b7') &&
          text.includes('cause not established')
        );
      })
      .map((o) => o.id),
  };
}
