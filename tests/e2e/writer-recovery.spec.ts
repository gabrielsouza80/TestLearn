import { test, expect, type Page } from '@playwright/test';
import { mkdtemp } from 'node:fs/promises';
import path from 'node:path';
import { fork, type ChildProcess } from 'node:child_process';
import { questions } from '../../src/data/questions';
import { createSession } from '../../src/domain/engine';

const examButton = (page: Page) =>
  page.getByRole('button', { name: 'Fazer simulado CTFL', exact: true });
const retry = (page: Page) =>
  page.getByRole('button', {
    name: 'Tentar obter acesso de escrita',
    exact: true,
  });
const release = (page: Page) =>
  page.getByRole('button', {
    name: 'Libertar edição neste separador',
    exact: true,
  });
function fixtureEvent(child: ChildProcess, event: string) {
  return new Promise<{ port?: number }>((resolve, reject) => {
    const cleanup = () => {
      child.off('message', message);
      child.off('exit', exit);
    };
    const exit = () => {
      cleanup();
      reject(new Error('Vite fixture exited before ' + event));
    };
    const message = (value: unknown) => {
      if (!value || typeof value !== 'object' || !('event' in value)) return;
      if (value.event === 'error') {
        cleanup();
        reject(
          new Error(
            String('message' in value ? value.message : 'Vite fixture error'),
          ),
        );
      } else if (value.event === event) {
        cleanup();
        resolve('port' in value ? { port: Number(value.port) } : {});
      }
    };
    child.on('message', message);
    child.once('exit', exit);
  });
}
const raw = (page: Page) =>
  page.evaluate(() => localStorage.getItem('testlearn.v1'));
async function held(page: Page) {
  return page.evaluate(
    async () =>
      (await navigator.locks.query()).held?.filter(
        (l) => l.name === 'testlearn-progress',
      ).length,
  );
}
async function finishExam(page: Page) {
  await page
    .getByRole('button', { name: 'Terminar sessão', exact: true })
    .click();
  await page
    .getByRole('button', { name: 'Confirmar e terminar', exact: true })
    .click();
  await expect(
    page.getByRole('heading', { name: '0 / 40', exact: true }),
  ).toBeVisible();
}

test('one healthy tab can complete two exams without replacing an unfinished or completed attempt', async ({
  page,
}) => {
  await page.goto('/');
  await expect(examButton(page)).toBeEnabled();
  await examButton(page).click();
  const first = JSON.parse((await raw(page))!).active;
  await page.getByRole('button', { name: 'Visão geral', exact: true }).click();
  await expect(examButton(page)).toBeDisabled();
  await expect(
    page.getByText('Continue a sessão existente antes de iniciar outra.', {
      exact: true,
    }),
  ).toBeVisible();
  await page
    .getByRole('button', { name: 'Continuar sessão', exact: true })
    .click();
  expect(JSON.parse((await raw(page))!).active).toEqual(first);
  await finishExam(page);
  const completed = JSON.parse((await raw(page))!).history[0];
  await page
    .getByRole('button', { name: 'Nova simulação', exact: true })
    .click();
  const second = JSON.parse((await raw(page))!).active;
  expect(second.id).not.toBe(first.id);
  expect(second.questionIds).toHaveLength(40);
  await finishExam(page);
  const state = JSON.parse((await raw(page))!);
  expect(state.active).toBeNull();
  expect(state.history).toHaveLength(2);
  expect(state.history[0]).toEqual(completed);
});

test('a genuine owner, including a background tab, cannot be displaced by retry', async ({
  page,
  context,
}) => {
  await page.goto('/');
  await expect(examButton(page)).toBeEnabled();
  const other = await context.newPage();
  await other.goto('/');
  await other.bringToFront();
  await expect(retry(other)).toBeEnabled();
  const locks = await page.evaluate(() => navigator.locks.query());
  await retry(other).click();
  await expect(other.locator('.save-status')).toContainText(
    'Outro separador ou contexto tem a reserva de escrita',
  );
  expect(await page.evaluate(() => navigator.locks.query())).toEqual(locks);
  await expect(examButton(other)).toBeDisabled();
  expect(await raw(page)).toBeNull();
  expect(await raw(other)).toBeNull();
  await expect(examButton(page)).toBeEnabled();
});

test('closing an idle owner permits retry in the existing secondary page without reload', async ({
  page,
  context,
}) => {
  await page.goto('/');
  await expect(examButton(page)).toBeEnabled();
  const other = await context.newPage();
  await other.goto('/');
  await expect(retry(other)).toBeEnabled();
  await page.close();
  await expect.poll(() => held(other)).toBe(0);
  await retry(other).click();
  await expect(examButton(other)).toBeEnabled();
  expect(await raw(other)).toBeNull();
  await examButton(other).click();
  expect(JSON.parse((await raw(other))!).active.questionIds).toHaveLength(40);
});

test('owner refresh safely reacquires and retry never steals its live lease', async ({
  page,
  context,
}) => {
  await page.goto('/');
  await expect(examButton(page)).toBeEnabled();
  const other = await context.newPage();
  await other.goto('/');
  await expect(retry(other)).toBeEnabled();
  await page.reload();
  await expect(examButton(page)).toBeEnabled();
  await retry(other).click();
  await expect(other.locator('.save-status')).toContainText(
    'Outro separador ou contexto tem a reserva de escrita',
  );
  await expect(examButton(other)).toBeDisabled();
  expect(await held(page)).toBe(1);
  await page.close();
  await expect.poll(() => held(other)).toBe(0);
  await retry(other).click();
  await expect(examButton(other)).toBeEnabled();
  expect(await raw(other)).toBeNull();
});

test('explicit read-only handover preserves selections and requires reload if the saved snapshot changes', async ({
  page,
  context,
}) => {
  const item = questions.find((q) => q.id === 'tl-089')!;
  await page.goto('/');
  await page.evaluate(
    (s) =>
      localStorage.setItem(
        'testlearn.v1',
        JSON.stringify({ version: 1, active: s, history: [] }),
      ),
    createSession([item], 'practice', 0, Date.now(), 42),
  );
  await page.reload();
  await expect(page.getByRole('radio').first()).toBeEnabled();
  const other = await context.newPage();
  await other.goto('/');
  await expect(retry(other)).toBeEnabled();
  const before = await raw(page);
  await release(page).click();
  await expect(page.getByRole('radio').first()).toBeDisabled();
  await expect(page.locator('.save-status')).toContainText('Modo de consulta');
  await expect.poll(() => held(other)).toBe(0);
  await retry(other).click();
  await expect(other.getByRole('radio').first()).toBeEnabled();
  expect(await raw(other)).toBe(before);
  await other
    .getByRole('radio', { name: item.options[0].text.pt, exact: true })
    .check();
  const saved = await raw(other);
  expect(JSON.parse(saved!).active.answers[item.id]).toEqual([
    item.options[0].id,
  ]);
  await expect(page.getByRole('alert')).toContainText('noutro separador');
  await expect(
    page.getByRole('button', {
      name: 'Recarregar o progresso guardado',
      exact: true,
    }),
  ).toBeEnabled();
  expect(await raw(page)).toBe(saved);
  await other.close();
  await page
    .getByRole('button', {
      name: 'Recarregar o progresso guardado',
      exact: true,
    })
    .click();
  await expect(
    page.getByRole('radio', { name: item.options[0].text.pt, exact: true }),
  ).toBeChecked();
  await expect(page.getByRole('radio').first()).toBeEnabled();
  expect(await raw(page)).toBe(saved);
});

test('simultaneous tab loads and attempt clicks produce exactly one active attempt', async ({
  page,
  context,
}) => {
  const other = await context.newPage();
  await Promise.all([page.goto('/'), other.goto('/')]);
  await expect
    .poll(
      async () =>
        [
          await examButton(page).isEnabled(),
          await examButton(other).isEnabled(),
        ].filter(Boolean).length,
    )
    .toBe(1);
  await Promise.all([
    page.evaluate(() => {
      Array.from(document.querySelectorAll('button'))
        .find((b) => b.textContent === 'Fazer simulado CTFL')!
        .click();
    }),
    other.evaluate(() => {
      Array.from(document.querySelectorAll('button'))
        .find((b) => b.textContent === 'Fazer simulado CTFL')!
        .click();
    }),
  ]);
  await expect.poll(() => raw(page)).not.toBeNull();
  const state = JSON.parse((await raw(page))!);
  expect(state.active.questionIds).toHaveLength(40);
  expect(state.history).toEqual([]);
  expect(await raw(other)).toBe(await raw(page));
  expect(await held(page)).toBe(1);
});

test('unreadable storage stays blocked and recovers only after loading the original saved attempt', async ({
  page,
}) => {
  const active = createSession(
    [questions.find((q) => q.id === 'tl-089')!],
    'practice',
    0,
    Date.now(),
    42,
  );
  await page.addInitScript((s) => {
    if (sessionStorage.getItem('storage-restored')) return;
    localStorage.setItem(
      'testlearn.v1',
      JSON.stringify({ version: 1, active: s, history: [] }),
    );
    const original = Storage.prototype.getItem;
    Storage.prototype.getItem = function (key) {
      if (key === 'testlearn.v1')
        throw new DOMException('blocked', 'SecurityError');
      return original.call(this, key);
    };
    window.addEventListener(
      'restore-test-storage',
      () => {
        Storage.prototype.getItem = original;
        sessionStorage.setItem('storage-restored', 'true');
      },
      { once: true },
    );
  }, active);
  await page.goto('/');
  await expect(examButton(page)).toBeDisabled();
  await expect(page.getByRole('alert')).toContainText(
    'O armazenamento não pôde ser lido',
  );
  await page.evaluate(() =>
    window.dispatchEvent(new Event('restore-test-storage')),
  );
  const before = await raw(page);
  await retry(page).click();
  await expect(page.getByRole('alert')).toContainText('noutro separador');
  expect(await raw(page)).toBe(before);
  await page
    .getByRole('button', {
      name: 'Recarregar o progresso guardado',
      exact: true,
    })
    .click();
  await expect(page.getByRole('radio').first()).toBeEnabled();
  expect(JSON.parse((await raw(page))!).active).toEqual(active);
});

test('same-document pagehide/pageshow cleanup cannot self-block write reacquisition', async ({
  page,
}) => {
  await page.goto('/');
  await expect(examButton(page)).toBeEnabled();
  await page.evaluate(() => {
    window.dispatchEvent(
      new PageTransitionEvent('pagehide', { persisted: true }),
    );
    window.dispatchEvent(
      new PageTransitionEvent('pageshow', { persisted: true }),
    );
  });
  await expect(examButton(page)).toBeEnabled();
  await expect.poll(() => held(page)).toBe(1);
  await examButton(page).click();
  expect(JSON.parse((await raw(page))!).active.questionIds).toHaveLength(40);
});

test('real browser shutdown and relaunch of the same synthetic profile restores the exact attempt without a lock record', async ({
  browser,
  baseURL,
}) => {
  test.setTimeout(60000); // Two actual browser process launches, not an assertion timeout change.
  const directory = await mkdtemp(path.resolve('tmp/writer-fix/profile-'));
  const type = browser.browserType();
  let profile = await type.launchPersistentContext(directory);
  let saved: string | null = null;
  try {
    const p = await profile.newPage();
    await p.goto(baseURL!);
    await expect(examButton(p)).toBeEnabled();
    await examButton(p).click();
    await p
      .getByRole('radio')
      .first()
      .or(p.getByRole('checkbox').first())
      .first()
      .check();
    saved = await raw(p);
  } finally {
    await profile.close();
  }
  profile = await type.launchPersistentContext(directory);
  try {
    const p = await profile.newPage();
    await p.goto(baseURL!);
    await expect(release(p)).toBeEnabled();
    expect(await raw(p)).toBe(saved);
    expect(await held(p)).toBe(1);
    await expect(
      p.getByRole('radio').first().or(p.getByRole('checkbox').first()).first(),
    ).toBeEnabled();
  } finally {
    await profile.close();
  }
});

test('development StrictMode, actual Fast Refresh and dev-server restart retain editing and immediately saved answers', async ({
  page,
}) => {
  test.setTimeout(60000); // Real Vite start, HMR and server restart in one lifecycle scenario.
  const cacheDir = await mkdtemp(
    path.resolve('node_modules/.vite-testlearn-lock-'),
  );
  const dev = fork(path.resolve('tests/fixtures/dev-server.mjs'), [cacheDir], {
    execArgv: [],
    stdio: ['ignore', 'ignore', 'inherit', 'ipc'],
  });
  try {
    const { port } = await fixtureEvent(dev, 'ready');
    await page.goto(`http://127.0.0.1:${port}/`);
    await expect(examButton(page)).toBeEnabled();
    await examButton(page).click();
    const started = JSON.parse((await raw(page))!).active;
    const item = questions.find((q) => q.id === started.questionIds[0])!;
    await page
      .getByRole(item.required === 1 ? 'radio' : 'checkbox', {
        name: item.options[0].text.pt,
        exact: true,
      })
      .check();
    await page.reload(); // No persistence polling before reload.
    await expect(
      page.getByRole(item.required === 1 ? 'radio' : 'checkbox', {
        name: item.options[0].text.pt,
        exact: true,
      }),
    ).toBeChecked();
    await expect(release(page)).toBeEnabled();
    let saved = await raw(page);
    const applied = page.waitForEvent('console', {
      predicate: (message) =>
        message.text().includes('hot updated: /src/App.tsx'),
    });
    const hmr = fixtureEvent(dev, 'hmr');
    dev.send({ action: 'hmr' });
    await hmr;
    await applied;
    await expect(release(page)).toBeEnabled();
    expect(await raw(page)).toBe(saved);
    expect(await held(page)).toBe(1);
    await page
      .getByRole(item.required === 1 ? 'radio' : 'checkbox', {
        name: item.options[1].text.pt,
        exact: true,
      })
      .check();
    saved = await raw(page);
    expect(JSON.parse(saved!).active.answers[item.id]).toContain(
      item.options[1].id,
    );
    const reload = page.waitForEvent('load');
    const restarted = fixtureEvent(dev, 'restarted');
    dev.send({ action: 'restart' });
    await restarted;
    await reload;
    await expect(release(page)).toBeEnabled();
    expect(await raw(page)).toBe(saved);
    await expect(
      page.getByRole(item.required === 1 ? 'radio' : 'checkbox', {
        name: item.options[1].text.pt,
        exact: true,
      }),
    ).toBeChecked();
    expect(await held(page)).toBe(1);
  } finally {
    dev.kill(); // Only the isolated fixture process created by this test.
  }
});
