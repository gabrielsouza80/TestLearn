import { examQuestions } from '../fixtures/sessions';
import { beforeEach, describe, it, expect, vi } from 'vitest';
import { questions } from '../../src/data/questions';
import { answer, createSession, finish } from '../../src/domain/engine';
import { emptyState, load, save } from '../../src/storage/store';
beforeEach(() => localStorage.clear());
describe('versioned persistence', () => {
  it('returns a genuine empty state', () =>
    expect(load()).toEqual({ state: emptyState(), warning: null }));
  it('round-trips active answers, flags, deadline, navigation and completed history', () => {
    let s = createSession(examQuestions, 'exam', 60, 1000);
    s = {
      ...answer(s, questions[0].id, questions[0].correct, 2000),
      flagged: [questions[0].id],
      index: 3,
    };
    expect(save({ version: 1, active: s, history: [] })).toBe(true);
    expect(load().state.active).toEqual(s);
    expect(save({ version: 1, active: null, history: [finish(s, 3000)] })).toBe(
      true,
    );
    expect(load().state.history[0].answers['tl-001']).toEqual(['o1', 'o4']);
  });
  it.each([
    '{broken',
    '{"version":99,"active":null,"history":[]}',
    '{"version":1,"active":{},"history":[]}',
  ])('recovers safely from incompatible data %s', (raw) => {
    localStorage.setItem('testlearn.v1', raw);
    expect(load().state).toEqual(emptyState());
    expect(load().warning).toBeTruthy();
    expect(localStorage.getItem('testlearn.v1')).toBe(raw);
  });
  it('rejects unknown question IDs and incompatible option identities', () => {
    const s = createSession(examQuestions, 'exam', 60, 1000);
    for (const edit of [
      { questionIds: ['removed'] },
      { optionOrder: {} },
      { index: 40 },
      { deadline: 1 },
      { answers: { 'tl-001': ['foreign'] } },
    ]) {
      localStorage.setItem(
        'testlearn.v1',
        JSON.stringify({ version: 1, active: { ...s, ...edit }, history: [] }),
      );
      expect(load().warning).toBeTruthy();
    }
  });
  it('handles quota or blocked storage without crashing', () => {
    const spy = vi
      .spyOn(Storage.prototype, 'setItem')
      .mockImplementation(() => {
        throw new Error('Quota');
      });
    expect(save(emptyState())).toBe(false);
    spy.mockRestore();
  });
});

it('rejects stale content revisions and completed active sessions', () => {
  const s = createSession(examQuestions, 'exam', 60, 1000);
  for (const edit of [{ contentRevision: 'old' }, { completedAt: 2000 }]) {
    localStorage.setItem(
      'testlearn.v1',
      JSON.stringify({ version: 1, active: { ...s, ...edit }, history: [] }),
    );
    expect(load().warning).toBeTruthy();
  }
});
it('retains the most recent 500 attempts without blocking future saves', () => {
  const s = finish(createSession(examQuestions, 'exam', 60, 1000), 2000);
  const history = Array.from({ length: 501 }, (_, i) => ({
    ...s,
    id: String(i),
  }));
  expect(save({ version: 1, active: null, history })).toBe(true);
  const restored = load().state.history;
  expect(restored).toHaveLength(500);
  expect(restored[0].id).toBe('1');
  expect(restored[499].id).toBe('500');
});

it('round-trips an unconstrained 82-question study session without applying the exam size limit', () => {
  const session = {
    ...createSession(questions, 'practice', 0, 1000, 42),
    index: 81,
    visitedIds: [questions[0].id, questions[81].id],
    answers: { 'tl-066': ['o4'] },
  };
  expect(save({ version: 1, active: session, history: [] })).toBe(true);
  expect(load().state.active).toEqual(session);
  expect(load().warning).toBeNull();
});
