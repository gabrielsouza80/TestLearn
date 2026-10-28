import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
import { questions } from '../../src/data/questions';
import { auditedQuestions } from '../fixtures/banks';
import { createSession } from '../../src/domain/engine';
import { AUDITED_CONTENT_REVISION } from '../../src/domain/revision';
import { expectedGroups } from '../fixtures/blueprint-oracle';
import { archivedExam } from '../fixtures/sessions';
const now = Date.parse('2026-10-27T12:00:00Z');
test('UI starts a structurally aligned independent simulation and safely restores its deadline and selections', async ({
  page,
}) => {
  await page.clock.setFixedTime(new Date(now));
  await page.goto('/');
  await expect(
    page.getByRole('heading', {
      name: 'Simulação alinhada ao blueprint',
      exact: true,
    }),
  ).toBeVisible();
  await expect(
    page.getByText('82 questões originais', { exact: false }),
  ).toBeVisible();
  await page.getByLabel('Duração', { exact: true }).selectOption('75');
  await page
    .getByRole('button', { name: 'Iniciar simulação', exact: true })
    .click();
  const state = await page.evaluate(
    () => JSON.parse(localStorage.getItem('testlearn.v1')!).active,
  );
  expect(state.questionIds).toHaveLength(40);
  expect(state.deadline - state.startedAt).toBe(4500000);
  const chosen = state.questionIds.map((id: string) =>
    questions.find((q) => q.id === id)!,
  );
  for (const [level, count, los] of expectedGroups) {
    const group = chosen.filter(
      (q: (typeof questions)[number]) =>
        q.level === level && los.includes(q.lo),
    );
    expect(group).toHaveLength(count);
    expect(
      new Set(group.map((q: (typeof questions)[number]) => q.lo)).size,
    ).toBe(Math.min(count, los.length));
  }
  await expect(
    page.getByText('Simulação alinhada ao blueprint', { exact: true }),
  ).toBeVisible();
  await page.reload();
  const restored = await page.evaluate(
    () => JSON.parse(localStorage.getItem('testlearn.v1')!).active,
  );
  expect(restored).toEqual(state);
  await expect(page.getByRole('region', { name: 'Explicação' })).toHaveCount(0);
  expect((await new AxeBuilder({ page }).analyze()).violations).toEqual([]);
});

test('both dedicated three-value BVA exercises are available in PT-PT study with worked feedback', async ({
  page,
}) => {
  await page.clock.setFixedTime(new Date(now));
  await page.goto('/');
  const bank = questions.filter((q) => ['tl-046', 'tl-047'].includes(q.id));
  await page.evaluate(
    (s) =>
      localStorage.setItem(
        'testlearn.v1',
        JSON.stringify({ version: 1, active: s, history: [] }),
      ),
    createSession(bank, 'practice', 0, now, 42),
  );
  await page.reload();
  for (let i = 0; i < bank.length; i++) {
    const q = bank[i];
    await expect(
      page.getByRole('heading', { name: q.text.pt, exact: true }),
    ).toBeVisible();
    await page
      .getByRole('radio', {
        name: q.options.find((o) => q.correct.includes(o.id))!.text.pt,
        exact: true,
      })
      .check();
    await page
      .getByRole('button', { name: 'Confirmar resposta', exact: true })
      .click();
    await expect(
      page.getByRole('region', { name: 'Explicação' }),
    ).toContainText('Resposta correta');
    await expect(
      page.getByRole('region', { name: 'Explicação' }),
    ).toContainText(
      i === 0
        ? 'ambos os vizinhos inteiros imediatos'
        : 'apenas com o vizinho 1 dentro do domínio',
    );
    if (i === 0)
      await page.getByRole('button', { name: 'Seguinte', exact: true }).click();
  }
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

test('the audited previous revision resumes unchanged and is not relabelled as an aligned simulation', async ({
  page,
}) => {
  await page.clock.setFixedTime(new Date(now));
  await page.goto('/');
  const attempt = {
    ...archivedExam(auditedQuestions, AUDITED_CONTENT_REVISION, now, 42, 75),
    answers: { 'tl-036': ['o1'] },
    flagged: ['tl-036'],
    index: 35,
  };
  await page.evaluate(
    (s) =>
      localStorage.setItem(
        'testlearn.v1',
        JSON.stringify({ version: 1, active: s, history: [] }),
      ),
    attempt,
  );
  await page.reload();
  await expect(page.getByRole('status')).toContainText(
    'revisão anterior ao gerador alinhado',
  );
  await expect(
    page.getByRole('heading', {
      name: auditedQuestions[35].text.pt,
      exact: true,
    }),
  ).toBeVisible();
  await expect(
    page.getByRole('radio', { name: '6 pessoas-hora', exact: true }),
  ).toBeChecked();
  expect(
    await page.evaluate(
      () => JSON.parse(localStorage.getItem('testlearn.v1')!).active,
    ),
  ).toEqual(attempt);
  await page
    .getByRole('button', { name: 'Terminar sessão', exact: true })
    .click();
  await page
    .getByRole('button', { name: 'Confirmar e terminar', exact: true })
    .click();
  await expect(
    page.getByRole('heading', { name: '1 / 40', exact: true }),
  ).toBeVisible();
  await expect(page.getByRole('status')).toContainText(
    'revisão anterior ao gerador alinhado',
  );
  const stored = await page.evaluate(
    () => JSON.parse(localStorage.getItem('testlearn.v1')!).history[0],
  );
  expect(stored.contentRevision).toBe(AUDITED_CONTENT_REVISION);
  expect(stored.deadline).toBe(attempt.deadline);
  expect(stored.questionIds).toEqual(attempt.questionIds);
});

test('topic practice can include all 82 questions and restore a question beyond the exam limit', async ({
  page,
}) => {
  await page.clock.setFixedTime(new Date(now));
  await page.goto('/');
  await page.getByRole('button', { name: 'Praticar', exact: true }).click();
  await page.getByLabel('Número de questões', { exact: true }).fill('82');
  await page
    .getByRole('button', { name: 'Iniciar prática', exact: true })
    .click();
  await expect(page.getByText('Questão 1 / 82', { exact: true })).toBeVisible();
  await page
    .getByRole('button', { name: 'Questão 82, sem resposta', exact: true })
    .click();
  await page.reload();
  await expect(
    page.getByText('Questão 82 / 82', { exact: true }),
  ).toBeVisible();
  const saved = await page.evaluate(
    () => JSON.parse(localStorage.getItem('testlearn.v1')!).active,
  );
  expect(saved.questionIds).toHaveLength(82);
  expect(saved.index).toBe(81);
  expect(saved.deadline).toBeNull();
  expect(saved.mode).toBe('practice');
});
