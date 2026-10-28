import { beforeAll } from 'vitest';
import { prepareHistoricalBanks } from '../fixtures/banks';
beforeAll(prepareHistoricalBanks);
import { archivedExam } from '../fixtures/sessions';
import { describe, it, expect } from 'vitest';
import { questions } from '../../src/data/questions';
import reviews from '../../src/data/academic-review.json' with { type: 'json' };
import { legacyQuestions, auditedQuestions } from '../fixtures/banks';
import {
  CONTENT_REVISION,
  LEGACY_CONTENT_REVISION,
} from '../../src/domain/revision';
import { score, sessionQuestions, isCorrect } from '../../src/domain/engine';
import { load, save } from '../../src/storage/store';
import {
  auditBlueprint,
  objectiveGroups,
} from '../../src/domain/blueprint-audit';
const q = (n: number) =>
  questions.find((q) => q.id === `tl-${String(n).padStart(3, '0')}`)!;
const numbers = (value: string) => (value.match(/-?\d+/g) ?? []).map(Number);
describe('academic correction regressions (not human approval)', () => {
  it('keeps 40 traceable AI reviews separate from pending human approval', () => {
    expect(reviews).toHaveLength(40);
    expect(reviews.filter((r) => r.applied !== 'Nenhuma.')).toHaveLength(22);
    expect(
      reviews.filter((r) => r.originalStatus === 'AMBIGUOUS').map((r) => r.id),
    ).toEqual(['tl-003']);
    for (const question of auditedQuestions.filter((q) =>
      reviews.some((r) => r.id === q.id),
    )) {
      const r = reviews.find((r) => r.id === question.id)!;
      expect(question.humanApproval).toBe('PENDING');
      expect(question.review).toBe('AI_REVIEWED');
      expect(question.academicReview?.section).toBe(r.section);
      expect(question.version).toBe(r.originalStatus === 'PASS' ? 1 : 2);
      expect(r.lo).toBe(question.lo);
      expect(r.level).toBe(question.level);
    }
  });
  it('removes reproduction as an exclusively testing distractor in tl-003', () => {
    expect(q(3).options[1].text.en).toBe(
      'Compare the actual and expected results while executing a new test',
    );
    expect(q(3).options[1].explanation.en).toContain(
      'can also be part of debugging',
    );
    expect(q(3).correct).toEqual(['o1']);
    expect(q(22).options[0].text.pt).toBe('Antecipação de erros');
  });
  it('independently solves the equivalence partitions, including both invalid partitions', () => {
    const solutions = q(25)
      .options.filter(
        (o) =>
          new Set(
            numbers(o.text.en).map((n) =>
              n < 3 ? 'low' : n > 8 ? 'high' : 'valid',
            ),
          ).size === 3,
      )
      .map((o) => o.id);
    expect(solutions).toEqual(q(25).correct);
  });
  it('distinguishes 2-value coverage from 3-value coverage for all finite partition boundaries', () => {
    const two = [9, 10, 20, 21];
    const three = [...new Set(two.flatMap((n) => [n - 1, n, n + 1]))].sort(
      (a, b) => a - b,
    );
    expect(three).toEqual([8, 9, 10, 11, 19, 20, 21, 22]);
    expect(
      q(26)
        .options.filter(
          (o) => JSON.stringify(numbers(o.text.en)) === JSON.stringify(two),
        )
        .map((o) => o.id),
    ).toEqual(q(26).correct);
    expect(q(26).text.en).toContain('all other integers are rejected');
  });
  it('solves the decision table and validates its conventional column structure', () => {
    const table = q(27).table!;
    expect(table.headers.slice(1)).toEqual(['R1', 'R2', 'R3', 'R4']);
    for (let column = 1; column <= 4; column++)
      expect(table.rows[2][column] === 'X').toBe(
        table.rows[0][column] === 'T' && table.rows[1][column] === 'T',
      );
    const solutions = q(27)
      .options.filter(
        (o) => o.text.en.includes('yes') && numbers(o.text.en)[0] >= 50,
      )
      .map((o) => o.id);
    expect(solutions).toEqual(q(27).correct);
  });
  it('executes every offered state-transition sequence using only specified transitions', () => {
    const transitions: Record<string, string> = {
      'Draft:Submit': 'Pending',
      'Pending:Pay': 'Paid',
    };
    const solutions = q(28)
      .options.filter((o) => {
        let state = 'Draft';
        for (const event of o.text.en.split(', '))
          state = transitions[`${state}:${event}`] ?? 'INVALID';
        return state === 'Paid';
      })
      .map((o) => o.id);
    expect(solutions).toEqual(q(28).correct);
    expect(q(28).text.en).toContain(
      'All other event/state combinations are invalid',
    );
  });
  it('derives ATDD expected results on both sides of the inclusive threshold', () => {
    const solutions = q(29)
      .options.filter((o) => {
        const [a, expectedA, b, expectedB] = numbers(o.text.en);
        return (
          a === 49 &&
          b === 50 &&
          expectedA === (a < 50 ? 5 : 0) &&
          expectedB === (b < 50 ? 5 : 0)
        );
      })
      .map((o) => o.id);
    expect(solutions).toEqual(q(29).correct);
  });
  it('uses asymmetric estimates so a wrong unweighted mean is detectable', () => {
    const weighted = (2 + 4 * 5 + 14) / 6;
    const unweighted = (2 + 5 + 14) / 3;
    expect(weighted).toBe(6);
    expect(unweighted).toBe(7);
    expect(q(36).text.en).toContain('2, 5 and 14 person-hours');
    expect(
      q(36)
        .options.filter((o) => numbers(o.text.en)[0] === weighted)
        .map((o) => o.id),
    ).toEqual(q(36).correct);
  });
  it('applies priority only to executable tests while respecting dependencies', () => {
    const rank: Record<string, number> = { A: 3, B: 2, C: 1 };
    const done: string[] = [];
    while (done.length < 3) {
      const ready = Object.keys(rank).filter(
        (id) => !done.includes(id) && (id !== 'A' || done.includes('C')),
      );
      ready.sort((a, b) => rank[b] - rank[a]);
      done.push(ready[0]);
    }
    expect(done).toEqual(['B', 'C', 'A']);
    expect(q(37).options.find((o) => isCorrect(q(37), [o.id]))?.text.en).toBe(
      done.join(', '),
    );
  });
  it('records the observed environment, expected response and actual response in the prepared report', () => {
    expect(q(38).text.en).toContain('observed result is HTTP 500');
    expect(q(38).options[0].text.en).toContain('QA / build 82');
    expect(q(38).options[0].text.en).toContain(
      'expected: 201 and invoice ID; actual: 500',
    );
    expect(q(38).options[1].text.en).toContain('expected: 500');
    expect(q(38).options[2].text.en).toContain('Production / build 81');
  });
});
describe('assessment integrity across content revisions', () => {
  it('restores old active and completed attempts without changing any saved fields', () => {
    const old = {
      ...archivedExam(legacyQuestions, LEGACY_CONTENT_REVISION, 1000, 42),
      contentRevision: LEGACY_CONTENT_REVISION,
      answers: { 'tl-036': ['o1'] },
    };
    expect(save({ version: 1, active: old, history: [] })).toBe(true);
    expect(load().state.active).toEqual(old);
    const done = { ...old, completedAt: 2000, lastInteractionAt: 2000 };
    expect(save({ version: 1, active: null, history: [done] })).toBe(true);
    expect(load().state.history[0]).toEqual(done);
    expect(
      sessionQuestions(done, questions).find((q) => q.id === 'tl-036')
        ?.options[0].text.en,
    ).toBe('5 hours');
    expect(q(36).options[0].text.en).toBe('6 person-hours');
  });
  it('scores legacy keys even if the supplied current bank changes an answer', () => {
    const old = {
      ...archivedExam(legacyQuestions, LEGACY_CONTENT_REVISION, 1000, 42),
      contentRevision: LEGACY_CONTENT_REVISION,
      answers: { 'tl-036': ['o1'] },
    };
    const altered = questions.map((q) =>
      q.id === 'tl-036' ? { ...q, correct: ['o2'] } : q,
    );
    expect(score(old, altered).correct).toBe(1);
    expect(
      score({ ...old, contentRevision: CONTENT_REVISION }, altered).correct,
    ).toBe(0);
    expect(() =>
      sessionQuestions({ ...old, contentRevision: 'unknown' }, questions),
    ).toThrow();
  });
  it('detects exact LO-group gaps despite correct chapter and K-level totals', () => {
    expect(objectiveGroups.reduce((n, g) => n + g.count, 0)).toBe(40);
    const audit = auditBlueprint(auditedQuestions);
    expect(audit.compliant).toBe(false);
    expect(audit.groups.filter((g) => !g.compliant).map((g) => g.id)).toEqual([
      '1-k1-foundations',
      '1-k1-whole-team',
      '1-k2-foundations',
      '1-k2-activities',
      '2-k2-change',
      '2-k2-lifecycle',
      '5-k2-planning',
      '5-k2-quadrants',
      '5-k2-risk',
      '5-k2-reports',
    ]);
    expect(audit.groups.find((g) => g.id === '4-k3')?.compliant).toBe(true);
  });
  it('detects duplicate objectives within an otherwise correctly sized K3 group', () => {
    const duplicate = auditedQuestions.map((q) =>
      q.id === 'tl-029' ? { ...q, lo: 'FL-4.2.1' } : q,
    );
    expect(
      auditBlueprint(duplicate).groups.find((g) => g.id === '4-k3')?.compliant,
    ).toBe(false);
  });
});
