import { act, fireEvent, render, screen, within } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import pilot from '../../docs/experiments/advanced-interpretation/pilot-v1.json';
import AdvancedTraining from '../../src/experimental/AdvancedTraining';

const start = () =>
  fireEvent.click(screen.getByRole('button', { name: 'Iniciar treino' }));
const submit = () =>
  fireEvent.click(screen.getByRole('button', { name: 'Confirmar resposta' }));
beforeEach(() => vi.spyOn(document, 'hasFocus').mockReturnValue(true));
afterEach(() => {
  vi.useRealTimers();
  vi.restoreAllMocks();
});

describe('advanced training experience', () => {
  it('does not count a visible but initially unfocused window or offer a misleading resume action', () => {
    vi.useFakeTimers();
    vi.mocked(document.hasFocus).mockReturnValue(false);
    render(<AdvancedTraining />);
    start();
    act(() => vi.advanceTimersByTime(5000));
    expect(screen.getByLabelText('Tempo ativo da questão')).toHaveTextContent(
      '00:00',
    );
    expect(screen.getByRole('button', { name: 'Pausar' })).toBeDisabled();
    expect(
      screen.getByRole('radio', {
        name: pilot.questions[0].options[0].text.pt,
      }),
    ).toBeDisabled();
    fireEvent.focus(window);
    act(() => vi.advanceTimersByTime(1000));
    expect(screen.getByLabelText('Tempo ativo da questão')).toHaveTextContent(
      '00:01',
    );
    expect(screen.getByRole('button', { name: 'Pausar' })).toBeEnabled();
  });
  it('shows the entire scenario and four options, but no answer evidence before submission', () => {
    render(<AdvancedTraining />);
    start();
    const q = pilot.questions[0];
    expect(screen.getByText(q.prompt.pt)).toBeVisible();
    expect(screen.getAllByRole('radio')).toHaveLength(4);
    for (const option of q.options) {
      expect(screen.getByRole('radio', { name: option.text.pt })).toBeEnabled();
      expect(screen.queryByText(option.explanation.pt)).not.toBeInTheDocument();
    }
    expect(screen.queryByText(q.readingStrategy)).not.toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: 'Confirmar resposta' }),
    ).toBeDisabled();
    fireEvent.click(screen.getByRole('radio', { name: q.options[0].text.pt }));
    expect(
      screen.queryByRole('region', { name: 'Análise da resposta' }),
    ).not.toBeInTheDocument();
    submit();
    const feedback = screen.getByRole('region', {
      name: 'Análise da resposta',
    });
    expect(within(feedback).getByText('Resposta incorreta')).toBeVisible();
    for (const o of q.options)
      expect(within(feedback).getByText(o.explanation.pt)).toBeVisible();
    expect(within(feedback).getByText(q.readingStrategy)).toBeVisible();
    expect(screen.queryByRole('radio')).not.toBeInTheDocument();
    expect(
      screen.queryByRole('button', { name: 'Confirmar resposta' }),
    ).not.toBeInTheDocument();
  });

  it('preserves the selected answer and timer across EN/PT switching and freezes on submit', () => {
    vi.useFakeTimers();
    render(<AdvancedTraining />);
    start();
    fireEvent.click(
      screen.getByRole('radio', {
        name: pilot.questions[0].options[2].text.pt,
      }),
    );
    act(() => vi.advanceTimersByTime(3000));
    fireEvent.change(screen.getByRole('combobox', { name: 'Idioma' }), {
      target: { value: 'en' },
    });
    expect(screen.getByText(pilot.questions[0].prompt.en)).toBeVisible();
    expect(
      screen.getByRole('radio', {
        name: pilot.questions[0].options[2].text.en,
      }),
    ).toBeChecked();
    expect(screen.getByLabelText('Active question time')).toHaveTextContent(
      '00:03',
    );
    fireEvent.click(screen.getByRole('button', { name: 'Submit answer' }));
    expect(screen.getByText('Correct answer')).toBeVisible();
    act(() => vi.advanceTimersByTime(60000));
    expect(screen.getByLabelText('Active question time')).toHaveTextContent(
      '00:03',
    );
    expect(
      screen.getByRole('heading', { name: 'Suggested reading strategy' }),
    ).toBeVisible();
    expect(
      screen.queryByText(pilot.questions[0].readingStrategy),
    ).not.toBeInTheDocument();
  });

  it('pauses manual, background and unfocused time without discarding prior time', () => {
    vi.useFakeTimers();
    render(<AdvancedTraining />);
    start();
    act(() => vi.advanceTimersByTime(2000));
    fireEvent.click(screen.getByRole('button', { name: 'Pausar' }));
    act(() => vi.advanceTimersByTime(10000));
    expect(screen.getByLabelText('Tempo ativo da questão')).toHaveTextContent(
      '00:02',
    );
    expect(
      screen.getByRole('radio', {
        name: pilot.questions[0].options[0].text.pt,
      }),
    ).toBeDisabled();
    fireEvent.click(screen.getByRole('button', { name: 'Retomar' }));
    act(() => vi.advanceTimersByTime(1000));
    fireEvent.blur(window);
    act(() => vi.advanceTimersByTime(20000));
    expect(screen.getByLabelText('Tempo ativo da questão')).toHaveTextContent(
      '00:03',
    );
    fireEvent.focus(window);
    act(() => vi.advanceTimersByTime(1000));
    Object.defineProperty(document, 'visibilityState', {
      configurable: true,
      value: 'hidden',
    });
    fireEvent(document, new Event('visibilitychange'));
    act(() => vi.advanceTimersByTime(20000));
    expect(screen.getByLabelText('Tempo ativo da questão')).toHaveTextContent(
      '00:04',
    );
    Object.defineProperty(document, 'visibilityState', {
      configurable: true,
      value: 'visible',
    });
    fireEvent(document, new Event('visibilitychange'));
    act(() => vi.advanceTimersByTime(1000));
    expect(screen.getByLabelText('Tempo ativo da questão')).toHaveTextContent(
      '00:05',
    );
  });

  it('uses optional editorial targets without automatically answering or ending the question', () => {
    vi.useFakeTimers();
    render(<AdvancedTraining />);
    fireEvent.click(
      screen.getByRole('radio', { name: 'Prática cronometrada' }),
    );
    start();
    expect(screen.getByText(/Meta editorial: 01:30/)).toBeVisible();
    act(() => vi.advanceTimersByTime(95000));
    expect(screen.getAllByRole('radio')).toHaveLength(4);
    expect(
      screen.queryByRole('region', { name: 'Análise da resposta' }),
    ).not.toBeInTheDocument();
    fireEvent.click(
      screen.getByRole('checkbox', { name: 'Mostrar metas por questão' }),
    );
    expect(screen.queryByText(/Meta editorial:/)).not.toBeInTheDocument();
  });

  it('summarizes all ten actual attempts, excludes feedback time and restarts cleanly without persistence', () => {
    vi.useFakeTimers();
    render(<AdvancedTraining />);
    start();
    pilot.questions.forEach((q, i) => {
      act(() => vi.advanceTimersByTime(2000));
      const selected = i === 0 ? 'p1' : q.correct[0];
      fireEvent.click(
        screen.getByRole('radio', {
          name: q.options.find((o) => o.id === selected)!.text.pt,
        }),
      );
      submit();
      act(() => vi.advanceTimersByTime(10000));
      fireEvent.click(
        screen.getByRole('button', {
          name: i === 9 ? 'Ver resumo' : 'Próxima questão',
        }),
      );
    });
    expect(
      screen.getByRole('heading', { name: 'Resumo da sessão' }),
    ).toHaveFocus();
    expect(screen.getByText('9 / 10 · 90%')).toBeVisible();
    expect(screen.getByText('Tempo ativo total: 00:20')).toBeVisible();
    const rows = within(screen.getByRole('table')).getAllByRole('row');
    expect(rows).toHaveLength(11);
    for (const row of rows.slice(1)) expect(row).toHaveTextContent('00:02');
    expect(localStorage.length).toBe(0);
    fireEvent.click(screen.getByRole('button', { name: 'Recomeçar sessão' }));
    expect(
      screen.getByRole('button', { name: 'Iniciar treino' }),
    ).toBeVisible();
    start();
    expect(screen.getByText('Questão 1 de 10')).toBeVisible();
    expect(screen.getByLabelText('Tempo ativo da questão')).toHaveTextContent(
      '00:00',
    );
    expect(
      screen.queryByRole('region', { name: 'Análise da resposta' }),
    ).not.toBeInTheDocument();
  });
});
