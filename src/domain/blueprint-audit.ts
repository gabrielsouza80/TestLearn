import type { Question } from './engine';
// Transcribed from the local ISTQB Exam Structures & Rules Tables v1.19,
// PDF pp. 4–5, including the LO-group footnote on p. 1. Not editorial approval.
export const objectiveGroups = [
  {
    id: '1-k1-foundations',
    level: 'K1',
    count: 1,
    los: ['FL-1.1.1', 'FL-1.2.2'],
  },
  { id: '1-k1-whole-team', level: 'K1', count: 1, los: ['FL-1.5.2'] },
  {
    id: '1-k2-foundations',
    level: 'K2',
    count: 1,
    los: ['FL-1.1.2', 'FL-1.2.1', 'FL-1.2.3'],
  },
  { id: '1-k2-principles', level: 'K2', count: 1, los: ['FL-1.3.1'] },
  {
    id: '1-k2-activities',
    level: 'K2',
    count: 3,
    los: ['FL-1.4.1', 'FL-1.4.2', 'FL-1.4.3', 'FL-1.4.4', 'FL-1.4.5'],
  },
  { id: '1-k2-skills', level: 'K2', count: 1, los: ['FL-1.5.1', 'FL-1.5.3'] },
  { id: '2-k1-practices', level: 'K1', count: 1, los: ['FL-2.1.2'] },
  { id: '2-k1-test-first', level: 'K1', count: 1, los: ['FL-2.1.3'] },
  {
    id: '2-k2-levels-types',
    level: 'K2',
    count: 1,
    los: ['FL-2.2.1', 'FL-2.2.2'],
  },
  { id: '2-k2-change', level: 'K2', count: 1, los: ['FL-2.2.3', 'FL-2.3.1'] },
  {
    id: '2-k2-lifecycle',
    level: 'K2',
    count: 1,
    los: ['FL-2.1.1', 'FL-2.1.6'],
  },
  {
    id: '2-k2-devops-shift',
    level: 'K2',
    count: 1,
    los: ['FL-2.1.4', 'FL-2.1.5'],
  },
  {
    id: '3-k1',
    level: 'K1',
    count: 2,
    los: ['FL-3.1.1', 'FL-3.2.1', 'FL-3.2.3', 'FL-3.2.5'],
  },
  { id: '3-k2-static', level: 'K2', count: 1, los: ['FL-3.1.2', 'FL-3.1.3'] },
  { id: '3-k2-reviews', level: 'K2', count: 1, los: ['FL-3.2.2', 'FL-3.2.4'] },
  { id: '4-k2-families', level: 'K2', count: 1, los: ['FL-4.1.1'] },
  {
    id: '4-k2-whitebox',
    level: 'K2',
    count: 2,
    los: ['FL-4.3.1', 'FL-4.3.2', 'FL-4.3.3'],
  },
  {
    id: '4-k2-experience',
    level: 'K2',
    count: 2,
    los: ['FL-4.4.1', 'FL-4.4.2', 'FL-4.4.3'],
  },
  {
    id: '4-k2-collaboration',
    level: 'K2',
    count: 1,
    los: ['FL-4.5.1', 'FL-4.5.2'],
  },
  {
    id: '4-k3',
    level: 'K3',
    count: 5,
    los: ['FL-4.2.1', 'FL-4.2.2', 'FL-4.2.3', 'FL-4.2.4', 'FL-4.5.3'],
  },
  {
    id: '5-k1',
    level: 'K1',
    count: 1,
    los: ['FL-5.1.2', 'FL-5.1.6', 'FL-5.2.1', 'FL-5.3.1'],
  },
  { id: '5-k2-planning', level: 'K2', count: 1, los: ['FL-5.1.1', 'FL-5.1.3'] },
  { id: '5-k2-quadrants', level: 'K2', count: 1, los: ['FL-5.1.7'] },
  {
    id: '5-k2-risk',
    level: 'K2',
    count: 1,
    los: ['FL-5.2.2', 'FL-5.2.3', 'FL-5.2.4'],
  },
  { id: '5-k2-reports', level: 'K2', count: 1, los: ['FL-5.3.2', 'FL-5.3.3'] },
  { id: '5-k2-configuration', level: 'K2', count: 1, los: ['FL-5.4.1'] },
  {
    id: '5-k3',
    level: 'K3',
    count: 3,
    los: ['FL-5.1.4', 'FL-5.1.5', 'FL-5.5.1'],
  },
  { id: '6-k2-tools', level: 'K2', count: 1, los: ['FL-6.1.1'] },
  { id: '6-k1-automation', level: 'K1', count: 1, los: ['FL-6.2.1'] },
] as const;
export function auditBlueprint(bank: Question[]) {
  const groups = objectiveGroups.map((group) => {
    const selected = bank.filter(
      (q) =>
        q.level === group.level &&
        (group.los as readonly string[]).includes(q.lo),
    );
    const distinct = new Set(selected.map((q) => q.lo)).size;
    return {
      id: group.id,
      expected: group.count,
      actual: selected.length,
      distinct,
      compliant:
        selected.length === group.count &&
        distinct >= Math.min(group.count, group.los.length),
    };
  });
  const known = bank.every((q) =>
    objectiveGroups.some(
      (g) =>
        g.level === q.level &&
        q.chapter === Number(g.los[0][3]) &&
        (g.los as readonly string[]).includes(q.lo),
    ),
  );
  return {
    groups,
    compliant:
      bank.length === 40 &&
      new Set(bank.map((q) => q.id)).size === 40 &&
      known &&
      groups.every((g) => g.compliant),
  };
}
