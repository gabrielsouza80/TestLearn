import { test, expect } from '@playwright/test';
import { questions } from '../../src/data/questions';
import { createSession } from '../../src/domain/engine';

test('incorrect feedback cannot satisfy the specific correct-feedback assertions', async ({
  page,
}) => {
  const now = Date.parse('2026-11-08T12:00:00Z');
  const question = questions.find((q) => q.id === 'tl-038')!;
  const session = createSession([question], 'practice', 0, now, 42);
  await page.clock.setFixedTime(new Date(now));
  await page.goto('/');
  await page.evaluate(
    (active) =>
      localStorage.setItem(
        'testlearn.v1',
        JSON.stringify({ version: 1, active, history: [] }),
      ),
    session,
  );
  await page.reload();
  await page.getByLabel('Idioma', { exact: true }).selectOption('en');
  await expect(
    page.getByRole('note', { name: 'Under pedagogical review', exact: true }),
  ).toBeVisible();
  await expect(
    page.getByRole('region', { name: 'Explanation', exact: true }),
  ).toHaveCount(0);
  await page
    .getByRole('radio', {
      name: question.options.find((o) => o.id === 'o2')!.text.en,
      exact: true,
    })
    .check();
  await page.getByRole('button', { name: 'Check answer', exact: true }).click();
  const feedback = page.getByRole('region', {
    name: 'Explanation',
    exact: true,
  });
  await expect(feedback).toHaveClass(/\bfeedback-incorrect\b/);
  await expect(feedback).not.toHaveClass(/\bfeedback-correct\b/);
  await expect(feedback.locator('.feedback-status')).toHaveText(
    '✗ Incorrect answer',
  );
  await expect(feedback.locator('.feedback-status')).not.toHaveText(
    '✓ Correct answer',
  );
  await page
    .getByRole('button', { name: 'Finish session', exact: true })
    .click();
  await page
    .getByRole('button', { name: 'Confirm and finish', exact: true })
    .click();
  await expect(
    page.getByRole('heading', { name: '0 / 1', exact: true }),
  ).toBeVisible();
  const stored = await page.evaluate(() =>
    JSON.parse(localStorage.getItem('testlearn.v1')!),
  );
  expect(stored.history).toHaveLength(1);
  expect(stored.history[0].answers).toEqual({ 'tl-038': ['o2'] });
});
