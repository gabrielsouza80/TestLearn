import { beforeAll, describe, expect, it } from 'vitest';
import frozen from '../../src/data/archive/questions-2026-10-27.9.json';
import { questions } from '../../src/data/questions';
import { loadQuestionBank } from '../../src/data/bank-history';
import { CONTENT_REVISION } from '../../src/domain/revision';
import {
  answer,
  createSession,
  score,
  sessionQuestions,
} from '../../src/domain/engine';
import { loadAsync, save } from '../../src/storage/store';
import { prepareHistoricalBanks } from '../fixtures/banks';
import { applyAcademicBatch1 } from '../../src/data/academic-batch1';
import { exportBackup, parseBackup } from '../../src/storage/backup';
import { selectPracticeExam } from '../../src/domain/blueprint';
import { expectedGroups } from '../fixtures/blueprint-oracle';
import type { Question } from '../../src/domain/question';
import { defectReportOracle } from '../fixtures/advanced-solvers';

beforeAll(prepareHistoricalBanks);
describe('Phase 10H Batch 1: bilingual corrections without rewriting published attempts', () => {
  it('changes exactly two items and preserves every answer key, objective and option ID', () => {
    expect(CONTENT_REVISION).toBe('2026-10-27.10');
    expect(
      questions
        .filter((q, i) => JSON.stringify(q) !== JSON.stringify(frozen[i]))
        .map((q) => q.id),
    ).toEqual(['tl-011', 'tl-090']);
    for (const [i, q] of questions.entries()) {
      expect(q.correct).toEqual(frozen[i].correct);
      expect([q.lo, q.level, q.required, q.chapter, q.examEligible]).toEqual([
        frozen[i].lo,
        frozen[i].level,
        frozen[i].required,
        frozen[i].chapter,
        frozen[i].examEligible,
      ]);
      expect(q.options.map((o) => o.id)).toEqual(
        frozen[i].options.map((o) => o.id),
      );
      expect(q.humanApproval).toBe('PENDING');
    }
  });
  it('distinguishes unchanged implementation from an already proven absence of adverse effects', () => {
    const q = questions.find((q) => q.id === 'tl-011')!;
    expect(q.version).toBe(3);
    expect(q.text.en).toContain('implementation was not changed');
    expect(q.text.en).toContain('to check for adverse effects');
    expect(q.text.pt).toContain('implementação não foi alterada');
    expect(q.text.pt).toContain('para procurar efeitos adversos');
    for (const explanation of [q.explanation, q.options[0].explanation]) {
      expect(explanation.en).toContain('changed component');
      expect(explanation.pt).toContain('componente alterado');
    }
    expect(q.correct).toEqual(['o1']);
  });
  it('restores the documented absence of transfer T-91 equally in every report alternative', () => {
    const q = questions.find((q) => q.id === 'tl-090')!;
    expect(q.version).toBe(2);
    expect(q.text).toEqual(frozen[89].text);
    expect(q.table).toEqual(frozen[89].table);
    for (const option of q.options) {
      expect(option.text.en).toContain('no existing T-91');
      expect(option.text.pt).toContain('T-91 inexistente');
    }
    expect(q.explanation.en).toContain('before creating');
    expect(q.explanation.pt).toContain('antes de criar');
    expect(q.correct).toEqual(['o2']);
    expect(defectReportOracle(q)).toMatchObject({
      expected: 18,
      actual: 20,
      status: 'Draft',
      http: 409,
      solutions: ['o2'],
    });
  });
  it('restores a .9 session byte for byte and uses the original wording and scoring', async () => {
    const bank = await loadQuestionBank('2026-10-27.9', questions);
    expect(bank).toEqual(frozen);
    expect(bank).not.toBe(questions);
    const item = bank.find((q) => q.id === 'tl-011')!;
    const session = {
      ...answer(
        createSession([item], 'practice', 0, 1000, 42),
        item.id,
        ['o1'],
        2000,
      ),
      contentRevision: '2026-10-27.9',
    };
    expect(save({ version: 1, active: session, history: [] })).toBe(true);
    expect((await loadAsync()).state.active).toEqual(session);
    expect(sessionQuestions(session, questions)).toEqual(frozen);
    expect(score(session, questions).correct).toBe(1);
    expect(
      sessionQuestions(session, questions).find((q) => q.id === item.id)?.text
        .en,
    ).toContain('unaffected');
    const raw = localStorage.getItem('testlearn.v1');
    const restored = await parseBackup(
      exportBackup({ version: 1, active: session, history: [] }),
    );
    expect(restored.state.active).toEqual(session);
    expect(localStorage.getItem('testlearn.v1')).toBe(raw);
  });

  it('leaves all unrelated fields and distractor explanations unchanged', () => {
    for (const id of ['tl-011', 'tl-090']) {
      const old = frozen.find((q) => q.id === id)!;
      const current = questions.find((q) => q.id === id)!;
      const changed = Object.keys(old).filter(
        (key) =>
          JSON.stringify(old[key as keyof typeof old]) !==
          JSON.stringify(current[key as keyof Question]),
      );
      expect(changed.sort()).toEqual(
        (id === 'tl-011'
          ? ['text', 'options', 'explanation', 'version', 'academicReview']
          : ['options', 'explanation', 'version', 'academicReview']
        ).sort(),
      );
      for (const [i, option] of current.options.entries()) {
        if (id === 'tl-011') expect(option.text).toEqual(old.options[i].text);
        if (!(id === 'tl-011' ? ['o1', 'o4'] : ['o2']).includes(option.id))
          expect(option.explanation).toEqual(old.options[i].explanation);
        if (id === 'tl-090') {
          expect(option.text.en.replace('no existing T-91, ', '')).toBe(
            old.options[i].text.en,
          );
          expect(option.text.pt.replace('T-91 inexistente, ', '')).toBe(
            old.options[i].text.pt,
          );
        }
      }
    }
  });

  it('preserves the .9 examination deadline, ordering, answer and flags across load and backup', async () => {
    const bank = await loadQuestionBank('2026-10-27.9', questions);
    const selected = selectPracticeExam(bank, 42);
    const first = selected[0];
    const session = {
      ...answer(
        createSession(selected, 'exam', 75, 1000, 42),
        first.id,
        first.correct,
        2000,
      ),
      contentRevision: '2026-10-27.9',
      flagged: [first.id],
      index: 1,
      visitedIds: [first.id, selected[1].id],
    };
    const state = { version: 1 as const, active: session, history: [] };
    expect(save(state)).toBe(true);
    expect((await loadAsync()).state).toEqual(state);
    expect((await parseBackup(exportBackup(state))).state).toEqual(state);
    expect(session.deadline).toBe(4501000);
    expect(score(session, questions)).toEqual(score(session, bank));
  });

  it('fails closed on an unexpected version, answer key or missing precondition insertion point', () => {
    const old = structuredClone(frozen[89]) as Question;
    expect(() => applyAcademicBatch1({ ...old, version: 2 })).toThrow(
      'Incompatible',
    );
    expect(() => applyAcademicBatch1({ ...old, correct: ['o1'] })).toThrow(
      'Incompatible',
    );
    old.options[0].text.pt = 'incompatible report';
    expect(() => applyAcademicBatch1(old)).toThrow('Incompatible');
  });

  it('keeps the current examination blueprint deterministic over 1000 seeds', () => {
    const seen = new Set<string>();
    for (let seed = 0; seed < 1000; seed++) {
      const exam = selectPracticeExam(questions, seed);
      expect(exam.map((q) => q.id)).toEqual(
        selectPracticeExam(questions, seed).map((q) => q.id),
      );
      expect(exam).toHaveLength(40);
      expect(new Set(exam.map((q) => q.id)).size).toBe(40);
      for (const [level, count, los] of expectedGroups)
        expect(
          exam.filter((q) => q.level === level && los.includes(q.lo)),
        ).toHaveLength(count);
      exam.forEach((q) => seen.add(q.id));
    }
    expect(seen.size).toBe(90);
  }, 20000);
});
