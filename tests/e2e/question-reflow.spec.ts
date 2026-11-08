import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
import { questions } from '../../src/data/questions';
import { createSession } from '../../src/domain/engine';

for (const language of ['pt', 'en'] as const) {
  test(`question reflow preserves readable options, controls and feedback in ${language}`, async ({
    page,
  }, testInfo) => {
    const now = Date.parse('2026-11-08T12:00:00Z');
    const bank = ['tl-038', 'tl-078'].map((id) =>
      questions.find((q) => q.id === id)!,
    );
    const session = createSession(bank, 'practice', 0, now, 42);
    await page.clock.setFixedTime(new Date(now));
    await page.goto('/');
    await page.evaluate(
      (active) =>
        localStorage.setItem(
          'testlearn.v1',
          JSON.stringify({ version: 1, active, history: [] }),
        ),
      session,
    );
    await page.reload();
    await page.getByLabel('Idioma', { exact: true }).selectOption(language);
    await expect(page.getByRole('note')).toBeVisible();
    for (const [width, scale] of [
      [320, 100],
      [320, 200],
      [390, 100],
      [390, 200],
      [768, 100],
      [1280, 100],
    ]) {
      await page.setViewportSize({ width, height: 900 });
      await page.evaluate((scale) => {
        document.documentElement.style.fontSize = `${scale}%`;
      }, scale);
      const dimensions = await page.evaluate(() => {
        const root = document.documentElement;
        return {
          scrollWidth: root.scrollWidth,
          clientWidth: root.clientWidth,
          fontSize: getComputedStyle(root).fontSize,
        };
      });
      expect(dimensions.clientWidth).toBe(width);
      expect(dimensions.scrollWidth).toBeLessThanOrEqual(
        dimensions.clientWidth,
      );
      expect(dimensions.fontSize).toBe(scale === 200 ? '32px' : '16px');
      for (const option of bank[0].options)
        await expect(
          page.getByRole('radio', { name: option.text[language], exact: true }),
        ).toBeVisible();
      const controls = page.locator(
        '.options, .option, .option-text, .question-actions button, .pedagogical-review-notice',
      );
      for (const item of await controls.all()) {
        const bounds = await item.boundingBox();
        expect(bounds).not.toBeNull();
        expect(bounds!.x).toBeGreaterThanOrEqual(0);
        expect(bounds!.x + bounds!.width).toBeLessThanOrEqual(width);
      }
    }
    await page.setViewportSize({ width: 320, height: 900 });
    await page.evaluate(() => {
      document.documentElement.style.fontSize = '200%';
    });
    const notice = page.getByRole('note');
    await notice.focus();
    await page.keyboard.press('Tab');
    await expect(page.getByRole('radio').first()).toBeFocused();
    await page
      .getByRole('radio', {
        name: bank[0].options.find((o) => o.id === 'o1')!.text[language],
        exact: true,
      })
      .check();
    await page
      .getByRole('button', {
        name: language === 'pt' ? 'Confirmar resposta' : 'Check answer',
        exact: true,
      })
      .click();
    const feedbackName = language === 'pt' ? 'Explicação' : 'Explanation';
    await expect(
      page.getByRole('region', { name: feedbackName, exact: true }),
    ).toHaveClass(/\bfeedback-correct\b/);
    expect(
      await page.evaluate(
        () =>
          document.documentElement.scrollWidth <=
          document.documentElement.clientWidth,
      ),
    ).toBe(true);
    const accessibility = await new AxeBuilder({ page })
      .include('.question')
      .withTags(['wcag2a', 'wcag2aa'])
      .analyze();
    expect(accessibility.violations).toEqual([]);
    // WebKit cannot capture a single image taller than 32767px. Retain
    // viewport evidence without changing the enlarged text or layout checks.
    await notice.scrollIntoViewIfNeeded();
    await page.screenshot({
      path: testInfo.outputPath(`${language}-320-text200-notice.png`),
    });
    await page.locator('.question-actions').scrollIntoViewIfNeeded();
    await page.screenshot({
      path: testInfo.outputPath(`${language}-320-text200-controls.png`),
    });
    await page
      .getByRole('button', {
        name: language === 'pt' ? 'Seguinte' : 'Next',
        exact: true,
      })
      .click();
    await expect(page.getByRole('note')).toHaveCount(0);
    await page
      .getByRole('radio', {
        name: bank[1].options.find((o) => o.id === 'o2')!.text[language],
        exact: true,
      })
      .check();
    await page
      .getByRole('button', {
        name: language === 'pt' ? 'Confirmar resposta' : 'Check answer',
        exact: true,
      })
      .click();
    await expect(
      page.getByRole('region', { name: feedbackName, exact: true }),
    ).toHaveClass(/\bfeedback-incorrect\b/);
    expect(
      await page.evaluate(
        () =>
          document.documentElement.scrollWidth <=
          document.documentElement.clientWidth,
      ),
    ).toBe(true);
    await page
      .getByRole('button', {
        name: language === 'pt' ? 'Terminar sessão' : 'Finish session',
        exact: true,
      })
      .click();
    await page
      .getByRole('button', {
        name: language === 'pt' ? 'Confirmar e terminar' : 'Confirm and finish',
        exact: true,
      })
      .click();
    await expect(
      page.getByRole('heading', { name: '1 / 2', exact: true }),
    ).toBeVisible();
    const history = await page.evaluate(
      () => JSON.parse(localStorage.getItem('testlearn.v1')!).history,
    );
    expect(history).toHaveLength(1);
    expect(history[0].answers).toEqual({ 'tl-038': ['o1'], 'tl-078': ['o2'] });
    expect(history[0].optionOrder).toEqual(session.optionOrder);
  });
}
