import { test, expect, type Page } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
import { questions } from '../../src/data/questions';
import {
  answer,
  createSession,
  finish,
  type Session,
} from '../../src/domain/engine';
import { selectPracticeExam } from '../../src/domain/blueprint';
import { variabilityArchivedQuestions } from '../fixtures/banks';
const now = Date.parse('2026-10-29T12:00:00Z');
const q = (id: string) => questions.find((q) => q.id === id)!;
async function restore(
  page: Page,
  active: Session | null,
  history: Session[] = [],
) {
  await page.goto('/');
  await page.evaluate(
    (state) => localStorage.setItem('testlearn.v1', JSON.stringify(state)),
    { version: 1, active, history },
  );
  await page.reload();
}
async function end(page: Page, english = false) {
  await page
    .getByRole('button', {
      name: english ? 'Finish session' : 'Terminar sessão',
      exact: true,
    })
    .click();
  await page
    .getByRole('button', {
      name: english ? 'Confirm and finish' : 'Confirmar e terminar',
      exact: true,
    })
    .click();
}
async function openHistory(page: Page) {
  await page.getByRole('button', { name: 'Progresso', exact: true }).click();
  await page.getByRole('button', { name: 'Rever', exact: true }).click();
}
test.beforeEach(async ({ page }) => page.clock.setFixedTime(new Date(now)));
test('chapter/topic/objective filters teach official meanings and cognitive levels through native keyboard controls', async ({
  page,
}) => {
  await page.goto('/');
  await page.getByRole('button', { name: 'Praticar', exact: true }).click();
  await page.getByLabel('Capítulo', { exact: true }).selectOption('1');
  await page
    .getByLabel('Tópico', { exact: true })
    .selectOption(q('tl-041').topic);
  await page
    .getByLabel('Objetivo de aprendizagem', { exact: true })
    .selectOption('FL-1.5.2');
  const objectiveDetails = page
    .locator('.learning-help')
    .filter({ hasText: 'FL-1.5.2' });
  const summary = page.getByText('Conhecer o objetivo FL-1.5.2', {
    exact: true,
  });
  await summary.focus();
  await page.keyboard.press('Enter');
  await expect(objectiveDetails).toHaveAttribute('open', '');
  await expect(objectiveDetails).toContainText(
    'Recordar as vantagens do Whole Team Approach',
  );
  await page.getByLabel('Idioma', { exact: true }).selectOption('en');
  await expect(objectiveDetails).toContainText(
    'Recall the advantages of the whole team approach',
  );
  const help = page.getByText('K1, K2 and K3 — what do they mean?', {
    exact: true,
  });
  await help.focus();
  await page.keyboard.press('Enter');
  for (const title of ['K1 — Remember', 'K2 — Understand', 'K3 — Apply'])
    await expect(help.locator('..')).toContainText(title);
  await page.getByLabel('Chapter', { exact: true }).selectOption('6');
  await expect(page.getByLabel('Topic', { exact: true })).toHaveValue('');
  await expect(
    page.getByLabel('Learning objective', { exact: true }),
  ).toHaveValue('');
  await expect(
    page.getByLabel('Learning objective', { exact: true }).locator('option'),
  ).toHaveCount(3);
  await page
    .getByLabel('Question history', { exact: true })
    .selectOption('unanswered');
  await expect(
    page.getByText(
      'No questions match these filters. Change the selection or history.',
      { exact: true },
    ),
  ).toBeVisible();
  await expect(
    page.getByRole('button', { name: 'Start practice', exact: true }),
  ).toBeDisabled();
  await page
    .getByLabel('Question history', { exact: true })
    .selectOption('all');
  await expect(
    page.getByLabel('Number of questions', { exact: true }),
  ).toHaveAttribute('max', '4');
  await page.getByLabel('Number of questions', { exact: true }).fill('1');
  await expect(
    page.getByRole('button', { name: 'Start practice', exact: true }),
  ).toBeEnabled();
  expect((await new AxeBuilder({ page }).analyze()).violations).toEqual([]);
});
test('five-option letters survive language and reload, and mixed multiple-answer review keeps identities and original numbers', async ({
  page,
}) => {
  const bank = ['tl-089', 'tl-083', 'tl-090'].map(q);
  let s = createSession(bank, 'practice', 0, now, 42);
  s = {
    ...s,
    optionOrder: Object.fromEntries(
      bank.map((q) => [q.id, q.options.map((o) => o.id).reverse()]),
    ),
  };
  await restore(page, s);
  await expect(
    page
      .getByRole('group', { name: /^(?:Selecione|Select) [12] / })
      .locator('.option-letter'),
  ).toHaveText(['A.', 'B.', 'C.', 'D.', 'E.']);
  const first = page.getByRole('radio', {
    name: bank[0].options.find((o) => o.id === 'o4')!.text.pt,
    exact: true,
  });
  await expect(first).toHaveAccessibleDescription('Opção B');
  await first.focus();
  await page.keyboard.press('Space');
  await expect(first).toBeChecked();
  await expect
    .poll(() =>
      page.evaluate(
        () =>
          JSON.parse(localStorage.getItem('testlearn.v1')!).active.answers[
            'tl-089'
          ],
      ),
    )
    .toEqual(['o4']);
  await page.reload();
  await expect(first).toBeChecked();
  await page.getByLabel('Idioma', { exact: true }).selectOption('en');
  const firstEN = page.getByRole('radio', {
    name: bank[0].options.find((o) => o.id === 'o4')!.text.en,
    exact: true,
  });
  await expect(firstEN).toBeChecked();
  await expect(firstEN).toHaveAccessibleDescription('Option B');
  await page.getByRole('button', { name: 'Check answer', exact: true }).click();
  await page.getByRole('button', { name: 'Next', exact: true }).click();
  for (const id of ['o1', 'o2'])
    await page
      .getByRole('checkbox', {
        name: bank[1].options.find((o) => o.id === id)!.text.en,
        exact: true,
      })
      .check();
  await page.getByRole('button', { name: 'Check answer', exact: true }).click();
  await page.getByRole('button', { name: 'Next', exact: true }).click();
  await end(page, true);
  await expect(
    page.getByRole('heading', { name: '1 / 3', exact: true }),
  ).toBeVisible();
  await expect(page.locator('.review-correct')).toHaveCount(1);
  await expect(page.locator('.review-incorrect')).toHaveCount(1);
  await expect(page.locator('.review-unanswered')).toHaveCount(1);
  const card = page.locator('[data-question-id="tl-089"]');
  await expect(card.locator('.review-options .option-letter')).toHaveText([
    'A.',
    'B.',
    'C.',
    'D.',
    'E.',
  ]);
  await expect(card.locator('[data-option-id="o4"]')).toContainText(
    'Selected by you',
  );
  await expect(card).toContainText('Your answer: B');
  await card
    .getByText('About this question — origin and reference', { exact: true })
    .click();
  await expect(card).toContainText(
    'Original TestLearn question — AI-assisted creation and review.',
  );
  await expect(card).toContainText('§5.1.4; PDF pp.49, 50');
  await expect(
    card.getByRole('link', {
      name: 'ISTQB Certified Tester Foundation Level Syllabus v4.0.1 ↗',
      exact: true,
    }),
  ).toHaveAttribute(
    'href',
    'https://istqb.org/?download_id=3345&sdm_process_download=1',
  );
  await page.getByLabel('Show', { exact: true }).selectOption('incorrect');
  await expect(page.locator('.review-question')).toHaveCount(1);
  await expect(
    page.getByText('Question 2 of 3 · FL-3.2.4 · K2', { exact: true }),
  ).toBeVisible();
  await expect(page.locator('.review-question')).toContainText(
    'no partial credit',
  );
  await expect(page.locator('[data-option-id="o1"]')).toHaveClass(
    /review-option-wrong/,
  );
  await page.getByText('Why is A incorrect?', { exact: true }).click();
  await expect(
    page.getByText(bank[1].options.find((o) => o.id === 'o5')!.explanation.en, {
      exact: true,
    }),
  ).toBeVisible();
  await page
    .getByLabel('Go to question', { exact: true })
    .selectOption('tl-083');
  await expect(
    page.getByRole('heading', { name: bank[1].text.en, exact: true }),
  ).toBeFocused();
  await page.getByLabel('Show', { exact: true }).selectOption('unanswered');
  await expect(
    page.getByText('Question 3 of 3 · FL-5.5.1 · K3', { exact: true }),
  ).toBeVisible();
  await page.getByLabel('Show', { exact: true }).selectOption('correct');
  await expect(
    page.getByText('Question 1 of 3 · FL-5.1.4 · K3', { exact: true }),
  ).toBeVisible();
  expect((await new AxeBuilder({ page }).analyze()).violations).toEqual([]);
  expect(
    await page.evaluate(
      () =>
        JSON.parse(localStorage.getItem('testlearn.v1')!).history[0]
          .optionOrder,
    ),
  ).toEqual(s.optionOrder);
});
test('historical three-option attempt uses its own order, wording and answer key throughout review', async ({
  page,
}) => {
  const old = variabilityArchivedQuestions.find((q) => q.id === 'tl-003')!;
  const s = {
    ...answer(
      createSession([old], 'practice', 0, now, 42),
      old.id,
      old.correct,
      now,
    ),
    contentRevision: '2026-10-27.6',
    optionOrder: { [old.id]: ['o3', 'o2', 'o1'] },
  };
  await restore(page, s);
  await expect(page.getByRole('radio')).toHaveCount(3);
  await expect(
    page
      .getByRole('group', { name: /^(?:Selecione|Select) [12] / })
      .locator('.option-letter'),
  ).toHaveText(['A.', 'B.', 'C.']);
  await expect(
    page.getByRole('radio', { name: old.options[0].text.pt, exact: true }),
  ).toHaveAccessibleDescription('Opção C');
  await page
    .getByRole('button', { name: 'Confirmar resposta', exact: true })
    .click();
  await end(page);
  await expect(
    page.getByRole('heading', { name: '1 / 1', exact: true }),
  ).toBeVisible();
  await expect(page.locator('.review-options .option-letter')).toHaveText([
    'A.',
    'B.',
    'C.',
  ]);
  await expect(page.locator('.review-question')).toContainText(
    'A sua resposta: C',
  );
  await expect(page.locator('[data-option-id="o1"]')).toContainText(
    old.options[0].text.pt,
  );
  expect(
    await page.evaluate(
      () => JSON.parse(localStorage.getItem('testlearn.v1')!).history[0],
    ),
  ).toEqual(finish({ ...s, feedbackIds: [old.id] }, now));
});
for (const correct of [26, 25])
  test(`aligned exam result presents ${correct}/40 and the practice outcome without changing historical selections`, async ({
    page,
  }) => {
    const bank = selectPracticeExam(questions, 42);
    let s = createSession(bank, 'exam', 60, now - 60000, 42);
    for (const [i, item] of bank.entries())
      s = answer(
        s,
        item.id,
        i < correct
          ? item.correct
          : item.options
              .filter((o) => !item.correct.includes(o.id))
              .slice(0, item.required)
              .map((o) => o.id),
        now - 50000,
      );
    s = finish(s, now);
    await restore(page, null, [s]);
    await openHistory(page);
    await expect(
      page.getByRole('heading', { name: `${correct} / 40`, exact: true }),
    ).toBeVisible();
    await expect(
      page.getByText(
        correct === 26
          ? 'Aprovado na simulação de prática'
          : 'Não aprovado na simulação de prática',
        { exact: true },
      ),
    ).toBeVisible();
    await expect(
      page.getByText('Limiar de referência: 26/40 (65%)', { exact: true }),
    ).toBeVisible();
    await page.getByLabel('Idioma', { exact: true }).selectOption('en');
    await expect(
      page.getByText(
        correct === 26
          ? 'Passed the practice exam'
          : 'Did not pass the practice exam',
        { exact: true },
      ),
    ).toBeVisible();
    await expect(
      page.getByText(`Percentage: ${correct === 26 ? '65' : '62.5'}%`, {
        exact: true,
      }),
    ).toBeVisible();
    await page.getByLabel('Show', { exact: true }).selectOption('unanswered');
    await expect(page.getByRole('status')).toContainText(
      'No questions in this category',
    );
    await page.getByLabel('Show', { exact: true }).selectOption('correct');
    await expect(page.locator('.review-question')).toHaveCount(correct);
    await page
      .getByRole('button', { name: 'New practice exam', exact: true })
      .click();
    await expect(
      page.getByRole('group', { name: /^(?:Selecione|Select) [12] / }),
    ).toBeVisible();
    await expect(page.locator('.question-reference')).toHaveCount(0);
    await expect(page.getByText(/Understand objective FL-/)).toHaveCount(0);
    expect(
      await page.evaluate(
        () => JSON.parse(localStorage.getItem('testlearn.v1')!).history[0],
      ),
    ).toEqual(s);
  });
for (const kind of ['early', 'expired'])
  test(`${kind} empty exam is unanswered, not forty incorrect answers, with no fabricated completion reason`, async ({
    page,
  }) => {
    const bank = selectPracticeExam(questions, 42),
      s = createSession(
        bank,
        'exam',
        60,
        kind === 'expired' ? now - 3600001 : now,
        42,
      );
    await restore(page, s);
    if (kind === 'early') await end(page);
    await expect(
      page.getByRole('heading', { name: '0 / 40', exact: true }),
    ).toBeVisible();
    await expect(
      page.getByText('Não aprovado na simulação de prática', { exact: true }),
    ).toBeVisible();
    await expect(
      page.getByText(
        'O motivo de conclusão não está registado nestas sessões.',
        { exact: true },
      ),
    ).toBeVisible();
    await page.getByLabel('Mostrar', { exact: true }).selectOption('incorrect');
    await expect(page.getByRole('status')).toContainText(
      'Nenhuma questão nesta categoria',
    );
    await page
      .getByLabel('Mostrar', { exact: true })
      .selectOption('unanswered');
    await expect(page.locator('.review-question')).toHaveCount(40);
  });
