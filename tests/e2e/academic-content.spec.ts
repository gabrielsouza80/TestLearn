import { archivedExam } from '../fixtures/sessions';
import { test, expect } from '@playwright/test';
import { questions } from '../../src/data/questions';
import { legacyQuestions } from '../fixtures/banks';
import { createSession } from '../../src/domain/engine';
import { LEGACY_CONTENT_REVISION } from '../../src/domain/revision';
const fixed = Date.parse('2026-10-27T12:00:00Z');
test('real PT-PT questions: decision table, ≥ symbol, multiple-selection limit and explanations', async ({
  page,
}) => {
  await page.clock.setFixedTime(new Date(fixed));
  const bank = ['tl-027', 'tl-001', 'tl-036', 'tl-038'].map((id) =>
    questions.find((q) => q.id === id)!,
  );
  const session = createSession(bank, 'practice', 0, fixed, 42);
  await page.addInitScript(
    (s) =>
      localStorage.setItem(
        'testlearn.v1',
        JSON.stringify({ version: 1, active: s, history: [] }),
      ),
    session,
  );
  await page.goto('/');
  const table = page.getByRole('table');
  await expect(table).toBeVisible();
  await expect(
    table.getByRole('columnheader', { name: 'R1', exact: true }),
  ).toBeVisible();
  await expect(
    table.getByRole('rowheader', { name: 'Total ≥ 50?', exact: true }),
  ).toBeVisible();
  await expect(
    page.getByRole('group', { name: 'Selecione 1 resposta.', exact: true }),
  ).toBeVisible();
  await page
    .getByRole('radio', { name: 'Membro = sim; total = 60', exact: true })
    .check();
  await page
    .getByRole('button', { name: 'Confirmar resposta', exact: true })
    .click();
  await expect(page.getByRole('region', { name: 'Explicação' })).toContainText(
    'A regra R1 exige',
  );
  await page.getByRole('button', { name: 'Seguinte', exact: true }).click();
  const multiple = bank[1];
  await expect(
    page.getByRole('group', { name: 'Selecione 2 respostas.', exact: true }),
  ).toBeVisible();
  const boxes = page.getByRole('checkbox');
  await expect(boxes).toHaveCount(4);
  const first = page.getByRole('checkbox', {
    name: multiple.options.find((o) => o.id === 'o1')!.text.pt,
    exact: true,
  });
  const second = page.getByRole('checkbox', {
    name: multiple.options.find((o) => o.id === 'o4')!.text.pt,
    exact: true,
  });
  await first.check();
  await second.check();
  await expect(
    page.getByRole('checkbox', {
      name: multiple.options.find((o) => o.id === 'o2')!.text.pt,
      exact: true,
    }),
  ).toBeDisabled();
  await first.uncheck();
  await expect(first).toBeEnabled();
  await first.check();
  await page
    .getByRole('button', { name: 'Confirmar resposta', exact: true })
    .click();
  await expect(page.getByRole('region', { name: 'Explicação' })).toContainText(
    'Resposta correta',
  );
  await page.getByRole('button', { name: 'Seguinte', exact: true }).click();
  await expect(
    page.getByRole('heading', { name: bank[2].text.pt, exact: true }),
  ).toBeVisible();
  await page
    .getByRole('radio', { name: '6 pessoas-hora', exact: true })
    .check();
  await page
    .getByRole('button', { name: 'Confirmar resposta', exact: true })
    .click();
  await expect(page.getByRole('region', { name: 'Explicação' })).toContainText(
    '(2 + 4 × 5 + 14) / 6',
  );
  await page.getByRole('button', { name: 'Seguinte', exact: true }).click();
  await expect(
    page.getByRole('heading', { name: bank[3].text.pt, exact: true }),
  ).toBeVisible();
  await page
    .getByRole('radio', { name: bank[3].options[0].text.pt, exact: true })
    .check();
  await page
    .getByRole('button', { name: 'Confirmar resposta', exact: true })
    .click();
  await expect(page.getByRole('region', { name: 'Explicação' })).toContainText(
    'sem inventar uma causa',
  );
  await page
    .getByRole('button', { name: 'Terminar sessão', exact: true })
    .click();
  await page
    .getByRole('button', { name: 'Confirmar e terminar', exact: true })
    .click();
  await expect(
    page.getByRole('heading', { name: '4 / 4', exact: true }),
  ).toBeVisible();
  await expect(
    page.getByRole('table', { name: 'Dados da questão' }),
  ).toBeVisible();
  await expect(
    page
      .getByRole('table')
      .getByRole('columnheader', { name: 'R1', exact: true }),
  ).toBeVisible();
});

test('legacy resume and completed review preserve the actual original question and result', async ({
  page,
}) => {
  await page.clock.setFixedTime(new Date(fixed));
  const ordered = [
    legacyQuestions.find((q) => q.id === 'tl-036')!,
    ...legacyQuestions.filter((q) => q.id !== 'tl-036'),
  ];
  const session = {
    ...archivedExam(ordered, LEGACY_CONTENT_REVISION, fixed, 42),
    contentRevision: LEGACY_CONTENT_REVISION,
  };
  // Seed only the initial navigation, not every reload, so restoration checks actual application writes.
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
    'banco anterior à auditoria',
  );
  await expect(
    page.getByRole('heading', { name: ordered[0].text.pt, exact: true }),
  ).toBeVisible();
  await page.getByRole('radio', { name: '5 horas', exact: true }).check();
  // Web Locks serialize saves asynchronously; reload only after the real write.
  await expect
    .poll(() =>
      page.evaluate(
        () =>
          JSON.parse(localStorage.getItem('testlearn.v1')!).active.answers[
            'tl-036'
          ],
      ),
    )
    .toEqual(['o1']);
  await page.reload();
  await expect(
    page.getByRole('radio', { name: '5 horas', exact: true }),
  ).toBeChecked();
  await page
    .getByRole('button', { name: 'Terminar sessão', exact: true })
    .click();
  await page
    .getByRole('button', { name: 'Confirmar e terminar', exact: true })
    .click();
  await expect(
    page.getByRole('heading', { name: '1 / 40', exact: true }),
  ).toBeVisible();
  await expect
    .poll(() =>
      page.evaluate(
        () =>
          JSON.parse(localStorage.getItem('testlearn.v1')!).history[0]?.answers[
            'tl-036'
          ],
      ),
    )
    .toEqual(['o1']);
  await page.reload();
  await page.getByRole('button', { name: 'Progresso', exact: true }).click();
  await page.getByRole('button', { name: 'Rever', exact: true }).click();
  await expect(
    page.getByRole('heading', { name: '1 / 40', exact: true }),
  ).toBeVisible();
  await expect(
    page.getByRole('heading', { name: ordered[0].text.pt, exact: true }),
  ).toBeVisible();
  const stored = await page.evaluate(() =>
    JSON.parse(localStorage.getItem('testlearn.v1')!),
  );
  expect(stored.history[0].contentRevision).toBe(LEGACY_CONTENT_REVISION);
  expect(stored.history[0].answers['tl-036']).toEqual(['o1']);
});
