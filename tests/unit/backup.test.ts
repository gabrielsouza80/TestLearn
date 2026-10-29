import { beforeAll, describe, it, expect } from 'vitest';
import {
  exportBackup,
  parseBackup,
  planImport,
  MAX_BACKUP_BYTES,
  canonical,
} from '../../src/storage/backup';
import { emptyState, type State } from '../../src/storage/store';
import { questions } from '../../src/data/questions';
import {
  answer,
  createSession,
  finish,
  type Session,
} from '../../src/domain/engine';
import { getQuestionBank } from '../../src/data/bank-history';
import { prepareHistoricalBanks } from '../fixtures/banks';
beforeAll(prepareHistoricalBanks);
const current = () =>
  createSession(
    [questions.find((q) => q.id === 'tl-083')!],
    'practice',
    0,
    1000,
    42,
  );
function historical(n: number): Session {
  const q = getQuestionBank(`2026-10-27.${n}`, questions).find(
    (q) => q.id === 'tl-003',
  )!;
  return {
    version: 1,
    contentRevision: `2026-10-27.${n}`,
    id: `history-${n}`,
    mode: 'practice',
    questionIds: [q.id],
    visitedIds: [q.id],
    optionOrder: { [q.id]: q.options.map((o) => o.id).reverse() },
    answers: { [q.id]: [...q.correct] },
    flagged: [q.id],
    feedbackIds: [q.id],
    index: 0,
    startedAt: 1000,
    deadline: null,
    completedAt: 2000,
    responseMs: { [q.id]: 1000 },
    lastInteractionAt: 2000,
  };
}
const valid = () => ({
  version: 1 as const,
  active: null,
  history: [historical(9)],
});
describe('portable progress format', () => {
  it('round-trips all nine revisions, exact order, choices, flags and timing, without keys or bank content', async () => {
    const state: State = {
      version: 1,
      active: answer(current(), 'tl-083', ['o1'], 1500),
      history: Array.from({ length: 9 }, (_, i) => historical(i + 1)),
    };
    const before = canonical(state);
    localStorage.setItem('unrelated', 'private');
    const text = exportBackup(state, new Date('2026-10-29T12:00:00Z')),
      backup = await parseBackup(text);
    expect(backup.state).toEqual(state);
    expect(backup.results.map((r) => r.correct)).toEqual(Array(9).fill(1));
    expect(backup.exportedAt).toBe('2026-10-29T12:00:00.000Z');
    expect(text).not.toContain('unrelated');
    expect(text).not.toContain('explanation');
    expect(text).not.toContain('humanApproval');
    expect(text).not.toContain('optionExplanations');
    expect(canonical(state)).toBe(before);
    expect(localStorage.getItem('unrelated')).toBe('private');
  });
  it('preserves multiple-response selections and recomputes an incorrect partial completed answer as zero', async () => {
    const session = finish(answer(current(), 'tl-083', ['o1'], 1500), 2000);
    const backup = await parseBackup(
      exportBackup({ version: 1, active: null, history: [session] }),
    );
    expect(backup.results).toEqual([
      {
        sessionId: session.id,
        correct: 0,
        total: 1,
        unanswered: 0,
        passed: null,
      },
    ]);
    expect(backup.state.history[0]).toEqual(session);
  });
  it('exports without modifying TestLearn storage', () => {
    const raw = JSON.stringify(valid());
    localStorage.setItem('testlearn.v1', raw);
    exportBackup(valid());
    expect(localStorage.getItem('testlearn.v1')).toBe(raw);
  });
  it('rejects malformed JSON and oversized data before restoring anything', async () => {
    await expect(parseBackup('{broken')).rejects.toMatchObject({
      code: 'invalid',
    });
    await expect(
      parseBackup(' '.repeat(MAX_BACKUP_BYTES + 1)),
    ).rejects.toMatchObject({ code: 'size' });
  });
  const edits: [string, (b: ReturnType<typeof JSON.parse>) => void][] = [
    [
      'unsupported format',
      (b) => {
        b.version = 2;
      },
    ],
    [
      'unsupported revision',
      (b) => {
        b.state.history[0].contentRevision = '2026-10-27.10';
      },
    ],
    [
      'unknown question',
      (b) => {
        b.state.history[0].questionIds = ['tl-999'];
      },
    ],
    [
      'unknown option',
      (b) => {
        b.state.history[0].answers['tl-003'] = ['o999'];
      },
    ],
    [
      'excess cardinality',
      (b) => {
        b.state.history[0].answers['tl-003'] = ['o1', 'o2'];
      },
    ],
    [
      'incomplete order',
      (b) => {
        b.state.history[0].optionOrder['tl-003'].pop();
      },
    ],
    [
      'duplicate order',
      (b) => {
        b.state.history[0].optionOrder['tl-003'][1] =
          b.state.history[0].optionOrder['tl-003'][0];
      },
    ],
    [
      'tampered score',
      (b) => {
        b.results[0].correct = 0;
      },
    ],
    [
      'unknown nested field',
      (b) => {
        b.state.history[0].score = 999;
      },
    ],
    [
      'unsafe nested key',
      (b) => {
        b.state.history[0].answers = JSON.parse(
          '{"__proto__":{"polluted":true}}',
        );
      },
    ],
    [
      'unsafe root key',
      (b) => {
        Object.defineProperty(b, 'constructor', {
          enumerable: true,
          value: { polluted: true },
        });
      },
    ],
    [
      'invalid timestamps',
      (b) => {
        b.state.history[0].completedAt = 500;
      },
    ],
    [
      'unfinished history',
      (b) => {
        b.state.history[0].completedAt = null;
      },
    ],
    [
      'duplicate session',
      (b) => {
        b.state.history.push(b.state.history[0]);
      },
    ],
    [
      'extra option-order entry',
      (b) => {
        b.state.history[0].optionOrder['tl-999'] = ['o1'];
      },
    ],
  ];
  it.each(edits)(
    'rejects %s atomically and preserves unrelated/local data',
    async (_name, edit) => {
      const raw = JSON.stringify(valid());
      localStorage.setItem('testlearn.v1', raw);
      localStorage.setItem('unrelated', 'keep');
      const b = JSON.parse(exportBackup(valid()));
      edit(b);
      await expect(parseBackup(JSON.stringify(b))).rejects.toBeDefined();
      expect(localStorage.getItem('testlearn.v1')).toBe(raw);
      expect(localStorage.getItem('unrelated')).toBe('keep');
      expect(({} as { polluted?: boolean }).polluted).toBeUndefined();
    },
  );
});
describe('conservative deterministic import plan', () => {
  it('imports new records into empty state and reimport is a no-op', async () => {
    const backup = await parseBackup(exportBackup(valid()));
    const plan = planImport(emptyState(), backup);
    expect(plan).toMatchObject({
      valid: 1,
      added: 1,
      duplicates: 0,
      conflicts: 0,
      rejected: 0,
    });
    expect(plan.state).toEqual(valid());
    expect(planImport(plan.state, backup)).toMatchObject({
      added: 0,
      duplicates: 1,
      conflicts: 0,
    });
  });
  it('preserves local active sessions and same-ID conflicts, appending only distinct completed sessions', async () => {
    const local: State = {
      version: 1,
      active: current(),
      history: [historical(1)],
    };
    const incoming: State = {
      version: 1,
      active: { ...current(), id: 'other-active' },
      history: [{ ...historical(1), flagged: [] }, historical(2)],
    };
    const before = canonical(local),
      backup = await parseBackup(exportBackup(incoming));
    const plan = planImport(local, backup);
    expect(plan).toMatchObject({
      valid: 3,
      added: 1,
      duplicates: 0,
      conflicts: 2,
    });
    expect(plan.state.active).toBe(local.active);
    expect(plan.state.history).toEqual([local.history[0], incoming.history[1]]);
    expect(canonical(local)).toBe(before);
    expect(planImport(local, backup)).toEqual(plan);
  });
  it('does not treat reordered object keys as a conflicting duplicate', async () => {
    const backup = await parseBackup(exportBackup(valid()));
    const local = JSON.parse(canonical(valid()));
    expect(planImport(local, backup)).toMatchObject({
      duplicates: 1,
      added: 0,
    });
  });
  it('rejects a merge beyond capacity without trimming existing attempts', async () => {
    const session = historical(9);
    const local: State = {
      version: 1,
      active: null,
      history: Array.from({ length: 500 }, (_, i) => ({
        ...session,
        id: `local-${i}`,
      })),
    };
    const before = canonical(local),
      backup = await parseBackup(exportBackup(valid()));
    expect(() => planImport(local, backup)).toThrow('capacity');
    expect(canonical(local)).toBe(before);
  });
});
