import { describe, expect, it } from 'vitest';
import pilot from '../../docs/experiments/advanced-interpretation/pilot-v1.json';
import {
  ActiveClock,
  evaluateAnswer,
  summarize,
} from '../../src/experimental/training';

describe('isolated advanced training', () => {
  it('evaluates stable option IDs and rejects invalid submissions', () => {
    const question = pilot.questions[0];
    expect(evaluateAnswer(question, 'p3', 2500)).toEqual({
      questionId: 'exp-ai-001',
      selectedId: 'p3',
      correct: true,
      elapsedMs: 2500,
    });
    expect(evaluateAnswer(question, 'p1', 3000).correct).toBe(false);
    expect(() => evaluateAnswer(question, '', 0)).toThrow();
    expect(() => evaluateAnswer(question, 'missing', 0)).toThrow();
    expect(() => evaluateAnswer(question, 'p3', -1)).toThrow();
  });

  it('summarizes actual attempts without an exam pass prediction', () => {
    expect(summarize([])).toEqual({
      answered: 0,
      correct: 0,
      accuracy: 0,
      totalMs: 0,
    });
    expect(
      summarize([
        { questionId: 'a', selectedId: 'p3', correct: true, elapsedMs: 1200 },
        { questionId: 'b', selectedId: 'p1', correct: false, elapsedMs: 2800 },
      ]),
    ).toEqual({ answered: 2, correct: 1, accuracy: 50, totalMs: 4000 });
  });

  it('counts active monotonic time and excludes pauses, hidden time and feedback', () => {
    const clock = new ActiveClock();
    clock.resume(100);
    expect(clock.elapsed(2600)).toBe(2500);
    clock.pause(3100);
    expect(clock.elapsed(9000)).toBe(3000);
    clock.resume(10000);
    clock.resume(11000); // repeated focus must not lose time
    expect(clock.pause(12000)).toBe(5000);
    expect(clock.pause(14000)).toBe(5000);
    expect(clock.elapsed(16000)).toBe(5000);
  });

  it('does not subtract recorded time when a clock observation reverses', () => {
    const clock = new ActiveClock();
    clock.resume(100);
    expect(clock.elapsed(200)).toBe(100);
    expect(clock.pause(50)).toBe(100);
    clock.resume(300);
    expect(clock.pause(500)).toBe(300);
  });
});
