import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
import { blueprintArchivedQuestions } from '../../src/data/bank-history';
import { selectPracticeExam } from '../../src/domain/blueprint';
import {
  answer,
  createSession,
  finish,
  type Session,
} from '../../src/domain/engine';
import { BLUEPRINT_CONTENT_REVISION } from '../../src/domain/revision';
const now = Date.parse('2026-10-27T12:00:00Z');

test('a newly covered LO is selectable, keeps its semantic answer after shuffling and shows EN/PT feedback', async ({
  page,
}) => {
  await page.clock.setFixedTime(new Date(now));
  await page.goto('/');
  await page.getByRole('button', { name: 'Praticar', exact: true }).click();
  await page
    .getByLabel('Objetivo de aprendizagem', { exact: true })
    .selectOption('FL-4.3.3');
  await page.getByLabel('Número de questões', { exact: true }).fill('1');
  await page
    .getByRole('button', { name: 'Iniciar prática', exact: true })
    .click();
  await expect(page.getByText('FL-4.3.3 · K2', { exact: true })).toBeVisible();
  await page.getByLabel('Idioma', { exact: true }).selectOption('en');
  await page
    .getByRole('radio', {
      name: 'It provides objective coverage of implemented structure, but may miss the omitted audit requirement.',
      exact: true,
    })
    .check();
  await page.getByRole('button', { name: 'Check answer', exact: true }).click();
  const feedback = page.getByRole('region', {
    name: 'Explanation',
    exact: true,
  });
  await expect(feedback).toContainText('Correct answer');
  await expect(feedback).toContainText(
    'Requirements-based testing is still needed to address omissions',
  );
  await expect(feedback).toContainText(
    'Coverage refers to implemented branches',
  );
  await page.getByLabel('Language', { exact: true }).selectOption('pt');
  await expect(
    page.getByRole('region', { name: 'Explicação', exact: true }),
  ).toContainText('Continuam a ser necessários testes baseados em requisitos');
  await page.reload();
  await expect(
    page.getByRole('region', { name: 'Explicação', exact: true }),
  ).toContainText('Resposta correta');
  const saved = await page.evaluate(
    () => JSON.parse(localStorage.getItem('testlearn.v1')!).active,
  );
  expect(saved.questionIds).toEqual(['tl-059']);
  expect(saved.answers).toEqual({ 'tl-059': ['o1'] });
  expect(saved.feedbackIds).toEqual(['tl-059']);
  expect((await new AxeBuilder({ page }).analyze()).violations).toEqual([]);
  await page
    .getByRole('button', { name: 'Terminar sessão', exact: true })
    .click();
  await page
    .getByRole('button', { name: 'Confirmar e terminar', exact: true })
    .click();
  await expect(
    page.getByRole('heading', { name: '1 / 1', exact: true }),
  ).toBeVisible();
});

for (const mode of ['exam', 'practice'] as const) {
  test(`revision .3 ${mode} retains frozen content, original fields and results after the bank expands`, async ({
    page,
  }) => {
    await page.clock.setFixedTime(new Date(now));
    await page.goto('/');
    const bank =
      mode === 'exam'
        ? selectPracticeExam(blueprintArchivedQuestions, 42)
        : blueprintArchivedQuestions;
    const first = bank[0];
    let session: Session = {
      ...createSession(bank, mode, 75, now, 42),
      contentRevision: BLUEPRINT_CONTENT_REVISION,
    };
    session = {
      ...answer(session, first.id, first.correct, now),
      index: bank.length - 1,
      visitedIds: [first.id, bank[bank.length - 1].id],
      flagged: [first.id],
      feedbackIds: mode === 'practice' ? [first.id] : [],
    };
    await page.evaluate(
      (s) =>
        localStorage.setItem(
          'testlearn.v1',
          JSON.stringify({ version: 1, active: s, history: [] }),
        ),
      session,
    );
    await page.reload();
    await expect(page.getByRole('status')).toContainText(
      'banco anterior à cobertura completa',
    );
    await expect(
      page.getByRole('heading', {
        name: bank[bank.length - 1].text.pt,
        exact: true,
      }),
    ).toBeVisible();
    if (mode === 'exam')
      await expect(
        page.getByText('Simulação alinhada ao blueprint', { exact: true }),
      ).toBeVisible();
    const recovered = await page.evaluate(
      () => JSON.parse(localStorage.getItem('testlearn.v1')!).active,
    );
    expect(recovered).toEqual(session);
    await page
      .getByRole('button', { name: 'Terminar sessão', exact: true })
      .click();
    await page
      .getByRole('button', { name: 'Confirmar e terminar', exact: true })
      .click();
    await expect(
      page.getByRole('heading', { name: `1 / ${bank.length}`, exact: true }),
    ).toBeVisible();
    const completed = await page.evaluate(
      () => JSON.parse(localStorage.getItem('testlearn.v1')!).history[0],
    );
    expect(completed).toEqual(finish(session, now));
    await page.reload();
    await page.getByRole('button', { name: 'Progresso', exact: true }).click();
    await page.getByRole('button', { name: 'Rever', exact: true }).click();
    await expect(page.getByRole('status')).toContainText(
      'banco anterior à cobertura completa',
    );
    await expect(
      page.getByRole('heading', { name: `1 / ${bank.length}`, exact: true }),
    ).toBeVisible();
  });
}
