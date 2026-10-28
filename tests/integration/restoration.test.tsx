import { act, render, screen } from '@testing-library/react';
import { beforeEach, expect, it, vi } from 'vitest';
import { BankNotReadyError } from '../../src/data/bank-history';
import { emptyState, load, loadAsync } from '../../src/storage/store';
import { questions } from '../../src/data/questions';
import { createSession } from '../../src/domain/engine';
import App from '../../src/App';
vi.mock('../../src/storage/store', async (original) => {
  const actual = await original<typeof import('../../src/storage/store')>();
  return { ...actual, load: vi.fn(), loadAsync: vi.fn() };
});
const mockedLoad = vi.mocked(load);
const mockedAsync = vi.mocked(loadAsync);
beforeEach(() => {
  vi.clearAllMocks();
  mockedLoad.mockImplementation(() => {
    throw new BankNotReadyError('2026-10-27.5');
  });
});
it('shows no session or answer controls before restoration; a rejected load preserves raw progress', async () => {
  const raw = '{"saved":"untouched"}';
  localStorage.setItem('testlearn.v1', raw);
  let reject!: (reason: Error) => void;
  mockedAsync.mockReturnValue(
    new Promise((_, no) => {
      reject = no;
    }),
  );
  render(<App />);
  expect(screen.getByRole('status')).toHaveTextContent('A carregar');
  expect(screen.queryByRole('radio')).not.toBeInTheDocument();
  expect(screen.queryByLabelText('Idioma')).not.toBeInTheDocument();
  await act(async () => reject(new Error('offline')));
  expect(screen.getByRole('alert')).toHaveTextContent(
    'dados guardados foram preservados',
  );
  expect(
    screen.getByRole('button', { name: /Recarregar e tentar novamente/ }),
  ).toBeEnabled();
  expect(localStorage.getItem('testlearn.v1')).toBe(raw);
});
it('ignores a stale pending restoration after unmount and a different session is selected', async () => {
  let resolve!: (value: ReturnType<typeof load>) => void;
  mockedAsync.mockReturnValue(
    new Promise((yes) => {
      resolve = yes;
    }),
  );
  const first = render(<App />);
  first.unmount();
  const question = questions.find((q) => q.id === 'tl-003')!;
  const active = createSession([question], 'practice', 0, Date.now(), 42);
  mockedLoad.mockReturnValue({
    state: { ...emptyState(), active },
    warning: null,
  });
  render(<App />);
  expect(screen.getByRole('heading', { name: question.text.pt })).toBeVisible();
  await act(async () => resolve({ state: emptyState(), warning: null }));
  expect(screen.getByRole('heading', { name: question.text.pt })).toBeVisible();
  expect(
    screen.queryByRole('heading', { name: 'O seu espaço de aprendizagem' }),
  ).not.toBeInTheDocument();
});
