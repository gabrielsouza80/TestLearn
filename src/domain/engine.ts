import { learningObjectiveLevels } from './objectives';
import {
  CONTENT_REVISION,
  LEGACY_CONTENT_REVISION,
  AUDITED_CONTENT_REVISION,
  BLUEPRINT_CONTENT_REVISION,
  COVERAGE_CONTENT_REVISION,
  BILINGUAL_CONTENT_REVISION,
} from './revision';
import {
  legacyQuestions,
  auditedQuestions,
  blueprintArchivedQuestions,
  coverageArchivedQuestions,
  bilingualArchivedQuestions,
} from '../data/bank-history';
import { auditBlueprint } from './blueprint-audit';
import { z } from 'zod';
// Reject whitespace-only editorial fields without trimming historical content.
const meaningfulText = z.string().regex(/\S/, 'Text must not be blank');
const bilingual = z.object({ en: meaningfulText, pt: meaningfulText });
export const questionSchema = z
  .object({
    id: z.string().min(1),
    chapter: z.number().int().min(1).max(6),
    topic: z.string().min(1),
    lo: z.string().regex(/^FL-[1-6]\.\d\.\d$/),
    level: z.enum(['K1', 'K2', 'K3']),
    type: z.enum(['single', 'multiple', 'scenario', 'table', 'calculation']),
    required: z.number().int().min(1),
    text: bilingual,
    options: z
      .array(
        z.object({
          id: z.string().min(1),
          text: bilingual,
          explanation: bilingual,
        }),
      )
      .min(3),
    correct: z.array(z.string()).min(1),
    explanation: bilingual,
    table: z
      .object({
        headers: z.array(z.string()),
        rows: z.array(z.array(z.string())),
      })
      .optional(),
    review: z.enum(['pending', 'AI_REVIEWED']),
    version: z.number().int().positive(),
    syllabus: z.literal('4.0.1'),
    origin: z.literal('original'),
    translationReview: z.enum(['pending', 'AI_REVIEWED']),
    humanApproval: z.literal('PENDING').optional(),
    examEligible: z.boolean().optional(),
    tags: z.array(z.string()).optional(),
    academicReview: z
      .object({
        method: z.literal('AI_REVIEWED'),
        status: z.enum([
          'PASS',
          'NEEDS_CORRECTION',
          'AMBIGUOUS',
          'INSUFFICIENT_EVIDENCE',
          'BLOCKED',
        ]),
        reviewedAt: z.string(),
        section: z.string(),
        pages: z.array(z.number().int().positive()).min(1),
        report: z.string(),
      })
      .optional(),
  })
  .superRefine((q, ctx) => {
    const ids = q.options.map((o) => o.id);
    if (learningObjectiveLevels[q.lo] !== q.level)
      ctx.addIssue({
        code: 'custom',
        message: 'Unsupported LO or cognitive level',
      });
    if (
      new Set(ids).size !== ids.length ||
      new Set(q.correct).size !== q.correct.length ||
      q.correct.some((id) => !ids.includes(id)) ||
      q.required !== q.correct.length ||
      q.required >= ids.length ||
      (q.type === 'single' && q.required !== 1) ||
      !q.lo.startsWith(`FL-${q.chapter}.`)
    )
      ctx.addIssue({
        code: 'custom',
        message: 'Invalid question identities, chapter or answer cardinality',
      });
    if (
      q.table &&
      q.table.rows.some((r) => r.length !== q.table!.headers.length)
    )
      ctx.addIssue({ code: 'custom', message: 'Invalid table width' });
  });
export type Question = z.infer<typeof questionSchema>;
export function isExamEligible(q: Question): boolean {
  return (
    q.examEligible !== false &&
    q.review === 'AI_REVIEWED' &&
    q.translationReview === 'AI_REVIEWED' &&
    q.academicReview?.status === 'PASS' &&
    q.humanApproval === 'PENDING'
  );
}
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
export function validateBank(bank: unknown): string[] {
  if (!Array.isArray(bank)) return ['Question bank must be an array'];
  const errors: string[] = [];
  const ids = new Set<string>();
  bank.forEach((q, i) => {
    const parsed = questionSchema.safeParse(q);
    if (!parsed.success) errors.push(`Question ${i}: ${parsed.error.message}`);
    else {
      if (ids.has(parsed.data.id))
        errors.push(`Duplicate ID: ${parsed.data.id}`);
      ids.add(parsed.data.id);
    }
  });
  return errors;
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
  if (s.contentRevision === LEGACY_CONTENT_REVISION) return legacyQuestions;
  if (s.contentRevision === AUDITED_CONTENT_REVISION) return auditedQuestions;
  if (s.contentRevision === BLUEPRINT_CONTENT_REVISION)
    return blueprintArchivedQuestions;
  if (s.contentRevision === COVERAGE_CONTENT_REVISION)
    return coverageArchivedQuestions;
  if (s.contentRevision === BILINGUAL_CONTENT_REVISION)
    return bilingualArchivedQuestions;
  if (s.contentRevision === CONTENT_REVISION) return bank;
  throw new Error('Unsupported content revision');
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
