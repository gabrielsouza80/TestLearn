import { beforeAll, describe, expect, it } from 'vitest';
import { createHash } from 'node:crypto';
import { readFileSync } from 'node:fs';
// Freeze the independently accepted Phase 6C contract before the expansion.
import { terminologyArchivedQuestions as questions } from '../fixtures/banks';
import {
  qualityArchivedQuestions,
  prepareHistoricalBanks,
} from '../fixtures/banks';
import reviews from '../../src/data/terminology-review.json';
import {
  answer,
  createSession,
  finish,
  score,
  sessionQuestions,
  validateBank,
} from '../../src/domain/engine';
import { selectPracticeExam } from '../../src/domain/blueprint';
import { loadAsync, save } from '../../src/storage/store';
beforeAll(prepareHistoricalBanks);
describe('Phase 6C isolated terminology corrections', () => {
  it('changes precisely three question objects and their specified PT fields, preserving all 82 keys and the other 79 deeply', () => {
    const expected = structuredClone(qualityArchivedQuestions);
    expected
      .find((q) => q.id === 'tl-030')!
      .options.find((o) => o.id === 'o3')!.text.pt =
      'Um número igual de testes em cada nível';
    expected.find((q) => q.id === 'tl-069')!.text.pt = expected
      .find((q) => q.id === 'tl-069')!
      .text.pt.replace(
        'orientado pelo comportamento',
        'orientado para comportamento',
      );
    expected.find((q) => q.id === 'tl-071')!.text.pt = expected
      .find((q) => q.id === 'tl-071')!
      .text.pt.replace(
        'cobertura Each Choice',
        'cobertura de Cada Escolha (Each Choice)',
      );
    for (const review of reviews) {
      const q = expected.find((q) => q.id === review.id)!;
      expect(q.version).toBe(review.previousVersion);
      q.version = review.version;
      q.academicReview = {
        ...q.academicReview!,
        reviewedAt: review.reviewedAt,
        report: review.report,
      };
    }
    expect(questions).toEqual(expected);
    expect(
      questions
        .filter(
          (q, i) =>
            JSON.stringify(q) !== JSON.stringify(qualityArchivedQuestions[i]),
        )
        .map((q) => q.id),
    ).toEqual(['tl-030', 'tl-069', 'tl-071']);
    expect(
      questions.map((q) => [
        q.id,
        q.correct,
        q.required,
        q.chapter,
        q.lo,
        q.level,
      ]),
    ).toEqual(
      qualityArchivedQuestions.map((q) => [
        q.id,
        q.correct,
        q.required,
        q.chapter,
        q.lo,
        q.level,
      ]),
    );
    expect(validateBank(questions)).toEqual([]);
    expect(questions).toHaveLength(82);
    expect(new Set(questions.map((q) => q.lo)).size).toBe(64);
  });
  it('pins the complete .7 archive and preserves the English terminology and numerical data', () => {
    expect(
      createHash('sha256')
        .update(readFileSync('src/data/archive/questions-2026-10-27.7.json'))
        .digest('hex'),
    ).toBe('970ef782fbf61bdd92889ceea1fc8474064eec377058c01ec1198b927c0c4fef');
    for (const id of ['tl-030', 'tl-069', 'tl-071']) {
      const old = qualityArchivedQuestions.find((q) => q.id === id)!,
        current = questions.find((q) => q.id === id)!;
      expect(current.text.en).toBe(old.text.en);
      expect(current.options.map((o) => o.text.en)).toEqual(
        old.options.map((o) => o.text.en),
      );
      expect(current.correct).toEqual(old.correct);
      expect(current.humanApproval).toBe('PENDING');
    }
  });
  it.each(['exam', 'practice'] as const)(
    'recovers .7 %s text, order, key, flags and timestamps without migrating progress',
    async (mode) => {
      const bank =
        mode === 'exam'
          ? selectPracticeExam(qualityArchivedQuestions, 42)
          : qualityArchivedQuestions;
      const first = bank[0];
      const base = {
        ...createSession(bank, mode, 75, 1000, 42),
        contentRevision: '2026-10-27.7',
        flagged: [first.id],
      };
      const session = answer(base, first.id, first.correct, 1000);
      expect(save({ version: 1, active: session, history: [] })).toBe(true);
      const raw = localStorage.getItem('testlearn.v1');
      expect((await loadAsync()).state.active).toEqual(session);
      expect(localStorage.getItem('testlearn.v1')).toBe(raw);
      expect(sessionQuestions(session, questions)).toEqual(
        qualityArchivedQuestions,
      );
      expect(
        score(
          session,
          questions.map((q) => ({ ...q, correct: [] })),
        ).correct,
      ).toBe(1);
      const done = finish(session, 2000);
      expect(save({ version: 1, active: null, history: [done] })).toBe(true);
      expect((await loadAsync()).state.history[0]).toEqual(done);
      expect(score(done, questions).correct).toBe(1);
    },
  );
});
