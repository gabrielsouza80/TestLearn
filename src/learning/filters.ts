import type { Question } from '../domain/engine';
import { naturalObjectiveOrder } from '../reference/objectives';
export interface PracticeFilters {
  chapter: string;
  topic: string;
  lo: string;
  level: string;
}
export function updatePracticeFilters(
  current: PracticeFilters,
  change: Partial<PracticeFilters>,
  bank: Question[],
): PracticeFilters {
  const next = { ...current, ...change };
  if (change.chapter !== undefined) {
    next.topic = '';
    next.lo = '';
  }
  if (change.topic !== undefined) next.lo = '';
  const chapterPool = bank.filter(
    (q) => !next.chapter || q.chapter === Number(next.chapter),
  );
  if (next.topic && !chapterPool.some((q) => q.topic === next.topic))
    next.topic = '';
  if (change.level !== undefined) {
    if (
      next.topic &&
      !chapterPool.some(
        (q) =>
          q.topic === next.topic && (!next.level || q.level === next.level),
      )
    )
      next.topic = '';
    if (
      next.lo &&
      !chapterPool.some(
        (q) => q.lo === next.lo && (!next.level || q.level === next.level),
      )
    )
      next.lo = '';
  }
  const topicPool = chapterPool.filter(
    (q) => !next.topic || q.topic === next.topic,
  );
  if (next.lo && !topicPool.some((q) => q.lo === next.lo)) next.lo = '';
  if (
    next.level &&
    !topicPool.some(
      (q) => (!next.lo || q.lo === next.lo) && q.level === next.level,
    )
  )
    next.level = '';
  return next;
}
export function filterGroups(bank: Question[], filters: PracticeFilters) {
  return [1, 2, 3, 4, 5, 6]
    .filter(
      (chapter) => !filters.chapter || chapter === Number(filters.chapter),
    )
    .map((chapter) => {
      const pool = bank
        .filter((q) => q.chapter === chapter)
        .sort((a, b) => naturalObjectiveOrder(a.lo, b.lo));
      return {
        chapter,
        topics: [...new Set(pool.map((q) => q.topic))],
        objectives: [
          ...new Set(
            pool
              .filter(
                (q) =>
                  (!filters.topic || q.topic === filters.topic) &&
                  (!filters.level || q.level === filters.level),
              )
              .map((q) => q.lo),
          ),
        ],
      };
    });
}
import type { Localized } from '../i18n';
export const historyDescriptions: Record<string, Localized> = {
  all: {
    pt: 'Todas as questões elegíveis do banco atual, independentemente do histórico.',
    en: 'All eligible questions in the current bank, regardless of history.',
  },
  incorrect: {
    pt: 'IDs com pelo menos uma resposta errada, parcial ou em branco em sessões concluídas, mesmo que tenha acertado depois.',
    en: 'IDs with at least one wrong, partial or blank response in completed sessions, even if answered correctly later.',
  },
  unanswered: {
    pt: 'IDs deixados em branco em pelo menos uma sessão concluída, incluindo questões não abertas; não significa que nunca tenham sido vistas.',
    en: 'IDs left blank in at least one completed session, including questions not opened; this does not mean they have never been seen.',
  },
  unseen: {
    pt: 'IDs sem visita registada em sessões concluídas. Usa as questões efetivamente abertas, não apenas incluídas num exame.',
    en: 'IDs with no recorded visit in completed sessions. Uses questions actually opened, not merely included in an exam.',
  },
};
