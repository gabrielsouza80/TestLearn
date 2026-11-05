import { describe, expect, it } from 'vitest';
import { createHash } from 'node:crypto';
import { questions } from '../../src/data/questions';
import published from '../../src/data/archive/questions-2026-10-27.9.json';
import records from '../../docs/academic/phase10h-batch2-2026-11-05/records.json';
import acceptance from '../../docs/academic/phase10h-batch1-2026-11-05/owner-acceptance-2026-11-05.json';
import type { Question } from '../../src/domain/question';

const canonical = (value: unknown): unknown =>
  Array.isArray(value)
    ? value.map(canonical)
    : value !== null && typeof value === 'object'
      ? Object.fromEntries(
          Object.entries(value)
            .sort(([a], [b]) => a.localeCompare(b))
            .map(([k, v]) => [k, canonical(v)]),
        )
      : value;
const hash = (value: unknown) =>
  createHash('sha256')
    .update(JSON.stringify(canonical(value)))
    .digest('hex');
const ids = [
  'tl-008',
  'tl-020',
  'tl-021',
  'tl-035',
  'tl-038',
  'tl-063',
  'tl-064',
  'tl-072',
];

function missingRuleSolutions(q: Question) {
  const rows = q.table!.rows.slice(0, 3);
  const rule = (input: string[]) => {
    const columns = [1, 2, 3, 4].filter((c) =>
      rows.every((row, i) => row[c] === '–' || row[c] === input[i]),
    );
    if (columns.length !== 1)
      throw new Error('Incomplete or overlapping rules');
    return columns[0];
  };
  const combinations = Array.from({ length: 8 }, (_, n) =>
    [4, 2, 1].map((bit) => (n & bit ? 'T' : 'F')),
  );
  const distribution = combinations.reduce(
    (counts, input) => {
      counts[rule(input) - 1]++;
      return counts;
    },
    [0, 0, 0, 0],
  );
  const coverages = Object.fromEntries(
    q.options.map((o) => [
      o.id,
      new Set([
        1,
        3,
        ...[...o.text.en.matchAll(/\(([TF]),([TF]),([TF])\)/g)].map((m) =>
          rule(m.slice(1)),
        ),
      ]).size,
    ]),
  );
  return {
    distribution,
    coverages,
    solutions: Object.keys(coverages).filter((id) => coverages[id] === 4),
  };
}

const reportSolutions = (q: Question) =>
  q.options
    .filter((o) =>
      /^QA \/ build 82; authorised user; INV-7, total 25; select Save; expected: 201 and invoice ID; actual: 500, no saved invoice; attach r17\.$/.test(
        o.text.en,
      ),
    )
    .map((o) => o.id);

describe('Batch 2 evidence without rewriting content or conferring human approval', () => {
  it.each(ids)(
    '%s remains exactly published, including every bilingual explanation and key',
    (id) => {
      const q = questions.find((q) => q.id === id)!;
      const row = records.decisions.find((r) => r.questionId === id)!;
      expect(q).toEqual(published.find((q) => q.id === id));
      expect(row.beforeSHA256).toBe(hash(q));
      expect(row.afterSHA256).toBe(hash(q));
      expect(row.independentSolution.answer).toEqual(q.correct);
      expect(row.existingKey).toEqual(row.proposedKey);
      expect(row.contentChanged).toBe(false);
      expect(row.humanApproval).toBe('PENDING');
      expect(q.humanApproval).toBe('PENDING');
      expect(row.decision).toBe(
        id === 'tl-038' ? 'BLOCKED_HUMAN_DECISION' : 'ACCEPT_AS_IS',
      );
    },
  );
  it('records only product-owner acceptance of the exact two Batch 1 objects', () => {
    expect(acceptance.questions.map((q) => q.questionId)).toEqual([
      'tl-011',
      'tl-090',
    ]);
    expect(acceptance.decision).toBe('OWNER_ACCEPTED');
    expect(acceptance.independentHumanSMEReviewVerified).toBe(false);
    expect(acceptance.deploymentAuthorization).toBe(false);
    expect(acceptance.remaining88Approval).toBe(false);
    for (const record of acceptance.questions) {
      const q = questions.find((q) => q.id === record.questionId)!;
      expect(record.acceptedCanonicalSHA256).toBe(hash(q));
      expect(record.acceptedAnswerKey).toEqual(q.correct);
      expect(record.independentAcademicApproval).toBe('PENDING');
      expect(q.humanApproval).toBe('PENDING');
    }
  });
  it('derives all eight decision-table assignments and a unique additional-rule solution', () => {
    const q = questions.find((q) => q.id === 'tl-072')!;
    expect(missingRuleSolutions(q)).toEqual({
      distribution: [1, 1, 2, 4],
      coverages: { o1: 4, o2: 3, o3: 3, o4: 3 },
      solutions: ['o1'],
    });
    expect(q.correct).toEqual(['o1']);
    const overlapping = structuredClone(q);
    overlapping.table!.rows[0][4] = 'T';
    expect(() => missingRuleSolutions(overlapping)).toThrow();
  });
  it('rejects reversed observations, changed environment and invented diagnosis in the report options', () => {
    const q = questions.find((q) => q.id === 'tl-038')!;
    expect(reportSolutions(q)).toEqual(['o1']);
    expect(q.correct).toEqual(['o1']);
    const duplicate = structuredClone(q);
    duplicate.options[3].text.en = duplicate.options[0].text.en;
    expect(reportSolutions(duplicate)).toEqual(['o1', 'o4']);
  });
  it('calculates the stated two-branch coverage without confusing it with a whole-program metric', () => {
    const q = questions.find((q) => q.id === 'tl-021')!;
    expect(q.text.en).toContain('these two branches');
    expect(q.text.pt).toContain('destes dois ramos');
    const result = (1 / 2) * 100;
    expect(
      q.options
        .filter((o) => Number.parseFloat(o.text.en) === result)
        .map((o) => o.id),
    ).toEqual(['o1']);
    expect(
      q.options
        .filter((o) => Number.parseFloat(o.text.pt) === result)
        .map((o) => o.id),
    ).toEqual(['o1']);
  });
});
