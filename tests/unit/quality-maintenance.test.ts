import { beforeAll, describe, expect, it } from 'vitest';
import { createHash } from 'node:crypto';
import { readFileSync } from 'node:fs';
// Pin the Phase 5B content contract to its immutable published revision.
import { qualityArchivedQuestions as questions } from '../fixtures/banks';
import {
  variabilityArchivedQuestions as frozen,
  prepareHistoricalBanks,
} from '../fixtures/banks';
import { selectPracticeExam } from '../../src/domain/blueprint';
import {
  answer,
  createSession,
  finish,
  isCorrect,
  remaining,
  score,
  sessionQuestions,
  validateBank,
} from '../../src/domain/engine';
import {
  CONTENT_REVISION,
  VARIABILITY_CONTENT_REVISION,
  isBlueprintRevision,
} from '../../src/domain/revision';
import { load, loadAsync, save } from '../../src/storage/store';
const targets = Array.from(
  { length: 39 },
  (_, i) => `tl-${String(i + 2).padStart(3, '0')}`,
);
const q = (id: number) =>
  questions.find((q) => q.id === `tl-${String(id).padStart(3, '0')}`)!;
const numbers = (text: string) =>
  (text.match(/-?\d+(?:\.\d+)?/g) ?? []).map(Number);
beforeAll(prepareHistoricalBanks);
describe('phase 5B controlled academic maintenance', () => {
  it('changes precisely 39 items and preserves the other 43 deeply, including every key and all mappings', () => {
    expect(questions.map((q) => q.id)).toEqual(frozen.map((q) => q.id));
    expect(questions).toHaveLength(82);
    expect(new Set(questions.map((q) => q.lo)).size).toBe(64);
    expect(
      questions
        .filter((q, i) => JSON.stringify(q) !== JSON.stringify(frozen[i]))
        .map((q) => q.id),
    ).toEqual(targets);
    expect(
      frozen.filter((q) => q.options.length === 3).map((q) => q.id),
    ).toEqual(targets);
    for (const [i, current] of questions.entries()) {
      const old = frozen[i];
      for (const field of [
        'id',
        'lo',
        'level',
        'chapter',
        'topic',
        'type',
        'required',
        'correct',
        'table',
        'origin',
        'syllabus',
        'review',
        'translationReview',
      ] as const)
        expect(current[field], `${current.id}/${field}`).toEqual(old[field]);
      if (!targets.includes(current.id)) {
        expect(current).toEqual(old);
        continue;
      }
      expect(current.options.map((o) => o.id)).toEqual([
        ...old.options.map((o) => o.id),
        'o4',
      ]);
      expect(current.version).toBe(old.version + 1);
      expect(current.options).toHaveLength(4);
      expect(current.humanApproval).toBe('PENDING');
      expect(current.academicReview).toEqual({
        ...old.academicReview,
        reviewedAt: '2026-10-28',
        report: `docs/academic-audit.md#fase-5b--${current.id}`,
      });
    }
    expect(questions.every((q) => q.options.length === 4)).toBe(true);
    expect(validateBank(questions)).toEqual([]);
    expect(CONTENT_REVISION).toBe('2026-10-27.9');
    expect(VARIABILITY_CONTENT_REVISION).toBe('2026-10-27.6');
    expect(isBlueprintRevision(VARIABILITY_CONTENT_REVISION)).toBe(true);
  });
  it('has complete bilingual explanations and preserves numeric values in all 390 edited text pairs', () => {
    let pairs = 0;
    for (const current of questions.filter((q) => targets.includes(q.id))) {
      for (const pair of [
        current.text,
        current.explanation,
        ...current.options.flatMap((o) => [o.text, o.explanation]),
      ]) {
        expect(pair.en.trim(), current.id).not.toBe('');
        expect(pair.pt.trim(), current.id).not.toBe('');
        expect(numbers(pair.en), `${current.id}: ${pair.en}`).toEqual(
          numbers(pair.pt),
        );
        pairs++;
      }
      expect(
        current.correct.every((id) => current.options.some((o) => o.id === id)),
      ).toBe(true);
      expect(new Set(current.options.map((o) => o.id)).size).toBe(4);
    }
    expect(pairs).toBe(390);
  });
  it('pins all six immutable archive hashes and validates the complete .6 bank', () => {
    const hashes = [
      'b5f44fc33cfd55b8e7aea1fceff7348c32857580f04ef493156107788d5717f5',
      '982e73ec30706a5e8cca992b80f9157d18cda2d3e77791b32430a804c3574cbb',
      'cc70ebf8768c1236fcb89099d88ad275600d542078c1531c1195fe43f2f96d38',
      '413e93605f8026e7a633f92c512c0f93b2a466867e4a1d4d3752dbd03ee1f104',
      'c57da2c300f58dd5714a8c54746b9e1cd404b8134347c3b13123e83b97823a79',
      '8bf1990ee8eb05f93eec529fe903a05db20ad72a649648f161f2847802c6012e',
    ];
    for (const [i, hash] of hashes.entries()) {
      const raw = readFileSync(
        `src/data/archive/questions-2026-10-27.${i + 1}.json`,
      );
      expect(createHash('sha256').update(raw).digest('hex')).toBe(hash);
      expect(validateBank(JSON.parse(raw.toString()))).toEqual([]);
    }
    expect(frozen).toHaveLength(82);
  });
  it('keeps stable keys and exact cardinality through different option orders', () => {
    for (const current of questions) {
      const orders = new Set<string>();
      for (let seed = 0; seed < 8; seed++) {
        const session = createSession([current], 'practice', 0, 1000, seed);
        const order = session.optionOrder[current.id];
        orders.add(order.join(','));
        expect([...order].sort()).toEqual(
          current.options.map((o) => o.id).sort(),
        );
        const correct = order.filter((id) => current.correct.includes(id));
        expect(isCorrect(current, correct)).toBe(true);
        expect(
          score(answer(session, current.id, correct, 1000), questions).correct,
        ).toBe(1);
        expect(
          isCorrect(current, [
            ...correct,
            current.options.find((o) => !current.correct.includes(o.id))!.id,
          ]),
        ).toBe(false);
      }
      expect(orders.size).toBeGreaterThan(1);
    }
    expect(isCorrect(q(1), ['o1'])).toBe(false);
    expect(isCorrect(q(1), ['o4', 'o1'])).toBe(true);
  });
  it('independently derives unique results for EP, BVA, decision rules, states, ATDD and estimation', () => {
    const solve = (id: number, accept: (text: string) => boolean) =>
      expect(
        q(id)
          .options.filter((o) => accept(o.text.en))
          .map((o) => o.id),
      ).toEqual(q(id).correct);
    solve(
      25,
      (text) =>
        new Set(
          numbers(text).map((n) => (n < 3 ? 'low' : n > 8 ? 'high' : 'valid')),
        ).size === 3,
    );
    solve(26, (text) =>
      [9, 10, 20, 21].every((n) => numbers(text).includes(n)),
    );
    solve(27, (text) => text.includes('yes') && numbers(text)[0] >= 50);
    solve(28, (text) => {
      let state = 'Draft';
      const transitions: Record<string, string> = {
        'Draft:Submit': 'Pending',
        'Pending:Pay': 'Paid',
      };
      for (const event of text.split(', ')) {
        const next = transitions[`${state}:${event}`];
        if (!next) return false;
        state = next;
      }
      return state === 'Paid';
    });
    solve(29, (text) => {
      const [a, x, b, y] = numbers(text);
      return (
        a === 49 && b === 50 && x === (a < 50 ? 5 : 0) && y === (b < 50 ? 5 : 0)
      );
    });
    solve(36, (text) => numbers(text)[0] === (2 + 4 * 5 + 14) / 6);
    solve(21, (text) => numbers(text)[0] === (1 / 2) * 100);
    const rank: Record<string, number> = { A: 3, B: 2, C: 1 };
    const done: string[] = [];
    while (done.length < 3) {
      const ready = Object.keys(rank)
        .filter(
          (id) => !done.includes(id) && (id !== 'A' || done.includes('C')),
        )
        .sort((a, b) => rank[b] - rank[a]);
      done.push(ready[0]);
    }
    solve(37, (text) => text === done.join(', '));
  });
  it.each(['exam', 'practice'] as const)(
    'restores .6 %s with three original alternatives and exact fields, results and timer',
    async (mode) => {
      const bank =
        mode === 'exam'
          ? selectPracticeExam(
              frozen.filter((q) => !['FL-1.2.1', 'FL-1.2.3'].includes(q.lo)),
              42,
            )
          : frozen;
      const old = bank.find((q) => q.id === 'tl-003')!;
      const base = {
        ...createSession(bank, mode, 75, 1000, 42),
        contentRevision: VARIABILITY_CONTENT_REVISION,
        index: bank.indexOf(old),
        visitedIds: [bank[0].id, old.id].filter(
          (id, i, a) => a.indexOf(id) === i,
        ),
        flagged: [old.id],
      };
      const session = answer(base, old.id, old.correct, 1000);
      expect(save({ version: 1, active: session, history: [] })).toBe(true);
      const raw = localStorage.getItem('testlearn.v1');
      expect((await loadAsync()).state.active).toEqual(session);
      expect(localStorage.getItem('testlearn.v1')).toBe(raw);
      const resolved = sessionQuestions(session, questions);
      expect(resolved).toEqual(frozen);
      expect(resolved.find((q) => q.id === old.id)!.options).toHaveLength(3);
      expect(
        score(
          session,
          questions.map((q) => ({ ...q, correct: [] })),
        ).correct,
      ).toBe(1);
      if (mode === 'exam') {
        expect(session.deadline).toBe(4501000);
        expect(remaining(session, 1000)).toBe(4500000);
        expect(remaining(session, 4500999)).toBe(1);
        expect(remaining(session, 4501000)).toBe(0);
        expect(finish(session, 4502000).completedAt).toBe(4501000);
      } else {
        expect(session.deadline).toBeNull();
        expect(remaining(session, 4501000)).toBe(Infinity);
      }
      const completed = finish(session, 2000);
      expect(save({ version: 1, active: null, history: [completed] })).toBe(
        true,
      );
      expect(load().state.history[0]).toEqual(completed);
      expect(score(completed, questions).correct).toBe(1);
      const next = createSession([q(3)], 'practice', 0, 3000, 42);
      expect(next.contentRevision).toBe(CONTENT_REVISION);
      expect(next.optionOrder[old.id]).toHaveLength(4);
    },
  );
});
