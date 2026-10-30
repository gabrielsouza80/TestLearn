import { test, expect, type Page } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
import {
  reviewQuestion,
  revealRationales,
} from '../fixtures/review-navigation';
import { questions } from '../../src/data/questions';
import {
  terminologyArchivedQuestions,
  qualityArchivedQuestions,
} from '../fixtures/banks';
import {
  createSession,
  finish,
  answer,
  type Session,
} from '../../src/domain/engine';
import { selectPracticeExam } from '../../src/domain/blueprint';
const now = Date.parse('2026-10-28T12:00:00Z');
const item = questions.find((q) => q.id === 'tl-083')!;
const stored = (page: Page) =>
  page.evaluate(
    () => JSON.parse(localStorage.getItem('testlearn.v1')!).active as Session,
  );
async function restore(page: Page, session: Session) {
  await page.goto('/');
  await page.evaluate(
    (s) =>
      localStorage.setItem(
        'testlearn.v1',
        JSON.stringify({ version: 1, active: s, history: [] }),
      ),
    session,
  );
  await page.reload();
}
test.beforeEach(async ({ page }) => {
  await page.clock.setFixedTime(new Date(now));
});
test('five-option multiple exam enforces cardinality with keyboard, resumes IDs and scores the exact set', async ({
  page,
}) => {
  let bank = selectPracticeExam(questions, 0);
  for (let seed = 1; !bank.some((q) => q.id === item.id) && seed < 100; seed++)
    bank = selectPracticeExam(questions, seed);
  expect(bank.some((q) => q.id === item.id)).toBe(true);
  const session = {
    ...createSession(bank, 'exam', 75, now, 42),
    index: bank.indexOf(item),
    visitedIds: [bank[0].id, item.id].filter((id, i, a) => a.indexOf(id) === i),
    flagged: [item.id],
  };
  await restore(page, session);
  await expect(
    page.getByRole('heading', { name: item.text.pt, exact: true }),
  ).toBeVisible();
  await expect(page.getByRole('checkbox')).toHaveCount(5);
  const option = (id: string, lang: 'pt' | 'en' = 'pt') =>
    page.getByRole('checkbox', {
      name: item.options.find((o) => o.id === id)!.text[lang],
      exact: true,
    });
  await option('o2').focus();
  await page.keyboard.press('Space');
  await option('o4').focus();
  await page.keyboard.press('Space');
  for (const id of ['o1', 'o3', 'o5']) await expect(option(id)).toBeDisabled();
  await option('o1').evaluate((node: HTMLInputElement) => node.click());
  expect((await stored(page)).answers[item.id]).toEqual(['o2', 'o4']);
  await option('o2').focus();
  await page.keyboard.press('Space');
  for (const id of ['o1', 'o3', 'o5']) await expect(option(id)).toBeEnabled();
  await option('o2').check();
  await page.getByLabel('Idioma', { exact: true }).selectOption('en');
  await expect(option('o2', 'en')).toBeChecked();
  await expect(option('o4', 'en')).toBeChecked();
  await page.reload();
  await expect(option('o4', 'pt')).toBeChecked();
  await page.getByLabel('Idioma', { exact: true }).selectOption('en');
  const saved = await stored(page);
  expect(saved.optionOrder).toEqual(session.optionOrder);
  expect(saved.answers[item.id].sort()).toEqual(['o2', 'o4']);
  expect(saved.flagged).toEqual([item.id]);
  expect(saved.deadline).toBe(session.deadline);
  expect((await new AxeBuilder({ page }).analyze()).violations).toEqual([]);
  expect(
    await page.evaluate(
      () => document.documentElement.scrollWidth <= innerWidth,
    ),
  ).toBe(true);
  await page
    .getByRole('button', { name: 'Finish session', exact: true })
    .click();
  await page
    .getByRole('button', { name: 'Confirm and finish', exact: true })
    .click();
  await expect(
    page.getByRole('heading', { name: '1 / 40', exact: true }),
  ).toBeVisible();
  await reviewQuestion(page, session.index + 1);
  const region = page.getByRole('region', {
    name: `Explanation for question ${session.index + 1}`,
    exact: true,
  });
  await revealRationales(region, item, 'en');
});
test('wrong pair receives zero and feedback includes every alternative in both languages', async ({
  page,
}) => {
  await restore(page, createSession([item], 'practice', 0, now, 42));
  for (const id of ['o1', 'o2'])
    await page
      .getByRole('checkbox', {
        name: item.options.find((o) => o.id === id)!.text.pt,
        exact: true,
      })
      .check();
  await page
    .getByRole('button', { name: 'Confirmar resposta', exact: true })
    .click();
  for (const o of item.options)
    await expect(
      page.getByRole('region', { name: 'Explicação', exact: true }),
    ).toContainText(o.explanation.pt);
  await page.getByLabel('Idioma', { exact: true }).selectOption('en');
  for (const o of item.options)
    await expect(
      page.getByRole('region', { name: 'Explanation', exact: true }),
    ).toContainText(o.explanation.en);
  await page
    .getByRole('button', { name: 'Finish session', exact: true })
    .click();
  await page
    .getByRole('button', { name: 'Confirm and finish', exact: true })
    .click();
  await expect(
    page.getByRole('heading', { name: '0 / 1', exact: true }),
  ).toBeVisible();
});
test('five-option K3 estimation renders the full table and retains its single answer on reload', async ({
  page,
}) => {
  const estimate = questions.find((q) => q.id === 'tl-089')!;
  await restore(page, createSession([estimate], 'practice', 0, now, 42));
  await expect(page.getByRole('radio')).toHaveCount(5);
  await expect(page.getByRole('table').getByRole('row')).toHaveCount(4);
  await page
    .getByRole('radio', {
      name: estimate.options.find((o) => o.id === 'o4')!.text.pt,
      exact: true,
    })
    .check();
  await page.getByLabel('Idioma', { exact: true }).selectOption('en');
  await page.reload();
  await expect(
    page.getByRole('radio', {
      name: estimate.options.find((o) => o.id === 'o4')!.text.pt,
      exact: true,
    }),
  ).toBeChecked();
  await page.getByLabel('Idioma', { exact: true }).selectOption('en');
  await expect(
    page.getByRole('radio', {
      name: estimate.options.find((o) => o.id === 'o4')!.text.en,
      exact: true,
    }),
  ).toBeChecked();
  for (const row of estimate.table!.rows)
    for (const cell of row)
      await expect(page.getByRole('table')).toContainText(cell);
  await page.getByRole('button', { name: 'Check answer', exact: true }).click();
  await expect(
    page.getByRole('region', { name: 'Explanation', exact: true }),
  ).toContainText(estimate.explanation.en);
});
for (const [revision, bank] of [
  ['2026-10-27.7', qualityArchivedQuestions],
  ['2026-10-27.8', terminologyArchivedQuestions],
] as const) {
  test(`historical ${revision} full study retains 82 items and original texts, answers, order and timestamps`, async ({
    page,
  }) => {
    const old = bank.find((q) => q.id === 'tl-030')!;
    const session = {
      ...answer(
        createSession(bank, 'practice', 0, now, 42),
        old.id,
        old.correct,
        now,
      ),
      contentRevision: revision,
      index: bank.indexOf(old),
      visitedIds: [bank[0].id, old.id],
      flagged: [old.id],
    };
    await restore(page, session);
    await expect(
      page.getByRole('radio', {
        name: old.options.find((o) => o.id === 'o3')!.text.pt,
        exact: true,
      }),
    ).toBeVisible();
    expect(await stored(page)).toEqual(session);
    await page
      .getByRole('button', { name: 'Terminar sessão', exact: true })
      .click();
    await page
      .getByRole('button', { name: 'Confirmar e terminar', exact: true })
      .click();
    await expect(
      page.getByRole('heading', { name: '1 / 82', exact: true }),
    ).toBeVisible();
    expect(
      await page.evaluate(
        () => JSON.parse(localStorage.getItem('testlearn.v1')!).history[0],
      ),
    ).toEqual(finish(session, now));
  });
}
