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
it('counts distinct previous visits faithfully across a large history without mutating attempts', () => {
  const session = createSession(examQuestions, 'exam', 60, 1000);
  const previous = Array.from({ length: 500 }, (_, index) => ({
    ...session,
    id: `history-${index}`,
    visitedIds: session.questionIds.slice(0, 20),
  }));
  const before = JSON.stringify(previous);
  expect(
    repeatedViewed({ ...session, visitedIds: session.questionIds }, previous),
  ).toBe(20);
  expect(JSON.stringify(previous)).toBe(before);
});
