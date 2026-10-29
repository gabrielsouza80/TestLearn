import { beforeAll, describe, it, expect } from 'vitest';
import { createHash } from 'node:crypto';
import { questions } from '../../src/data/questions';
import { learningObjectiveLevels } from '../../src/domain/objectives';
import {
  objectiveCatalog,
  objectivesById,
} from '../../src/reference/objectives';
import {
  englishObjectivePin,
  portugueseOriginalPin,
} from '../fixtures/objective-reference';
import {
  updatePracticeFilters,
  filterGroups,
} from '../../src/learning/filters';
import {
  answerStatus,
  presentedOptions,
  resultPresentation,
} from '../../src/learning/assessment';
import {
  answer,
  createSession,
  finish,
  shuffle,
  type Session,
} from '../../src/domain/engine';
import { selectPracticeExam } from '../../src/domain/blueprint';
import {
  prepareHistoricalBanks,
  legacyQuestions,
  variabilityArchivedQuestions,
} from '../fixtures/banks';
beforeAll(prepareHistoricalBanks);
const blank = { chapter: '', topic: '', lo: '', level: '' };
const digest = (value: unknown) =>
  createHash('sha256').update(JSON.stringify(value)).digest('hex');
function completed(correct: number) {
  const bank = selectPracticeExam(questions, 42);
  let session = createSession(bank, 'exam', 60, 1000, 42);
  for (const [index, q] of bank.entries())
    session = answer(
      session,
      q.id,
      index < correct
        ? q.correct
        : q.options
            .filter((o) => !q.correct.includes(o.id))
            .slice(0, q.required)
            .map((o) => o.id),
      2000,
    );
  return finish(session, 61000);
}
describe('verified objective catalogue and hierarchical practice', () => {
  it('covers every official LO and K-level, pinning all exact English and original Portuguese PDF wording/pages', () => {
    expect(objectiveCatalog).toHaveLength(64);
    expect(new Set(objectiveCatalog.map((o) => o.id)).size).toBe(64);
    expect(Object.keys(objectivesById)).toEqual(
      Object.keys(learningObjectiveLevels),
    );
    for (const item of objectiveCatalog) {
      expect(item.level).toBe(learningObjectiveLevels[item.id]);
      expect(item.chapter).toBe(Number(item.id[3]));
      expect(item.pages.en).toBeGreaterThan(0);
      expect(item.pages.pt).toBeGreaterThan(0);
    }
    expect(
      digest(
        objectiveCatalog.map((o) => [
          o.id,
          o.level,
          o.description.en,
          o.pages.en,
        ]),
      ),
    ).toBe(englishObjectivePin);
    expect(
      digest(objectiveCatalog.map((o) => [o.id, o.ptOriginal, o.pages.pt])),
    ).toBe(portugueseOriginalPin);
    expect(objectivesById['FL-1.5.2'].description.en).toBe(
      'Recall the advantages of the whole team approach',
    );
  });
  it('distinguishes four localized PT equivalents from official older PT quotations', () => {
    expect(
      objectiveCatalog
        .filter((o) => o.ptWording === 'localized-4.0.1')
        .map((o) => o.id),
    ).toEqual(['FL-1.4.1', 'FL-2.1.1', 'FL-3.1.1', 'FL-3.2.1']);
    expect(objectivesById['FL-3.2.1'].ptOriginal).toContain('aos stakeholders');
    expect(objectivesById['FL-3.2.1'].description.pt).toContain(
      'dos stakeholders',
    );
    for (const item of objectiveCatalog.filter(
      (o) => o.ptWording !== 'localized-4.0.1',
    ))
      expect(item.description.pt).toBe(item.ptOriginal);
  });
  it('groups topics and naturally sorted objectives under the six official chapter numbers', () => {
    const groups = filterGroups(questions, blank);
    expect(groups.map((g) => g.chapter)).toEqual([1, 2, 3, 4, 5, 6]);
    expect(groups.flatMap((g) => g.objectives)).toEqual(
      Object.keys(learningObjectiveLevels),
    );
    for (const g of groups)
      expect(
        g.topics.every((topic) =>
          questions.some((q) => q.chapter === g.chapter && q.topic === topic),
        ),
      ).toBe(true);
  });
  it('clears stale children and incompatible K-level when changing chapter', () => {
    const q = questions.find((q) => q.level === 'K3' && q.chapter === 4)!;
    const next = updatePracticeFilters(
      { chapter: '4', topic: q.topic, lo: q.lo, level: 'K3' },
      { chapter: '2' },
      questions,
    );
    expect(next).toEqual({ chapter: '2', topic: '', lo: '', level: '' });
  });
  it('clears incompatible LO/topic when choosing another level and refuses invalid child IDs', () => {
    const q = questions.find((q) => q.level === 'K3' && q.chapter === 4)!;
    const next = updatePracticeFilters(
      { chapter: '4', topic: q.topic, lo: q.lo, level: 'K3' },
      { level: 'K2' },
      questions,
    );
    expect(next.lo).toBe('');
    expect(next.level).toBe('K2');
    expect(
      filterGroups(questions, next)
        .flatMap((g) => g.objectives)
        .every((lo) => learningObjectiveLevels[lo] === 'K2'),
    ).toBe(true);
    expect(
      updatePracticeFilters(
        { ...blank, chapter: '1' },
        { lo: 'FL-6.2.1', topic: 'absent' },
        questions,
      ),
    ).toEqual({ ...blank, chapter: '1' });
  });
});
describe('answer and score presentation without changing scoring or records', () => {
  it('maps letters from all saved 3/4/5-option permutations, never from internal IDs', () => {
    const cases = [
      variabilityArchivedQuestions.find((q) => q.id === 'tl-003')!,
      questions[0],
      questions.find((q) => q.id === 'tl-089')!,
    ];
    expect(cases.map((q) => q.options.length)).toEqual([3, 4, 5]);
    for (const q of cases)
      for (let seed = 0; seed < 100; seed++) {
        const order = shuffle(
          q.options.map((o) => o.id),
          seed,
        );
        const mapped = presentedOptions(q, order);
        expect(mapped.map((o) => o.option.id)).toEqual(order);
        expect(mapped.map((o) => o.letter)).toEqual(
          'ABCDE'.slice(0, order.length).split(''),
        );
      }
    expect(() => presentedOptions(cases[0], ['o1', 'o1', 'o3'])).toThrow();
  });
  it('distinguishes blank, wrong and exact multiple sets with no partial credit', () => {
    const q = questions.find((q) => q.id === 'tl-083')!,
      wrong = q.options.find((o) => !q.correct.includes(o.id))!.id;
    expect(answerStatus(q, [])).toBe('unanswered');
    expect(answerStatus(q, [q.correct[0]])).toBe('incorrect');
    expect(answerStatus(q, [q.correct[0], wrong])).toBe('incorrect');
    expect(answerStatus(q, [...q.correct].reverse())).toBe('correct');
  });
  it.each([26, 25])(
    'uses the existing 26/40 practice reference for an aligned completed exam with %i correct',
    (correct) => {
      const session = completed(correct),
        original = JSON.stringify(session),
        model = resultPresentation(session, questions);
      expect(model.correct).toBe(correct);
      expect(model.incorrect).toBe(40 - correct);
      expect(model.unanswered).toBe(0);
      expect(model.practicePassed).toBe(correct >= 26);
      expect(model.percentage).toBe((correct / 40) * 100);
      expect(model.elapsedMs).toBe(60000);
      expect(model.limitMinutes).toBe(60);
      expect(JSON.stringify(session)).toBe(original);
    },
  );
  it('preserves all blank responses on early completion and reports no invented completion reason', () => {
    const session = finish(
      createSession(selectPracticeExam(questions, 42), 'exam', 60, 1000, 42),
      2000,
    );
    const model = resultPresentation(session, questions);
    expect(model).toMatchObject({
      correct: 0,
      incorrect: 0,
      unanswered: 40,
      elapsedMs: 1000,
      practicePassed: false,
    });
    expect(model.rows.map((r) => r.number)).toEqual(
      Array.from({ length: 40 }, (_, i) => i + 1),
    );
    expect('completionReason' in model).toBe(false);
  });
  it('does not declare topic practice passed, even with 90 correct answers', () => {
    let s = createSession(questions, 'practice', 0, 1000, 42);
    for (const q of questions) s = answer(s, q.id, q.correct, 2000);
    const result = resultPresentation(finish(s, 3000), questions);
    expect(result.correct).toBe(90);
    expect(result.practicePassed).toBeNull();
    expect(result.limitMinutes).toBeNull();
    expect(result.rows).toHaveLength(90);
  });
  it('returns unavailable duration for missing or inconsistent timestamps instead of inventing zero elapsed time', () => {
    const s = completed(26);
    expect(
      resultPresentation({ ...s, completedAt: null }, questions).elapsedMs,
    ).toBeNull();
    expect(
      resultPresentation({ ...s, completedAt: s.startedAt - 1 }, questions)
        .elapsedMs,
    ).toBeNull();
  });
  it('resolves a historical bank and order instead of current texts/keys and does not claim aligned legacy pass/fail', () => {
    const q = legacyQuestions[2];
    const s: Session = {
      ...finish(
        answer(
          createSession([q], 'practice', 0, 1000, 42),
          q.id,
          q.correct,
          2000,
        ),
        3000,
      ),
      contentRevision: '2026-10-27.1',
    };
    const before = JSON.stringify(s);
    const model = resultPresentation(
      s,
      questions.map((q) => ({
        ...q,
        text: { en: 'replacement', pt: 'substituição' },
        correct: [],
      })),
    );
    expect(model.correct).toBe(1);
    expect(model.rows[0].question).toEqual(q);
    expect(
      presentedOptions(model.rows[0].question, s.optionOrder[q.id]).map(
        (o) => o.option.id,
      ),
    ).toEqual(s.optionOrder[q.id]);
    expect(JSON.stringify(s)).toBe(before);
    expect(model.practicePassed).toBeNull();
  });
});
