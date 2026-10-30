import { examQuestions } from '../fixtures/sessions';
import { test, expect, type Page } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
import { questions } from '../../src/data/questions';
import { createSession } from '../../src/domain/engine';
const fixedNow = Date.parse('2026-10-27T12:00:00Z');
test.beforeEach(async ({ page }) => {
  await page.clock.setFixedTime(new Date(fixedNow));
});
async function open(page: Page) {
  await page.goto('/');
  await page.getByLabel('Idioma').selectOption('en');
}
async function start(page: Page) {
  await open(page);
  await page
    .getByRole('button', { name: 'Take a CTFL practice exam', exact: true })
    .click();
}
async function active(page: Page) {
  return page.evaluate(
    () => JSON.parse(localStorage.getItem('testlearn.v1')!).active,
  );
}
async function finishAttempt(page: Page) {
  await page
    .getByRole('button', { name: 'Finish session', exact: true })
    .click();
  await expect(page.getByRole('alertdialog')).toBeVisible();
  await page
    .getByRole('button', { name: 'Confirm and finish', exact: true })
    .click();
  await expect(
    page.getByRole('heading', { name: 'Results and review' }),
  ).toBeVisible();
}

test('dashboard, bilingual study, keyboard and mobile layout', async ({
  page,
}, info) => {
  await open(page);
  await expect(
    page.getByRole('heading', { name: 'Your learning workspace' }),
  ).toBeVisible();
  await page.keyboard.press('Tab');
  await expect(page.locator(':focus')).toBeVisible();
  await page
    .getByRole('button', { name: 'English for QA', exact: true })
    .click();
  await expect(
    page.getByRole('term').filter({ hasText: 'Equivalence partitioning' }),
  ).toBeVisible();
  await page.getByText('Tell me about yourself.', { exact: true }).click();
  await expect(
    page.getByText('I am learning software testing.', { exact: false }),
  ).toBeVisible();
  await page.getByLabel('Language').selectOption('both');
  await expect(
    page.getByRole('heading', {
      name: 'Inglês para QA — Vocabulário e entrevistas',
      exact: true,
    }),
  ).toBeVisible();
  expect(
    await page.evaluate(
      () => document.documentElement.scrollWidth <= innerWidth,
    ),
  ).toBe(true);
  await page.getByRole('button', { name: 'Visão geral', exact: true }).click();
  await page.screenshot({
    path: `test-results/${info.project.name}-dashboard.png`,
    fullPage: true,
  });
  expect((await new AxeBuilder({ page }).analyze()).violations).toEqual([]);
});

test('answers survive navigation, flags and reload; incomplete submission warns; new attempt is fresh', async ({
  page,
}) => {
  await start(page);
  const saved = await active(page);
  const q = questions.find((q) => q.id === saved.questionIds[0])!;
  const option = q.options.find((o) => o.id === q.correct[0])!;
  await page
    .getByRole(q.required === 1 ? 'radio' : 'checkbox', {
      name: option.text.en,
      exact: true,
    })
    .check();
  await page
    .getByRole('button', { name: 'Flag for review', exact: true })
    .click();
  await page.getByRole('button', { name: 'Next', exact: true }).click();
  await page.getByRole('button', { name: 'Previous', exact: true }).click();
  await expect(
    page.getByRole(q.required === 1 ? 'radio' : 'checkbox', {
      name: option.text.en,
      exact: true,
    }),
  ).toBeChecked();
  await page.getByRole('button', { name: /^Question 3, unanswered$/ }).click();
  await page.reload();
  await page.getByLabel('Idioma').selectOption('en');
  await expect(
    page.getByText('Question 3 / 40', { exact: true }),
  ).toBeVisible();
  await page
    .getByRole('button', { name: /^Question 1, answered, flagged$/ })
    .click();
  await expect(
    page.getByRole(q.required === 1 ? 'radio' : 'checkbox', {
      name: option.text.en,
      exact: true,
    }),
  ).toBeChecked();
  await expect(page.getByRole('region', { name: 'Explanation' })).toHaveCount(
    0,
  );
  await finishAttempt(page);
  await page.getByLabel('Show', { exact: true }).selectOption('unanswered');
  await expect(page.locator('.review-question')).toHaveCount(39);
  await page.getByRole('button', { name: 'Overview', exact: true }).click();
  await page
    .getByRole('button', { name: 'Take a CTFL practice exam', exact: true })
    .click();
  expect((await active(page)).id).not.toBe(saved.id);
  expect((await active(page)).answers).toEqual({});
});

test('complete all 40 with 26 correct and verify exact score and incorrect review', async ({
  page,
}) => {
  test.setTimeout(90000);
  await start(page);
  const s = await active(page);
  for (let i = 0; i < 40; i++) {
    const q = questions.find((q) => q.id === s.questionIds[i])!;
    const selected =
      i < 26
        ? q.correct
        : [q.options.find((o) => !q.correct.includes(o.id))!.id];
    for (const id of selected) {
      const option = q.options.find((o) => o.id === id)!;
      await page
        .getByRole(q.required === 1 ? 'radio' : 'checkbox', {
          name: option.text.en,
          exact: true,
        })
        .check();
    }
    if (i < 39)
      await page.getByRole('button', { name: 'Next', exact: true }).click();
  }
  await finishAttempt(page);
  await expect(
    page.getByRole('heading', { name: '26 / 40', exact: true }),
  ).toBeVisible();
  await expect(
    page.getByText('Passed the practice exam', { exact: true }),
  ).toBeVisible();
  await page.getByLabel('Show', { exact: true }).selectOption('incorrect');
  await expect(page.locator('.review-question')).toHaveCount(14);
  const stored = await page.evaluate(() =>
    JSON.parse(localStorage.getItem('testlearn.v1')!),
  );
  expect(stored.history).toHaveLength(1);
  expect(Object.keys(stored.history[0].answers)).toHaveLength(40);
  expect(stored.active).toBeNull();
});

test('zero score, expired resume and reset cancellation', async ({ page }) => {
  const s = createSession(examQuestions, 'exam', 60, fixedNow - 3601000);
  await page.addInitScript(
    (saved) =>
      localStorage.setItem(
        'testlearn.v1',
        JSON.stringify({ version: 1, active: saved, history: [] }),
      ),
    s,
  );
  await page.goto('/');
  await expect(
    page.getByRole('heading', { name: 'Resultados e revisão' }),
  ).toBeVisible();
  await expect(
    page.getByRole('heading', { name: '0 / 40', exact: true }),
  ).toBeVisible();
  await page.getByRole('button', { name: 'Progresso', exact: true }).click();
  await page
    .getByRole('button', { name: 'Apagar progresso', exact: true })
    .click();
  await page.getByRole('button', { name: 'Cancelar', exact: true }).click();
  expect(
    await page.evaluate(
      () => JSON.parse(localStorage.getItem('testlearn.v1')!).history.length,
    ),
  ).toBe(1);
});

test('practice filters, confirmed feedback persists, language selection and accessibility', async ({
  page,
}) => {
  await open(page);
  await page.getByRole('button', { name: 'Practice', exact: true }).click();
  await page.getByLabel('Chapter', { exact: true }).selectOption('4');
  await page.getByLabel('Cognitive level', { exact: true }).selectOption('K3');
  await page.getByLabel('Number of questions', { exact: true }).fill('1');
  await page
    .getByRole('button', { name: 'Start practice', exact: true })
    .click();
  const saved = await active(page);
  const q = questions.find((q) => q.id === saved.questionIds[0])!;
  expect(q.chapter).toBe(4);
  expect(q.level).toBe('K3');
  await page
    .getByRole('radio', {
      name: q.options.find((o) => o.id === q.correct[0])!.text.en,
      exact: true,
    })
    .check();
  await page.getByRole('button', { name: 'Check answer', exact: true }).click();
  await expect(page.getByRole('region', { name: 'Explanation' })).toContainText(
    'Correct answer',
  );
  await page.reload();
  await page.getByLabel('Idioma').selectOption('en');
  await expect(page.getByRole('region', { name: 'Explanation' })).toBeVisible();
  expect((await new AxeBuilder({ page }).analyze()).violations).toEqual([]);
});

test('corrupt data stays intact until explicit reset; confirmation clears local progress', async ({
  page,
}) => {
  await page.addInitScript(() =>
    localStorage.setItem('testlearn.v1', '{corrupted'),
  );
  await page.goto('/');
  await expect(page.getByRole('alert')).toBeVisible();
  expect(await page.evaluate(() => localStorage.getItem('testlearn.v1'))).toBe(
    '{corrupted',
  );
  await page.getByRole('button', { name: 'Progresso', exact: true }).click();
  await page
    .getByRole('button', { name: 'Apagar progresso', exact: true })
    .click();
  await page
    .getByRole('button', { name: 'Confirmar eliminação', exact: true })
    .click();
  await expect(
    page.getByRole('heading', { name: 'O seu espaço de aprendizagem' }),
  ).toBeVisible();
  const stored = await page.evaluate(() =>
    JSON.parse(localStorage.getItem('testlearn.v1')!),
  );
  expect(stored.history).toEqual([]);
  expect(stored.active).toBeNull();
});
