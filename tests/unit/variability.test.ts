import { beforeAll } from 'vitest';
import { prepareHistoricalBanks } from '../fixtures/banks';
beforeAll(prepareHistoricalBanks);
import { describe, it, expect } from 'vitest';
import { readFileSync } from 'node:fs';
import { createHash } from 'node:crypto';
import { questions } from '../../src/data/questions';
import { variabilityQuestions } from '../../src/data/variability-questions';
import {
  bilingualArchivedQuestions,
  variabilityArchivedQuestions,
  legacyQuestions,
  auditedQuestions,
  blueprintArchivedQuestions,
  coverageArchivedQuestions,
} from '../fixtures/banks';
import {
  CONTENT_REVISION,
  BILINGUAL_CONTENT_REVISION,
} from '../../src/domain/revision';
import { selectPracticeExam } from '../../src/domain/blueprint';
import { auditBlueprint } from '../../src/domain/blueprint-audit';
import {
  createSession,
  answer,
  finish,
  score,
  sessionQuestions,
  validateBank,
} from '../../src/domain/engine';
import { save, load } from '../../src/storage/store';
import { expectedGroups } from '../fixtures/blueprint-oracle';

const pairs = [
  ['tl-005', 'tl-067', 'FL-1.3.1', 'K2'],
  ['tl-009', 'tl-068', 'FL-2.1.2', 'K1'],
  ['tl-010', 'tl-069', 'FL-2.1.3', 'K1'],
  ['tl-019', 'tl-070', 'FL-4.1.1', 'K2'],
  ['tl-025', 'tl-071', 'FL-4.2.1', 'K3'],
  ['tl-027', 'tl-072', 'FL-4.2.3', 'K3'],
  ['tl-028', 'tl-073', 'FL-4.2.4', 'K3'],
  ['tl-029', 'tl-074', 'FL-4.5.3', 'K3'],
  ['tl-035', 'tl-075', 'FL-5.4.1', 'K2'],
  ['tl-036', 'tl-076', 'FL-5.1.4', 'K3'],
  ['tl-037', 'tl-077', 'FL-5.1.5', 'K3'],
  ['tl-038', 'tl-078', 'FL-5.5.1', 'K3'],
  ['tl-039', 'tl-079', 'FL-6.1.1', 'K2'],
  ['tl-040', 'tl-080', 'FL-6.2.1', 'K1'],
  ['tl-041', 'tl-081', 'FL-1.5.2', 'K1'],
  ['tl-044', 'tl-082', 'FL-5.1.7', 'K2'],
];
function mandatory(bank: typeof questions) {
  return bank
    .filter((q) => {
      const [level, count, los] = expectedGroups.find(
        ([k, , los]) => k === q.level && los.includes(q.lo),
      )!;
      const available = new Set(
        bank
          .filter((x) => x.level === level && los.includes(x.lo))
          .map((x) => x.lo),
      );
      return (
        available.size === Math.min(count, los.length) &&
        bank.filter((x) => x.lo === q.lo).length === 1
      );
    })
    .map((q) => q.id);
}
const q = (id: string) => questions.find((q) => q.id === id)!;
describe('phase 5A actual variability and historical boundaries', () => {
  it('freezes .5, preserves the original 66 deeply, and adds one reviewed four-option alternative for each of the 16 structural mandatory IDs', () => {
    expect(
      createHash('sha256')
        .update(readFileSync('src/data/archive/questions-2026-10-27.5.json'))
        .digest('hex'),
    ).toBe('c57da2c300f58dd5714a8c54746b9e1cd404b8134347c3b13123e83b97823a79');
    // The original expansion boundary is frozen in .6; .7 intentionally revises 39 items.
    expect(variabilityArchivedQuestions.slice(0, 66)).toEqual(
      bilingualArchivedQuestions,
    );
    expect(questions).toHaveLength(90);
    expect(validateBank(questions)).toEqual([]);
    expect(mandatory(bilingualArchivedQuestions)).toEqual(
      pairs.map((p) => p[0]),
    );
    expect(mandatory(questions)).toEqual([]);
    expect(variabilityQuestions).toHaveLength(16);
    expect(variabilityQuestions.filter((q) => q.level === 'K3')).toHaveLength(
      7,
    );
    for (const [old, id, lo, level] of pairs) {
      expect(q(id).lo).toBe(lo);
      expect(q(id).level).toBe(level);
      expect(q(old).lo).toBe(lo);
      expect(q(id).options.map((o) => o.id)).toEqual(['o1', 'o2', 'o3', 'o4']);
      expect(q(id).humanApproval).toBe('PENDING');
      expect(q(id).academicReview?.status).toBe('PASS');
      expect(q(id).academicReview?.pages.length).toBeGreaterThan(0);
      for (const lang of ['pt', 'en'] as const) {
        expect(q(id).text[lang]).not.toBe(q(old).text[lang]);
        expect(
          q(id).options.every(
            (o) => o.text[lang].trim() && o.explanation[lang].trim(),
          ),
        ).toBe(true);
      }
    }
  });
  it('constructively selects each new alternative while omitting its old mandatory ID, and can omit every individual ID without breaking quotas', () => {
    for (const [old, id] of pairs) {
      const exam = selectPracticeExam(
        questions.filter((item) => item.lo !== q(id).lo || item.id === id),
        42,
      );
      expect(auditBlueprint(exam).compliant).toBe(true);
      expect(exam.some((q) => q.id === id)).toBe(true);
      expect(exam.some((q) => q.id === old)).toBe(false);
    }
    for (const item of questions)
      expect(
        auditBlueprint(
          selectPracticeExam(
            questions.filter((q) => q.id !== item.id),
            13,
          ),
        ).compliant,
        item.id,
      ).toBe(true);
    for (const column of [0, 1]) {
      const exam = selectPracticeExam(
        questions.filter((q) => !pairs.some((p) => p[column] === q.id)),
        42,
      );
      expect(auditBlueprint(exam).compliant).toBe(true);
    }
  });
  it('selects every old/new candidate across 1,000 seeds without a fixed ID or input-order preference', () => {
    const counts = new Map(questions.map((q) => [q.id, 0]));
    const sets = new Set<string>();
    const orders = new Set<string>();
    for (let seed = 0; seed < 1000; seed++) {
      const exam = selectPracticeExam(questions, seed);
      expect(auditBlueprint(exam).compliant).toBe(true);
      exam.forEach((q) => counts.set(q.id, counts.get(q.id)! + 1));
      sets.add(
        exam
          .map((q) => q.id)
          .sort()
          .join(','),
      );
      orders.add(exam.map((q) => q.id).join(','));
    }
    expect(sets.size).toBe(1000);
    expect(orders.size).toBe(1000);
    for (const count of counts.values()) {
      expect(count).toBeGreaterThan(0);
      expect(count).toBeLessThan(1000);
    }
    for (const [, id] of pairs)
      expect(
        questions
          .filter((item) => item.lo === q(id).lo)
          .reduce((sum, item) => sum + counts.get(item.id)!, 0),
      ).toBe(1000);
  }, 15000);
  it.each([
    ['2026-10-27.1', legacyQuestions],
    ['2026-10-27.2', auditedQuestions],
    ['2026-10-27.3', blueprintArchivedQuestions],
    ['2026-10-27.4', coverageArchivedQuestions],
    ['2026-10-27.5', bilingualArchivedQuestions],
  ] as const)(
    'preserves %s exams/study and resolves text, explanations and results from its archive',
    (revision, archived) => {
      for (const mode of ['exam', 'practice'] as const) {
        const bank =
          mode === 'exam'
            ? revision.endsWith('.1') || revision.endsWith('.2')
              ? [...archived]
              : selectPracticeExam([...archived], 42)
            : [...archived];
        const first = bank[0];
        const base = {
          ...createSession(bank, 'practice', 0, 1000, 42),
          mode,
          contentRevision: revision,
          deadline: mode === 'exam' ? 4501000 : null,
        };
        const session = {
          ...answer(base, first.id, first.correct, 2000),
          index: bank.length - 1,
          visitedIds: [first.id, bank[bank.length - 1].id],
          flagged: [first.id],
          feedbackIds: mode === 'practice' ? [first.id] : [],
        };
        expect(save({ version: 1, active: session, history: [] })).toBe(true);
        expect(load().state.active).toEqual(session);
        expect(sessionQuestions(session, [])).toEqual(archived);
        expect(score(session, []).correct).toBe(1);
        const completed = finish(session, 3000);
        expect(save({ version: 1, active: null, history: [completed] })).toBe(
          true,
        );
        expect(load().state.history[0]).toEqual(completed);
        expect(score(completed, []).correct).toBe(1);
      }
      expect(CONTENT_REVISION).toBe('2026-10-27.9');
      expect(BILINGUAL_CONTENT_REVISION).toBe('2026-10-27.5');
    },
  );
});

describe('independent K3 solutions (not human academic approval)', () => {
  it('derives Each Choice coverage and the minimum additional count for tl-071', () => {
    const item = q('tl-071');
    const day = (n: number) =>
      n < 2 ? 'low' : n <= 14 ? 'short' : n <= 45 ? 'long' : 'high';
    const fmt = (s: string) => (['PDF', 'CSV'].includes(s) ? s : 'other');
    const solutions = item.options
      .filter((o) => {
        const tests = [...o.text.en.matchAll(/\((\d+), (PDF|CSV|XML)\)/g)].map(
          (m) => [Number(m[1]), m[2]] as const,
        );
        return (
          tests.length === 2 &&
          new Set([7, 30, ...tests.map((t) => t[0])].map(day)).size === 4 &&
          new Set(['PDF', 'CSV', ...tests.map((t) => t[1])].map(fmt)).size === 3
        );
      })
      .map((o) => o.id);
    expect(solutions).toEqual(item.correct);
    expect(day(1)).not.toBe(day(46));
  });
  it('exhaustively proves that the decision table partitions all eight inputs and identifies the unique missing-rule pair', () => {
    const item = q('tl-072'),
      rows = item.table!.rows;
    const rules = (input: string[]) =>
      [1, 2, 3, 4].filter((col) =>
        rows.slice(0, 3).every((r, i) => r[col] === '–' || r[col] === input[i]),
      );
    for (const b of ['T', 'F'])
      for (const o of ['T', 'F'])
        for (const e of ['T', 'F']) expect(rules([b, o, e])).toHaveLength(1);
    const solutions = item.options
      .filter((o) => {
        const inputs = [...o.text.en.matchAll(/\(([TF]),([TF]),([TF])\)/g)].map(
          (m) => m.slice(1),
        );
        return new Set([1, 3, ...inputs.flatMap(rules)]).size === 4;
      })
      .map((o) => o.id);
    expect(solutions).toEqual(item.correct);
    expect(
      rows
        .slice(3)
        .every((r) => r.slice(1).filter((v) => v === 'X').length === 1),
    ).toBe(true);
  });
  it('searches the transition graph for the shortest all-valid-transition path ending in Published', () => {
    const item = q('tl-073');
    const edges = item.table!.rows.map((r) => ({
      from: r[0].split(' / ')[0],
      event: r[1],
      to: r[2].split(' / ')[0],
    }));
    const run = (events: string[]) => {
      let state = 'Review';
      const covered = new Set<string>();
      for (const event of events) {
        const edge = edges.find((e) => e.from === state && e.event === event);
        if (!edge) return false;
        covered.add(edge.event);
        state = edge.to;
      }
      return state === 'Published' && covered.size === 5;
    };
    let frontier = [[] as string[]];
    let shortest = 0;
    for (let depth = 0; depth <= 6; depth++) {
      if (frontier.some(run)) {
        shortest = depth;
        break;
      }
      frontier = frontier.flatMap((seq) => edges.map((e) => [...seq, e.event]));
    }
    expect(shortest).toBe(6);
    expect(
      item.options
        .filter(
          (o) =>
            o.text.en.split(', ').length === shortest &&
            run(o.text.en.split(', ')),
        )
        .map((o) => o.id),
    ).toEqual(item.correct);
  });
  it('applies acceptance criteria to every proposed ATDD outcome, including unchanged counters on refusal', () => {
    const item = q('tl-074');
    const evaluate = (owner: boolean, count: number) =>
      owner && count < 2 ? ['success', count + 1] : ['refusal', count];
    const solutions = item.options
      .filter((o) => {
        const cases = [
          ...o.text.en.matchAll(
            /(Other requester|[Bb]orrower)\/count (\d+) → (success|refusal)\/(\d+)/g,
          ),
        ];
        if (cases.length !== 2) return false;
        const valid = cases.every(
          (m) =>
            JSON.stringify(
              evaluate(m[1].toLowerCase() === 'borrower', Number(m[2])),
            ) === JSON.stringify([m[3], Number(m[4])]),
        );
        return (
          valid &&
          cases.some((m) => m[1] === 'Other requester') &&
          cases.some((m) => m[1].toLowerCase() === 'borrower' && m[2] === '2')
        );
      })
      .map((o) => o.id);
    expect(solutions).toEqual(item.correct);
  });
  it('independently calculates both weighted efforts and adds setup once', () => {
    const item = q('tl-076');
    const total = item.table!.rows.reduce(
      (sum, r) => sum + (Number(r[1]) + 4 * Number(r[2]) + Number(r[3])) / 6,
      3,
    );
    expect(total).toBe(15);
    expect(
      item.options
        .filter((o) => Number(o.text.en.match(/^\d+/)?.[0]) === total)
        .map((o) => o.id),
    ).toEqual(item.correct);
    expect(item.options.map((o) => o.text.en.match(/^\d+/)![0])).toEqual(
      item.options.map((o) => o.text.pt.match(/^\d+/)![0]),
    );
  });
  it('recomputes the scheduling order from dependencies, risk and environment availability', () => {
    const item = q('tl-077'),
      rows = item.table!.rows;
    const done: string[] = [];
    for (let slot = 1; slot <= 4; slot++) {
      const available = rows
        .filter(
          (r) =>
            !done.includes(r[0]) &&
            (r[2] === '—' || done.includes(r[2])) &&
            (r[0] !== 'C' || slot >= 3),
        )
        .sort((a, b) => Number(b[1]) - Number(a[1]));
      done.push(available[0][0]);
    }
    expect(done).toEqual(['D', 'A', 'B', 'C']);
    expect(
      item.options
        .filter((o) => o.text.en === done.join(', '))
        .map((o) => o.id),
    ).toEqual(item.correct);
  });
  it('compares every report draft with the observed build, offline steps, result direction and trace without asserting a cause', () => {
    const item = q('tl-078');
    const solutions = item.options
      .filter(
        (o) =>
          [
            'r204/staging',
            'create L-42 offline, reconnect',
            'expected 1 record, observed 2',
            'trace t42',
          ].every((f) => o.text.en.includes(f)) &&
          !o.text.en.includes('confirmed server race'),
      )
      .map((o) => o.id);
    expect(solutions).toEqual(item.correct);
  });
});
