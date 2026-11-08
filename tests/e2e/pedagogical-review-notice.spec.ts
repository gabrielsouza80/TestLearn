import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
import { questions } from '../../src/data/questions';
import { createSession } from '../../src/domain/engine';

const now = Date.parse('2026-11-08T12:00:00Z');
const q = questions.find((item) => item.id === 'tl-038')!;
const other = questions.find((item) => item.id === 'tl-078')!;

test('bilingual notice is keyboard-accessible, responsive and isolated; practice retains answers and score', async ({
  page,
}, testInfo) => {
  await page.clock.setFixedTime(new Date(now));
  const session = createSession([q, other], 'practice', 0, now, 42);
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
  await expect(
    page.getByText('Pronto para guardar neste navegador.', { exact: true }),
  ).toBeVisible();
  for (const [lang, title, description] of [
    [
      'pt',
      'Em revisão pedagógica',
      'Esta questão está em análise quanto ao nível de exigência pedagógica. A resposta e a pontuação permanecem inalteradas.',
    ],
    [
      'en',
      'Under pedagogical review',
      'This question is under review regarding its cognitive demand. The answer and scoring remain unchanged.',
    ],
  ]) {
    await page.getByLabel(/^(Idioma|Language)$/).selectOption(lang);
    const note = page.getByRole('note', { name: title, exact: true });
    await expect(note).toHaveAccessibleDescription(description);
    await expect(note).toContainText(description);
    await expect(page.locator('.feedback')).toHaveCount(0);
    await expect(note).not.toContainText(
      /o1|201|500|correct answer|resposta correta/i,
    );
    await note.focus();
    await expect(note).toBeFocused();
    await page.keyboard.press('Tab');
    await expect(page.getByRole('radio').first()).toBeFocused();
    await page.keyboard.press('Shift+Tab');
    await expect(note).toBeFocused();
    const audit = await new AxeBuilder({ page })
      .include('.pedagogical-review-notice')
      .withTags(['wcag2a', 'wcag2aa'])
      .analyze();
    expect(audit.violations).toEqual([]);
    for (const width of [320, 1280]) {
      await page.setViewportSize({ width, height: 900 });
      await expect(note).toBeVisible();
      const bounds = await note.boundingBox();
      expect(bounds).not.toBeNull();
      expect(bounds!.x).toBeGreaterThanOrEqual(0);
      expect(bounds!.x + bounds!.width).toBeLessThanOrEqual(width);
      expect(
        await page.evaluate(
          () => document.documentElement.scrollWidth <= window.innerWidth,
        ),
      ).toBe(true);
    }
  }
  await page.setViewportSize({ width: 320, height: 900 });
  await page.evaluate(() => {
    document.documentElement.style.fontSize = '200%';
  });
  await expect(page.getByRole('note')).toBeVisible();
  expect(
    await page
      .getByRole('note')
      .evaluate((element) => element.scrollWidth <= element.clientWidth),
  ).toBe(true);
  expect(
    await page.evaluate(
      () => document.documentElement.scrollWidth <= window.innerWidth,
    ),
  ).toBe(true);
  await page.getByRole('note').screenshot({
    path: testInfo.outputPath('notice-320-text-200-percent.png'),
  });
  await page.evaluate(() => {
    document.documentElement.style.fontSize = '';
  });
  await page.setViewportSize({ width: 1280, height: 900 });
  await page
    .getByRole('radio', {
      name: q.options.find((option) => option.id === 'o1')!.text.en,
      exact: true,
    })
    .check();
  await page.getByRole('button', { name: 'Check answer', exact: true }).click();
  const feedback = page.getByRole('region', {
    name: 'Explanation',
    exact: true,
  });
  await expect(feedback).toHaveClass(/\bfeedback-correct\b/);
  await expect(feedback.locator('.feedback-status')).toHaveText(
    '✓ Correct answer',
  );
  await page.getByRole('button', { name: 'Next', exact: true }).click();
  await expect(
    page.getByRole('heading', { name: other.text.en, exact: true }),
  ).toBeVisible();
  await expect(page.getByRole('note')).toHaveCount(0);
  await page.getByRole('button', { name: 'Previous', exact: true }).click();
  await expect(page.getByRole('note')).toBeVisible();
  await page
    .getByRole('button', { name: 'Finish session', exact: true })
    .click();
  await page
    .getByRole('button', { name: 'Confirm and finish', exact: true })
    .click();
  await expect(
    page.getByRole('heading', { name: '1 / 2', exact: true }),
  ).toBeVisible();
  await page.reload();
  const saved = await page.evaluate(() =>
    JSON.parse(localStorage.getItem('testlearn.v1')!),
  );
  expect(saved.active).toBeNull();
  expect(saved.history).toHaveLength(1);
  expect(saved.history[0]).toMatchObject({
    contentRevision: '2026-10-27.10',
    answers: { 'tl-038': ['o1'] },
    optionOrder: session.optionOrder,
  });
});
