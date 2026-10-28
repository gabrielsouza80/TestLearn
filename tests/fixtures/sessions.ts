import { questions } from '../../src/data/questions';
import { selectPracticeExam } from '../../src/domain/blueprint';
import {
  createSession,
  type Question,
  type Session,
} from '../../src/domain/engine';
// Keep the multiple-answer item available in tests that explicitly exercise it.
// Sorting only makes navigation fixtures readable; generator randomization is tested separately.
export const examQuestions = selectPracticeExam(
  questions.filter((q) => q.id !== 'tl-002'),
  42,
).sort((a, b) => a.id.localeCompare(b.id));
// Old saved attempts predate strict generation. Build the actual historical shape,
// instead of using today's validated exam factory to fabricate an old blueprint.
export function archivedExam(
  bank: Question[],
  revision: string,
  now = 1000,
  seed = 42,
  minutes = 60,
): Session {
  return {
    ...createSession(bank, 'practice', 0, now, seed),
    mode: 'exam',
    contentRevision: revision,
    deadline: now + minutes * 60000,
  };
}
