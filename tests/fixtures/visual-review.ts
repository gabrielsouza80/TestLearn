import { questions } from '../../src/data/questions';
import { createSession, answer, finish } from '../../src/domain/engine';
import { selectPracticeExam } from '../../src/domain/blueprint';

export const visualNow = Date.parse('2026-10-30T12:00:00Z');
export function visualExam() {
  const bank = selectPracticeExam(questions, 42);
  let session = createSession(bank, 'exam', 60, visualNow - 360000, 42);
  session.optionOrder = Object.fromEntries(
    bank.map((q) => [q.id, q.options.map((o) => o.id).reverse()]),
  );
  for (const [index, q] of bank.entries()) {
    if (index < 35)
      session = answer(
        session,
        q.id,
        index < 26
          ? q.correct
          : q.options
              .filter((o) => !q.correct.includes(o.id))
              .slice(0, q.required)
              .map((o) => o.id),
        session.startedAt + 1000,
      );
  }
  return finish(
    { ...session, visitedIds: session.questionIds },
    visualNow - 60000,
  );
}
export function visualPractice() {
  const bank = ['tl-083', 'tl-090', 'tl-089'].map((id) =>
    questions.find((q) => q.id === id)!,
  );
  let session = createSession(bank, 'practice', 0, visualNow - 20000, 42);
  session.optionOrder = Object.fromEntries(
    bank.map((q) => [q.id, q.options.map((o) => o.id).reverse()]),
  );
  session = answer(session, bank[0].id, ['o1', 'o2'], visualNow - 19000);
  session = answer(session, bank[2].id, bank[2].correct, visualNow - 18000);
  return finish(
    { ...session, visitedIds: session.questionIds },
    visualNow - 10000,
  );
}
