import { StrictMode } from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { expect, it } from 'vitest';
import App from '../../src/App';
import {
  createStateWriter,
  emptyState,
  readStoredValue,
} from '../../src/storage/store';

it('a single StrictMode tab gets write access and persists a new 40-question exam', async () => {
  const user = userEvent.setup();
  render(
    <StrictMode>
      <App />
    </StrictMode>,
  );
  await screen.findByText('Pronto para guardar neste navegador.', {});
  await user.click(screen.getByRole('button', { name: 'Fazer simulado CTFL' }));
  const saved = JSON.parse(localStorage.getItem('testlearn.v1')!);
  expect(saved.active.questionIds).toHaveLength(40);
  expect(saved.history).toEqual([]);
  expect(screen.getByRole('button', { name: 'Terminar sessão' })).toBeEnabled();
});
it('an explicit retry recovers an unchanged snapshot after the actual owner releases', async () => {
  const owner = createStateWriter(null);
  await owner.acquire();
  const user = userEvent.setup();
  render(
    <StrictMode>
      <App />
    </StrictMode>,
  );
  await screen.findByText(
    /Outro separador ou contexto tem a reserva de escrita/,
  );
  expect(
    screen.getByRole('button', { name: 'Fazer simulado CTFL' }),
  ).toBeDisabled();
  await user.click(
    screen.getByRole('button', {
      name: 'Tentar obter acesso de escrita',
    }),
  );
  await screen.findByText(
    /Outro separador ou contexto tem a reserva de escrita/,
  );
  expect(readStoredValue()).toBeNull();
  owner.release();
  await expect
    .poll(async () => (await navigator.locks.query()).held?.length)
    .toBe(0);
  await user.click(
    screen.getByRole('button', {
      name: 'Tentar obter acesso de escrita',
    }),
  );
  await screen.findByText('Pronto para guardar neste navegador.', {});
  expect(
    screen.getByRole('button', { name: 'Fazer simulado CTFL' }),
  ).toBeEnabled();
  expect(readStoredValue()).toBeNull();
});
it('a changed snapshot stays blocked and requires reload, never reset or an overwrite', async () => {
  const owner = createStateWriter(null);
  await owner.acquire();
  render(
    <StrictMode>
      <App />
    </StrictMode>,
  );
  await screen.findByText(
    /Outro separador ou contexto tem a reserva de escrita/,
  );
  expect(owner.save(emptyState())).toBe('saved');
  const raw = readStoredValue();
  fireEvent(
    window,
    new StorageEvent('storage', { key: 'testlearn.v1', newValue: raw }),
  );
  expect(screen.getByRole('alert')).toHaveTextContent('noutro separador');
  expect(
    screen.getByRole('button', {
      name: 'Recarregar o progresso guardado',
    }),
  ).toBeEnabled();
  expect(
    screen.queryByRole('button', {
      name: 'Tentar obter acesso de escrita',
    }),
  ).not.toBeInTheDocument();
  expect(readStoredValue()).toBe(raw);
  owner.release();
});
