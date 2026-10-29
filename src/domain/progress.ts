import type { Session } from './engine';
export const distinctViewed = (sessions: Session[]) =>
  new Set(sessions.flatMap((s) => s.visitedIds));
export const repeatedViewed = (session: Session, previous: Session[]) => {
  const seen = distinctViewed(previous);
  return session.visitedIds.filter((id) => seen.has(id)).length;
};
