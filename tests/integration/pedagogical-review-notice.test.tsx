import { afterEach, beforeAll, expect, it, vi } from 'vitest';
import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../../src/App';
import { questions } from '../../src/data/questions';
import { createSession } from '../../src/domain/engine';
import { save } from '../../src/storage/store';
import { prepareHistoricalBanks } from '../fixtures/banks';
import { selectPracticeExam } from '../../src/domain/blueprint';

beforeAll(prepareHistoricalBanks);
afterEach(() => vi.useRealTimers());
const question = questions.find((q) => q.id === 'tl-038')!;

it.each([
  [
    'pt',
    'Em revisão pedagógica',
    'Esta questão está em análise quanto ao nível de exigência pedagógica. A resposta e a pontuação permanecem inalteradas.',
  ],
  [
    'en',
    'Under pedagogical review',
    'This question is under review regarding its cognitive demand. The answer and scoring remain unchanged.',
  ],
] as const)(
  'shows the accessible notice in %s without revealing feedback or changing the session',
  async (language, title, description) => {
    const session = createSession([question], 'practice', 0, Date.now(), 42);
    save({ version: 1, active: session, history: [] });
    const user = userEvent.setup();
    render(<App />);
    await screen.findByText('Pronto para guardar neste navegador.', {
      exact: true,
    });
    await user.selectOptions(
      screen.getByLabelText('Idioma', { exact: true }),
      language,
    );
    const notice = screen.getByRole('note', { name: title });
    expect(
      screen.queryByRole('note', { name: title.slice(0, -1) }),
    ).not.toBeInTheDocument();
    expect(
      screen.queryByRole('note', { name: `${title} extra` }),
    ).not.toBeInTheDocument();
    expect(notice).toHaveAccessibleDescription(description);
    expect(
      within(notice).getByText(description, { exact: true }),
    ).toBeVisible();
    notice.focus();
    expect(notice).toHaveFocus();
    expect(
      screen.queryByRole('region', { name: /^(Explicação|Explanation)$/ }),
    ).not.toBeInTheDocument();
    expect(notice).not.toHaveTextContent(/o1|HTTP|201|500|FL-5\.5\.1/);
    const stored = JSON.parse(localStorage.getItem('testlearn.v1')!).active;
    expect(stored).toEqual(session);
    expect(
      screen.getByRole('button', {
        name: language === 'en' ? 'Check answer' : 'Confirmar resposta',
      }),
    ).toBeDisabled();
  },
);

it('keeps timed-exam deadlines, selections and pre-submission secrecy unchanged', async () => {
  vi.useFakeTimers({ toFake: ['Date'] });
  vi.setSystemTime(new Date('2026-11-08T12:00:00Z'));
  const bank = Array.from({ length: 100 }, (_, seed) =>
    selectPracticeExam(questions, seed),
  ).find((items) => items.some((q) => q.id === question.id))!;
  expect(bank).toBeDefined();
  const session = createSession(
    [question, ...bank.filter((q) => q.id !== question.id)],
    'exam',
    60,
    Date.now(),
    42,
  );
  save({ version: 1, active: session, history: [] });
  render(<App />);
  const user = userEvent.setup();
  await screen.findByText('Pronto para guardar neste navegador.', {
    exact: true,
  });
  expect(
    screen.getByRole('note', { name: 'Em revisão pedagógica' }),
  ).toBeVisible();
  expect(screen.getByRole('timer')).toHaveTextContent('60:00');
  expect(
    screen.queryByRole('button', { name: 'Confirmar resposta' }),
  ).not.toBeInTheDocument();
  vi.setSystemTime(new Date('2026-11-08T12:00:05Z'));
  await user.click(
    screen.getByRole('radio', {
      name: question.options.find((o) => o.id === 'o1')!.text.pt,
    }),
  );
  await user.click(screen.getByRole('button', { name: 'Seguinte' }));
  expect(screen.queryByRole('note')).not.toBeInTheDocument();
  await user.click(screen.getByRole('button', { name: 'Anterior' }));
  expect(screen.getByRole('note')).toBeVisible();
  expect(
    screen.queryByRole('region', { name: 'Explicação' }),
  ).not.toBeInTheDocument();
  const stored = JSON.parse(localStorage.getItem('testlearn.v1')!).active;
  expect(stored.deadline).toBe(session.deadline);
  expect(stored.startedAt).toBe(session.startedAt);
  expect(stored.optionOrder).toEqual(session.optionOrder);
  expect(stored.answers).toEqual({ 'tl-038': ['o1'] });
  expect(stored.responseMs['tl-038']).toBe(5000);
});

it('preserves practice feedback, elapsed time, navigation and final score', async () => {
  vi.useFakeTimers({ toFake: ['Date'] });
  vi.setSystemTime(new Date('2026-11-08T12:00:00Z'));
  const other = questions.find((q) => q.id === 'tl-078')!;
  const session = createSession(
    [question, other],
    'practice',
    0,
    Date.now(),
    42,
  );
  save({ version: 1, active: session, history: [] });
  render(<App />);
  const user = userEvent.setup();
  await screen.findByText('Pronto para guardar neste navegador.', {
    exact: true,
  });
  vi.setSystemTime(new Date('2026-11-08T12:00:05Z'));
  await user.click(
    screen.getByRole('radio', {
      name: question.options.find((o) => o.id === 'o1')!.text.pt,
    }),
  );
  await user.click(screen.getByRole('button', { name: 'Confirmar resposta' }));
  expect(screen.getByText('Resposta correta', { exact: true })).toBeVisible();
  expect(screen.getByRole('region', { name: 'Explicação' })).toHaveTextContent(
    question.explanation.pt,
  );
  await user.click(screen.getByRole('button', { name: 'Seguinte' }));
  expect(screen.getByRole('heading', { name: other.text.pt })).toBeVisible();
  expect(screen.queryByRole('note')).not.toBeInTheDocument();
  vi.setSystemTime(new Date('2026-11-08T12:00:10Z'));
  await user.click(screen.getByRole('button', { name: 'Anterior' }));
  expect(screen.getByRole('note')).toBeVisible();
  vi.setSystemTime(new Date('2026-11-08T12:00:12Z'));
  await user.click(screen.getByRole('button', { name: 'Terminar sessão' }));
  await user.click(
    screen.getByRole('button', { name: 'Confirmar e terminar' }),
  );
  expect(screen.getByRole('heading', { name: '1 / 2' })).toBeVisible();
  const state = JSON.parse(localStorage.getItem('testlearn.v1')!);
  expect(state.active).toBeNull();
  expect(state.history).toHaveLength(1);
  expect(state.history[0]).toMatchObject({
    contentRevision: '2026-10-27.10',
    answers: { 'tl-038': ['o1'] },
    responseMs: { 'tl-038': 7000, 'tl-078': 5000 },
    optionOrder: session.optionOrder,
  });
});
