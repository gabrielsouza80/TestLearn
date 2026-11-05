import { test, expect } from '@playwright/test';
import { questions } from '../../src/data/questions';
import { createSession } from '../../src/domain/engine';
const now = Date.parse('2026-11-05T12:00:00Z');
const cases = [
  ['tl-008', 'o1'],
  ['tl-020', 'o1'],
  ['tl-021', 'o1'],
  ['tl-035', 'o1'],
  ['tl-038', 'o1'],
  ['tl-063', 'o1'],
  ['tl-064', 'o3'],
  ['tl-072', 'o1'],
] as const;
for (const [id, key] of cases) {
  test(`${id}: published bilingual content, independently derived key and persisted result`, async ({
    page,
  }) => {
    await page.clock.setFixedTime(new Date(now));
    const q = questions.find((q) => q.id === id)!;
    const session = createSession([q], 'practice', 0, now, 42);
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
    for (const lang of ['pt', 'en'] as const) {
      await page
        .getByLabel(/^(Idioma|Language)$/, { exact: true })
        .selectOption(lang);
      await expect(
        page.getByRole('heading', { name: q.text[lang], exact: true }),
      ).toBeVisible();
      await expect(page.getByRole('radio')).toHaveCount(4);
      for (const option of q.options)
        await expect(
          page.getByRole('radio', { name: option.text[lang], exact: true }),
        ).toBeVisible();
    }
    await page
      .getByRole('radio', {
        name: q.options.find((o) => o.id === key)!.text.en,
        exact: true,
      })
      .check();
    await page
      .getByRole('button', { name: 'Check answer', exact: true })
      .click();
    await expect(
      page.getByRole('region', { name: 'Explanation', exact: true }),
    ).toContainText(q.explanation.en);
    await page.reload();
    await page.getByLabel('Idioma', { exact: true }).selectOption('pt');
    await expect(
      page.getByRole('radio', {
        name: q.options.find((o) => o.id === key)!.text.pt,
        exact: true,
      }),
    ).toBeChecked();
    await expect(
      page.getByRole('region', { name: 'Explicação', exact: true }),
    ).toContainText(q.explanation.pt);
    await page
      .getByRole('button', { name: 'Terminar sessão', exact: true })
      .click();
    await page
      .getByRole('button', { name: 'Confirmar e terminar', exact: true })
      .click();
    await expect(
      page.getByRole('heading', { name: '1 / 1', exact: true }),
    ).toBeVisible();
    const stored = await page.evaluate(
      () => JSON.parse(localStorage.getItem('testlearn.v1')!).history[0],
    );
    expect(stored).toMatchObject({
      contentRevision: '2026-10-27.10',
      answers: { [id]: [key] },
      optionOrder: session.optionOrder,
    });
  });
}
