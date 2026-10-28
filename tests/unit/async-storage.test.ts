import { beforeEach, expect, it, vi } from 'vitest';
import { questions } from '../../src/data/questions';
import { bilingualArchivedQuestions } from '../fixtures/banks';
import { createSession, answer, score } from '../../src/domain/engine';
import { loadAsync, SavedDataChangedError } from '../../src/storage/store';
import { loadQuestionBank } from '../../src/data/bank-history';
vi.mock('../../src/data/bank-history', async (original) => {
  const actual = await original<typeof import('../../src/data/bank-history')>();
  return { ...actual, loadQuestionBank: vi.fn(actual.loadQuestionBank) };
});
const loader = vi.mocked(loadQuestionBank);
const originalLoader = (
  await vi.importActual<typeof import('../../src/data/bank-history')>(
    '../../src/data/bank-history',
  )
).loadQuestionBank;
beforeEach(() => {
  loader.mockReset();
  loader.mockImplementation(originalLoader);
});
function fixture() {
  const q = bilingualArchivedQuestions.find((q) => q.id === 'tl-003')!;
  const active = {
    ...answer(
      createSession([q], 'practice', 0, 1000, 42),
      q.id,
      q.correct,
      1000,
    ),
    contentRevision: '2026-10-27.5',
    flagged: [q.id],
  };
  const raw = JSON.stringify({ version: 1, active, history: [] });
  localStorage.setItem('testlearn.v1', raw);
  return { active, raw };
}
it('restores original answers, flags, wording, scores and metadata without rewriting the saved bytes', async () => {
  const { active, raw } = fixture();
  const result = await loadAsync();
  expect(result.warning).toBeNull();
  expect(result.state.active).toEqual(active);
  expect(score(result.state.active!, questions).correct).toBe(1);
  expect(localStorage.getItem('testlearn.v1')).toBe(raw);
  expect(loader).toHaveBeenCalledExactlyOnceWith('2026-10-27.5', questions);
});
it('rejects a load failure and preserves the complete saved bytes', async () => {
  const { raw } = fixture();
  loader.mockRejectedValueOnce(new Error('offline'));
  await expect(loadAsync()).rejects.toThrow('offline');
  expect(localStorage.getItem('testlearn.v1')).toBe(raw);
});
it('does not return a stale session when saved progress changes while its bank is loading', async () => {
  fixture();
  let release!: () => void;
  const waiting = new Promise<void>((yes) => {
    release = yes;
  });
  loader.mockImplementationOnce(async (revision, current) => {
    await waiting;
    return originalLoader(revision, current);
  });
  const request = loadAsync();
  const replacement = JSON.stringify({ version: 1, active: null, history: [] });
  localStorage.setItem('testlearn.v1', replacement);
  const rejected = expect(request).rejects.toBeInstanceOf(
    SavedDataChangedError,
  );
  release();
  await rejected;
  expect(localStorage.getItem('testlearn.v1')).toBe(replacement);
});
it.each([
  '{broken',
  JSON.stringify({
    version: 1,
    active: { contentRevision: 'unknown' },
    history: [],
  }),
])(
  'denies malformed envelopes without requesting an archive: %s',
  async (raw) => {
    localStorage.setItem('testlearn.v1', raw);
    expect((await loadAsync()).warning).toBeTruthy();
    expect(loader).not.toHaveBeenCalled();
    expect(localStorage.getItem('testlearn.v1')).toBe(raw);
  },
);
