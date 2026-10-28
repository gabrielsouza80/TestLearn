import { describe, it, expect } from 'vitest';
import { createHash } from 'node:crypto';
import { readFileSync } from 'node:fs';
import { questions as currentQuestions } from '../../src/data/questions';
import {
  coverageArchivedQuestions,
  bilingualArchivedQuestions,
  legacyQuestions,
  auditedQuestions,
  blueprintArchivedQuestions,
} from '../../src/data/bank-history';
import reviews from '../../src/data/bilingual-review.json';
import {
  CONTENT_REVISION,
  COVERAGE_CONTENT_REVISION,
  LEGACY_CONTENT_REVISION,
  AUDITED_CONTENT_REVISION,
  BLUEPRINT_CONTENT_REVISION,
  isBlueprintRevision,
} from '../../src/domain/revision';
import {
  answer,
  createSession,
  finish,
  score,
  sessionQuestions,
  type Question,
} from '../../src/domain/engine';
import { selectPracticeExam } from '../../src/domain/blueprint';
import { load, save } from '../../src/storage/store';

const questions = bilingualArchivedQuestions;

describe('controlled bilingual release .4 → .5', () => {
  it('changes exactly the five permitted items and fields; preserves all 66 keys and the other 61 items deeply', () => {
    const expected = structuredClone(coverageArchivedQuestions);
    const q = (id: string) => expected.find((q) => q.id === id)!;
    q('tl-002').options[2].text.en = 'Reporting a product failure in a build';
    q('tl-003').options[2].text = {
      en: 'Running a confirmation test after the fix',
      pt: 'Executar um teste de confirmação após a correção',
    };
    q('tl-003').options[2].explanation = {
      en: 'Running a confirmation test checks whether the fix resolved the original problem; locating and removing the defect is debugging.',
      pt: 'Executar um teste de confirmação verifica se a correção resolveu o problema original; localizar e remover o defeito pertence ao debugging.',
    };
    q('tl-008').options[2].text.pt =
      'Testadores independentes nunca deixam passar defeitos';
    q('tl-023').options[1].text.pt = 'Apenas repetição de scripts de teste';
    q('tl-058').text.pt =
      'Um líder de revisão prepara uma revisão de um guia atualizado de colocação em serviço de software. Que medida é um fator reconhecido de sucesso das revisões?';
    const ids = ['tl-002', 'tl-003', 'tl-008', 'tl-023', 'tl-058'];
    for (const id of ids) {
      q(id).version += 1;
      q(id).academicReview!.report = `docs/academic-audit.md#fase-41--${id}`;
    }
    expect(questions).toEqual(expected);
    expect(
      questions
        .filter(
          (q, i) =>
            JSON.stringify(q) !== JSON.stringify(coverageArchivedQuestions[i]),
        )
        .map((q) => q.id),
    ).toEqual(ids);
    expect(questions.map((q) => [q.id, q.correct])).toEqual(
      coverageArchivedQuestions.map((q) => [q.id, q.correct]),
    );
    expect(reviews.map((r) => r.id)).toEqual(ids);
    for (const r of reviews) {
      const current = questions.find((q) => q.id === r.id)!;
      const old = coverageArchivedQuestions.find((q) => q.id === r.id)!;
      expect(r.previousVersion).toBe(old.version);
      expect(r.version).toBe(old.version + 1);
      expect(current.version).toBe(r.version);
      expect(current.academicReview?.report).toBe(r.report);
      expect(current.humanApproval).toBe('PENDING');
    }
  });
  it('pins the frozen .4 archive byte-for-byte and verifies it matches the original independent-review export digest', () => {
    expect(
      createHash('sha256')
        .update(readFileSync('src/data/archive/questions-2026-10-27.4.json'))
        .digest('hex'),
    ).toBe('413e93605f8026e7a633f92c512c0f93b2a466867e4a1d4d3752dbd03ee1f104');
    expect(
      createHash('sha256')
        .update(JSON.stringify(coverageArchivedQuestions))
        .digest('hex'),
    ).toBe('fab0fbcb6b137f7885ddeddc8f07d2b15e38e8d385a2b00650a508a803fbd272');
  });
  it('creates current attempts while .4 keeps blueprint status and all original bilingual distinctions', () => {
    expect(CONTENT_REVISION).toBe('2026-10-27.6');
    expect(
      createSession(currentQuestions, 'practice', 0, 1000, 42).contentRevision,
    ).toBe(CONTENT_REVISION);
    expect(
      createSession(
        selectPracticeExam(currentQuestions, 42),
        'exam',
        60,
        1000,
        42,
      ).contentRevision,
    ).toBe(CONTENT_REVISION);
    expect(isBlueprintRevision(COVERAGE_CONTENT_REVISION)).toBe(true);
    const old = coverageArchivedQuestions.find((q) => q.id === 'tl-003')!;
    expect(old.options[2].text.en).toBe('Checking the repair afterwards');
    expect(old.options[2].text.pt).toBe(
      'Verificar posteriormente a correção através de testes',
    );
    const current = questions.find((q) => q.id === 'tl-003')!;
    expect(current.correct).toEqual(['o1']);
    expect(current.options[0]).toEqual(old.options[0]);
    expect(current.options[1]).toEqual(old.options[1]);
  });
  it.each([
    [LEGACY_CONTENT_REVISION, legacyQuestions],
    [AUDITED_CONTENT_REVISION, auditedQuestions],
    [BLUEPRINT_CONTENT_REVISION, blueprintArchivedQuestions],
    [COVERAGE_CONTENT_REVISION, coverageArchivedQuestions],
  ] as const)(
    'round-trips every field of %s exam/study attempts and never resolves them against replacement current texts/keys',
    (revision, archived) => {
      const replacement: Question[] = questions.map((q) => ({
        ...q,
        text: { en: 'Replacement', pt: 'Substituição' },
        correct: [q.options.find((o) => !q.correct.includes(o.id))!.id],
      }));
      for (const mode of ['practice', 'exam'] as const) {
        const bank =
          mode === 'practice' || !isBlueprintRevision(revision)
            ? [...archived]
            : selectPracticeExam([...archived], 42);
        const first = bank[0];
        const original = {
          ...createSession(bank, 'practice', 0, 1000, 42),
          mode,
          contentRevision: revision,
          deadline: mode === 'exam' ? 4501000 : null,
        };
        const session = {
          ...answer(original, first.id, first.correct, 2000),
          index: bank.length - 1,
          visitedIds: [first.id, bank[bank.length - 1].id],
          flagged: [first.id],
          feedbackIds: mode === 'practice' ? [first.id] : [],
          responseMs: { [first.id]: 1000 },
        };
        expect(save({ version: 1, active: session, history: [] })).toBe(true);
        expect(load().warning).toBeNull();
        expect(load().state.active).toEqual(session);
        expect(sessionQuestions(session, replacement)).toEqual(archived);
        expect(score(session, replacement).correct).toBe(1);
        const completed = finish(session, 3000);
        expect(save({ version: 1, active: null, history: [completed] })).toBe(
          true,
        );
        expect(load().state.history[0]).toEqual(completed);
        expect(score(completed, replacement).correct).toBe(1);
      }
    },
  );
});
