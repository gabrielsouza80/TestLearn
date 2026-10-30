import { expect, type Page, type Locator } from '@playwright/test';
import type { Question } from '../../src/domain/engine';

export const reviewNavigation = (page: Page) =>
  page.getByRole('navigation', {
    name: /^(Navegação da revisão|Review navigation)$/,
  });
export const reviewNumbers = (page: Page) =>
  reviewNavigation(page).getByRole('button', {
    name: /^(Questão|Question) \d/,
  });
export async function reviewQuestion(page: Page, number: number) {
  const button = reviewNavigation(page).getByRole('button', {
    name: new RegExp(`^(?:Questão|Question) ${number}(?:\\D|$)`),
  });
  await button.click();
  await expect(button).toHaveAttribute('aria-current', 'true');
  await expect(
    page.locator('.review-question [id^="review-title-"]'),
  ).toBeFocused();
}
export async function revealRationales(
  region: Locator,
  question: Question,
  language: 'pt' | 'en',
) {
  for (const option of question.options) {
    const card = region.locator(`[data-option-id="${option.id}"]`);
    const details = card.locator('details');
    if (
      (await details.count()) &&
      (await details.getAttribute('open')) === null
    )
      await details.locator('summary').click();
    await expect(
      card.getByText(option.explanation[language], { exact: true }),
    ).toBeVisible();
  }
}
export async function showEditingOptions(page: Page) {
  const summary = page.getByText(/^(Opções de edição|Editing options)$/);
  if ((await summary.locator('..').getAttribute('open')) === null)
    await summary.click();
}
