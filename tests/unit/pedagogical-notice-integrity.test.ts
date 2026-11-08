import { createHash } from 'node:crypto';
import { readFileSync } from 'node:fs';
import { expect, it } from 'vitest';
import { questions } from '../../src/data/questions';
import { CONTENT_REVISION } from '../../src/domain/revision';
import frozen from '../fixtures/pedagogical-notice-integrity.json';

function canonical(value: unknown): unknown {
  if (Array.isArray(value)) return value.map(canonical);
  if (value && typeof value === 'object')
    return Object.fromEntries(
      Object.entries(value)
        .sort(([a], [b]) => (a < b ? -1 : a > b ? 1 : 0))
        .map(([key, item]) => [key, canonical(item)]),
    );
  return value;
}
function checkBank(candidate: unknown) {
  const hash = createHash('sha256')
    .update(JSON.stringify(canonical(candidate)))
    .digest('hex');
  if (hash !== frozen.bankCanonicalSHA256)
    throw new Error('Bank differs from authenticated reconciliation');
}

it('preserves all 90 complete objects, keys, explanations, approval states and revision', () => {
  checkBank(questions);
  expect(questions).toHaveLength(90);
  expect(new Set(questions.map((q) => q.id)).size).toBe(90);
  expect(questions.reduce((total, q) => total + q.options.length, 0)).toBe(364);
  expect(new Set(questions.map((q) => q.lo)).size).toBe(64);
  expect(CONTENT_REVISION).toBe('2026-10-27.10');
  expect(questions.every((q) => q.humanApproval === 'PENDING')).toBe(true);
  expect(questions.find((q) => q.id === 'tl-038')!.correct).toEqual(['o1']);
});

it.each(Object.entries(frozen.archives))(
  'preserves historical bytes: %s',
  (path, expected) => {
    expect(createHash('sha256').update(readFileSync(path)).digest('hex')).toBe(
      expected,
    );
  },
);

it.each(['tl-038', 'tl-002'])(
  'rejects a synthetic full-object change to %s against the fixed reference',
  (id) => {
    const copy = structuredClone(questions);
    copy.find((q) => q.id === id)!.text.pt += ' adulterado';
    expect(() => checkBank(copy)).toThrow('Bank differs');
    checkBank(questions);
  },
);

it('rejects a key change and a fictitious human approval without changing the reference', () => {
  const key = structuredClone(questions);
  key.find((q) => q.id === 'tl-038')!.correct = ['o2'];
  expect(() => checkBank(key)).toThrow('Bank differs');
  const approval = structuredClone(questions);
  Object.assign(approval[0], { humanApproval: 'HUMAN_APPROVED' });
  expect(() => checkBank(approval)).toThrow('Bank differs');
});
