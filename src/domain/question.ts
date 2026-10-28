import { learningObjectiveLevels } from './objectives';
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
