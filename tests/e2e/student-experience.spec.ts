import { test, expect, type Page } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
import { questions } from '../../src/data/questions';
import {
  createSession,
  answer,
  finish,
  type Session,
  type Question,
} from '../../src/domain/engine';
import { selectPracticeExam } from '../../src/domain/blueprint';
import oldBackup from '../fixtures/progress-backup-v1-legacy.json' with { type: 'json' };

test('dashboard, progress and practice retain 200 percent text at 320px without horizontal page overflow', async ({
  page,
}) => {
  await page.goto('/');
  for (const destination of ['Visão geral', 'Progresso', 'Praticar']) {
    await page.getByRole('button', { name: destination, exact: true }).click();
    const paragraph = page.locator('.panel p').first();
    const before = await paragraph.evaluate((e) =>
      parseFloat(getComputedStyle(e).fontSize),
    );
    await page.evaluate(
      () => (document.documentElement.style.fontSize = '200%'),
    );
    const after = await paragraph.evaluate((e) =>
      parseFloat(getComputedStyle(e).fontSize),
    );
    expect(after).toBeGreaterThanOrEqual(before * 1.95);
    await page.setViewportSize({ width: 320, height: 900 });
    expect(
      await page.evaluate(
        () => document.documentElement.scrollWidth <= innerWidth,
      ),
    ).toBe(true);
    await page.evaluate(
      () => (document.documentElement.style.fontSize = '100%'),
    );
  }
});
const now = Date.parse('2026-10-29T12:00:00Z'),
  exam = selectPracticeExam(questions, 42);
async function seed(
  page: Page,
  active: Session | null,
  history: Session[] = [],
) {
  await page.goto('/');
  await page.evaluate(
    (s) => localStorage.setItem('testlearn.v1', JSON.stringify(s)),
    { version: 1, active, history },
  );
  await page.reload();
}
async function finishUI(page: Page) {
  await page
    .getByRole('button', { name: 'Terminar sessão', exact: true })
    .click();
  await page
    .getByRole('button', { name: 'Confirmar e terminar', exact: true })
    .click();
}
function completed(items: Question[], correct: number, start: number) {
  let s = createSession(items, 'practice', 0, start, 42);
  for (const [qIndex, q] of items.entries())
    s = answer(
      s,
      q.id,
      qIndex < correct
        ? q.correct
        : [q.options.find((o) => !q.correct.includes(o.id))!.id],
      start + 100,
    );
  return finish({ ...s, visitedIds: items.map((q) => q.id) }, start + 200);
}
test.beforeEach(async ({ page }) => page.clock.setFixedTime(new Date(now)));
test('a new learner finds both paths immediately, localized beta and supplementary English scope', async ({
  page,
}, info) => {
  if (info.project.name !== 'mobile')
    await page.setViewportSize({ width: 1280, height: 800 });
  await page.goto('/');
  const study = page.getByRole('button', {
      name: 'Estudar por capítulo',
      exact: true,
    }),
    start = page.getByRole('button', {
      name: 'Fazer simulado CTFL',
      exact: true,
    });
  await expect(study).toBeVisible();
  await expect(start).toBeEnabled();
  if (info.project.name !== 'mobile') {
    await expect(study).toBeInViewport({ ratio: 1 });
    await expect(start).toBeInViewport({ ratio: 1 });
  }
  await expect(
    page.getByRole('button', { name: 'Continuar sessão', exact: true }),
  ).toHaveCount(0);
  await expect(page.locator('.beta-badge')).toHaveText('Beta pública');
  await expect(page.locator('.draft-note')).toHaveCount(1);
  await page.screenshot({
    path: `tmp/phase94/dashboard-${info.project.name}.png`,
    fullPage: true,
  });
  await study.click();
  await expect(page.getByLabel('Capítulo', { exact: true })).toBeVisible();
  expect(
    await page.evaluate(() => localStorage.getItem('testlearn.v1')),
  ).toBeNull();
  await page.getByLabel('Idioma', { exact: true }).selectOption('en');
  await page.getByRole('button', { name: 'Overview', exact: true }).click();
  await expect(
    page.getByRole('button', { name: 'Study by chapter', exact: true }),
  ).toBeVisible();
  await expect(
    page.getByRole('button', {
      name: 'Take a CTFL practice exam',
      exact: true,
    }),
  ).toBeVisible();
  await expect(page.locator('.beta-badge')).toHaveText('Public Beta');
  await page
    .getByRole('button', { name: 'English for QA', exact: true })
    .click();
  await expect(
    page.getByRole('heading', {
      name: 'English for QA — Vocabulary and interviews',
      exact: true,
    }),
  ).toBeVisible();
  await expect(
    page.getByText(
      /It is not a complete course or an assessment of fluency or pronunciation/,
    ),
  ).toBeVisible();
});
for (const mode of ['exam', 'practice'] as const)
  test(`dashboard resumes the exact ${mode} without creating another attempt`, async ({
    page,
  }) => {
    const bank = mode === 'exam' ? exam : questions.slice(0, 5);
    let s = createSession(
      bank,
      mode,
      mode === 'exam' ? 75 : 0,
      now - 120000,
      42,
    );
    for (const q of bank.slice(0, 2))
      s = answer(s, q.id, q.correct, now - 90000);
    s = {
      ...s,
      index: 3,
      visitedIds: [bank[0].id, bank[3].id],
      flagged: [bank[1].id],
    };
    await seed(page, s);
    await page
      .getByRole('button', { name: 'Visão geral', exact: true })
      .click();
    const card = page.getByRole('region', {
      name: 'Continuar a sessão em curso',
      exact: true,
    });
    await expect(card).toContainText(`2/${bank.length}`);
    await expect(card).toContainText(
      mode === 'exam' ? 'Limite guardado: 75 min' : 'Sem limite de tempo.',
    );
    if (mode === 'exam') {
      await expect(card).toContainText('73:00');
      await expect(card).toContainText(
        'O relógio continua enquanto a página está fechada.',
      );
    }
    await expect(
      page.getByRole('button', { name: 'Fazer simulado CTFL', exact: true }),
    ).toBeDisabled();
    const raw = await page.evaluate(() => localStorage.getItem('testlearn.v1'));
    await page
      .getByRole('button', { name: 'Continuar sessão', exact: true })
      .click();
    await expect(
      page.getByRole('heading', { name: bank[3].text.pt, exact: true }),
    ).toBeVisible();
    expect(
      await page.evaluate(() => localStorage.getItem('testlearn.v1')),
    ).toBe(raw);
    expect(JSON.parse(raw!).active).toEqual(s);
  });
for (const reason of ['submitted', 'submitted-early', 'expired'] as const)
  test(`new ${reason} records actual completion evidence and original scoring`, async ({
    page,
  }) => {
    let s = createSession(
      exam,
      'exam',
      60,
      reason === 'expired' ? now - 3600001 : now,
      42,
    );
    const target =
      reason === 'submitted' ? 40 : reason === 'submitted-early' ? 2 : 0;
    for (const q of exam.slice(0, target)) s = answer(s, q.id, q.correct, now);
    await seed(page, s);
    if (reason !== 'expired') {
      await expect(page.locator('.question-meta')).not.toContainText(
        /FL-\d|K[123]|Capítulo/,
      );
      await expect(page.locator('.question-reference')).toHaveCount(0);
      await expect(page.getByText(/Conhecer o objetivo FL-/)).toHaveCount(0);
      await finishUI(page);
    }
    await expect(
      page.getByRole('heading', { name: `${target} / 40`, exact: true }),
    ).toBeVisible();
    const text =
      reason === 'submitted'
        ? 'Conclusão explícita, sem perguntas em branco.'
        : reason === 'submitted-early'
          ? 'Conclusão antecipada, com perguntas sem resposta.'
          : 'Conclusão por fim do tempo disponível.';
    await expect(page.getByText(text, { exact: true })).toBeVisible();
    const stored = await page.evaluate(
      () => JSON.parse(localStorage.getItem('testlearn.v1')!).history[0],
    );
    expect(stored.completionReason).toBe(reason);
    expect(stored.questionIds).toEqual(s.questionIds);
    expect(stored.optionOrder).toEqual(s.optionOrder);
    expect(stored.answers).toEqual(s.answers);
    expect(stored.startedAt).toBe(s.startedAt);
    if (reason === 'expired') expect(stored.completedAt).toBe(s.deadline);
    await expect(page.locator('.review-question').first()).toContainText(
      exam[0].lo,
    );
    await expect(page.locator('.review-question').first()).toContainText(
      exam[0].level,
    );
    await expect(page.locator('.draft-note')).toHaveCount(0);
  });
test('a real pre-extension backup retains absent completion evidence and the old completed record unchanged', async ({
  page,
}) => {
  await page.goto('/');
  await page.getByRole('button', { name: 'Progresso', exact: true }).click();
  await page.getByLabel(/^Importar progresso —/).setInputFiles({
    name: 'old-backup.json',
    mimeType: 'application/json',
    buffer: Buffer.from(JSON.stringify(oldBackup)),
  });
  await page
    .getByRole('button', { name: 'Confirmar importação', exact: true })
    .click();
  await expect(page.getByRole('checkbox').first()).toBeVisible();
  await finishUI(page);
  await expect(
    page.getByText('O motivo de conclusão não está registado nestas sessões.', {
      exact: true,
    }),
  ).toBeVisible();
  const state = await page.evaluate(() =>
    JSON.parse(localStorage.getItem('testlearn.v1')!),
  );
  expect(state.history[0]).toEqual(oldBackup.state.history[0]);
  expect(state.history[1]).not.toHaveProperty('completionReason');
  expect(state.history[1].questionIds).toEqual(
    oldBackup.state.active.questionIds,
  );
  expect(state.history[1].answers).toEqual(oldBackup.state.active.answers);
});
test('unopened questions are blank, repeats remain distinct and one answer cannot diagnose chapter weakness', async ({
  page,
}) => {
  let first = createSession(exam, 'exam', 60, now - 20000, 42);
  const q = exam[0];
  first = answer(
    first,
    q.id,
    [q.options.find((o) => !q.correct.includes(o.id))!.id],
    now - 19000,
  );
  first = finish(first, now - 18000);
  const repeated = completed([q], 1, now - 17000);
  await seed(page, null, [repeated, first]);
  const stats = page.getByRole('region', {
    name: 'Estatísticas de aprendizagem',
  });
  await expect(stats).toContainText('Questões com visita registada');
  await expect(stats.locator('article').nth(1).locator('strong')).toHaveText(
    '1',
  );
  await page.getByRole('button', { name: 'Progresso', exact: true }).click();
  await expect(
    page.getByText(
      'Há ainda poucas respostas para identificar áreas que precisam de mais estudo.',
      { exact: true },
    ),
  ).toBeVisible();
  const progressDetails = page.locator('details').filter({
    has: page.locator('.progress-counts'),
  });
  await progressDetails.locator('summary').click();
  await expect(page.locator('.progress-counts')).toBeVisible();
  await expect(page.locator('.progress-counts')).toContainText('39');
  await expect(page.locator('.study-priorities')).toHaveCount(0);
  await expect(page.locator('.chapter-progress')).toHaveCount(6);
  const card = page.locator('.chapter-progress').nth(q.chapter - 1);
  await expect(card.locator('dd').nth(1)).toHaveText('0 / 1');
  await expect(card.locator('dd').nth(2)).toHaveText('1 / 1');
  await expect(
    page.getByText(
      'Banco pequeno: não permite a amostra mínima desta heurística.',
      { exact: true },
    ),
  ).toBeVisible();
});
test('adequate first-exposure evidence is descriptive, repeated practice stays separate and chapter study is actionable', async ({
  page,
}, info) => {
  const bank = questions.filter((q) => q.chapter === 1).slice(0, 5);
  const first = completed(bank, 3, now - 20000),
    repeat = completed(bank, 5, now - 19000);
  await seed(page, null, [repeat, first]);
  await page.getByRole('button', { name: 'Progresso', exact: true }).click();
  await expect(page.locator('.study-priorities')).toContainText('3/5');
  const card = page.locator('.chapter-progress').first();
  await expect(card.locator('dd').nth(0)).toHaveText(
    `5 / ${questions.filter((q) => q.chapter === 1).length}`,
  );
  await expect(card.locator('dd').nth(1)).toHaveText('3 / 5');
  await expect(card.locator('dd').nth(2)).toHaveText('5 / 5');
  await page.screenshot({
    path: `tmp/phase94/progress-${info.project.name}.png`,
    fullPage: true,
  });
  expect((await new AxeBuilder({ page }).analyze()).violations).toEqual([]);
  await page
    .getByRole('button', { name: 'Praticar capítulo 1', exact: true })
    .focus();
  await page.keyboard.press('Enter');
  await expect(page.getByLabel('Capítulo', { exact: true })).toHaveValue('1');
  await page.getByLabel('Idioma', { exact: true }).selectOption('en');
  await page.getByRole('button', { name: 'Progress', exact: true }).click();
  await expect(page.locator('.chapter-progress').first()).toContainText(
    'First visits: correct / answered',
  );
});
test('contradictory imported completion metadata is rejected without overwriting progress', async ({
  page,
}) => {
  await page.goto('/');
  await page.getByRole('button', { name: 'Progresso', exact: true }).click();
  const broken = structuredClone(oldBackup);
  Object.assign(broken.state.history[0], { completionReason: 'expired' });
  await page.getByLabel(/^Importar progresso —/).setInputFiles({
    name: 'bad-reason.json',
    mimeType: 'application/json',
    buffer: Buffer.from(JSON.stringify(broken)),
  });
  await expect(page.getByRole('alert')).toContainText(
    'Nenhum dado foi alterado.',
  );
  expect(
    await page.evaluate(() => localStorage.getItem('testlearn.v1')),
  ).toBeNull();
});
