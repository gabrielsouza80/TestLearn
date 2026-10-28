import { examQuestions } from '../fixtures/sessions';
import { expect, it } from 'vitest';
import { createSession } from '../../src/domain/engine';
import { distinctViewed, repeatedViewed } from '../../src/domain/progress';
it('does not count unvisited selected questions as seen or repeated', () => {
  const a = createSession(examQuestions, 'exam', 60, 1000);
  expect(distinctViewed([a]).size).toBe(1);
  const b = {
    ...createSession(examQuestions, 'exam', 60, 2000),
    visitedIds: [examQuestions[0].id, examQuestions[1].id],
  };
  expect(repeatedViewed(b, [a])).toBe(1);
  expect(distinctViewed([a, b]).size).toBe(2);
  expect(distinctViewed([]).size).toBe(0);
});
