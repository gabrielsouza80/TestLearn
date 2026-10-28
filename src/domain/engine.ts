import { CONTENT_REVISION } from './revision';
import { getQuestionBank } from '../data/bank-history';
import { auditBlueprint } from './blueprint-audit';
import { validateBank, isExamEligible, type Question } from './question';
export {
  questionSchema,
  validateBank,
  isExamEligible,
  type Question,
} from './question';
export interface Session {
  version: 1;
  contentRevision: string;
  id: string;
  mode: 'exam' | 'practice';
  questionIds: string[];
  visitedIds: string[];
  optionOrder: Record<string, string[]>;
  answers: Record<string, string[]>;
  flagged: string[];
  feedbackIds?: string[];
  index: number;
  startedAt: number;
  deadline: number | null;
  completedAt: number | null;
  responseMs: Record<string, number>;
  lastInteractionAt: number;
}
export interface Filter {
  chapter?: number;
  topic?: string;
  lo?: string;
  level?: string;
  ids?: string[];
}
export function shuffle<T>(items: readonly T[], seed = Date.now()): T[] {
  const result = [...items];
  let state = seed >>> 0;
  const random = () => {
    state = (Math.imul(1664525, state) + 1013904223) >>> 0;
    return state / 4294967296;
  };
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(random() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
}
export function selectQuestions(
  bank: Question[],
  filter: Filter,
  count: number,
  seed = Date.now(),
): Question[] {
  if (validateBank(bank).length) throw new Error('Invalid question bank');
  const eligible = bank.filter(
    (q) =>
      (!filter.chapter || q.chapter === filter.chapter) &&
      (!filter.topic || q.topic === filter.topic) &&
      (!filter.lo || q.lo === filter.lo) &&
      (!filter.level || q.level === filter.level) &&
      (!filter.ids || filter.ids.includes(q.id)),
  );
  if (!Number.isInteger(count) || count < 1 || count > eligible.length)
    throw new Error('Insufficient eligible questions');
  return shuffle(eligible, seed).slice(0, count);
}
export function isCorrect(q: Question, ids: string[]): boolean {
  return (
    ids.length === q.correct.length &&
    new Set(ids).size === ids.length &&
    ids.every((id) => q.correct.includes(id))
  );
}
export function createSession(
  bank: Question[],
  mode: Session['mode'],
  minutes: number,
  now = Date.now(),
  seed = now,
): Session {
  if (
    !bank.length ||
    validateBank(bank).length ||
    (mode === 'exam' &&
      (!auditBlueprint(bank).compliant ||
        !bank.every(isExamEligible) ||
        ![60, 75].includes(minutes)))
  )
    throw new Error('Invalid session configuration');
  return {
    version: 1,
    contentRevision: CONTENT_REVISION,
    id: crypto.randomUUID(),
    mode,
    questionIds: bank.map((q) => q.id),
    visitedIds: [bank[0].id],
    optionOrder: Object.fromEntries(
      bank.map((q, i) => [
        q.id,
        shuffle(
          q.options.map((o) => o.id),
          seed + i,
        ),
      ]),
    ),
    answers: {},
    flagged: [],
    index: 0,
    startedAt: now,
    deadline: mode === 'exam' ? now + minutes * 60000 : null,
    completedAt: null,
    responseMs: {},
    lastInteractionAt: now,
  };
}
export function remaining(s: Session, now = Date.now()): number {
  return s.deadline === null ? Infinity : Math.max(0, s.deadline - now);
}
export function answer(
  s: Session,
  qid: string,
  ids: string[],
  now = Date.now(),
): Session {
  if (
    s.completedAt !== null ||
    remaining(s, now) === 0 ||
    !s.questionIds.includes(qid)
  )
    return s;
  if (
    new Set(ids).size !== ids.length ||
    ids.some((id) => !s.optionOrder[qid].includes(id))
  )
    throw new Error('Invalid answer');
  return { ...recordTime(s, now), answers: { ...s.answers, [qid]: [...ids] } };
}
export function finish(s: Session, now = Date.now()): Session {
  return s.completedAt !== null
    ? s
    : {
        ...recordTime(s, now),
        completedAt: Math.max(s.startedAt, Math.min(now, s.deadline ?? now)),
      };
}
export function score(s: Session, bank: Question[]) {
  const map = new Map(sessionQuestions(s, bank).map((q) => [q.id, q]));
  if (s.questionIds.some((id) => !map.has(id)))
    throw new Error('Missing session content');
  const correct = s.questionIds.filter((id) =>
    isCorrect(map.get(id)!, s.answers[id] ?? []),
  ).length;
  return {
    correct,
    total: s.questionIds.length,
    unanswered: s.questionIds.filter((id) => !s.answers[id]?.length).length,
    passed: s.mode === 'exam' ? correct >= 26 : null,
  };
}

/** Resolve the exact published content used by an attempt. Never rescore legacy data with current keys. */
export function sessionQuestions(
  s: Pick<Session, 'contentRevision'>,
  bank: Question[],
): Question[] {
  return getQuestionBank(s.contentRevision, bank);
}

export function recordTime(s: Session, now = Date.now()): Session {
  if (s.completedAt !== null) return s;
  const end = Math.min(now, s.deadline ?? now);
  const elapsed = Math.max(0, end - s.lastInteractionAt);
  const id = s.questionIds[s.index];
  return {
    ...s,
    responseMs: { ...s.responseMs, [id]: (s.responseMs[id] ?? 0) + elapsed },
    lastInteractionAt: Math.max(s.lastInteractionAt, end),
  };
}
