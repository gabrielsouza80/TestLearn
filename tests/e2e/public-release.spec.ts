import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
import { questions } from '../../src/data/questions';
import { createSession } from '../../src/domain/engine';
import { qualityArchivedQuestions } from '../fixtures/banks';
const now = Date.parse('2026-10-29T12:00:00Z');
test.beforeEach(async ({ page }) => page.clock.setFixedTime(new Date(now)));
test('anonymous beta has bilingual public information, strict headers, no tracking and no private routes', async ({
  page,
  request,
}) => {
  const requests: string[] = [];
  page.on('request', (r) => requests.push(r.url()));
  const response = await page.goto('/');
  await expect(page).toHaveTitle('TestLearn — Public Beta · CTFL 4.0.1');
  await expect(page.locator('meta[name=robots]')).toHaveAttribute(
    'content',
    'noindex, nofollow',
  );
  expect(response!.headers()['content-security-policy']).toContain(
    "script-src 'self'",
  );
  expect(response!.headers()['content-security-policy']).toContain(
    "frame-ancestors 'none'",
  );
  expect(response!.headers()['content-security-policy']).not.toMatch(
    /unsafe-inline|unsafe-eval/,
  );
  expect(response!.headers()['x-content-type-options']).toBe('nosniff');
  expect(response!.headers()['referrer-policy']).toBe('no-referrer');
  expect(response!.headers()['x-robots-tag']).toBe('noindex, nofollow');
  await expect(page.getByText('Public Beta', { exact: true })).toBeVisible();
  await expect(page.locator('html')).toHaveAttribute('lang', 'pt-PT');
  await page.getByRole('button', { name: 'Privacidade', exact: true }).click();
  await expect(
    page.getByRole('heading', { name: 'Privacidade', exact: true }),
  ).toBeFocused();
  await expect(page.locator('main')).toContainText('testlearn.v1');
  await expect(page.locator('main')).toContainText('fornecedor pode processar');
  await page.getByLabel('Idioma', { exact: true }).selectOption('en');
  await expect(page.locator('html')).toHaveAttribute('lang', 'en');
  await expect(
    page.getByRole('heading', { name: 'Privacy', exact: true }),
  ).toBeVisible();
  await expect(page.locator('main')).toContainText('IP addresses');
  await page
    .getByRole('button', { name: 'Terms and limitations', exact: true })
    .click();
  await expect(page.locator('main')).toContainText('not a certificate');
  await page
    .getByRole('button', { name: 'Help and contact', exact: true })
    .click();
  await expect(page.locator('main')).toContainText(
    'Only the exact set earns one point',
  );
  await expect(page.locator('main')).toContainText('no public support channel');
  expect((await new AxeBuilder({ page }).analyze()).violations).toEqual([]);
  expect(
    requests.every((url) => new URL(url).origin === new URL(page.url()).origin),
  ).toBe(true);
  expect(requests.some((url) => url.includes('questions-2026-10-27.'))).toBe(
    false,
  );
  for (const url of [
    '/tmp/phase8-academic-review/review-answer-key-confidential.md',
    '/docs/academic-audit.md',
    '/src/data/questions.ts',
    '/.env',
    '/unknown-route',
    '/assets/missing.js',
  ])
    expect((await request.get(url)).status(), url).toBe(404);
  await page.reload();
  await expect(
    page.getByRole('heading', {
      name: 'O seu espaço de aprendizagem',
      exact: true,
    }),
  ).toBeVisible();
});
test('production CSP actually blocks inline script execution', async ({
  page,
}) => {
  await page.goto('/');
  await page.evaluate(() => {
    document.addEventListener(
      'securitypolicyviolation',
      () => (document.body.dataset.cspViolation = 'blocked'),
    );
    const script = document.createElement('script');
    script.textContent = "document.body.dataset.executed='yes'";
    document.body.append(script);
  });
  await expect(page.locator('body')).toHaveAttribute(
    'data-csp-violation',
    'blocked',
  );
  expect(await page.locator('body').getAttribute('data-executed')).toBeNull();
});
test('a second tab cannot overwrite newer progress and reload recovers the latest flags and answer', async ({
  page,
  context,
}) => {
  await page.goto('/');
  await page
    .getByRole('button', { name: 'Iniciar simulação', exact: true })
    .click();
  await expect(page.getByRole('group')).toBeVisible();
  const other = await context.newPage();
  await other.clock.setFixedTime(new Date(now));
  await other.goto('/');
  await expect(other.getByRole('group')).toBeVisible();
  const original = await other.evaluate(
    () => JSON.parse(localStorage.getItem('testlearn.v1')!).active,
  );
  const q = questions.find((q) => q.id === original.questionIds[0])!;
  await other
    .getByRole(q.required === 1 ? 'radio' : 'checkbox', {
      name: q.options[0].text.pt,
      exact: true,
    })
    .check();
  await expect(page.getByRole('alert')).toContainText('noutro separador');
  await expect(page.getByRole('radio')).toHaveCount(0);
  await expect(page.getByRole('checkbox')).toHaveCount(0);
  await other
    .getByRole('button', { name: 'Marcar para rever', exact: true })
    .click();
  const raw = await other.evaluate(() => localStorage.getItem('testlearn.v1'));
  expect(JSON.parse(raw!).active.answers[q.id]).toEqual([q.options[0].id]);
  expect(JSON.parse(raw!).active.flagged).toEqual([q.id]);
  await page
    .getByRole('button', {
      name: 'Recarregar o progresso guardado',
      exact: true,
    })
    .click();
  await expect(
    page.getByRole(q.required === 1 ? 'radio' : 'checkbox', {
      name: q.options[0].text.pt,
      exact: true,
    }),
  ).toBeChecked();
  expect(await page.evaluate(() => localStorage.getItem('testlearn.v1'))).toBe(
    raw,
  );
  await other.close();
});
test('a missing deployed archive preserves raw data and a real retry restores its original content', async ({
  page,
}) => {
  const q = qualityArchivedQuestions.find((q) => q.id === 'tl-030')!;
  const session = {
    ...createSession([q], 'practice', 0, now, 42),
    contentRevision: '2026-10-27.7',
  };
  const raw = JSON.stringify({ version: 1, active: session, history: [] });
  await page.goto('/');
  await page.evaluate((raw) => localStorage.setItem('testlearn.v1', raw), raw);
  const archive = /\/assets\/questions-2026-10-27\.7-[^/]+\.js$/;
  await page.route(archive, (route) =>
    route.fulfill({
      status: 404,
      contentType: 'text/plain',
      body: 'Not found',
    }),
  );
  await page.reload();
  await expect(page.getByRole('alert')).toContainText(
    'dados guardados foram preservados',
  );
  expect(await page.evaluate(() => localStorage.getItem('testlearn.v1'))).toBe(
    raw,
  );
  await page.unroute(archive);
  await page
    .getByRole('button', {
      name: 'Recarregar e tentar novamente / Reload and retry',
      exact: true,
    })
    .click();
  await expect(
    page.getByRole('radio', {
      name: 'Números semelhantes de testes em todos os níveis',
      exact: true,
    }),
  ).toBeVisible();
  expect(await page.evaluate(() => localStorage.getItem('testlearn.v1'))).toBe(
    raw,
  );
});
test('quota failure stays usable and leaves unrelated origin data intact', async ({
  page,
}) => {
  await page.addInitScript(() => {
    const set = Storage.prototype.setItem;
    Storage.prototype.setItem = function (key, value) {
      if (key === 'testlearn.v1')
        throw new DOMException('full', 'QuotaExceededError');
      return set.call(this, key, value);
    };
  });
  await page.goto('/');
  await page.evaluate(() => localStorage.setItem('unrelated', 'keep'));
  await page
    .getByRole('button', { name: 'Iniciar simulação', exact: true })
    .click();
  await expect(page.getByRole('alert')).toContainText(
    'Não foi possível guardar',
  );
  await expect(page.getByRole('group')).toBeVisible();
  expect(await page.evaluate(() => localStorage.getItem('unrelated'))).toBe(
    'keep',
  );
});
test('long five-option K3 and public information reflow at representative widths with keyboard controls', async ({
  page,
}) => {
  const q = questions.find((q) => q.id === 'tl-089')!;
  await page.goto('/');
  await page.evaluate(
    (s) =>
      localStorage.setItem(
        'testlearn.v1',
        JSON.stringify({ version: 1, active: s, history: [] }),
      ),
    createSession([q], 'practice', 0, now, 42),
  );
  await page.reload();
  for (const width of [320, 390, 768, 1280, 1920]) {
    await page.setViewportSize({ width, height: 900 });
    await expect(page.getByRole('radio')).toHaveCount(5);
    expect(
      await page.evaluate(
        () => document.documentElement.scrollWidth <= innerWidth,
      ),
      `width ${width}`,
    ).toBe(true);
  }
  await page.setViewportSize({ width: 320, height: 900 });
  await page.getByRole('radio').first().focus();
  await page.keyboard.press('Space');
  await expect(page.getByRole('radio').first()).toBeChecked();
  await page
    .getByRole('button', { name: 'Sobre o TestLearn', exact: true })
    .click();
  await expect(
    page.getByRole('heading', { name: 'Sobre o TestLearn', exact: true }),
  ).toBeFocused();
  expect(
    await page.evaluate(
      () => document.documentElement.scrollWidth <= innerWidth,
    ),
  ).toBe(true);
  expect((await new AxeBuilder({ page }).analyze()).violations).toEqual([]);
});

test('reset cancellation preserves progress and explicit confirmation affects only the TestLearn key', async ({
  page,
}) => {
  await page.goto('/');
  await page.evaluate(() => localStorage.setItem('unrelated', 'keep'));
  await page
    .getByRole('button', { name: 'Iniciar simulação', exact: true })
    .click();
  await expect(page.getByRole('group')).toBeVisible();
  await expect
    .poll(() => page.evaluate(() => localStorage.getItem('testlearn.v1')))
    .not.toBeNull();
  const raw = await page.evaluate(() => localStorage.getItem('testlearn.v1'));
  await page.getByRole('button', { name: 'Progresso', exact: true }).click();
  await page
    .getByRole('button', { name: 'Apagar progresso', exact: true })
    .click();
  await expect(
    page.getByRole('button', { name: 'Cancelar', exact: true }),
  ).toBeFocused();
  await page.keyboard.press('Escape');
  await expect(page.getByRole('alertdialog')).toHaveCount(0);
  expect(await page.evaluate(() => localStorage.getItem('testlearn.v1'))).toBe(
    raw,
  );
  await page
    .getByRole('button', { name: 'Apagar progresso', exact: true })
    .click();
  await page
    .getByRole('button', { name: 'Confirmar eliminação', exact: true })
    .click();
  await expect
    .poll(() =>
      page.evaluate(
        () => JSON.parse(localStorage.getItem('testlearn.v1')!).active,
      ),
    )
    .toBeNull();
  expect(
    await page.evaluate(
      () => JSON.parse(localStorage.getItem('testlearn.v1')!).history,
    ),
  ).toEqual([]);
  expect(await page.evaluate(() => localStorage.getItem('unrelated'))).toBe(
    'keep',
  );
});
