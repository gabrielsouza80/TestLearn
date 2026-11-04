import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
import pilot from '../../docs/experiments/advanced-interpretation/pilot-v1.json' with { type: 'json' };

test('local navigation, complete bilingual practice, summary and restart', async ({
  page,
}) => {
  await page.clock.install();
  await page.goto('/');
  await page.getByRole('link', { name: /Treino experimental/ }).click();
  await expect(page).toHaveURL(/\?training=advanced/);
  await page.getByRole('button', { name: 'Iniciar treino' }).click();
  for (const [i, q] of pilot.questions.entries()) {
    await expect(page.getByText(q.prompt.pt, { exact: true })).toBeVisible();
    await expect(page.getByRole('radio')).toHaveCount(4);
    for (const o of q.options)
      await expect(
        page.getByText(o.explanation.pt, { exact: true }),
      ).toHaveCount(0);
    await page.clock.runFor(2000);
    // Literal first wrong answer; subsequent stable IDs from the existing pilot.
    const selectedId = i === 0 ? 'p1' : q.correct[0];
    const selected = q.options.find((o) => o.id === selectedId)!;
    await page
      .getByRole('radio', { name: selected.text.pt, exact: true })
      .check();
    await page
      .getByRole('combobox', { name: 'Idioma', exact: true })
      .selectOption('en');
    await expect(page.getByText(q.prompt.en, { exact: true })).toBeVisible();
    await expect(
      page.getByRole('radio', { name: selected.text.en, exact: true }),
    ).toBeChecked();
    await expect(
      page.getByRole('region', { name: 'Answer analysis', exact: true }),
    ).toHaveCount(0);
    await page.getByRole('button', { name: 'Submit answer' }).click();
    const feedback = page.getByRole('region', {
      name: 'Answer analysis',
      exact: true,
    });
    await expect(
      feedback.getByRole('heading', {
        name: i === 0 ? 'Incorrect answer' : 'Correct answer',
        exact: true,
      }),
    ).toBeFocused();
    for (const o of q.options)
      await expect(
        feedback.getByText(o.explanation.en, { exact: true }),
      ).toBeVisible();
    const frozen = await page
      .getByLabel('Active question time', { exact: true })
      .textContent();
    await page.clock.runFor(3000);
    await expect(
      page.getByLabel('Active question time', { exact: true }),
    ).toHaveText(frozen!);
    await page
      .getByRole('combobox', { name: 'Language', exact: true })
      .selectOption('pt');
    await page
      .getByRole('button', {
        name: i === 9 ? 'Ver resumo' : 'Próxima questão',
        exact: true,
      })
      .click();
  }
  await expect(
    page.getByRole('heading', { name: 'Resumo da sessão' }),
  ).toBeFocused();
  await expect(page.getByText('9 / 10 · 90%', { exact: true })).toBeVisible();
  await expect(page.getByRole('table').getByRole('row')).toHaveCount(11);
  await expect(page.getByRole('table')).toContainText('exp-ai-010');
  expect(
    await page.evaluate(() => localStorage.getItem('testlearn.v1')),
  ).toBeNull();
  await page.getByRole('button', { name: 'Recomeçar sessão' }).click();
  await page.getByRole('button', { name: 'Iniciar treino' }).click();
  await expect(
    page.getByText('Questão 1 de 10', { exact: true }),
  ).toBeVisible();
  await expect(
    page.getByRole('region', { name: 'Análise da resposta', exact: true }),
  ).toHaveCount(0);
});

test('long scenarios remain readable and accessible at narrow widths and zoom', async ({
  page,
}) => {
  await page.goto('/?training=advanced');
  await page.getByRole('button', { name: 'Iniciar treino' }).click();
  await expect(
    page.getByText(pilot.questions[0].prompt.pt, { exact: true }),
  ).toBeVisible();
  const widths = [320, 640];
  for (const width of widths) {
    await page.setViewportSize({ width, height: 800 });
    expect(
      await page.evaluate(
        () => document.documentElement.scrollWidth <= window.innerWidth,
      ),
    ).toBe(true);
  }
  await page.evaluate(() => {
    document.documentElement.style.fontSize = '200%';
  });
  expect(
    await page.evaluate(
      () => document.documentElement.scrollWidth <= window.innerWidth,
    ),
  ).toBe(true);
  const violations = (await new AxeBuilder({ page }).analyze()).violations;
  expect(violations).toEqual([]);
  await page
    .getByRole('radio', {
      name: pilot.questions[0].options[0].text.pt,
      exact: true,
    })
    .focus();
  await expect(
    page.getByRole('radio', {
      name: pilot.questions[0].options[0].text.pt,
      exact: true,
    }),
  ).toBeFocused();
  await page.screenshot({
    path: test.info().outputPath('advanced-long-question.png'),
    fullPage: true,
  });
});

test('production query cannot open experimental training or request its data', async ({
  page,
}) => {
  const urls: string[] = [];
  page.on('request', (request) => urls.push(request.url()));
  await page.goto('http://127.0.0.1:4176/?training=advanced');
  await expect(
    page.getByRole('heading', { name: 'O seu espaço de aprendizagem' }),
  ).toBeVisible();
  await expect(
    page.getByRole('link', { name: /Treino experimental/ }),
  ).toHaveCount(0);
  await expect(
    page.getByRole('heading', { name: 'Treino de interpretação avançada' }),
  ).toHaveCount(0);
  expect(
    urls.some((url) =>
      /pilot-v1|experimental|advanced-interpretation|DevelopmentApp/.test(url),
    ),
  ).toBe(false);
  expect(await page.content()).not.toContain('exp-ai-001');
});
