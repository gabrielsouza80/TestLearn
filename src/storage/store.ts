import { BankNotReadyError, loadQuestionBank } from '../data/bank-history';
import {
  CONTENT_REVISION,
  LEGACY_CONTENT_REVISION,
  AUDITED_CONTENT_REVISION,
  BLUEPRINT_CONTENT_REVISION,
  COVERAGE_CONTENT_REVISION,
  BILINGUAL_CONTENT_REVISION,
  VARIABILITY_CONTENT_REVISION,
  QUALITY_CONTENT_REVISION,
  TERMINOLOGY_CONTENT_REVISION,
  isBlueprintRevision,
} from '../domain/revision';
import { auditBlueprint } from '../domain/blueprint-audit';
import { z } from 'zod';
import { questions } from '../data/questions';
import {
  sessionQuestions,
  isExamEligible,
  type Session,
} from '../domain/engine';
const timestamp = z.number().int().nonnegative().max(8640000000000000);
const sessionBaseSchema = z.object({
  version: z.literal(1),
  contentRevision: z.enum([
    CONTENT_REVISION,
    LEGACY_CONTENT_REVISION,
    AUDITED_CONTENT_REVISION,
    BLUEPRINT_CONTENT_REVISION,
    COVERAGE_CONTENT_REVISION,
    BILINGUAL_CONTENT_REVISION,
    VARIABILITY_CONTENT_REVISION,
    QUALITY_CONTENT_REVISION,
    TERMINOLOGY_CONTENT_REVISION,
  ]),
  id: z.string().min(1),
  mode: z.enum(['exam', 'practice']),
  questionIds: z.array(z.string()).min(1),
  visitedIds: z.array(z.string()).min(1),
  optionOrder: z.record(z.string(), z.array(z.string())),
  answers: z.record(z.string(), z.array(z.string())),
  flagged: z.array(z.string()),
  feedbackIds: z.array(z.string()).optional(),
  index: z.number().int().nonnegative(),
  startedAt: timestamp,
  deadline: timestamp.nullable(),
  completedAt: timestamp.nullable(),
  responseMs: z.record(z.string(), z.number().nonnegative()),
  lastInteractionAt: timestamp,
});
export const sessionSchema = sessionBaseSchema.superRefine((s, ctx) => {
  const map = new Map(sessionQuestions(s, questions).map((q) => [q.id, q]));
  const ids = new Set(s.questionIds);
  const invalid =
    s.questionIds.length > map.size ||
    ids.size !== s.questionIds.length ||
    s.index >= s.questionIds.length ||
    s.questionIds.some((id) => {
      const q = map.get(id);
      const order = s.optionOrder[id];
      return (
        !q ||
        !order ||
        order.length !== q.options.length ||
        new Set(order).size !== order.length ||
        order.some((o) => !q.options.some((x) => x.id === o))
      );
    }) ||
    Object.entries(s.answers).some(
      ([id, a]) =>
        !ids.has(id) ||
        new Set(a).size !== a.length ||
        a.some((o) => !s.optionOrder[id]?.includes(o)),
    ) ||
    s.visitedIds.some((id) => !ids.has(id)) ||
    s.flagged.some((id) => !ids.has(id)) ||
    (s.feedbackIds ?? []).some((id) => !ids.has(id)) ||
    Object.keys(s.responseMs).some((id) => !ids.has(id)) ||
    s.lastInteractionAt < s.startedAt ||
    (s.completedAt !== null && s.completedAt < s.startedAt) ||
    (s.mode === 'exam' &&
      (s.questionIds.length !== 40 ||
        s.deadline === null ||
        ![3600000, 4500000].includes(s.deadline - s.startedAt))) ||
    (s.mode === 'exam' &&
      isBlueprintRevision(s.contentRevision) &&
      !auditBlueprint(
        s.questionIds
          .map((id) => map.get(id))
          .filter((q): q is NonNullable<typeof q> => !!q),
      ).compliant) ||
    (s.mode === 'practice' && s.deadline !== null);
  const currentExamIneligible =
    s.mode === 'exam' &&
    s.contentRevision === CONTENT_REVISION &&
    s.questionIds.some((id) => {
      const q = map.get(id);
      return !q || !isExamEligible(q);
    });
  if (invalid || currentExamIneligible)
    ctx.addIssue({ code: 'custom', message: 'Incompatible session content' });
});
export interface State {
  version: 1;
  active: Session | null;
  history: Session[];
}
export const emptyState = (): State => ({
  version: 1,
  active: null,
  history: [],
});
const schema = z
  .object({
    version: z.literal(1),
    active: sessionSchema.nullable(),
    history: z.array(sessionSchema).max(500),
  })
  .superRefine((s, ctx) => {
    if (
      (s.active !== null && s.active.completedAt !== null) ||
      s.history.some((h) => h.completedAt === null) ||
      new Set(s.history.map((h) => h.id)).size !== s.history.length ||
      s.history.some((h) => h.id === s.active?.id)
    )
      ctx.addIssue({ code: 'custom', message: 'Invalid history' });
  });
export function load(): { state: State; warning: string | null } {
  try {
    const raw = localStorage.getItem('testlearn.v1');
    if (!raw) return { state: emptyState(), warning: null };
    const parsed = schema.safeParse(JSON.parse(raw));
    if (!parsed.success)
      return {
        state: emptyState(),
        warning:
          'Saved data is corrupted or incompatible. It has not been overwritten.',
      };
    return { state: parsed.data, warning: null };
  } catch (error) {
    if (error instanceof BankNotReadyError) throw error;
    return {
      state: emptyState(),
      warning: 'Saved data could not be read. Progress may not persist.',
    };
  }
}
function serializeState(state: State): string {
  const valid = schema.parse({ ...state, history: state.history.slice(-500) });
  return JSON.stringify({ ...valid, history: valid.history.slice(-500) });
}
export function save(state: State): boolean {
  try {
    localStorage.setItem('testlearn.v1', serializeState(state));
    return true;
  } catch {
    return false;
  }
}

export function readStoredValue(): string | null | undefined {
  try {
    return localStorage.getItem('testlearn.v1');
  } catch {
    return undefined;
  }
}

/** One page writer, with no merge or migration of another page's progress. */
export function createStateWriter(initialRaw: string | null | undefined) {
  let expected = initialRaw;
  let conflicted = false;
  let queue: Promise<unknown> = Promise.resolve();
  const matches = (raw: string | null | undefined) => {
    if (raw === undefined) return true; // report storage failure on save
    if (raw !== expected && !(expected === undefined && raw === null))
      conflicted = true;
    return !conflicted;
  };
  const isCurrent = () => matches(readStoredValue());
  function write(state: State): 'saved' | 'conflict' | 'unavailable' {
    const before = readStoredValue();
    if (before === undefined) return 'unavailable';
    if (!matches(before)) return 'conflict';
    try {
      const raw = serializeState(state);
      localStorage.setItem('testlearn.v1', raw);
      expected = raw;
      return 'saved';
    } catch {
      return 'unavailable';
    }
  }
  return {
    isCurrent,
    save(state: State): Promise<'saved' | 'conflict' | 'unavailable'> {
      const task = queue
        .then(async () => {
          // Web Locks serializes participating tabs. Older engines still check
          // the exact stored value and are documented for single-tab use.
          if (typeof navigator !== 'undefined' && navigator.locks)
            return navigator.locks.request('testlearn-progress', () =>
              write(state),
            );
          return write(state);
        })
        .catch(() => 'unavailable' as const);
      queue = task;
      return task;
    },
  };
}

// Parse the envelope before requesting a revision; unsupported versions never import.
const envelopeSchema = z.object({
  version: z.literal(1),
  active: sessionBaseSchema.nullable(),
  history: z.array(sessionBaseSchema).max(500),
});
export class SavedDataChangedError extends Error {
  constructor() {
    super('Saved progress changed while loading. Reload before continuing.');
    this.name = 'SavedDataChangedError';
  }
}
export async function loadAsync(): Promise<{
  state: State;
  warning: string | null;
}> {
  let raw: string | null;
  try {
    raw = localStorage.getItem('testlearn.v1');
  } catch {
    return {
      state: emptyState(),
      warning: 'Saved data could not be read. Progress may not persist.',
    };
  }
  if (!raw) return { state: emptyState(), warning: null };
  let candidate: unknown;
  try {
    candidate = JSON.parse(raw);
  } catch {
    return {
      state: emptyState(),
      warning:
        'Saved data is corrupted or incompatible. It has not been overwritten.',
    };
  }
  const envelope = envelopeSchema.safeParse(candidate);
  if (!envelope.success)
    return {
      state: emptyState(),
      warning:
        'Saved data is corrupted or incompatible. It has not been overwritten.',
    };
  const revisions = new Set(
    [
      ...envelope.data.history,
      ...(envelope.data.active ? [envelope.data.active] : []),
    ].map((s) => s.contentRevision),
  );
  await Promise.all(
    [...revisions].map((revision) => loadQuestionBank(revision, questions)),
  );
  const parsed = schema.safeParse(candidate);
  if (localStorage.getItem('testlearn.v1') !== raw)
    throw new SavedDataChangedError();
  if (!parsed.success)
    return {
      state: emptyState(),
      warning:
        'Saved data is corrupted or incompatible. It has not been overwritten.',
    };
  return { state: parsed.data, warning: null };
}
