import { z } from 'zod';
import { questions } from '../data/questions';
import { loadQuestionBank } from '../data/bank-history';
import { CONTENT_REVISION } from '../domain/revision';
import { score, sessionQuestions } from '../domain/engine';
import { portableSessionSchema, stateSchema, type State } from './store';
export const MAX_BACKUP_BYTES = 8 * 1024 * 1024;
const resultSchema = z
  .object({
    sessionId: z.string().max(128),
    correct: z.number().int().nonnegative(),
    total: z.number().int().positive(),
    unanswered: z.number().int().nonnegative(),
    passed: z.boolean().nullable(),
  })
  .strict();
const sessionShape = portableSessionSchema.extend({
  id: z.string().min(1).max(128),
  questionIds: z.array(z.string().max(32)).min(1).max(90),
  visitedIds: z.array(z.string().max(32)).min(1).max(90),
  flagged: z.array(z.string().max(32)).max(90),
  feedbackIds: z.array(z.string().max(32)).max(90).optional(),
});
const backupSchema = z
  .object({
    format: z.literal('testlearn-backup'),
    version: z.literal(1),
    exportedAt: z.iso.datetime(),
    source: z
      .object({
        app: z.literal('TestLearn'),
        contentRevision: portableSessionSchema.shape.contentRevision,
      })
      .strict(),
    state: z
      .object({
        version: z.literal(1),
        active: sessionShape.nullable(),
        history: z.array(sessionShape).max(500),
      })
      .strict(),
    results: z.array(resultSchema).max(500),
  })
  .strict();
export type Backup = z.infer<typeof backupSchema>;
export class BackupError extends Error {
  constructor(
    public readonly code:
      'size' | 'invalid' | 'historical' | 'changed' | 'capacity' | 'write',
  ) {
    super(code);
    this.name = 'BackupError';
  }
}
const sessions = (state: State) => [
  ...state.history,
  ...(state.active ? [state.active] : []),
];
function rejectUnsafeKeys(value: unknown, depth = 0): void {
  if (depth > 20) throw new BackupError('invalid');
  if (!value || typeof value !== 'object') return;
  for (const [key, child] of Object.entries(value)) {
    if (['__proto__', 'prototype', 'constructor'].includes(key))
      throw new BackupError('invalid');
    rejectUnsafeKeys(child, depth + 1);
  }
}
export const canonical = (value: unknown): string =>
  JSON.stringify(value, (_key, item) =>
    item && typeof item === 'object' && !Array.isArray(item)
      ? Object.fromEntries(
          Object.keys(item)
            .sort()
            .map((k) => [k, item[k]]),
        )
      : item,
  );
function validate(state: State) {
  if (!stateSchema.safeParse(state).success) throw new BackupError('invalid');
  for (const session of sessions(state)) {
    const bank = new Map(
      sessionQuestions(session, questions).map((q) => [q.id, q]),
    );
    const ids = new Set(session.questionIds);
    if (
      Object.keys(session.optionOrder).some((id) => !ids.has(id)) ||
      [session.visitedIds, session.flagged, session.feedbackIds ?? []].some(
        (items) => new Set(items).size !== items.length,
      ) ||
      (session.deadline !== null &&
        (session.lastInteractionAt > session.deadline ||
          (session.completedAt !== null &&
            session.completedAt > session.deadline))) ||
      (session.completedAt !== null &&
        session.lastInteractionAt > session.completedAt)
    )
      throw new BackupError('invalid');
    for (const [id, answers] of Object.entries(session.answers))
      if (answers.length > bank.get(id)!.required)
        throw new BackupError('invalid');
    for (const id of session.feedbackIds ?? [])
      if ((session.answers[id]?.length ?? 0) !== bank.get(id)!.required)
        throw new BackupError('invalid');
  }
}
export function exportBackup(state: State, now = new Date()): string {
  validate(state);
  const backup = backupSchema.parse({
    format: 'testlearn-backup',
    version: 1,
    exportedAt: now.toISOString(),
    source: { app: 'TestLearn', contentRevision: CONTENT_REVISION },
    state,
    results: state.history.map((s) => ({
      sessionId: s.id,
      ...score(s, questions),
    })),
  });
  const text = JSON.stringify(backup) + '\n';
  if (new TextEncoder().encode(text).length > MAX_BACKUP_BYTES)
    throw new BackupError('size');
  return text;
}
export async function parseBackup(text: string): Promise<Backup> {
  if (new TextEncoder().encode(text).length > MAX_BACKUP_BYTES)
    throw new BackupError('size');
  let candidate: unknown;
  try {
    candidate = JSON.parse(text);
  } catch {
    throw new BackupError('invalid');
  }
  rejectUnsafeKeys(candidate);
  const parsed = backupSchema.safeParse(candidate);
  if (!parsed.success) throw new BackupError('invalid');
  const backup = parsed.data;
  try {
    await Promise.all(
      [...new Set(sessions(backup.state).map((s) => s.contentRevision))].map(
        (r) => loadQuestionBank(r, questions),
      ),
    );
  } catch {
    throw new BackupError('historical');
  }
  validate(backup.state);
  const computed = backup.state.history.map((s) => ({
    sessionId: s.id,
    ...score(s, questions),
  }));
  if (canonical(computed) !== canonical(backup.results))
    throw new BackupError('invalid');
  return backup;
}
export function planImport(local: State, backup: Backup) {
  validate(local);
  const map = new Map(sessions(local).map((s) => [s.id, s]));
  const next: State = {
    version: 1,
    active: local.active,
    history: [...local.history],
  };
  let added = 0,
    duplicates = 0,
    conflicts = 0;
  for (const item of sessions(backup.state)) {
    const existing = map.get(item.id);
    if (existing) {
      if (canonical(existing) === canonical(item)) duplicates++;
      else conflicts++;
      continue;
    }
    if (item.completedAt === null) {
      if (next.active) {
        conflicts++;
        continue;
      }
      next.active = item;
    } else next.history.push(item);
    map.set(item.id, item);
    added++;
  }
  if (next.history.length > 500) throw new BackupError('capacity');
  validate(next);
  return {
    state: next,
    valid: sessions(backup.state).length,
    added,
    duplicates,
    conflicts,
    rejected: 0,
  };
}
