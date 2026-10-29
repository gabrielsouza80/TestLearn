import { auditBlueprint } from '../domain/blueprint-audit';
import {
  isCorrect,
  score,
  sessionQuestions,
  type Question,
  type Session,
} from '../domain/engine';
import { isBlueprintRevision } from '../domain/revision';
export type AnswerStatus = 'correct' | 'incorrect' | 'unanswered';
export const answerStatus = (
  question: Question,
  selected: readonly string[],
): AnswerStatus =>
  !selected.length
    ? 'unanswered'
    : isCorrect(question, [...selected])
      ? 'correct'
      : 'incorrect';
export function presentedOptions(question: Question, order: readonly string[]) {
  if (
    order.length !== question.options.length ||
    new Set(order).size !== order.length
  )
    throw new Error('Invalid presentation order');
  return order.map((id, index) => {
    const option = question.options.find((o) => o.id === id);
    if (!option) throw new Error('Missing historical option');
    return { letter: String.fromCharCode(65 + index), option };
  });
}
export function resultPresentation(session: Session, currentBank: Question[]) {
  const bank = sessionQuestions(session, currentBank),
    map = new Map(bank.map((q) => [q.id, q]));
  const rows = session.questionIds.map((id, index) => {
    const q = map.get(id);
    if (!q) throw new Error('Missing historical question');
    return {
      question: q,
      number: index + 1,
      status: answerStatus(q, session.answers[id] ?? []),
    };
  });
  const scored = score(session, currentBank),
    incorrect = scored.total - scored.correct - scored.unanswered;
  const alignedExam =
    session.mode === 'exam' &&
    session.completedAt !== null &&
    isBlueprintRevision(session.contentRevision) &&
    auditBlueprint(rows.map((row) => row.question)).compliant;
  const elapsedMs =
    session.completedAt !== null &&
    Number.isFinite(session.completedAt) &&
    Number.isFinite(session.startedAt) &&
    session.completedAt >= session.startedAt &&
    (session.deadline === null || session.completedAt <= session.deadline)
      ? session.completedAt - session.startedAt
      : null;
  const limitMinutes =
    session.mode === 'exam' && session.deadline !== null
      ? (session.deadline - session.startedAt) / 60000
      : null;
  return {
    rows,
    ...scored,
    incorrect,
    percentage: (100 * scored.correct) / scored.total,
    alignedExam,
    practicePassed: alignedExam ? scored.passed : null,
    elapsedMs,
    limitMinutes,
  };
}
export const durationText = (ms: number) =>
  `${Math.floor(ms / 60000)
    .toString()
    .padStart(2, '0')}:${Math.floor((ms / 1000) % 60)
    .toString()
    .padStart(2, '0')}`;
