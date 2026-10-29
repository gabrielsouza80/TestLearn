import { examQuestions } from '../fixtures/sessions';
import { describe, it, expect } from 'vitest';
import { questions } from '../../src/data/questions';
import {
  answer,
  createSession,
  finish,
  isCorrect,
  remaining,
  score,
  selectQuestions,
  shuffle,
  validateBank,
  recordTime,
} from '../../src/domain/engine';

describe('question integrity', () => {
  it('validates original metadata, unique IDs and full chapter coverage', () => {
    expect(questions).toHaveLength(90);
    expect(validateBank(questions)).toEqual([]);
    expect(new Set(questions.map((q) => q.chapter))).toEqual(
      new Set([1, 2, 3, 4, 5, 6]),
    );
    expect(
      questions.every(
        (q) =>
          q.origin === 'original' &&
          q.review === 'AI_REVIEWED' &&
          q.translationReview === 'AI_REVIEWED' &&
          q.humanApproval === 'PENDING',
      ),
    ).toBe(true);
  });
  it('rejects duplicate IDs, invalid answers, missing translations and malformed tables', () => {
    expect(validateBank([...questions, questions[0]])).toContain(
      'Duplicate ID: tl-001',
    );
    for (const edit of [
      { correct: ['unknown'] },
      { required: 9 },
      { lo: 'FL-6.1.1' },
      { text: { en: 'Hello', pt: '' } },
      { table: { headers: ['a'], rows: [['x', 'y']] } },
    ])
      expect(
        validateBank([{ ...questions[0], ...edit }]).length,
      ).toBeGreaterThan(0);
    expect(validateBank({})).toHaveLength(1);
  });
});
describe('deterministic engine', () => {
  it('shuffles without mutation and keeps every option identity', () => {
    const ids = questions[0].options.map((o) => o.id);
    const mixed = shuffle(ids, 42);
    expect(mixed).toEqual(shuffle(ids, 42));
    expect([...mixed].sort()).toEqual([...ids].sort());
    expect(ids).toEqual(['o1', 'o2', 'o3', 'o4']);
    expect(
      new Set([1, 2, 3, 4, 5].map((seed) => shuffle(ids, seed).join())).size,
    ).toBeGreaterThan(1);
  });
  it('selects filters and fails explicitly on insufficient or empty banks', () => {
    const selected = selectQuestions(
      questions,
      { chapter: 4, level: 'K3' },
      3,
      42,
    );
    expect(selected).toHaveLength(3);
    expect(selected.every((q) => q.chapter === 4 && q.level === 'K3')).toBe(
      true,
    );
    expect(selectQuestions(questions, { lo: 'FL-4.2.2' }, 1, 42)[0].lo).toBe(
      'FL-4.2.2',
    );
    expect(
      selectQuestions(questions, { topic: 'Tools', ids: ['tl-039'] }, 1)[0].id,
    ).toBe('tl-039');
    expect(
      selectQuestions(questions, { topic: 'Tools' }, 2, 42)
        .map((q) => q.id)
        .sort(),
    ).toEqual(['tl-039', 'tl-079']);
    expect(() => selectQuestions([], {}, 1)).toThrow();
    expect(() => selectQuestions(questions, { ids: [] }, 1)).toThrow();
    expect(() =>
      selectQuestions(questions, {}, questions.length + 1),
    ).toThrow();
  });
  it('requires the exact multiple-answer set without duplicates or partial credit', () => {
    const q = questions[0];
    expect(isCorrect(q, ['o4', 'o1'])).toBe(true);
    for (const selection of [
      [],
      ['o1'],
      ['o1', 'o1'],
      ['o1', 'o2'],
      ['o1', 'o4', 'o2'],
    ])
      expect(isCorrect(q, selection)).toBe(false);
  });
  for (const target of [0, 25, 26, 40])
    it(`scores exactly ${target}/40 and applies 26-point boundary`, () => {
      let s = createSession(examQuestions, 'exam', 60, 1000);
      examQuestions.slice(0, target).forEach((q) => {
        s = answer(s, q.id, q.correct, 2000);
      });
      s = finish(s, 3000);
      expect(score(s, questions)).toEqual({
        correct: target,
        total: 40,
        unanswered: 40 - target,
        passed: target >= 26,
      });
      expect(answer(s, questions[0].id, [], 4000)).toBe(s);
    });
  it('uses absolute deadlines, freezes expired answers and completes idempotently', () => {
    const s = createSession(examQuestions, 'exam', 75, 1000);
    expect(remaining(s, 1000)).toBe(4500000);
    expect(remaining(s, 4501000)).toBe(0);
    expect(answer(s, questions[0].id, ['o1'], 4501000)).toBe(s);
    const done = finish(s, 9999999);
    expect(done.completedAt).toBe(4501000);
    expect(finish(done, 99999999)).toBe(done);
    expect(
      createSession(questions.slice(0, 2), 'practice', 0, 1000).deadline,
    ).toBeNull();
  });
  it('validates configuration and supplied answer IDs', () => {
    expect(() => createSession([], 'practice', 0)).toThrow();
    expect(() => createSession(questions.slice(0, 4), 'exam', 60)).toThrow();
    expect(() => createSession(examQuestions, 'exam', 61)).toThrow();
    const s = createSession(examQuestions, 'exam', 60, 1000);
    expect(() => answer(s, questions[0].id, ['invalid'], 2000)).toThrow();
  });
  it('attributes elapsed time to the viewed question and caps it at expiry', () => {
    const s = createSession(examQuestions, 'exam', 60, 1000);
    const next = recordTime(s, 2000);
    expect(next.responseMs['tl-001']).toBe(1000);
    const moved = { ...next, index: 1 };
    expect(recordTime(moved, 3000).responseMs).toEqual({
      [examQuestions[0].id]: 1000,
      [examQuestions[1].id]: 1000,
    });
    expect(recordTime(s, 9999999).responseMs['tl-001']).toBe(3600000);
  });
});
