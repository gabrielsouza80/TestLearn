import type { Question } from './engine';
import { shuffle, validateBank, isExamEligible } from './engine';
import { objectiveGroups, auditBlueprint } from './blueprint-audit';

export const chapterBlueprint = [
  { chapter: 1, K1: 2, K2: 6, K3: 0 },
  { chapter: 2, K1: 2, K2: 4, K3: 0 },
  { chapter: 3, K1: 2, K2: 2, K3: 0 },
  { chapter: 4, K1: 0, K2: 6, K3: 5 },
  { chapter: 5, K1: 1, K2: 5, K3: 3 },
  { chapter: 6, K1: 1, K2: 1, K3: 0 },
] as const;
export class BlueprintSelectionError extends Error {
  constructor(
    public readonly code:
      | 'INVALID_POOL'
      | 'INSUFFICIENT_POOL'
      | 'INVALID_SEED'
      | 'INVALID_SELECTION',
    message: string,
    public readonly groupId?: string,
  ) {
    super(message);
    this.name = 'BlueprintSelectionError';
  }
}
// Separate deterministic streams; avalanche mixing avoids adjacent-seed correlations
// for groups offering only two or three candidates. This is not cryptographic RNG.
function seedFor(seed: number, label: string): number {
  let hash = 2166136261;
  for (const c of `${seed}:${label}`)
    hash = Math.imul(hash ^ c.charCodeAt(0), 16777619);
  hash = Math.imul(hash ^ (hash >>> 16), 0x85ebca6b);
  hash = Math.imul(hash ^ (hash >>> 13), 0xc2b2ae35);
  return (hash ^ (hash >>> 16)) >>> 0;
}
/** Select exactly the official LO-group quotas; never pad gaps or fall back to chapter-only sampling. */
export function selectPracticeExam(
  bank: Question[],
  seed = Date.now(),
): Question[] {
  if (!Number.isSafeInteger(seed))
    throw new BlueprintSelectionError(
      'INVALID_SEED',
      'The seed must be a safe integer.',
    );
  const errors = validateBank(bank);
  if (errors.length)
    throw new BlueprintSelectionError(
      'INVALID_POOL',
      `Invalid question pool: ${errors[0]}`,
    );
  const eligible = bank
    .filter(isExamEligible)
    .sort((a, b) => (a.id < b.id ? -1 : a.id > b.id ? 1 : 0));
  const selected: Question[] = [];
  const used = new Set<string>();
  for (const group of objectiveGroups) {
    const byLO = new Map<string, Question[]>();
    for (const q of eligible) {
      if (
        q.level !== group.level ||
        q.chapter !== Number(group.los[0][3]) ||
        !(group.los as readonly string[]).includes(q.lo) ||
        used.has(q.id)
      )
        continue;
      const candidates = byLO.get(q.lo) ?? [];
      candidates.push(q);
      byLO.set(q.lo, candidates);
    }
    const keys = [...byLO.keys()].sort();
    const requiredDistinct = Math.min(group.count, group.los.length);
    if (keys.length < requiredDistinct)
      throw new BlueprintSelectionError(
        'INSUFFICIENT_POOL',
        `Group ${group.id} requires ${requiredDistinct} distinct learning objectives with eligible questions; found ${keys.length}.`,
        group.id,
      );
    const objectives = shuffle(keys, seedFor(seed, group.id)).slice(
      0,
      requiredDistinct,
    );
    const groupQuestions = objectives.map(
      (lo) => shuffle(byLO.get(lo)!, seedFor(seed, `${group.id}/${lo}`))[0],
    );
    // Also supports the table footnote's case with more questions than LOs:
    // cover every required LO once, then fill from unused eligible questions.
    const groupIds = new Set(groupQuestions.map((q) => q.id));
    const extra = shuffle(
      [...byLO.values()].flat().filter((q) => !groupIds.has(q.id)),
      seedFor(seed, `${group.id}/extra`),
    );
    if (groupQuestions.length + extra.length < group.count)
      throw new BlueprintSelectionError(
        'INSUFFICIENT_POOL',
        `Group ${group.id} requires ${group.count} unique eligible questions.`,
        group.id,
      );
    groupQuestions.push(...extra.slice(0, group.count - groupQuestions.length));
    for (const q of groupQuestions) {
      used.add(q.id);
      selected.push(q);
    }
  }
  if (!auditBlueprint(selected).compliant)
    throw new BlueprintSelectionError(
      'INVALID_SELECTION',
      'The selected examination does not satisfy the verified blueprint.',
    );
  return shuffle(selected, seedFor(seed, 'exam-order'));
}
export { learningObjectiveLevels } from './objectives';
