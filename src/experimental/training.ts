// Development training domain. Never use the published exam/persistence contracts.
import type { Localized } from '../i18n';
export interface PilotQuestion {
  id: string;
  learningObjective: string;
  cognitiveLevel: string;
  interpretationDifficulty: string;
  prompt: Localized;
  options: { id: string; text: Localized; explanation: Localized }[];
  correct: string[];
  readingStrategy: string;
  reference: { section: string; pdfPages: number[] };
  timeTargetSeconds: { total: number };
}
export interface Attempt {
  questionId: string;
  selectedId: string;
  correct: boolean;
  elapsedMs: number;
}
export function evaluateAnswer(
  q: PilotQuestion,
  id: string,
  ms: number,
): Attempt {
  if (!q.options.some((o) => o.id === id) || !Number.isFinite(ms) || ms < 0)
    throw new Error('Invalid training submission');
  return {
    questionId: q.id,
    selectedId: id,
    correct: q.correct.includes(id),
    elapsedMs: ms,
  };
}
export function summarize(attempts: Attempt[]) {
  const correct = attempts.filter((a) => a.correct).length;
  return {
    answered: attempts.length,
    correct,
    accuracy: attempts.length
      ? Math.round((100 * correct) / attempts.length)
      : 0,
    totalMs: attempts.reduce((sum, a) => sum + a.elapsedMs, 0),
  };
}
export class ActiveClock {
  private total = 0;
  private started: number | null = null;
  private last = 0;
  resume(now: number) {
    if (this.started !== null) return;
    this.started = now;
    this.last = now;
  }
  pause(now: number) {
    this.total = this.elapsed(now);
    this.started = null;
    return this.total;
  }
  elapsed(now: number) {
    if (this.started === null) return this.total;
    this.last = Math.max(this.last, now);
    return this.total + this.last - this.started;
  }
}
