import { test, expect, type Page } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
import { questions } from '../../src/data/questions';
import type { Session } from '../../src/domain/engine';
import {
  visualExam,
  visualPractice,
  visualNow,
} from '../fixtures/visual-review';
import {
  reviewNumbers,
  reviewQuestion,
  revealRationales,
  showEditingOptions,
} from '../fixtures/review-navigation';

async function restore(page: Page, session: Session) {
  await page.clock.setFixedTime(new Date(visualNow));
  await page.goto('/');
  await expect(
    page.getByRole('button', { name: 'Fazer simulado CTFL', exact: true }),
  ).toBeEnabled();
  await page.evaluate(
    (s) =>
      localStorage.setItem(
        'testlearn.v1',
        JSON.stringify({ version: 1, active: null, history: [s] }),
      ),
    session,
  );
  await page.reload();
  await page.getByRole('button', { name: 'Progresso', exact: true }).click();
  await page.getByRole('button', { name: 'Rever', exact: true }).click();
}
const raw = (page: Page) =>
  page.evaluate(() => localStorage.getItem('testlearn.v1'));

test('all forty original questions, tables and shuffled options remain reachable without changing stored results', async ({
  page,
}) => {
  test.setTimeout(90000);
  const session = visualExam();
  await restore(page, session);
  const before = await raw(page);
  await expect(reviewNumbers(page)).toHaveCount(40);
  for (let n = 1; n <= 40; n++) {
    await reviewQuestion(page, n);
    const q = questions.find((q) => q.id === session.questionIds[n - 1])!,
      card = page.locator('.review-question');
    await expect(card).toHaveCount(1);
    await expect(card).toHaveAttribute('data-question-id', q.id);
    await expect(card).toHaveAttribute(
      'data-status',
      n <= 26 ? 'correct' : n <= 35 ? 'incorrect' : 'unanswered',
    );
    await expect(
      card.getByRole('heading', { name: q.text.pt, exact: true }),
    ).toBeVisible();
    expect(
      await card
        .locator('[data-option-id]')
        .evaluateAll((nodes) =>
          nodes.map((n) => n.getAttribute('data-option-id')),
        ),
    ).toEqual(session.optionOrder[q.id]);
    await expect(card.locator('.option-letter')).toHaveText(
      q.options.map((_, i) => `${String.fromCharCode(65 + i)}.`),
    );
    await expect(card.locator('.learning-takeaway')).toContainText(
      q.explanation.pt,
    );
    for (const option of q.options) {
      const alternative = card.locator(`[data-option-id="${option.id}"]`);
      await expect(alternative).toContainText(option.text.pt);
      const rationale = alternative.getByText(option.explanation.pt, {
        exact: true,
      });
      if (
        q.correct.includes(option.id) ||
        session.answers[q.id]?.includes(option.id)
      ) {
        await expect(rationale).toBeVisible();
      } else {
        await expect(rationale).not.toBeVisible();
        await alternative.locator('summary').click();
        await expect(rationale).toBeVisible();
      }
    }
    if (q.table) {
      await expect(card.locator('thead th')).toHaveText(q.table.headers);
      for (const [i, row] of q.table.rows.entries())
        await expect(
          card.locator('tbody tr').nth(i).locator('th,td'),
        ).toHaveText(row);
    }
  }
  const filter = page.getByLabel('Mostrar', { exact: true });
  await filter.focus();
  await filter.selectOption('incorrect');
  await expect(filter).toBeFocused();
  await expect(reviewNumbers(page)).toHaveCount(9);
  await expect(reviewNumbers(page).first()).toHaveAccessibleName(
    'Questão 27 — Incorreta',
  );
  await reviewQuestion(page, 30);
  await page
    .getByRole('button', { name: 'Pergunta seguinte →', exact: true })
    .click();
  await expect(page.locator('.review-question')).toHaveAttribute(
    'data-question-id',
    session.questionIds[30],
  );
  await expect(filter).toHaveValue('incorrect');
  await page.getByLabel('Idioma', { exact: true }).selectOption('en');
  await expect(page.getByLabel('Show', { exact: true })).toHaveValue(
    'incorrect',
  );
  await expect(reviewNumbers(page)).toHaveCount(9);
  await expect(page.locator('.review-question h3')).toHaveText(
    questions.find((q) => q.id === session.questionIds[30])!.text.en,
  );
  expect(await raw(page)).toBe(before);
});

test('partial multiple-response review exposes exact rationales and letters in both languages without partial credit', async ({
  page,
}) => {
  const session = visualPractice(),
    q = questions.find((q) => q.id === 'tl-083')!;
  await restore(page, session);
  const before = await raw(page),
    card = page.locator('.review-question');
  await expect(
    page.getByRole('heading', { name: '1 / 3', exact: true }),
  ).toBeVisible();
  await expect(card).toHaveAttribute('data-status', 'incorrect');
  await expect(card).toContainText('A sua resposta: D, E');
  await expect(card).toContainText('Resposta correta: B, D');
  for (const id of ['o1', ...q.correct])
    await expect(
      card
        .locator(`[data-option-id="${id}"]`)
        .getByText(q.options.find((o) => o.id === id)!.explanation.pt, {
          exact: true,
        }),
    ).toBeVisible();
  const neutral = card.locator('[data-option-id="o5"]');
  await expect(
    neutral.getByText(q.options.find((o) => o.id === 'o5')!.explanation.pt, {
      exact: true,
    }),
  ).not.toBeVisible();
  await neutral.locator('summary').focus();
  await page.keyboard.press('Enter');
  await expect(
    neutral.getByText(q.options.find((o) => o.id === 'o5')!.explanation.pt, {
      exact: true,
    }),
  ).toBeVisible();
  await expect(card.locator('.learning-takeaway')).toHaveCount(1);
  await expect(card.locator('.learning-takeaway')).toContainText(
    q.explanation.pt,
  );
  await card
    .getByText('Origem e referência da pergunta', { exact: true })
    .click();
  await expect(card.locator('.question-reference')).toHaveAttribute('open', '');
  expect((await new AxeBuilder({ page }).analyze()).violations).toEqual([]);
  await page.getByLabel('Idioma', { exact: true }).selectOption('en');
  await revealRationales(card, q, 'en');
  await expect(card).toContainText('no partial credit');
  await expect(
    card.getByText('Question origin and reference', { exact: true }),
  ).toBeVisible();
  await reviewQuestion(page, 2);
  await expect(card).toHaveAttribute('data-status', 'unanswered');
  await expect(card).toContainText('Your answer: Unanswered');
  expect(await raw(page)).toBe(before);
});

test('routine writer release is secondary and keyboard accessible while recovery remains explicit', async ({
  page,
}) => {
  await page.goto('/');
  const start = page.getByRole('button', {
    name: 'Fazer simulado CTFL',
    exact: true,
  });
  await expect(start).toBeEnabled();
  const release = page.getByRole('button', {
    name: 'Libertar edição neste separador',
    exact: true,
  });
  await expect(release).not.toBeVisible();
  const before = await raw(page);
  await showEditingOptions(page);
  await expect(release).toBeVisible();
  await release.focus();
  await page.keyboard.press('Enter');
  const retry = page.getByRole('button', {
    name: 'Tentar obter acesso de escrita',
    exact: true,
  });
  await expect(retry).toBeVisible();
  await expect(start).toBeDisabled();
  expect(await raw(page)).toBe(before);
  await retry.click();
  await expect(start).toBeEnabled();
  expect(await raw(page)).toBe(before);
});
