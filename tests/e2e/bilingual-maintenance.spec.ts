import { test, expect } from '@playwright/test';
import { coverageArchivedQuestions } from '../fixtures/banks';
import {
  answer,
  createSession,
  finish,
  type Session,
} from '../../src/domain/engine';
import { selectPracticeExam } from '../../src/domain/blueprint';
import { COVERAGE_CONTENT_REVISION } from '../../src/domain/revision';
const now = Date.parse('2026-10-27T12:00:00Z');

test('new current study exposes explicit confirmation testing in EN/PT and retains the original correct key', async ({
  page,
}) => {
  await page.clock.setFixedTime(new Date(now));
  await page.goto('/');
  await page.getByRole('button', { name: 'Praticar', exact: true }).click();
  await page
    .getByLabel('Objetivo de aprendizagem', { exact: true })
    .selectOption('FL-1.1.2');
  await page.getByLabel('Número de questões', { exact: true }).fill('1');
  await page
    .getByRole('button', { name: 'Iniciar prática', exact: true })
    .click();
  await expect(
    page.getByRole('radio', {
      name: 'Executar um teste de confirmação após a correção',
      exact: true,
    }),
  ).toBeVisible();
  await page.getByLabel('Idioma', { exact: true }).selectOption('en');
  await expect(
    page.getByRole('radio', {
      name: 'Running a confirmation test after the fix',
      exact: true,
    }),
  ).toBeVisible();
  await expect(
    page.getByRole('radio', {
      name: 'Checking the repair afterwards',
      exact: true,
    }),
  ).toHaveCount(0);
  await page
    .getByRole('radio', {
      name: 'Diagnosing the defect that caused the failure and repairing the faulty code',
      exact: true,
    })
    .check();
  await page.getByRole('button', { name: 'Check answer', exact: true }).click();
  await expect(
    page.getByRole('region', { name: 'Explanation', exact: true }),
  ).toContainText('Correct answer');
  await expect(
    page.getByRole('region', { name: 'Explanation', exact: true }),
  ).toContainText(
    'Running a confirmation test checks whether the fix resolved the original problem',
  );
  const saved = await page.evaluate(
    () => JSON.parse(localStorage.getItem('testlearn.v1')!).active,
  );
  expect(saved.contentRevision).toBe('2026-10-27.9');
  expect(saved.answers).toEqual({ 'tl-003': ['o1'] });
  await page.reload();
  await page.getByLabel('Idioma', { exact: true }).selectOption('pt');
  await expect(
    page.getByRole('region', { name: 'Explicação', exact: true }),
  ).toContainText(
    'Executar um teste de confirmação verifica se a correção resolveu o problema original',
  );
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
  test(`.4 ${mode} resumes its exact pre-correction text and saved fields, then preserves results in history`, async ({
    page,
  }) => {
    await page.clock.setFixedTime(new Date(now));
    await page.goto('/');
    const bank =
      mode === 'exam'
        ? selectPracticeExam(
            coverageArchivedQuestions.filter(
              (q) => !['FL-1.2.1', 'FL-1.2.3'].includes(q.lo),
            ),
            42,
          )
        : coverageArchivedQuestions;
    const q = bank.find((q) => q.id === 'tl-003')!;
    let session: Session = {
      ...createSession(bank, mode, 75, now, 42),
      contentRevision: COVERAGE_CONTENT_REVISION,
    };
    session = {
      ...answer(session, q.id, ['o1'], now),
      index: bank.indexOf(q),
      visitedIds: [bank[0].id, q.id],
      flagged: [q.id],
      feedbackIds: [],
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
      'anterior às correções bilingues',
    );
    await expect(
      page.getByRole('radio', {
        name: 'Verificar posteriormente a correção através de testes',
        exact: true,
      }),
    ).toBeVisible();
    expect(
      await page.evaluate(
        () => JSON.parse(localStorage.getItem('testlearn.v1')!).active,
      ),
    ).toEqual(session);
    await page.getByLabel('Idioma', { exact: true }).selectOption('en');
    await expect(
      page.getByRole('radio', {
        name: 'Checking the repair afterwards',
        exact: true,
      }),
    ).toBeVisible();
    await expect(
      page.getByRole('radio', {
        name: 'Running a confirmation test after the fix',
        exact: true,
      }),
    ).toHaveCount(0);
    if (mode === 'exam')
      await expect(
        page.getByText('Blueprint-aligned simulation', { exact: true }),
      ).toBeVisible();
    await page
      .getByRole('button', { name: 'Finish session', exact: true })
      .click();
    await page
      .getByRole('button', { name: 'Confirm and finish', exact: true })
      .click();
    await expect(
      page.getByRole('heading', { name: `1 / ${bank.length}`, exact: true }),
    ).toBeVisible();
    await expect(
      page.getByRole('region', {
        name: `Explanation for question ${bank.indexOf(q) + 1}`,
        exact: true,
      }),
    ).toContainText('Checking a repair is confirmation testing.');
    const stored = await page.evaluate(
      () => JSON.parse(localStorage.getItem('testlearn.v1')!).history[0],
    );
    expect(stored).toEqual(finish(session, now));
    await page.reload();
    await page.getByRole('button', { name: 'Progresso', exact: true }).click();
    await page.getByRole('button', { name: 'Rever', exact: true }).click();
    await expect(
      page.getByRole('heading', { name: `1 / ${bank.length}`, exact: true }),
    ).toBeVisible();
    await expect(
      page.getByRole('region', {
        name: `Explicação da questão ${bank.indexOf(q) + 1}`,
        exact: true,
      }),
    ).toContainText('Verificar a correção é teste de confirmação.');
  });
}
