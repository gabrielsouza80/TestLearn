import { test, expect } from '@playwright/test';
import { questions } from '../../src/data/questions';
import { qualityArchivedQuestions as frozen } from '../fixtures/banks';
import {
  createSession,
  answer,
  finish,
  type Session,
} from '../../src/domain/engine';
import { selectPracticeExam } from '../../src/domain/blueprint';
import { objectiveGroups } from '../../src/domain/blueprint-audit';
import { CONTENT_REVISION } from '../../src/domain/revision';
const now = Date.parse('2026-10-28T12:00:00Z');
test.beforeEach(async ({ page }) => page.clock.setFixedTime(new Date(now)));
test('terminology-corrected current study preserves EN/PT meaning for all three audited items', async ({
  page,
}) => {
  const bank = ['tl-030', 'tl-069', 'tl-071'].map((id) =>
    questions.find((q) => q.id === id)!,
  );
  await page.goto('/');
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
    page.getByRole('radio', {
      name: 'Um número igual de testes em cada nível',
      exact: true,
    }),
  ).toBeVisible();
  await page.getByLabel('Idioma', { exact: true }).selectOption('en');
  await expect(
    page.getByRole('radio', {
      name: 'Equal numbers of tests at each level',
      exact: true,
    }),
  ).toBeVisible();
  await page.getByRole('button', { name: 'Next', exact: true }).click();
  await page.getByLabel('Language', { exact: true }).selectOption('pt');
  await expect(
    page.getByRole('heading', { name: bank[1].text.pt, exact: true }),
  ).toContainText('orientado para comportamento');
  await page.getByRole('button', { name: 'Seguinte', exact: true }).click();
  await expect(
    page.getByRole('heading', { name: bank[2].text.pt, exact: true }),
  ).toContainText('cobertura de Cada Escolha (Each Choice)');
  expect(
    await page.evaluate(
      () =>
        JSON.parse(localStorage.getItem('testlearn.v1')!).active
          .contentRevision,
    ),
  ).toBe(CONTENT_REVISION);
});
test('historical .7 exam retains its original Portuguese distractor, fields and score', async ({
  page,
}) => {
  const old = frozen.find((q) => q.id === 'tl-030')!;
  const group = objectiveGroups.find((g) =>
    (g.los as readonly string[]).includes(old.lo),
  )!;
  const bank = selectPracticeExam(
    frozen.filter(
      (q) =>
        !(group.los as readonly string[]).includes(q.lo) || q.lo === old.lo,
    ),
    42,
  );
  const session: Session = {
    ...answer(
      createSession(bank, 'exam', 75, now, 42),
      old.id,
      old.correct,
      now,
    ),
    contentRevision: '2026-10-27.7',
    index: bank.indexOf(old),
    visitedIds: [bank[0].id, old.id].filter((id, i, a) => a.indexOf(id) === i),
    flagged: [old.id],
  };
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
  await expect(page.getByRole('status')).toContainText(
    'anterior às correções terminológicas',
  );
  await expect(
    page.getByRole('radio', {
      name: 'Números semelhantes de testes em todos os níveis',
      exact: true,
    }),
  ).toBeVisible();
  await expect(
    page.getByRole('radio', {
      name: 'Um número igual de testes em cada nível',
      exact: true,
    }),
  ).toHaveCount(0);
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
    page.getByRole('heading', { name: '1 / 40', exact: true }),
  ).toBeVisible();
  expect(
    await page.evaluate(
      () => JSON.parse(localStorage.getItem('testlearn.v1')!).history[0],
    ),
  ).toEqual(finish(session, now));
});
