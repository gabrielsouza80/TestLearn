import { test, expect } from '@playwright/test';
import { questions } from '../../src/data/questions';
import { advancedArchivedQuestions } from '../fixtures/banks';
import { createSession, answer } from '../../src/domain/engine';
import { CONTENT_REVISION } from '../../src/domain/revision';

const now = Date.parse('2026-11-05T12:00:00Z');
for (const revision of [CONTENT_REVISION, '2026-10-27.9']) {
  for (const id of ['tl-011', 'tl-090']) {
    test(`${id} ${revision}: exact bilingual content, key and persisted result`, async ({
      page,
    }) => {
      await page.clock.setFixedTime(new Date(now));
      const bank =
        revision === CONTENT_REVISION ? questions : advancedArchivedQuestions;
      const q = bank.find((item) => item.id === id)!;
      const session = {
        ...createSession([q], 'practice', 0, now, 42),
        contentRevision: revision,
      };
      await page.goto('/');
      await page.evaluate((s) => {
        localStorage.setItem(
          'testlearn.v1',
          JSON.stringify({ version: 1, active: s, history: [] }),
        );
        localStorage.setItem('synthetic-unrelated', 'preserve');
      }, session);
      await page.reload();
      for (const lang of ['pt', 'en'] as const) {
        await page
          .getByLabel(/^(Idioma|Language)$/, { exact: true })
          .selectOption(lang);
        await expect(
          page.getByRole('heading', { name: q.text[lang], exact: true }),
        ).toBeVisible();
        await expect(page.getByRole('radio')).toHaveCount(4);
        for (const option of q.options)
          await expect(
            page.getByRole('radio', { name: option.text[lang], exact: true }),
          ).toBeVisible();
      }
      const correct = q.options.find((o) => o.id === q.correct[0])!;
      await page
        .getByRole('radio', { name: correct.text.en, exact: true })
        .check();
      await page
        .getByRole('button', { name: 'Check answer', exact: true })
        .click();
      await expect(
        page.getByRole('region', { name: 'Explanation', exact: true }),
      ).toContainText(q.explanation.en);
      await page.reload();
      await page.getByLabel('Idioma', { exact: true }).selectOption('pt');
      await expect(
        page.getByRole('radio', { name: correct.text.pt, exact: true }),
      ).toBeChecked();
      await expect(
        page.getByRole('region', { name: 'Explicação', exact: true }),
      ).toContainText(q.explanation.pt);
      await page
        .getByRole('button', { name: 'Terminar sessão', exact: true })
        .click();
      await page
        .getByRole('button', { name: 'Confirmar e terminar', exact: true })
        .click();
      await expect(
        page.getByRole('heading', { name: '1 / 1', exact: true }),
      ).toBeVisible();
      const stored = await page.evaluate(() => ({
        state: JSON.parse(localStorage.getItem('testlearn.v1')!),
        unrelated: localStorage.getItem('synthetic-unrelated'),
      }));
      expect(stored.unrelated).toBe('preserve');
      expect(stored.state.history).toHaveLength(1);
      expect(stored.state.history[0]).toMatchObject({
        contentRevision: revision,
        questionIds: [id],
        answers: { [id]: q.correct },
        optionOrder: session.optionOrder,
      });
    });
  }
}

test('.9 download failure preserves the entire raw session and explicit retry restores original wording', async ({
  page,
}) => {
  await page.clock.setFixedTime(new Date(now));
  const q = advancedArchivedQuestions.find((q) => q.id === 'tl-011')!;
  const session = {
    ...answer(createSession([q], 'practice', 0, now, 42), q.id, ['o1'], now),
    contentRevision: '2026-10-27.9',
    feedbackIds: [q.id],
  };
  const raw = JSON.stringify({ version: 1, active: session, history: [] });
  await page.goto('/');
  await page.evaluate(
    (value) => localStorage.setItem('testlearn.v1', value),
    raw,
  );
  const archive = /\/assets\/questions-2026-10-27\.9-[^/]+\.js$/;
  await page.route(archive, (route) => route.abort('failed'));
  await page.reload();
  await expect(page.getByRole('alert')).toContainText(
    'dados guardados foram preservados',
  );
  await expect(page.getByRole('radio')).toHaveCount(0);
  expect(await page.evaluate(() => localStorage.getItem('testlearn.v1'))).toBe(
    raw,
  );
  await page.unroute(archive);
  await page
    .getByRole('button', { name: /Recarregar e tentar novamente/ })
    .click();
  await expect(
    page.getByRole('heading', { name: q.text.pt, exact: true }),
  ).toBeVisible();
  await expect(
    page.getByRole('region', { name: 'Explicação', exact: true }),
  ).toContainText(q.explanation.pt);
  expect(await page.evaluate(() => localStorage.getItem('testlearn.v1'))).toBe(
    raw,
  );
});
