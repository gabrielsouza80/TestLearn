import { beforeAll } from 'vitest';
import { prepareHistoricalBanks } from '../fixtures/banks';
beforeAll(prepareHistoricalBanks);
import { describe, it, expect } from 'vitest';
import { questions } from '../../src/data/questions';
import { syllabusQuestions } from '../../src/data/syllabus-questions';
import {
  blueprintArchivedQuestions,
  legacyQuestions,
  auditedQuestions,
  coverageArchivedQuestions,
} from '../fixtures/banks';
import { learningObjectiveLevels } from '../../src/domain/objectives';
import {
  answer,
  createSession,
  finish,
  isCorrect,
  score,
  sessionQuestions,
  validateBank,
} from '../../src/domain/engine';
import {
  BLUEPRINT_CONTENT_REVISION,
  CONTENT_REVISION,
  LEGACY_CONTENT_REVISION,
  AUDITED_CONTENT_REVISION,
} from '../../src/domain/revision';
import { selectPracticeExam } from '../../src/domain/blueprint';
import { load, save } from '../../src/storage/store';
import { syllabusObjectives, phase4Sources } from '../fixtures/syllabus-oracle';
import { expectedGroups } from '../fixtures/blueprint-oracle';

describe('full syllabus coverage, distinct from academic approval', () => {
  it('covers exactly the 64 independently enumerated LOs at their syllabus levels', () => {
    const official = Object.entries(syllabusObjectives).flatMap(
      ([level, los]) => los.map((lo) => [lo, level]),
    );
    expect(official).toHaveLength(64);
    expect(new Set(official.map(([lo]) => lo)).size).toBe(64);
    expect(learningObjectiveLevels).toEqual(Object.fromEntries(official));
    expect(new Set(questions.map((q) => q.lo))).toEqual(
      new Set(official.map(([lo]) => lo)),
    );
    expect(new Set(expectedGroups.flatMap(([, , los]) => los))).toEqual(
      new Set(official.map(([lo]) => lo)),
    );
    for (const [lo, level] of official) {
      const covered = questions.filter((q) => q.lo === lo);
      expect(covered.length, lo).toBeGreaterThan(0);
      expect(
        covered.every((q) => q.level === level && q.chapter === Number(lo[3])),
      ).toBe(true);
    }
    expect(questions).toHaveLength(82);
    expect(validateBank(questions)).toEqual([]);
    expect(new Set(questions.map((q) => q.id)).size).toBe(82);
    expect(
      ['K1', 'K2', 'K3'].map(
        (k) => questions.filter((q) => q.level === k).length,
      ),
    ).toEqual([18, 47, 17]);
    expect(
      [1, 2, 3, 4, 5, 6].map(
        (ch) => questions.filter((q) => q.chapter === ch).length,
      ),
    ).toEqual([16, 12, 8, 21, 21, 4]);
  });
  it('closes precisely the previous 19 gaps without replacing any of the original 47 items', () => {
    expect(coverageArchivedQuestions.slice(0, 47)).toEqual(
      blueprintArchivedQuestions,
    );
    const missing = Object.values(syllabusObjectives)
      .flat()
      .filter((lo) => !blueprintArchivedQuestions.some((q) => q.lo === lo));
    expect(missing.sort()).toEqual(phase4Sources.map(([, lo]) => lo).sort());
    expect(syllabusQuestions.map((q) => q.lo).sort()).toEqual(missing.sort());
    expect(syllabusQuestions).toHaveLength(19);
    expect(syllabusQuestions.every((q) => q.level !== 'K3')).toBe(true);
  });
  it('requires bilingual text and individual rationales for every option with exact provenance and pending human review', () => {
    for (const [id, lo, pages] of phase4Sources) {
      const q = coverageArchivedQuestions.find((q) => q.id === id)!;
      expect(q.lo).toBe(lo);
      expect(q.academicReview).toEqual({
        method: 'AI_REVIEWED',
        status: 'PASS',
        reviewedAt: '2026-10-27',
        section: lo.slice(3),
        pages,
        report: `docs/academic-audit.md#${id}`,
      });
      expect(q.review).toBe('AI_REVIEWED');
      expect(q.translationReview).toBe('AI_REVIEWED');
      expect(q.humanApproval).toBe('PENDING');
      expect(q.examEligible).toBe(true);
      expect(q.options.map((o) => o.id)).toEqual(['o1', 'o2', 'o3', 'o4']);
      expect(q.required).toBe(1);
      for (const language of ['en', 'pt'] as const) {
        const fields = [
          q.text[language],
          q.explanation[language],
          ...q.options.flatMap((o) => [
            o.text[language],
            o.explanation[language],
          ]),
        ];
        expect(
          fields.every(
            (t) =>
              t.trim().length > 15 && !/\b(?:TODO|TBD)\b|placeholder/.test(t),
          ),
          id,
        ).toBe(true);
        expect(new Set(q.options.map((o) => o.text[language])).size).toBe(4);
        expect(
          new Set(q.options.map((o) => o.explanation[language])).size,
        ).toBe(4);
      }
    }
    expect(questions.every((q) => q.humanApproval === 'PENDING')).toBe(true);
  });
  it('preserves keys when all 82 practice items are shuffled, rejects partial/extra multi-answers, and restores the final item', () => {
    let study = createSession(questions, 'practice', 0, 1000, 733);
    for (const q of questions) {
      const order = study.optionOrder[q.id];
      expect([...order].sort()).toEqual(q.options.map((o) => o.id).sort());
      const correctInDisplayOrder = order.filter((id) =>
        q.correct.includes(id),
      );
      expect(correctInDisplayOrder).toHaveLength(q.required);
      expect(isCorrect(q, correctInDisplayOrder)).toBe(true);
      const wrong = order.find((id) => !q.correct.includes(id))!;
      expect(isCorrect(q, [wrong])).toBe(false);
      expect(isCorrect(q, [...correctInDisplayOrder, wrong])).toBe(false);
      if (q.type === 'multiple') {
        expect(q.required).toBeGreaterThan(1);
        expect(isCorrect(q, correctInDisplayOrder.slice(1))).toBe(false);
      }
      study = answer(study, q.id, correctInDisplayOrder, 2000);
    }
    study = {
      ...study,
      index: 81,
      visitedIds: questions.map((q) => q.id),
      flagged: ['tl-082'],
      feedbackIds: ['tl-082'],
    };
    expect(save({ version: 1, active: study, history: [] })).toBe(true);
    expect(load().state.active).toEqual(study);
    const completed = finish(study, 3000);
    expect(score(completed, questions)).toEqual({
      correct: 82,
      total: 82,
      unanswered: 0,
      passed: null,
    });
    expect(save({ version: 1, active: null, history: [completed] })).toBe(true);
    expect(load().state.history[0]).toEqual(completed);
  });
  it('restores revision .3 exams and 47-item study sessions without migration or rescoring against a replacement bank', () => {
    const altered = questions.map((q) => ({
      ...q,
      text: { en: 'Changed', pt: 'Alterado' },
      correct: [q.options.find((o) => !q.correct.includes(o.id))!.id],
    }));
    for (const mode of ['exam', 'practice'] as const) {
      const bank =
        mode === 'exam'
          ? selectPracticeExam(blueprintArchivedQuestions, 42)
          : blueprintArchivedQuestions;
      let session = {
        ...createSession(bank, mode, 75, 1000, 42),
        contentRevision: BLUEPRINT_CONTENT_REVISION,
      };
      const first = bank[0];
      session = {
        ...answer(session, first.id, first.correct, 2000),
        index: bank.length - 1,
        visitedIds: [first.id, bank[bank.length - 1].id],
        flagged: [first.id],
        feedbackIds: mode === 'practice' ? [first.id] : [],
        responseMs: { [first.id]: 500 },
      };
      expect(save({ version: 1, active: session, history: [] })).toBe(true);
      expect(load().state.active).toEqual(session);
      expect(sessionQuestions(session, altered)).toEqual(
        blueprintArchivedQuestions,
      );
      expect(score(session, altered).correct).toBe(1);
      const completed = finish(session, 3000);
      expect(save({ version: 1, active: null, history: [completed] })).toBe(
        true,
      );
      expect(load().state.history[0]).toEqual(completed);
      expect(score(completed, altered).correct).toBe(1);
    }
    expect(CONTENT_REVISION).toBe('2026-10-27.7');
  });
  it('rejects missing/whitespace explanations and wrong answer cardinalities instead of hiding content errors', () => {
    const q = syllabusQuestions[0];
    for (const bad of [
      { ...q, correct: ['absent'] },
      { ...q, required: 2 },
      { ...q, correct: ['o1', 'o1'] },
      { ...q, options: [...q.options, q.options[0]] },
      { ...q, explanation: { en: ' ', pt: 'Explicação' } },
      {
        ...q,
        options: q.options.map((o, i) =>
          i === 0 ? { ...o, explanation: { en: 'Reason', pt: '' } } : o,
        ),
      },
    ])
      expect(validateBank([bad]).length).toBeGreaterThan(0);
  });
  it.each([
    [LEGACY_CONTENT_REVISION, legacyQuestions],
    [AUDITED_CONTENT_REVISION, auditedQuestions],
    [BLUEPRINT_CONTENT_REVISION, blueprintArchivedQuestions],
  ] as const)(
    'preserves full study data for %s and refuses to attach new items to that revision',
    (revision, bank) => {
      const first = bank[0];
      const last = bank[bank.length - 1];
      const study = {
        ...answer(
          createSession([...bank], 'practice', 0, 1000, 42),
          first.id,
          first.correct,
          2000,
        ),
        contentRevision: revision,
        index: bank.length - 1,
        visitedIds: [first.id, last.id],
        flagged: [last.id],
        feedbackIds: [first.id],
      };
      expect(save({ version: 1, active: study, history: [] })).toBe(true);
      expect(load().state.active).toEqual(study);
      expect(sessionQuestions(study, [])).toEqual(bank);
      const completed = finish(study, 3000);
      expect(save({ version: 1, active: null, history: [completed] })).toBe(
        true,
      );
      expect(load().state.history[0]).toEqual(completed);
      expect(score(completed, []).correct).toBe(1);
      const incompatible = {
        ...createSession([questions[65]], 'practice', 0, 1000, 42),
        contentRevision: revision,
      };
      expect(save({ version: 1, active: incompatible, history: [] })).toBe(
        false,
      );
      const raw = JSON.stringify({
        version: 1,
        active: incompatible,
        history: [],
      });
      localStorage.setItem('testlearn.v1', raw);
      expect(load().warning).toBeTruthy();
      expect(localStorage.getItem('testlearn.v1')).toBe(raw);
    },
  );
});
