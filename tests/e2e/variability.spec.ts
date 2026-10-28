import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
import { questions } from '../../src/data/questions';
import { bilingualArchivedQuestions } from '../../src/data/bank-history';
import {
  createSession,
  answer,
  finish,
  type Session,
} from '../../src/domain/engine';
import { selectPracticeExam } from '../../src/domain/blueprint';
import { BILINGUAL_CONTENT_REVISION } from '../../src/domain/revision';
const now = Date.parse('2026-10-28T12:00:00Z');
test('new K3 state and effort exercises render their tables, preserve EN/PT answers and show worked solutions', async ({
  page,
}) => {
  await page.clock.setFixedTime(new Date(now));
  await page.goto('/');
  const bank = ['tl-073', 'tl-076'].map((id) =>
    questions.find((q) => q.id === id)!,
  );
  await page.evaluate(
    (s) =>
      localStorage.setItem(
        'testlearn.v1',
        JSON.stringify({ version: 1, active: s, history: [] }),
      ),
    createSession(bank, 'practice', 0, now, 42),
  );
  await page.reload();
  await expect(
    page.getByRole('cell', { name: 'revoke', exact: true }),
  ).toBeVisible();
  await page
    .getByRole('radio', {
      name: 'return, resubmit, approve, revoke, approve, publish',
      exact: true,
    })
    .check();
  await page.getByLabel('Idioma', { exact: true }).selectOption('en');
  await expect(
    page.getByRole('radio', {
      name: 'return, resubmit, approve, revoke, approve, publish',
      exact: true,
    }),
  ).toBeChecked();
  await page.getByRole('button', { name: 'Check answer', exact: true }).click();
  await expect(
    page.getByRole('region', { name: 'Explanation', exact: true }),
  ).toContainText('Six events are a lower bound');
  await page.getByRole('button', { name: 'Next', exact: true }).click();
  await expect(
    page.getByRole('columnheader', {
      name: 'Most likely / Mais provável',
      exact: true,
    }),
  ).toBeVisible();
  await page
    .getByRole('radio', { name: '15 person-hours', exact: true })
    .check();
  await page.getByRole('button', { name: 'Check answer', exact: true }).click();
  await page.getByLabel('Language', { exact: true }).selectOption('pt');
  await page.reload();
  await expect(
    page.getByRole('region', { name: 'Explicação', exact: true }),
  ).toContainText('X=(3+4×6+15)/6=7');
  await expect(
    page.getByRole('radio', { name: '15 pessoas-hora', exact: true }),
  ).toBeChecked();
  expect((await new AxeBuilder({ page }).analyze()).violations).toEqual([]);
  await page
    .getByRole('button', { name: 'Terminar sessão', exact: true })
    .click();
  await page
    .getByRole('button', { name: 'Confirmar e terminar', exact: true })
    .click();
  await expect(
    page.getByRole('heading', { name: '2 / 2', exact: true }),
  ).toBeVisible();
  expect((await new AxeBuilder({ page }).analyze()).violations).toEqual([]);
});
for (const mode of ['exam', 'practice'] as const) {
  test(`revision .5 ${mode} preserves all saved fields, frozen content and results after expansion`, async ({
    page,
  }) => {
    await page.clock.setFixedTime(new Date(now));
    await page.goto('/');
    const bank =
      mode === 'exam'
        ? selectPracticeExam(bilingualArchivedQuestions, 42)
        : bilingualArchivedQuestions;
    const first = bank[0];
    let session: Session = {
      ...createSession(bank, mode, 75, now, 42),
      contentRevision: BILINGUAL_CONTENT_REVISION,
    };
    session = {
      ...answer(session, first.id, first.correct, now),
      index: bank.length - 1,
      visitedIds: [first.id, bank[bank.length - 1].id],
      flagged: [first.id],
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
      'anterior à expansão de variedade',
    );
    await expect(
      page.getByRole('heading', {
        name: bank[bank.length - 1].text.pt,
        exact: true,
      }),
    ).toBeVisible();
    expect(
      await page.evaluate(
        () => JSON.parse(localStorage.getItem('testlearn.v1')!).active,
      ),
    ).toEqual(session);
    await page
      .getByRole('button', { name: 'Terminar sessão', exact: true })
      .click();
    await page
      .getByRole('button', { name: 'Confirmar e terminar', exact: true })
      .click();
    await expect(
      page.getByRole('heading', { name: `1 / ${bank.length}`, exact: true }),
    ).toBeVisible();
    expect(
      await page.evaluate(
        () => JSON.parse(localStorage.getItem('testlearn.v1')!).history[0],
      ),
    ).toEqual(finish(session, now));
    await page.reload();
    await page.getByRole('button', { name: 'Progresso', exact: true }).click();
    await page.getByRole('button', { name: 'Rever', exact: true }).click();
    await expect(
      page.getByRole('heading', { name: `1 / ${bank.length}`, exact: true }),
    ).toBeVisible();
  });
}
