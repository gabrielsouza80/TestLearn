import { test, expect } from '@playwright/test';
import { questions } from '../../src/data/questions';
import { variabilityArchivedQuestions as frozen } from '../fixtures/banks';
import {
  createSession,
  answer,
  finish,
  type Session,
} from '../../src/domain/engine';
import { selectPracticeExam } from '../../src/domain/blueprint';
const now = Date.parse('2026-10-28T12:00:00Z');
const old = frozen.find((q) => q.id === 'tl-003')!;
const revised = questions.find((q) => q.id === old.id)!;
const archive = /\/assets\/questions-2026-10-27\.6-[^/]+\.js$/;
test.beforeEach(async ({ page }) => {
  await page.clock.setFixedTime(new Date(now));
});
test('current exam shows four revised options, retains shuffled identities across languages and reviews every rationale', async ({
  page,
}) => {
  const first = questions.find((q) => q.id === 'tl-027')!;
  const archives: string[] = [];
  page.on('request', (r) => {
    if (r.url().includes('/assets/questions-2026-10-27.'))
      archives.push(r.url());
  });
  await page.goto('/');
  // Use a valid exam fixture with the maintenance target first. Production
  // start is covered in blueprint.spec; its first ID changes with the pool.
  let bank = selectPracticeExam(questions, 0);
  for (let seed = 1; !bank.some((q) => q.id === first.id) && seed < 100; seed++)
    bank = selectPracticeExam(questions, seed);
  expect(bank.some((q) => q.id === first.id)).toBe(true);
  bank = [first, ...bank.filter((q) => q.id !== first.id)];
  await page.evaluate(
    (s) =>
      localStorage.setItem(
        'testlearn.v1',
        JSON.stringify({ version: 1, active: s, history: [] }),
      ),
    createSession(bank, 'exam', 60, now, 42),
  );
  await page.reload();
  await expect(
    page.getByRole('heading', { name: first.text.pt, exact: true }),
  ).toBeVisible();
  await expect(page.getByRole('radio')).toHaveCount(4);
  const saved = await page.evaluate(
    () => JSON.parse(localStorage.getItem('testlearn.v1')!).active,
  );
  expect(saved.contentRevision).toBe('2026-10-27.9');
  expect(saved.questionIds).toHaveLength(40);
  expect(saved.questionIds[0]).toBe(first.id);
  expect(
    (
      await page
        .getByRole('group', { name: /^(?:Selecione|Select) [12] / })
        .locator('label .option-text')
        .allTextContents()
    ).map((t) => t.trim()),
  ).toEqual(
    saved.optionOrder[first.id].map(
      (id: string) => first.options.find((o) => o.id === id)!.text.pt,
    ),
  );
  await expect(
    page
      .getByRole('group', { name: /^(?:Selecione|Select) [12] / })
      .locator('.option-letter'),
  ).toHaveText(['A.', 'B.', 'C.', 'D.']);
  await page
    .getByRole('radio', {
      name: first.options.find((o) => o.id === 'o4')!.text.pt,
      exact: true,
    })
    .check();
  await page.getByLabel('Idioma', { exact: true }).selectOption('en');
  await expect(
    page.getByRole('radio', {
      name: first.options.find((o) => o.id === 'o4')!.text.en,
      exact: true,
    }),
  ).toBeChecked();
  await page
    .getByRole('radio', {
      name: first.options.find((o) => o.id === 'o1')!.text.en,
      exact: true,
    })
    .check();
  expect(
    await page.evaluate(
      (id) =>
        JSON.parse(localStorage.getItem('testlearn.v1')!).active.answers[id],
      first.id,
    ),
  ).toEqual(['o1']);
  await expect(
    page.getByRole('region', { name: 'Explanation', exact: true }),
  ).toHaveCount(0);
  await page
    .getByRole('button', { name: 'Finish session', exact: true })
    .click();
  await page
    .getByRole('button', { name: 'Confirm and finish', exact: true })
    .click();
  await expect(
    page.getByRole('heading', { name: '1 / 40', exact: true }),
  ).toBeVisible();
  const explanation = page.getByRole('region', {
    name: 'Explanation for question 1',
    exact: true,
  });
  for (const o of first.options)
    await expect(explanation).toContainText(o.explanation.en);
  expect(archives).toEqual([]);
});
test('current study scores the new distractor as incorrect and preserves bilingual feedback after reload', async ({
  page,
}) => {
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
    page.getByRole('heading', { name: revised.text.pt, exact: true }),
  ).toBeVisible();
  await expect(page.getByRole('radio')).toHaveCount(4);
  const distractor = revised.options.find((o) => o.id === 'o4')!;
  await page
    .getByRole('radio', { name: distractor.text.pt, exact: true })
    .check();
  await page.getByLabel('Idioma', { exact: true }).selectOption('en');
  await expect(
    page.getByRole('radio', { name: distractor.text.en, exact: true }),
  ).toBeChecked();
  await page.getByRole('button', { name: 'Check answer', exact: true }).click();
  for (const o of revised.options)
    await expect(
      page.getByRole('region', { name: 'Explanation', exact: true }),
    ).toContainText(o.explanation.en);
  await page.reload();
  await expect(
    page.getByRole('radio', { name: distractor.text.pt, exact: true }),
  ).toBeChecked();
  const saved = await page.evaluate(
    () => JSON.parse(localStorage.getItem('testlearn.v1')!).active,
  );
  expect(saved.contentRevision).toBe('2026-10-27.9');
  expect(saved.answers[revised.id]).toEqual(['o4']);
  await expect(
    page.getByRole('region', { name: 'Explicação', exact: true }),
  ).toContainText(distractor.explanation.pt);
  await page
    .getByRole('button', { name: 'Terminar sessão', exact: true })
    .click();
  await page
    .getByRole('button', { name: 'Confirmar e terminar', exact: true })
    .click();
  await expect(
    page.getByRole('heading', { name: '0 / 1', exact: true }),
  ).toBeVisible();
});
test('.6 exam restores exactly three old options, original fields and scoring, and requests only its archive', async ({
  page,
}) => {
  const bank = selectPracticeExam(
    frozen.filter((q) => !['FL-1.2.1', 'FL-1.2.3'].includes(q.lo)),
    42,
  );
  const session: Session = {
    ...answer(createSession(bank, 'exam', 75, now, 42), old.id, ['o1'], now),
    contentRevision: '2026-10-27.6',
    index: bank.indexOf(old),
    visitedIds: [bank[0].id, old.id].filter((id, i, a) => a.indexOf(id) === i),
    flagged: [old.id],
  };
  await page.goto('/');
  const archives: string[] = [];
  page.on('request', (r) => {
    if (r.url().includes('/assets/questions-2026-10-27.'))
      archives.push(r.url());
  });
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
    'anterior à revisão de distratores',
  );
  await expect(page.getByRole('radio')).toHaveCount(3);
  await expect(
    page.getByRole('radio', { name: old.options[0].text.pt, exact: true }),
  ).toBeChecked();
  await expect(
    page.getByRole('radio', { name: revised.options[0].text.pt, exact: true }),
  ).toHaveCount(0);
  await expect(
    page.getByRole('radio', { name: revised.options[3].text.pt, exact: true }),
  ).toHaveCount(0);
  expect(
    await page.evaluate(
      () => JSON.parse(localStorage.getItem('testlearn.v1')!).active,
    ),
  ).toEqual(session);
  expect(archives).toHaveLength(1);
  expect(archives[0]).toMatch(archive);
  await page
    .getByRole('button', { name: 'Terminar sessão', exact: true })
    .click();
  await page
    .getByRole('button', { name: 'Confirmar e terminar', exact: true })
    .click();
  await expect(
    page.getByRole('heading', { name: '1 / 40', exact: true }),
  ).toBeVisible();
  const region = page.getByRole('region', {
    name: `Explicação da questão ${session.index + 1}`,
    exact: true,
  });
  for (const o of old.options)
    await expect(region).toContainText(o.explanation.pt);
  await page.getByLabel('Idioma', { exact: true }).selectOption('en');
  for (const o of old.options)
    await expect(
      page.getByRole('region', {
        name: `Explanation for question ${session.index + 1}`,
        exact: true,
      }),
    ).toContainText(o.explanation.en);
  expect(
    await page.evaluate(
      () => JSON.parse(localStorage.getItem('testlearn.v1')!).history[0],
    ),
  ).toEqual(finish(session, now));
  await page.reload();
  await page.getByRole('button', { name: 'Progresso', exact: true }).click();
  await page.getByRole('button', { name: 'Rever', exact: true }).click();
  await expect(
    page.getByRole('heading', { name: '1 / 40', exact: true }),
  ).toBeVisible();
});
test('.6 practice reloaded while resolving its archive preserves the original three-option session', async ({
  page,
}) => {
  const session: Session = {
    ...answer(
      createSession([old], 'practice', 0, now, 42),
      old.id,
      ['o1'],
      now,
    ),
    contentRevision: '2026-10-27.6',
    flagged: [old.id],
  };
  const raw = JSON.stringify({ version: 1, active: session, history: [] });
  await page.goto('/');
  await page.evaluate(
    (value) => localStorage.setItem('testlearn.v1', value),
    raw,
  );
  let release!: () => void;
  const waiting = new Promise<void>((yes) => {
    release = yes;
  });
  await page.route(archive, async (route) => {
    await waiting;
    await route.continue().catch(() => {
      /* the previous navigation may have been cancelled */
    });
  });
  try {
    await page.reload({ waitUntil: 'domcontentloaded' });
    await expect(page.getByRole('status')).toContainText('A carregar');
    await expect(page.getByRole('radio')).toHaveCount(0);
    expect(
      await page.evaluate(() => localStorage.getItem('testlearn.v1')),
    ).toBe(raw);
    await page.reload({ waitUntil: 'domcontentloaded' });
    release();
    await expect(page.getByRole('radio')).toHaveCount(3);
    await expect(
      page.getByRole('radio', { name: old.options[0].text.pt, exact: true }),
    ).toBeChecked();
    expect(
      await page.evaluate(
        () => JSON.parse(localStorage.getItem('testlearn.v1')!).active,
      ),
    ).toEqual(session);
    await page
      .getByRole('button', { name: 'Confirmar resposta', exact: true })
      .click();
    await expect(
      page.getByRole('region', { name: 'Explicação', exact: true }),
    ).toContainText(old.explanation.pt);
  } finally {
    release();
  }
});
