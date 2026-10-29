import { test, expect, type Page } from '@playwright/test';
import { questions } from '../../src/data/questions';
import { createSession } from '../../src/domain/engine';
const bank = ['tl-089', 'tl-083'].map((id) =>
  questions.find((q) => q.id === id)!,
);
async function seed(page: Page) {
  await page.goto('/');
  await page.evaluate(
    (s) =>
      localStorage.setItem(
        'testlearn.v1',
        JSON.stringify({ version: 1, active: s, history: [] }),
      ),
    createSession(bank, 'practice', 0, Date.now(), 42),
  );
  await page.reload();
  await expect(page.getByRole('radio').first()).toBeEnabled();
}
test('answer, rapid replacement, navigation, flag and tab close are durable without waiting for storage', async ({
  page,
  context,
}) => {
  await seed(page);
  const first = bank[0].options[0],
    second = bank[0].options[1];
  await page.getByRole('radio', { name: first.text.pt, exact: true }).check();
  await page.reload(); // Deliberately no persistence polling.
  await expect(
    page.getByRole('radio', { name: first.text.pt, exact: true }),
  ).toBeChecked();
  await expect(page.getByRole('radio').first()).toBeEnabled();
  await page.getByRole('radio', { name: first.text.pt, exact: true }).check();
  await page.getByRole('radio', { name: second.text.pt, exact: true }).check();
  await page
    .getByRole('button', { name: 'Marcar para rever', exact: true })
    .click();
  await page.getByRole('button', { name: 'Seguinte', exact: true }).click();
  await page.reload();
  await expect(page.getByRole('checkbox').first()).toBeEnabled();
  const option = bank[1].options[0];
  await page
    .getByRole('checkbox', { name: option.text.pt, exact: true })
    .check();
  await page
    .getByRole('checkbox', { name: option.text.pt, exact: true })
    .uncheck();
  await page.close(); // Real page termination, same browser profile, no unload save.
  const restored = await context.newPage();
  await restored.goto('/');
  await expect(restored.getByRole('checkbox').first()).toBeEnabled();
  for (const control of await restored.getByRole('checkbox').all())
    await expect(control).not.toBeChecked();
  await restored.getByRole('button', { name: 'Anterior', exact: true }).click();
  await expect(
    restored.getByRole('radio', { name: second.text.pt, exact: true }),
  ).toBeChecked();
  await expect(
    restored.getByRole('button', { name: 'Retirar marcação', exact: true }),
  ).toHaveAttribute('aria-pressed', 'true');
  expect(
    await restored.evaluate(
      () =>
        JSON.parse(localStorage.getItem('testlearn.v1')!).active.answers[
          'tl-089'
        ],
    ),
  ).toEqual([second.id]);
});
test('one page holds the write lease; another cannot write and becomes editable only after ownership ends', async ({
  page,
  context,
}) => {
  await seed(page);
  const other = await context.newPage();
  await other.goto('/');
  await expect(other.getByText(/Outro separador está a editar/)).toBeVisible();
  await expect(other.getByRole('radio').first()).toBeDisabled();
  const raw = await page.evaluate(() => localStorage.getItem('testlearn.v1'));
  expect(await other.evaluate(() => localStorage.getItem('testlearn.v1'))).toBe(
    raw,
  );
  await page.close();
  await other.reload();
  await expect(other.getByRole('radio').first()).toBeEnabled();
  await other.getByRole('radio').first().check();
  await other.reload();
  await expect(other.getByRole('radio').first()).toBeChecked();
});
test('failed storage write never applies or announces a saved answer and keeps previous bytes', async ({
  page,
}) => {
  await seed(page);
  const raw = await page.evaluate(() => localStorage.getItem('testlearn.v1'));
  await page.evaluate(() => {
    Storage.prototype.setItem = () => {
      throw new DOMException('full', 'QuotaExceededError');
    };
  });
  // click rather than check: rejecting the mutation must leave the radio unchecked.
  await page.getByRole('radio').first().click();
  await expect(page.getByRole('alert')).toContainText(
    'A alteração não foi aplicada',
  );
  await expect(page.getByRole('radio').first()).not.toBeChecked();
  await expect(
    page.getByText('Não guardado — a última alteração não foi aplicada.', {
      exact: true,
    }),
  ).toBeVisible();
  expect(await page.evaluate(() => localStorage.getItem('testlearn.v1'))).toBe(
    raw,
  );
  await page.getByLabel('Idioma', { exact: true }).selectOption('en');
  await expect(
    page.getByText('Not saved — the last change was not applied.', {
      exact: true,
    }),
  ).toBeVisible();
});
for (const unavailable of ['missing', 'reject'] as const)
  test(`unavailable Web Locks (${unavailable}) fails closed without writes`, async ({
    page,
  }) => {
    await page.addInitScript(
      (mode) =>
        Object.defineProperty(navigator, 'locks', {
          value:
            mode === 'missing'
              ? undefined
              : { request: () => Promise.reject(new Error('lock denied')) },
          configurable: true,
        }),
      unavailable,
    );
    await page.goto('/');
    await expect(
      page.getByText(/A reserva segura de escrita está indisponível/),
    ).toBeVisible();
    await expect(
      page.getByRole('button', { name: 'Iniciar simulação', exact: true }),
    ).toBeDisabled();
    expect(
      await page.evaluate(() => localStorage.getItem('testlearn.v1')),
    ).toBeNull();
  });
