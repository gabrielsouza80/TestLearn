import { beforeAll } from 'vitest';
import { prepareHistoricalBanks } from '../fixtures/banks';
beforeAll(prepareHistoricalBanks);
import { it, expect, describe } from 'vitest';
import { questions } from '../../src/data/questions';
import {
  auditedQuestions,
  legacyQuestions,
  blueprintArchivedQuestions,
  coverageArchivedQuestions,
  bilingualArchivedQuestions,
} from '../fixtures/banks';
import { blueprintQuestions } from '../../src/data/blueprint-questions';
import {
  selectPracticeExam,
  BlueprintSelectionError,
} from '../../src/domain/blueprint';
import { auditBlueprint } from '../../src/domain/blueprint-audit';
import {
  createSession,
  isCorrect,
  score,
  answer,
  finish,
  validateBank,
  type Question,
} from '../../src/domain/engine';
import { load, save } from '../../src/storage/store';
import {
  CONTENT_REVISION,
  AUDITED_CONTENT_REVISION,
  LEGACY_CONTENT_REVISION,
  BLUEPRINT_CONTENT_REVISION,
} from '../../src/domain/revision';
import { expectedGroups } from '../fixtures/blueprint-oracle';
import { archivedExam } from '../fixtures/sessions';
import { createHash } from 'node:crypto';
import { readFileSync } from 'node:fs';

function checkAgainstOfficialTable(exam: Question[]) {
  expect(exam).toHaveLength(40);
  expect(new Set(exam.map((q) => q.id)).size).toBe(40);
  expect(
    [1, 2, 3, 4, 5, 6].map((ch) => exam.filter((q) => q.chapter === ch).length),
  ).toEqual([8, 6, 4, 11, 9, 2]);
  expect(
    ['K1', 'K2', 'K3'].map((k) => exam.filter((q) => q.level === k).length),
  ).toEqual([8, 24, 8]);
  for (const [level, count, los] of expectedGroups) {
    const group = exam.filter((q) => q.level === level && los.includes(q.lo));
    expect(group.length, los.join('/')).toBe(count);
    expect(new Set(group.map((q) => q.lo)).size, los.join('/')).toBe(
      Math.min(count, los.length),
    );
  }
  expect(exam.every((q) => q.chapter === Number(q.lo[3]))).toBe(true);
}

describe('official CTFL blueprint v1.19 (structural only)', () => {
  it('reproduces the old ten divergences from the frozen pre-phase-3 bank', () => {
    expect(
      auditBlueprint(auditedQuestions)
        .groups.filter((g) => !g.compliant)
        .map((g) => g.id),
    ).toEqual([
      '1-k1-foundations',
      '1-k1-whole-team',
      '1-k2-foundations',
      '1-k2-activities',
      '2-k2-change',
      '2-k2-lifecycle',
      '5-k2-planning',
      '5-k2-quadrants',
      '5-k2-risk',
      '5-k2-reports',
    ]);
  });
  it('generates compliant examinations for 1,000 deterministic seeds with genuine pool variations', () => {
    const combinations = new Set<string>();
    const orders = new Set<string>();
    const seen = new Set<string>();
    const unchangedKeys = questions.map((q) => [q.id, [...q.correct]]);
    for (let seed = 0; seed < 1000; seed++) {
      const exam = selectPracticeExam(questions, seed);
      checkAgainstOfficialTable(exam);
      expect(validateBank(exam)).toEqual([]);
      expect(auditBlueprint(exam).groups.filter((g) => !g.compliant)).toEqual(
        [],
      );
      expect(exam.map((q) => q.id)).toEqual(
        selectPracticeExam(questions, seed).map((q) => q.id),
      );
      expect(
        selectPracticeExam(bilingualArchivedQuestions, seed).map((q) => q.id),
      ).toEqual(
        selectPracticeExam(coverageArchivedQuestions, seed).map((q) => q.id),
      );
      expect(exam.map((q) => q.id)).toEqual(
        selectPracticeExam([...questions].reverse(), seed).map((q) => q.id),
      );
      const session = createSession(exam, 'exam', 60, 1000, seed);
      expect(
        exam.every((q) => {
          const order = session.optionOrder[q.id];
          return (
            JSON.stringify([...order].sort()) ===
              JSON.stringify(q.options.map((o) => o.id).sort()) &&
            isCorrect(
              q,
              order.filter((id) => q.correct.includes(id)),
            )
          );
        }),
      ).toBe(true);
      combinations.add(
        exam
          .map((q) => q.id)
          .sort()
          .join(','),
      );
      orders.add(exam.map((q) => q.id).join(','));
      exam.forEach((q) => seen.add(q.id));
    }
    expect(combinations.size).toBe(1000);
    expect(orders.size).toBe(1000);
    expect([...seen].sort()).toEqual(questions.map((q) => q.id).sort());
    expect(questions.map((q) => [q.id, q.correct])).toEqual(unchangedKeys);
  }, 15000);
  it('is reproducible even if the pool input order changes', () => {
    expect(
      selectPracticeExam([...questions].reverse(), 42).map((q) => q.id),
    ).toEqual(selectPracticeExam(questions, 42).map((q) => q.id));
  });
  it('does not overselect duplicated LO candidates in an expanded pool', () => {
    const extra = Array.from({ length: 12 }, (_, i) => ({
      ...questions[0],
      id: `practice-${i}`,
    }));
    const pool = [...questions, ...extra];
    const exam = selectPracticeExam(pool, 99);
    checkAgainstOfficialTable(exam);
    expect(exam.filter((q) => q.lo === 'FL-1.1.1')).toHaveLength(
      exam.some((q) => q.id === 'tl-002') ? 0 : 1,
    );
  });
  it('keeps all excess-group questions usable for unconstrained topic practice', () => {
    expect(questions).toHaveLength(82);
    expect(coverageArchivedQuestions.slice(0, 40)).toEqual(auditedQuestions);
    expect(
      createSession(questions.slice(0, 40), 'practice', 0).questionIds,
    ).toHaveLength(40);
  });
  it('fails usefully on empty, insufficient, invalid and incompatible pools', () => {
    for (const pool of [
      [],
      auditedQuestions,
      questions.filter(
        (q) => !['FL-1.4.2', 'FL-1.4.3', 'FL-1.4.5'].includes(q.lo),
      ),
      questions.filter((q) => q.lo !== 'FL-4.2.4'),
    ])
      expect(() => selectPracticeExam(pool, 42)).toThrow(
        BlueprintSelectionError,
      );
    try {
      selectPracticeExam(
        questions.filter(
          (q) => !['FL-1.4.2', 'FL-1.4.3', 'FL-1.4.5'].includes(q.lo),
        ),
        42,
      );
      throw Error('Expected failure');
    } catch (error) {
      expect(error).toBeInstanceOf(BlueprintSelectionError);
      expect((error as BlueprintSelectionError).groupId).toBe(
        '1-k2-activities',
      );
      expect((error as Error).message).toContain(
        '3 distinct learning objectives',
      );
    }
    for (const pool of [
      [...questions, questions[0]],
      questions.map((q, i) => (i === 0 ? { ...q, correct: ['missing'] } : q)),
      questions.map((q, i) => (i === 0 ? { ...q, chapter: 6 } : q)),
    ])
      expect(() => selectPracticeExam(pool, 42)).toThrow(
        /Invalid question pool/,
      );
    expect(() => selectPracticeExam(questions, NaN)).toThrow(/seed/);
    expect(() => selectPracticeExam(questions, 0.5)).toThrow(/seed/);
  });
  it('excludes experimental and unreviewed candidates from exams while retaining them for study', () => {
    const experimental = questions.map((q) =>
      q.id === 'tl-046' ? { ...q, examEligible: false } : q,
    );
    const exam = selectPracticeExam(experimental, 18);
    expect(exam.some((q) => q.id === 'tl-046')).toBe(false);
    expect(
      createSession(
        [experimental.find((q) => q.id === 'tl-046')!],
        'practice',
        0,
      ).questionIds,
    ).toEqual(['tl-046']);
    expect(() =>
      selectPracticeExam(
        questions.map((q) =>
          q.lo === 'FL-1.5.2' ? { ...q, review: 'pending' as const } : q,
        ),
        42,
      ),
    ).toThrow(/1-k1-whole-team/);
    expect(() =>
      selectPracticeExam(
        questions.map((q) =>
          q.lo === 'FL-5.1.7'
            ? {
                ...q,
                academicReview: {
                  ...q.academicReview!,
                  status: 'NEEDS_CORRECTION' as const,
                },
              }
            : q,
        ),
        42,
      ),
    ).toThrow(/5-k2-quadrants/);
  });
  it('guards exam construction and restoration against an invalid current selection', () => {
    expect(() => createSession(auditedQuestions, 'exam', 60)).toThrow();
    const invalid = {
      ...archivedExam(auditedQuestions, AUDITED_CONTENT_REVISION),
      contentRevision: CONTENT_REVISION,
    };
    expect(save({ version: 1, active: invalid, history: [] })).toBe(false);
    const raw = JSON.stringify({ version: 1, active: invalid, history: [] });
    localStorage.setItem('testlearn.v1', raw);
    expect(load().warning).toBeTruthy();
    expect(localStorage.getItem('testlearn.v1')).toBe(raw);
  });
  it('preserves identities, multi-answer exact scoring, thresholds and absolute timers after constrained selection', () => {
    const exam = selectPracticeExam(
      questions.filter((q) => q.id !== 'tl-002'),
      88,
    );
    const multi = exam.find((q) => q.id === 'tl-001')!;
    for (const correct of [0, 25, 26, 40]) {
      let session = createSession(exam, 'exam', 75, 1000, 88);
      for (const q of exam.slice(0, correct))
        session = answer(session, q.id, [...q.correct].reverse(), 2000);
      expect(
        Object.values(session.optionOrder).every(
          (ids) => new Set(ids).size === ids.length,
        ),
      ).toBe(true);
      expect(score(finish(session, 3000), questions)).toEqual({
        correct,
        total: 40,
        unanswered: 40 - correct,
        passed: correct >= 26,
      });
      expect(session.deadline).toBe(4501000);
    }
    expect(isCorrect(multi, ['o4', 'o1'])).toBe(true);
    expect(isCorrect(multi, ['o1'])).toBe(false);
    expect(isCorrect(multi, ['o1', 'o4', 'o2'])).toBe(false);
  });
  it.each([
    [LEGACY_CONTENT_REVISION, legacyQuestions],
    [AUDITED_CONTENT_REVISION, auditedQuestions],
    [
      BLUEPRINT_CONTENT_REVISION,
      selectPracticeExam(
        blueprintArchivedQuestions.filter((q) => q.id !== 'tl-002'),
        42,
      ).sort((a, b) => a.id.localeCompare(b.id)),
    ],
  ] as const)(
    'preserves every stored field and frozen content of %s',
    (revision, bank) => {
      const attempt = {
        ...archivedExam([...bank], revision, 1000, 42, 75),
        answers: { 'tl-001': ['o1', 'o4'], 'tl-036': ['o1'] },
        flagged: [bank[0].id],
        index: 3,
      };
      expect(save({ version: 1, active: attempt, history: [] })).toBe(true);
      expect(load().state.active).toEqual(attempt);
      const finished = finish(attempt, 3000);
      expect(save({ version: 1, active: null, history: [finished] })).toBe(
        true,
      );
      expect(load().state.history[0]).toEqual(finished);
      expect(score(finished, questions).correct).toBe(2);
    },
  );
  it('keeps all three archived banks byte-for-byte unchanged', () => {
    for (const [revision, hash] of [
      [
        '2026-10-27.1',
        'b5f44fc33cfd55b8e7aea1fceff7348c32857580f04ef493156107788d5717f5',
      ],
      [
        '2026-10-27.2',
        '982e73ec30706a5e8cca992b80f9157d18cda2d3e77791b32430a804c3574cbb',
      ],
      [
        '2026-10-27.3',
        'cc70ebf8768c1236fcb89099d88ad275600d542078c1531c1195fe43f2f96d38',
      ],
    ])
      expect(
        createHash('sha256')
          .update(readFileSync(`src/data/archive/questions-${revision}.json`))
          .digest('hex'),
      ).toBe(hash);
  });
});

describe('new original content review safeguards and three-value BVA', () => {
  it('adds five missing LO positions and two reviewed K3 exercises, with no human approval', () => {
    expect(blueprintQuestions).toHaveLength(7);
    expect(blueprintQuestions.map((q) => q.lo)).toEqual([
      'FL-1.5.2',
      'FL-1.4.3',
      'FL-2.1.6',
      'FL-5.1.7',
      'FL-5.3.2',
      'FL-4.2.2',
      'FL-4.2.2',
    ]);
    for (const q of blueprintQuestions) {
      expect(q.options).toHaveLength(4);
      expect(q.humanApproval).toBe('PENDING');
      expect(q.academicReview?.method).toBe('AI_REVIEWED');
      expect(q.academicReview?.status).toBe('PASS');
      expect(q.options.every((o) => o.explanation.en && o.explanation.pt)).toBe(
        true,
      );
    }
    expect(validateBank(blueprintQuestions)).toEqual([]);
  });
  const numbers = (text: string) => (text.match(/-?\d+/g) ?? []).map(Number);
  it('independently derives all boundaries and neighbours in the unbounded BVA exercise', () => {
    const q = blueprintQuestions.find((q) => q.id === 'tl-046')!;
    const boundaries = [5 - 1, 5, 12, 12 + 1];
    const required = [
      ...new Set(boundaries.flatMap((n) => [n - 1, n, n + 1])),
    ].sort((a, b) => a - b);
    expect(required).toEqual([3, 4, 5, 6, 11, 12, 13, 14]);
    expect(
      q.options
        .filter(
          (o) =>
            JSON.stringify(numbers(o.text.en)) === JSON.stringify(required),
        )
        .map((o) => o.id),
    ).toEqual(q.correct);
    expect(q.text.en).toContain('no lower or upper domain limit');
    expect(q.explanation.en).toContain('Two-value BVA');
  });
  it('independently derives extra in-domain tests for both finite endpoints', () => {
    const q = blueprintQuestions.find((q) => q.id === 'tl-047')!;
    const boundaries = [0, 8 - 1, 8, 22, 22 + 1, 30];
    const required = [
      ...new Set(
        boundaries
          .flatMap((n) => [n - 1, n, n + 1])
          .filter((n) => n >= 0 && n <= 30),
      ),
    ].sort((a, b) => a - b);
    const extra = required.filter((n) => !boundaries.includes(n));
    expect(required).toEqual([0, 1, 6, 7, 8, 9, 21, 22, 23, 24, 29, 30]);
    expect(extra).toEqual([1, 6, 9, 21, 24, 29]);
    expect(
      q.options
        .filter(
          (o) => JSON.stringify(numbers(o.text.en)) === JSON.stringify(extra),
        )
        .map((o) => o.id),
    ).toEqual(q.correct);
    expect(q.explanation.pt).toContain('dentro do domínio');
  });
});
