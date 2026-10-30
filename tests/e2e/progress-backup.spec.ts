import { test, expect, type Page } from '@playwright/test';
import { readFile } from 'node:fs/promises';
import AxeBuilder from '@axe-core/playwright';
import { questions } from '../../src/data/questions';
import { createSession, finish, answer } from '../../src/domain/engine';
import { selectPracticeExam } from '../../src/domain/blueprint';
import { coverageArchivedQuestions } from '../fixtures/banks';
import { MAX_BACKUP_BYTES } from '../../src/storage/backup';
import type { State } from '../../src/storage/store';
const now = Date.parse('2026-10-29T12:00:00Z');
const multi = questions.find((q) => q.id === 'tl-083')!;
function fixture(): State {
  const old = coverageArchivedQuestions.find((q) => q.id === 'tl-003')!;
  const base = createSession(
    [questions.find((q) => q.id === old.id)!],
    'practice',
    0,
    now - 20000,
    42,
  );
  const historical = {
    ...finish(base, now - 10000),
    id: 'historical-portable',
    contentRevision: '2026-10-27.4',
    optionOrder: { [old.id]: old.options.map((o) => o.id).reverse() },
    answers: { [old.id]: old.correct },
    flagged: [old.id],
  };
  delete historical.completionReason; // This fixture represents a pre-extension attempt.
  return {
    version: 1,
    active: answer(
      createSession([multi], 'practice', 0, now, 42),
      multi.id,
      multi.correct,
      now,
    ),
    history: [historical],
  };
}
// Independent wire-format fixture: each completed item has exactly one correct response.
function wireBackup(state: State) {
  return JSON.stringify({
    format: 'testlearn-backup',
    version: 1,
    exportedAt: new Date(now).toISOString(),
    source: { app: 'TestLearn', contentRevision: '2026-10-27.9' },
    state,
    results: state.history.map((s) => ({
      sessionId: s.id,
      correct: 1,
      total: 1,
      unanswered: 0,
      passed: null,
    })),
  });
}
async function seed(page: Page, state: State) {
  await page.goto('/');
  await page.evaluate(
    (s) => localStorage.setItem('testlearn.v1', JSON.stringify(s)),
    state,
  );
  await page.reload();
}
async function progress(page: Page) {
  await page
    .getByRole('button', { name: /^(?:Progresso|Progress)$/, exact: true })
    .click();
}
async function choose(page: Page, buffer: Buffer) {
  const input = page.getByLabel(/^(?:Importar progresso|Import progress) —/);
  await input.focus();
  await input.setInputFiles({
    name: 'testlearn-backup-v1.json',
    mimeType: 'application/json',
    buffer,
  });
}
test('a real downloaded backup restores another empty profile, exact historical choices, multiple answers and language without source writes', async ({
  page,
  browser,
}) => {
  const state = fixture();
  await seed(page, state);
  await progress(page);
  const raw = await page.evaluate(() => localStorage.getItem('testlearn.v1'));
  const downloadPromise = page.waitForEvent('download');
  await page
    .getByRole('button', { name: 'Exportar progresso', exact: true })
    .click();
  const download = await downloadPromise;
  expect(download.suggestedFilename()).toBe('testlearn-backup-v1.json');
  const bytes = await readFile((await download.path())!);
  const backup = JSON.parse(bytes.toString());
  expect(backup.state).toEqual(state);
  expect(backup.results[0]).toMatchObject({
    correct: 1,
    total: 1,
    sessionId: 'historical-portable',
  });
  expect(backup).not.toHaveProperty('questions');
  expect(backup.state.history[0]).not.toHaveProperty('correct');
  expect(await page.evaluate(() => localStorage.getItem('testlearn.v1'))).toBe(
    raw,
  );
  const context = await browser.newContext();
  try {
    const other = await context.newPage();
    await other.goto('/');
    await progress(other);
    await choose(other, bytes);
    const dialog = other.getByRole('alertdialog');
    await expect(dialog).toBeVisible();
    await expect(
      dialog.getByRole('button', { name: 'Cancelar', exact: true }),
    ).toBeFocused();
    expect(
      await other.evaluate(() => localStorage.getItem('testlearn.v1')),
    ).toBeNull();
    await dialog
      .getByRole('button', { name: 'Confirmar importação', exact: true })
      .click();
    await expect(
      other.getByRole('checkbox', {
        name: multi.options.find((o) => o.id === multi.correct[0])!.text.pt,
        exact: true,
      }),
    ).toBeEnabled();
    for (const id of multi.correct)
      await expect(
        other.getByRole('checkbox', {
          name: multi.options.find((o) => o.id === id)!.text.pt,
          exact: true,
        }),
      ).toBeChecked();
    expect(
      await other.evaluate(() =>
        JSON.parse(localStorage.getItem('testlearn.v1')!),
      ),
    ).toEqual(state);
    await other.reload();
    await other.getByLabel('Idioma', { exact: true }).selectOption('en');
    for (const id of multi.correct)
      await expect(
        other.getByRole('checkbox', {
          name: multi.options.find((o) => o.id === id)!.text.en,
          exact: true,
        }),
      ).toBeChecked();
    await progress(other);
    await choose(other, bytes);
    const duplicate = other.getByRole('alertdialog');
    await expect(duplicate).toContainText('Exact duplicates');
    await expect(duplicate.locator('dd')).toHaveText(['2', '0', '2', '0', '0']);
    await expect(
      duplicate.getByRole('button', { name: 'Confirm import', exact: true }),
    ).toBeDisabled();
    await other.keyboard.press('Escape');
    await other.getByRole('button', { name: 'Review', exact: true }).click();
    await expect(
      other.getByRole('heading', { name: '1 / 1', exact: true }),
    ).toBeVisible();
    const old = coverageArchivedQuestions.find((q) => q.id === 'tl-003')!;
    await expect(
      other.getByRole('heading', { name: old.text.en, exact: true }),
    ).toBeVisible();
    await expect(other.locator('.review-options > li')).toHaveCount(3);
    expect(
      await other.evaluate(() =>
        JSON.parse(localStorage.getItem('testlearn.v1')!),
      ),
    ).toEqual(state);
  } finally {
    await context.close();
  }
});
test('preview conservatively skips exact-ID conflicts and an imported active session while retaining local progress', async ({
  page,
}) => {
  const local = fixture();
  await seed(page, local);
  await progress(page);
  const incoming = fixture();
  incoming.active!.id = 'other-active';
  incoming.history[0].flagged = [];
  incoming.history.push({ ...incoming.history[0], id: 'new-completed' });
  await choose(page, Buffer.from(wireBackup(incoming)));
  const dialog = page.getByRole('alertdialog');
  await expect(dialog.locator('dd')).toHaveText(['3', '1', '0', '2', '0']);
  await page.keyboard.press('Tab');
  await expect(
    dialog.getByRole('button', { name: 'Confirmar importação', exact: true }),
  ).toBeFocused();
  await page.keyboard.press('Tab');
  await expect(
    dialog.getByRole('button', { name: 'Cancelar', exact: true }),
  ).toBeFocused();
  await dialog
    .getByRole('button', { name: 'Confirmar importação', exact: true })
    .click();
  const stored = await page.evaluate(() =>
    JSON.parse(localStorage.getItem('testlearn.v1')!),
  );
  expect(stored.active).toEqual(local.active);
  expect(stored.history.slice(0, 1)).toEqual(local.history);
  expect(stored.history[1]).toEqual(incoming.history[1]);
});
for (const kind of [
  'json',
  'revision',
  'question',
  'option',
  'score',
  'unsafe',
  'oversized',
] as const)
  test(`rejects ${kind} backup without replacing local or unrelated data`, async ({
    page,
  }) => {
    const state = fixture();
    await seed(page, state);
    await page.evaluate(() => localStorage.setItem('unrelated', 'keep'));
    await progress(page);
    const raw = await page.evaluate(() => localStorage.getItem('testlearn.v1'));
    const b = JSON.parse(wireBackup(state));
    if (kind === 'revision')
      b.state.history[0].contentRevision = '2026-10-27.10';
    if (kind === 'question') b.state.history[0].questionIds = ['tl-999'];
    if (kind === 'option') b.state.active.answers[multi.id] = ['o999'];
    if (kind === 'score') b.results[0].correct = 999;
    if (kind === 'unsafe')
      Object.defineProperty(b, '__proto__', {
        enumerable: true,
        value: { polluted: true },
      });
    const bytes =
      kind === 'json'
        ? Buffer.from('{broken')
        : kind === 'oversized'
          ? Buffer.alloc(MAX_BACKUP_BYTES + 1, 32)
          : Buffer.from(JSON.stringify(b));
    await choose(page, bytes);
    await expect(page.getByRole('alert')).toContainText(
      'Nenhum dado foi alterado',
    );
    await expect(page.getByRole('alertdialog')).toHaveCount(0);
    expect(
      await page.evaluate(() => localStorage.getItem('testlearn.v1')),
    ).toBe(raw);
    expect(await page.evaluate(() => localStorage.getItem('unrelated'))).toBe(
      'keep',
    );
    expect(
      await page.evaluate(() => (({}) as { polluted?: boolean }).polluted),
    ).toBeUndefined();
  });
test('failed atomic import keeps the previous bytes and presents truthful bilingual errors', async ({
  page,
}) => {
  await page.goto('/');
  await progress(page);
  const bytes = Buffer.from(wireBackup(fixture()));
  await choose(page, bytes);
  await expect(page.getByRole('alertdialog')).toBeVisible();
  await page.evaluate(() => {
    Storage.prototype.setItem = () => {
      throw new DOMException('full', 'QuotaExceededError');
    };
  });
  await page
    .getByRole('button', { name: 'Confirmar importação', exact: true })
    .click();
  await expect(
    page.getByText(
      'Não foi possível aplicar a importação. Os dados anteriores foram preservados.',
      { exact: true },
    ),
  ).toBeVisible();
  expect(
    await page.evaluate(() => localStorage.getItem('testlearn.v1')),
  ).toBeNull();
  await page.getByLabel('Idioma', { exact: true }).selectOption('en');
  await expect(
    page.getByText('Could not apply the import. Previous data was preserved.', {
      exact: true,
    }),
  ).toBeVisible();
});
test('import confirmation, errors and file controls are keyboard accessible and reflow without horizontal overflow', async ({
  page,
}) => {
  await page.goto('/');
  await progress(page);
  await choose(page, Buffer.from(wireBackup(fixture())));
  await expect(page.getByRole('alertdialog')).toBeVisible();
  expect((await new AxeBuilder({ page }).analyze()).violations).toEqual([]);
  for (const width of [1280, 640, 320]) {
    await page.setViewportSize({ width, height: 900 });
    expect(
      await page.evaluate(
        () => document.documentElement.scrollWidth <= innerWidth,
      ),
    ).toBe(true);
  }
  await page.keyboard.press('Escape');
  await expect(page.getByRole('alertdialog')).toHaveCount(0);
  await expect(page.getByLabel(/^Importar progresso —/)).toBeFocused();
  const text = page.locator('.progress-backup p').first();
  const font = await text.evaluate((element) =>
    parseFloat(getComputedStyle(element).fontSize),
  );
  await page.evaluate(() => {
    document.documentElement.style.fontSize = '200%';
  });
  expect(
    await text.evaluate((element) =>
      parseFloat(getComputedStyle(element).fontSize),
    ),
  ).toBeGreaterThanOrEqual(font * 1.95);
  for (const width of [640, 320]) {
    await page.setViewportSize({ width, height: 900 });
    expect(
      await page.evaluate(
        () => document.documentElement.scrollWidth <= innerWidth,
      ),
    ).toBe(true);
  }
  const downloading = page.waitForEvent('download');
  await page
    .getByRole('button', { name: 'Exportar progresso', exact: true })
    .click();
  expect((await downloading).suggestedFilename()).toBe(
    'testlearn-backup-v1.json',
  );
});
test('a synthetic 500-session history remains usable for real backup download and duplicate import', async ({
  page,
}) => {
  const base = finish(
    createSession(
      selectPracticeExam(questions, 42),
      'exam',
      60,
      now - 120000,
      42,
    ),
    now - 60000,
  );
  const state: State = {
    version: 1,
    active: null,
    history: Array.from({ length: 500 }, (_, index) => ({
      ...base,
      id: `synthetic-${index}`,
      visitedIds: base.questionIds,
    })),
  };
  await seed(page, state);
  await progress(page);
  await expect(page.locator('.history-list li')).toHaveCount(500);
  const downloading = page.waitForEvent('download');
  await page
    .getByRole('button', { name: 'Exportar progresso', exact: true })
    .click();
  const download = await downloading;
  const bytes = await readFile((await download.path())!);
  expect(JSON.parse(bytes.toString()).state).toEqual(state);
  await choose(page, bytes);
  await expect(page.getByRole('alertdialog').locator('dd')).toHaveText([
    '500',
    '0',
    '500',
    '0',
    '0',
  ]);
  await expect(
    page.getByRole('button', { name: 'Confirmar importação', exact: true }),
  ).toBeDisabled();
  await page.keyboard.press('Escape');
  expect(
    await page.evaluate(() =>
      JSON.parse(localStorage.getItem('testlearn.v1')!),
    ),
  ).toEqual(state);
});
