import type { Session } from './engine';
export const distinctViewed = (sessions: Session[]) =>
  new Set(sessions.flatMap((s) => s.visitedIds));
export const repeatedViewed = (session: Session, previous: Session[]) =>
  session.visitedIds.filter((id) => distinctViewed(previous).has(id)).length;
