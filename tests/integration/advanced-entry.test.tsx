import { fireEvent, render, screen } from '@testing-library/react';
import { afterEach, expect, it } from 'vitest';
import DevelopmentApp from '../../src/experimental/DevelopmentApp';

afterEach(() => window.history.replaceState(null, '', '/'));
it('offers a named experimental entry without changing the examination application', () => {
  render(<DevelopmentApp />);
  expect(
    screen.getByRole('link', { name: /Treino experimental/ }),
  ).toHaveAttribute('href', '/?training=advanced');
  expect(
    screen.getByRole('button', { name: 'Fazer simulado CTFL' }),
  ).toBeVisible();
});
it('opens the isolated training directly at its local path', () => {
  window.history.replaceState(null, '', '/?training=advanced');
  render(<DevelopmentApp />);
  fireEvent.click(screen.getByRole('button', { name: 'Iniciar treino' }));
  expect(screen.getByText('Questão 1 de 10')).toBeVisible();
  expect(
    screen.queryByRole('button', { name: 'Fazer simulado CTFL' }),
  ).not.toBeInTheDocument();
});
