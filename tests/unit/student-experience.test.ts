import { beforeAll, describe, expect, it } from 'vitest';
import {
  createSession,
  answer,
  finish,
  score,
  type Session,
} from '../../src/domain/engine';
import { questions } from '../../src/data/questions';
import { selectPracticeExam } from '../../src/domain/blueprint';
import { learningProgress } from '../../src/domain/learning-progress';
import {
  exportBackup,
  parseBackup,
  planImport,
} from '../../src/storage/backup';
import { emptyState, sessionSchema } from '../../src/storage/store';
import oldBackup from '../fixtures/progress-backup-v1-legacy.json';
import { prepareHistoricalBanks } from '../fixtures/banks';
beforeAll(prepareHistoricalBanks);
const bank = selectPracticeExam(questions, 42);
function attempt(
  ids: string[],
  correct: boolean,
  start: number,
  selected = true,
): Session {
  const items = ids.map((id) => questions.find((q) => q.id === id)!);
  let s = createSession(items, 'practice', 0, start, 42);
  for (const q of items)
    if (selected)
      s = answer(
        s,
        q.id,
        correct
          ? q.correct
          : [q.options.find((o) => !q.correct.includes(o.id))!.id],
        start + 100,
      );
  return finish({ ...s, visitedIds: ids }, start + 200);
}
describe('new completion evidence and old backup fidelity', () => {
  it.each([0, 25, 26, 40])(
    'keeps %i/40 scoring and records explicit submission accurately',
    (n) => {
      let s = createSession(bank, 'exam', 60, 1000, 42);
      expect(s.completionReason).toBeNull();
      for (const q of bank.slice(0, n)) s = answer(s, q.id, q.correct, 2000);
      const done = finish(s, 3000);
      expect(done.completionReason).toBe(
        n === 40 ? 'submitted' : 'submitted-early',
      );
      expect(score(done, questions)).toEqual({
        correct: n,
        total: 40,
        unanswered: 40 - n,
        passed: n >= 26,
      });
      expect(finish(done, 9999999)).toBe(done);
    },
  );
  it('records actual timeout on new sessions and never adds a reason to an older record', () => {
    const s = createSession(bank, 'exam', 60, 1000, 42);
    expect(finish(s, 3601000).completionReason).toBe('expired');
    const { completionReason: _omitted, ...legacy } = s;
    void _omitted;
    const done = finish(legacy, 3601000);
    expect(done).not.toHaveProperty('completionReason');
    expect(done.completedAt).toBe(3601000);
    expect(score(done, questions)).toEqual(
      score(finish(s, 3601000), questions),
    );
  });
  it('imports an actual pre-extension backup without adding fields and preserves conflict policy', async () => {
    const parsed = await parseBackup(JSON.stringify(oldBackup));
    expect(parsed.state).toEqual(oldBackup.state);
    expect(parsed.state.active).not.toHaveProperty('completionReason');
    expect(parsed.state.history[0]).not.toHaveProperty('completionReason');
    expect(JSON.parse(exportBackup(parsed.state)).state).toEqual(
      oldBackup.state,
    );
    expect(planImport(parsed.state, parsed)).toMatchObject({
      added: 0,
      duplicates: 2,
      conflicts: 0,
    });
    expect(planImport(emptyState(), parsed).state).toEqual(oldBackup.state);
  });
  it('round-trips new active and completed reasons without changing backup version', async () => {
    const s = createSession([questions[1]], 'practice', 0, 1000, 42),
      done = finish({ ...s, id: 'done' }, 2000),
      state = { version: 1 as const, active: s, history: [done] };
    const b = await parseBackup(exportBackup(state));
    expect(b.version).toBe(1);
    expect(b.state).toEqual(state);
    const prior = JSON.parse(JSON.stringify(b));
    delete prior.state.active.completionReason;
    expect(planImport(state, prior).conflicts).toBe(1);
  });
  it.each([
    { completedAt: 2000, completionReason: null },
    { completedAt: null, completionReason: 'submitted' },
    { completedAt: 2000, completionReason: 'submitted' },
    { completedAt: 2000, completionReason: 'expired' },
  ])('rejects contradictory completion evidence %j', (edit) => {
    const s = createSession([questions[1]], 'practice', 0, 1000, 42);
    expect(sessionSchema.safeParse({ ...s, ...edit }).success).toBe(false);
  });
});
describe('honest learning history', () => {
  const ids = questions
    .filter((q) => q.chapter === 1)
    .slice(0, 6)
    .map((q) => q.id);
  it('does not turn included or answered-without-visit IDs into views; active attempts are excluded', () => {
    const s = attempt(ids, true, 1000);
    s.visitedIds = [ids[0]];
    const active = createSession([questions[0]], 'practice', 0, 2000);
    const m = learningProgress([s, active], questions);
    expect(m.completed).toBe(1);
    expect(m.viewed).toBe(1);
    expect(m.answered).toBe(6);
    expect(m.chapters[0].firstAnswered).toBe(1);
    expect(m.chapters[0].unknownAnswered).toBe(5);
    expect(m.priorities).toEqual([]);
  });
  it('separates repeat responses from unique questions and ignores storage/import ordering', () => {
    const first = attempt(ids, true, 1000),
      second = attempt(ids, false, 2000);
    const m = learningProgress([second, first, first], questions);
    expect(m.completed).toBe(2);
    expect(m.viewed).toBe(6);
    expect(m.repeatedVisits).toBe(6);
    expect(m.chapters[0]).toMatchObject({
      uniqueAnswered: 6,
      firstAnswered: 6,
      firstCorrect: 6,
      repeatAnswered: 6,
      repeatCorrect: 0,
    });
    expect(m.priorities).toEqual([]);
  });
  it('uses a fixed descriptive minimum with denominators and never ranks chapters', () => {
    const s = attempt(ids, false, 1000);
    expect(
      learningProgress([s], questions).priorities.map((c) => c.chapter),
    ).toEqual([1]);
    expect(
      learningProgress([attempt(ids.slice(0, 4), false, 1000)], questions)
        .enoughEvidence,
    ).toBe(false);
    const small = learningProgress([], questions).chapters[5];
    expect(small.available).toBeLessThan(5);
  });
  it('separates blanks from incorrect responses and does not include blanks in recommendation samples', () => {
    const m = learningProgress([attempt(ids, false, 1000, false)], questions);
    expect(m.unanswered).toBe(6);
    expect(m.answered).toBe(0);
    expect(m.incorrect).toBe(0);
    expect(m.chapters[0].firstAnswered).toBe(0);
    expect(m.priorities).toEqual([]);
  });
  it('does not invent first/repeat order for overlapping attempts', () => {
    const a = attempt(ids, true, 1000),
      b = attempt(ids, false, 1100);
    const m = learningProgress([a, b], questions);
    expect(m.chapters[0]).toMatchObject({
      firstAnswered: 0,
      repeatAnswered: 0,
      unknownAnswered: 12,
    });
    expect(m.repeatedVisits).toBe(6);
  });
  it('does not order visits that share identical start/completion timestamps', () => {
    const a = attempt(ids, true, 1000),
      b = attempt(ids, false, 1000);
    a.completedAt = 1000;
    b.completedAt = 1000;
    a.lastInteractionAt = 1000;
    b.lastInteractionAt = 1000;
    a.responseMs = {};
    b.responseMs = {};
    const model = learningProgress([a, b], questions);
    expect(model.chapters[0]).toMatchObject({
      firstAnswered: 0,
      repeatAnswered: 0,
      unknownAnswered: 12,
    });
  });
  it('keeps old revision scores in totals but excludes them from current-bank recommendations', () => {
    const s = attempt(ids, false, 1000);
    delete s.completionReason;
    s.contentRevision = '2026-10-27.8';
    const m = learningProgress([s], questions);
    expect(m.answered).toBe(6);
    expect(m.chapters[0].uniqueAnswered).toBe(0);
    expect(m.priorities).toEqual([]);
  });
  it('does not present a previously exposed old-revision ID as a fresh current first attempt', () => {
    const prior = attempt(ids, true, 1000);
    delete prior.completionReason;
    prior.contentRevision = '2026-10-27.8';
    const current = attempt(ids, false, 2000);
    const model = learningProgress([prior, current], questions);
    expect(model.chapters[0]).toMatchObject({
      uniqueAnswered: 6,
      firstAnswered: 0,
      unknownAnswered: 6,
    });
    expect(model.priorities).toEqual([]);
  });
});
