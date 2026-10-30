import {
  isCorrect,
  sessionQuestions,
  type Question,
  type Session,
} from './engine';
import { CONTENT_REVISION } from './revision';
export const STUDY_MINIMUM = 5;
interface Observation {
  session: Session;
  viewed: boolean;
  answered: boolean;
  correct: boolean;
}
export function learningProgress(history: Session[], currentBank: Question[]) {
  const completed = [
    ...new Map(
      history.filter((s) => s.completedAt !== null).map((s) => [s.id, s]),
    ).values(),
  ];
  const viewed = new Set<string>();
  let visits = 0,
    correct = 0,
    answered = 0,
    unanswered = 0;
  const records = new Map<string, Observation[]>();
  const otherRevisionExposure = new Set<string>();
  for (const session of completed) {
    const bank = new Map(
      sessionQuestions(session, currentBank).map((q) => [q.id, q]),
    );
    const seen = new Set(session.visitedIds);
    visits += seen.size;
    for (const id of seen) viewed.add(id);
    for (const id of session.questionIds) {
      const selected = session.answers[id] ?? [],
        hasAnswer = selected.length > 0,
        right = isCorrect(bank.get(id)!, selected);
      if (hasAnswer) {
        answered++;
        if (right) correct++;
      } else unanswered++;
      // A prior exposure in another revision is not evidence of a fresh current item.
      if (
        session.contentRevision !== CONTENT_REVISION &&
        (seen.has(id) || hasAnswer)
      )
        otherRevisionExposure.add(id);
      // Different academic revisions must not be compared as current-bank competence.
      if (
        session.contentRevision !== CONTENT_REVISION ||
        (!seen.has(id) && !hasAnswer)
      )
        continue;
      const rows = records.get(id) ?? [];
      rows.push({
        session,
        viewed: seen.has(id),
        answered: hasAnswer,
        correct: right,
      });
      records.set(id, rows);
    }
  }
  const chapters = [1, 2, 3, 4, 5, 6].map((chapter) => ({
    chapter,
    available: currentBank.filter((q) => q.chapter === chapter).length,
    uniqueAnswered: 0,
    firstAnswered: 0,
    firstCorrect: 0,
    repeatAnswered: 0,
    repeatCorrect: 0,
    unknownAnswered: 0,
  }));
  for (const q of currentBank) {
    const rows = (records.get(q.id) ?? []).sort(
      (a, b) =>
        a.session.startedAt - b.session.startedAt ||
        a.session.id.localeCompare(b.session.id),
    );
    const chapter = chapters[q.chapter - 1];
    if (rows.some((r) => r.answered)) chapter.uniqueAnswered++;
    const first = rows[0];
    const firstOrdered =
      first &&
      !otherRevisionExposure.has(q.id) &&
      (!rows[1] ||
        (first.session.startedAt < rows[1].session.startedAt &&
          first.session.completedAt! <= rows[1].session.startedAt));
    let earliestVisitedEnd = Infinity,
      priorGroupEnd = Infinity,
      groupStart = NaN;
    for (const row of rows) {
      if (row.session.startedAt !== groupStart) {
        priorGroupEnd = earliestVisitedEnd;
        groupStart = row.session.startedAt;
      }
      if (row.answered) {
        if (row.viewed && priorGroupEnd <= row.session.startedAt) {
          chapter.repeatAnswered++;
          if (row.correct) chapter.repeatCorrect++;
        } else if (row === first && row.viewed && firstOrdered) {
          chapter.firstAnswered++;
          if (row.correct) chapter.firstCorrect++;
        } else chapter.unknownAnswered++;
      }
      if (row.viewed)
        earliestVisitedEnd = Math.min(
          earliestVisitedEnd,
          row.session.completedAt!,
        );
    }
  }
  return {
    completed: completed.length,
    viewed: viewed.size,
    visits,
    firstExposure: viewed.size,
    repeatedVisits: visits - viewed.size,
    correct,
    answered,
    incorrect: answered - correct,
    unanswered,
    chapters,
    enoughEvidence: chapters.some((c) => c.firstAnswered >= STUDY_MINIMUM),
    priorities: chapters.filter(
      (c) =>
        c.firstAnswered >= STUDY_MINIMUM &&
        c.firstAnswered - c.firstCorrect >= 2,
    ),
  };
}
