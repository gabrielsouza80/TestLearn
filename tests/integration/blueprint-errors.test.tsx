import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { it, expect, vi } from 'vitest';
vi.mock('../../src/data/questions', async (importOriginal) => {
  const module =
    await importOriginal<typeof import('../../src/data/questions')>();
  return {
    ...module,
    questions: module.questions.filter((q) => q.lo !== 'FL-1.5.2'),
  };
});
import App from '../../src/App';
it('explains a missing mandatory group without creating an exam, and keeps topic study usable', async () => {
  const user = userEvent.setup();
  render(<App />);
  await user.click(screen.getByRole('button', { name: 'Iniciar simulação' }));
  expect(screen.getByRole('alert')).toHaveTextContent(
    'falta cobertura elegível no grupo 1-k1-whole-team',
  );
  expect(screen.getByRole('alert')).toHaveTextContent(
    'Pode continuar a usar a prática por tópico',
  );
  expect(localStorage.getItem('testlearn.v1')).toBeNull();
  await user.click(screen.getByRole('button', { name: 'Praticar' }));
  await user.selectOptions(
    screen.getByRole('combobox', { name: 'Capítulo' }),
    '6',
  );
  await user.clear(
    screen.getByRole('spinbutton', { name: 'Número de questões' }),
  );
  await user.type(
    screen.getByRole('spinbutton', { name: 'Número de questões' }),
    '1',
  );
  await user.click(screen.getByRole('button', { name: 'Iniciar prática' }));
  expect(screen.getByText('Questão 1 / 1')).toBeVisible();
  const saved = JSON.parse(localStorage.getItem('testlearn.v1')!);
  expect(saved.active.mode).toBe('practice');
  expect(saved.active.deadline).toBeNull();
});
