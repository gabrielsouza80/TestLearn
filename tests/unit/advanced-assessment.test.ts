import { beforeAll, describe, expect, it } from 'vitest';
import { readFileSync } from 'node:fs';
import { createHash } from 'node:crypto';
import { questions } from '../../src/data/questions';
import { advancedQuestions } from '../../src/data/advanced-questions';
import {
  terminologyArchivedQuestions,
  qualityArchivedQuestions,
  prepareHistoricalBanks,
} from '../fixtures/banks';
import {
  answer,
  createSession,
  finish,
  isCorrect,
  score,
  sessionQuestions,
  validateBank,
} from '../../src/domain/engine';
import { selectPracticeExam } from '../../src/domain/blueprint';
import { expectedGroups } from '../fixtures/blueprint-oracle';
import { loadAsync, save } from '../../src/storage/store';
import {
  boundaryOracle,
  decisionOracle,
  transitionOracle,
  estimationOracle,
  defectReportOracle,
} from '../fixtures/advanced-solvers';
beforeAll(prepareHistoricalBanks);
const q = (id: string) => questions.find((item) => item.id === id)!;
const hashes = [
  '970ef782fbf61bdd92889ceea1fc8474064eec377058c01ec1198b927c0c4fef',
  'd24f50e91af42eac9fc52896db9b2f856a0530536ab770882ac15e292f1f119e',
  '89a0d7b2483afbbd279f7a1d9ac707d1ce9b4e049225be88a59c0dd30cd42bb2',
];
describe('Phase 7 advanced assessment and immutable boundaries', () => {
  it('adds precisely eight original items without modifying any accepted .8 object', () => {
    expect(questions).toHaveLength(90);
    expect(questions.slice(0, 82)).toEqual(terminologyArchivedQuestions);
    expect(questions.slice(82)).toEqual(advancedQuestions);
    expect(advancedQuestions.map((item) => item.id)).toEqual(
      Array.from({ length: 8 }, (_, i) => `tl-0${83 + i}`),
    );
    expect(new Set(questions.map((item) => item.id)).size).toBe(90);
    expect(new Set(questions.map((item) => item.lo)).size).toBe(64);
    expect(validateBank(questions)).toEqual([]);
    expect(questions.reduce((sum, item) => sum + item.options.length, 0)).toBe(
      364,
    );
    expect(
      ['K1', 'K2', 'K3'].map(
        (k) => questions.filter((item) => item.level === k).length,
      ),
    ).toEqual([18, 50, 22]);
    expect(questions.filter((item) => item.required === 2)).toHaveLength(4);
    expect(
      questions
        .filter((item) => item.options.length === 5)
        .map((item) => item.id),
    ).toEqual(['tl-083', 'tl-084', 'tl-085', 'tl-089']);
  });
  it('pins byte integrity of .7/.8/.9 and the complete final snapshot', () => {
    for (const [index, hash] of hashes.entries())
      expect(
        createHash('sha256')
          .update(
            readFileSync(
              `src/data/archive/questions-2026-10-27.${7 + index}.json`,
            ),
          )
          .digest('hex'),
      ).toBe(hash);
    expect(
      JSON.parse(
        readFileSync('src/data/archive/questions-2026-10-27.9.json', 'utf8'),
      ),
    ).toEqual(questions);
  });
  it('retains complete bilingual rationale, original provenance and pending human review', () => {
    for (const item of advancedQuestions) {
      expect(item.version).toBe(1);
      expect(item.origin).toBe('original');
      expect(item.humanApproval).toBe('PENDING');
      expect(item.academicReview?.status).toBe('PASS');
      expect(item.academicReview?.pages.length).toBeGreaterThan(0);
      expect(item.academicReview?.section).toMatch(/^\d\.\d/);
      expect(item.options.map((o) => o.id)).toEqual(
        Array.from({ length: item.options.length }, (_, i) => `o${i + 1}`),
      );
      for (const lang of ['en', 'pt'] as const) {
        expect(item.text[lang].trim().length).toBeGreaterThan(40);
        expect(item.explanation[lang].trim().length).toBeGreaterThan(30);
        for (const option of item.options) {
          expect(option.text[lang].trim().length).toBeGreaterThan(1);
          expect(option.explanation[lang].trim().length).toBeGreaterThan(25);
        }
      }
      for (const option of item.options)
        expect(option.text.en.match(/\d+/g) ?? []).toEqual(
          option.text.pt.match(/\d+/g) ?? [],
        );
      if (item.required === 2) {
        expect(item.text.en).toContain('TWO');
        expect(item.text.pt).toContain('DUAS');
        expect(item.correct).toHaveLength(2);
        expect(item.options).toHaveLength(5);
      }
    }
  });
  it.each([
    ['tl-086', boundaryOracle],
    ['tl-087', decisionOracle],
    ['tl-088', transitionOracle],
    ['tl-089', estimationOracle],
    ['tl-090', defectReportOracle],
  ] as const)(
    'derives a unique solution from the scenario, without consulting the stored key: %s',
    (id, oracle) => {
      expect(oracle(q(id)).solutions).toEqual(q(id).correct);
      expect(oracle(q(id)).solutions).toHaveLength(1);
    },
  );
  it('checks boundary scope, all eight truth assignments, all six state/event pairs and both estimation methods', () => {
    expect(boundaryOracle(q('tl-086')).missing).toEqual([5, 11, 13, 21]);
    expect(boundaryOracle(q('tl-086')).target).toHaveLength(12);
    expect(decisionOracle(q('tl-087'))).toMatchObject({
      inputCombinations: 8,
      percentage: 75,
      coveredRules: ['R1', 'R2', 'R4'],
    });
    expect(transitionOracle(q('tl-088'))).toMatchObject({
      totalPairs: 6,
      existingCoverage: 4,
      missing: ['Locked:revoke', 'Open:grant'],
    });
    expect(estimationOracle(q('tl-089'))).toMatchObject({
      weighted: [3, 6, 4],
      repeat: 2,
      setup: 2,
      total: 17,
      secondMethod: 17,
    });
    expect(defectReportOracle(q('tl-090'))).toMatchObject({
      initial: 20,
      quantity: 2,
      expected: 18,
      actual: 20,
      status: 'Draft',
      http: 409,
    });
  });
  it('scores only exact sets and preserves five stable option IDs across seeded shuffles', () => {
    for (const item of advancedQuestions.filter(
      (item) => item.required === 2,
    )) {
      expect(isCorrect(item, [...item.correct].reverse())).toBe(true);
      const wrong = item.options
        .filter((o) => !item.correct.includes(o.id))
        .map((o) => o.id);
      for (const ids of [
        [],
        [item.correct[0]],
        [item.correct[0], wrong[0]],
        [...item.correct, wrong[0]],
        [item.correct[0], item.correct[0]],
        wrong.slice(0, 2),
      ])
        expect(isCorrect(item, ids)).toBe(false);
      for (let seed = 0; seed < 50; seed++) {
        const session = createSession([item], 'practice', 0, 1000, seed);
        expect(new Set(session.optionOrder[item.id])).toEqual(
          new Set(item.options.map((o) => o.id)),
        );
        expect(session.optionOrder[item.id]).toEqual(
          createSession([item], 'practice', 0, 1000, seed).optionOrder[item.id],
        );
        expect(
          score(answer(session, item.id, item.correct, 2000), questions)
            .correct,
        ).toBe(1);
      }
    }
  });
  it.each([
    ['2026-10-27.7', qualityArchivedQuestions],
    ['2026-10-27.8', terminologyArchivedQuestions],
  ] as const)(
    'restores exam and full study fields and original results for %s',
    async (revision, frozen) => {
      for (const mode of ['exam', 'practice'] as const) {
        const bank = mode === 'exam' ? selectPracticeExam(frozen, 42) : frozen;
        const first = bank[0];
        const session = {
          ...answer(
            createSession(bank, mode, 75, 1000, 42),
            first.id,
            first.correct,
            2000,
          ),
          contentRevision: revision,
          index: bank.length - 1,
          visitedIds: [first.id, bank[bank.length - 1].id],
          flagged: [first.id],
          responseMs: { [first.id]: 1000 },
        };
        expect(save({ version: 1, active: session, history: [] })).toBe(true);
        expect((await loadAsync()).state.active).toEqual(session);
        expect(sessionQuestions(session, questions)).toEqual(frozen);
        expect(score(session, questions).correct).toBe(1);
        const completed = finish(session, 3000);
        expect(save({ version: 1, active: null, history: [completed] })).toBe(
          true,
        );
        expect((await loadAsync()).state.history).toEqual([completed]);
        expect(score(completed, questions)).toEqual(score(completed, frozen));
      }
    },
  );
  it('satisfies the independent 29-group oracle over 1000 deterministic seeds without forcing multiple-response items', () => {
    const formats = new Set<number>();
    const seen = new Set<string>();
    for (let seed = 0; seed < 1000; seed++) {
      const exam = selectPracticeExam(questions, seed);
      expect(exam.map((item) => item.id)).toEqual(
        selectPracticeExam(questions, seed).map((item) => item.id),
      );
      expect(new Set(exam.map((item) => item.id)).size).toBe(40);
      for (const [level, count, los] of expectedGroups) {
        const group = exam.filter(
          (item) => item.level === level && los.includes(item.lo),
        );
        expect(group).toHaveLength(count);
        expect(new Set(group.map((item) => item.lo)).size).toBe(
          Math.min(count, los.length),
        );
      }
      expect(
        [1, 2, 3, 4, 5, 6].map(
          (c) => exam.filter((item) => item.chapter === c).length,
        ),
      ).toEqual([8, 6, 4, 11, 9, 2]);
      expect(
        ['K1', 'K2', 'K3'].map(
          (k) => exam.filter((item) => item.level === k).length,
        ),
      ).toEqual([8, 24, 8]);
      formats.add(exam.filter((item) => item.required === 2).length);
      exam.forEach((item) => seen.add(item.id));
    }
    expect(seen.size).toBe(90);
    expect(formats.has(0)).toBe(true);
    expect(formats.size).toBeGreaterThan(1);
  }, 20000);
});
