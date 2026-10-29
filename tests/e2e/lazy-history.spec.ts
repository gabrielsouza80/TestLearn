import { test, expect } from '@playwright/test';
import { bilingualArchivedQuestions } from '../fixtures/banks';
import { createSession, answer, finish } from '../../src/domain/engine';
import { questions } from '../../src/data/questions';
const now = Date.parse('2026-10-28T12:00:00Z');
const q = bilingualArchivedQuestions.find((q) => q.id === 'tl-003')!;
const session = {
  ...answer(createSession([q], 'practice', 0, now, 42), q.id, q.correct, now),
  contentRevision: '2026-10-27.5',
  feedbackIds: [q.id],
};
const raw = JSON.stringify({ version: 1, active: session, history: [] });
const archive = /\/assets\/questions-2026-10-27\.5-[^/]+\.js$/;
async function seed(page: import('@playwright/test').Page) {
  await page.goto('/');
  await page.evaluate(
    (value) => localStorage.setItem('testlearn.v1', value),
    raw,
  );
}
test('fresh dashboard and new examination request no historical chunks', async ({
  page,
}) => {
  // This seed starts with a multiple-answer item, which must use checkboxes.
  await page.clock.setFixedTime(new Date(now + 30));
  const archives: string[] = [];
  page.on('request', (request) => {
    if (request.url().includes('/assets/questions-2026-10-27.'))
      archives.push(request.url());
  });
  await page.goto('/');
  await expect(
    page.getByRole('heading', {
      name: 'O seu espaço de aprendizagem',
      exact: true,
    }),
  ).toBeVisible();
  await page
    .getByRole('button', { name: 'Iniciar simulação', exact: true })
    .click();
  await expect(
    page.getByRole('group', { name: /^(?:Selecione|Select) [12] / }),
  ).toBeVisible();
  const saved = await page.evaluate(
    () => JSON.parse(localStorage.getItem('testlearn.v1')!).active,
  );
  expect(saved.contentRevision).toBe('2026-10-27.9');
  expect(saved.questionIds).toHaveLength(40);
  const current = questions.find(
    (question) => question.id === saved.questionIds[saved.index],
  )!;
  expect(current.required).toBe(2);
  await expect(
    page.getByRole('heading', { name: current.text.pt, exact: true }),
  ).toBeVisible();
  const role = current.required === 1 ? 'radio' : 'checkbox';
  await expect(page.getByRole(role)).toHaveCount(current.options.length);
  for (const option of current.options)
    await expect(
      page.getByRole(role, { name: option.text.pt, exact: true }),
    ).toBeVisible();
  expect(archives).toEqual([]);
});
test('failed historical download preserves raw progress and explicit reload recovers the exact key and bilingual explanation', async ({
  page,
}) => {
  await page.clock.setFixedTime(new Date(now));
  await seed(page);
  await page.route(archive, (route) => route.abort('failed'));
  await page.reload();
  await expect(page.getByRole('alert')).toContainText(
    'dados guardados foram preservados',
  );
  expect(await page.evaluate(() => localStorage.getItem('testlearn.v1'))).toBe(
    raw,
  );
  await expect(page.getByRole('radio')).toHaveCount(0);
  await page.unroute(archive);
  await page
    .getByRole('button', { name: /Recarregar e tentar novamente/ })
    .click();
  await expect(
    page.getByRole('heading', { name: q.text.pt, exact: true }),
  ).toBeVisible();
  await expect(
    page.getByRole('radio', {
      name: q.options.find((o) => o.id === 'o1')!.text.pt,
      exact: true,
    }),
  ).toBeChecked();
  await expect(
    page.getByRole('region', { name: 'Explicação', exact: true }),
  ).toContainText(q.explanation.pt);
  await page.getByLabel('Idioma', { exact: true }).selectOption('en');
  await expect(
    page.getByRole('region', { name: 'Explanation', exact: true }),
  ).toContainText(q.explanation.en);
  expect(await page.evaluate(() => localStorage.getItem('testlearn.v1'))).toBe(
    raw,
  );
});
test('reload during an unresolved archive never displays current answers and restores the same session', async ({
  page,
}) => {
  await page.clock.setFixedTime(new Date(now));
  await seed(page);
  let release!: () => void;
  const waiting = new Promise<void>((yes) => {
    release = yes;
  });
  await page.route(archive, async (route) => {
    await waiting;
    await route.continue().catch(() => {
      /* first navigation may have been cancelled by reload */
    });
  });
  try {
    await page.reload({ waitUntil: 'domcontentloaded' });
    await expect(page.getByRole('status')).toContainText('A carregar');
    await expect(page.getByRole('radio')).toHaveCount(0);
    expect(
      await page.evaluate(() => localStorage.getItem('testlearn.v1')),
    ).toBe(raw);
    await page.reload({ waitUntil: 'domcontentloaded' });
    release();
    await expect(
      page.getByRole('heading', { name: q.text.pt, exact: true }),
    ).toBeVisible();
    expect(
      await page.evaluate(
        () => JSON.parse(localStorage.getItem('testlearn.v1')!).active,
      ),
    ).toEqual(session);
  } finally {
    release();
  }
});
test('completed historical review keeps original rationales when switching language', async ({
  page,
}) => {
  await page.clock.setFixedTime(new Date(now));
  await page.goto('/');
  const completed = finish(session, now);
  await page.evaluate(
    (s) =>
      localStorage.setItem(
        'testlearn.v1',
        JSON.stringify({ version: 1, active: null, history: [s] }),
      ),
    completed,
  );
  await page.reload();
  await page.getByRole('button', { name: 'Progresso', exact: true }).click();
  await page.getByRole('button', { name: 'Rever', exact: true }).click();
  await expect(
    page.getByRole('heading', { name: '1 / 1', exact: true }),
  ).toBeVisible();
  const explanation = page.getByRole('region', {
    name: 'Explicação da questão 1',
    exact: true,
  });
  for (const option of q.options)
    await expect(explanation).toContainText(option.explanation.pt);
  await page.getByLabel('Idioma', { exact: true }).selectOption('en');
  for (const option of q.options)
    await expect(
      page.getByRole('region', {
        name: 'Explanation for question 1',
        exact: true,
      }),
    ).toContainText(option.explanation.en);
  expect(
    await page.evaluate(
      () => JSON.parse(localStorage.getItem('testlearn.v1')!).history[0],
    ),
  ).toEqual(completed);
});
