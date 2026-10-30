import { examQuestions } from '../fixtures/sessions';
import { act, fireEvent, render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { afterEach, describe, expect, it, vi } from 'vitest';
import App from '../../src/App';
import { questions } from '../../src/data/questions';
import { createSession, type Session } from '../../src/domain/engine';
import { save } from '../../src/storage/store';

function seed(session: Session) {
  save({ version: 1, active: session, history: [] });
}
afterEach(() => vi.useRealTimers());

describe('learning workflows', () => {
  it('shows real empty statistics, bilingual controls and a usable exam entry', async () => {
    const user = userEvent.setup();
    render(<App />);
    await screen.findByText('Pronto para guardar neste navegador.', {
      exact: true,
    });
    expect(
      screen.getByRole('heading', { name: 'O seu espaço de aprendizagem' }),
    ).toBeVisible();
    expect(
      screen.getByRole('button', { name: 'Fazer simulado CTFL' }),
    ).toBeEnabled();
    await user.click(screen.getByRole('button', { name: 'Progresso' }));
    expect(screen.getByText(/Ainda não concluiu nenhuma sessão/)).toBeVisible();
    await user.selectOptions(
      screen.getByRole('combobox', { name: 'Idioma' }),
      'en',
    );
    expect(
      screen.getByRole('heading', { name: 'Your learning history' }),
    ).toBeVisible();
    expect(document.documentElement.lang).toBe('en');
  });

  it('preserves changed answers through navigation and reload without revealing exam answers', async () => {
    const ordered = [
      examQuestions.find((q) => q.required === 1)!,
      ...examQuestions.filter(
        (q) => q.id !== examQuestions.find((q) => q.required === 1)!.id,
      ),
    ];
    seed(createSession(ordered, 'exam', 60, Date.now(), 42));
    const user = userEvent.setup();
    const view = render(<App />);
    const q = ordered[0];
    await user.click(screen.getByRole('radio', { name: q.options[0].text.pt }));
    await user.click(screen.getByRole('radio', { name: q.options[1].text.pt }));
    await user.click(screen.getByRole('button', { name: 'Marcar para rever' }));
    await user.click(screen.getByRole('button', { name: 'Seguinte' }));
    await user.click(screen.getByRole('button', { name: 'Anterior' }));
    expect(
      screen.getByRole('radio', { name: q.options[1].text.pt }),
    ).toBeChecked();
    expect(
      screen.getByRole('button', { name: 'Retirar marcação' }),
    ).toHaveAttribute('aria-pressed', 'true');
    expect(
      screen.queryByRole('region', { name: 'Explicação' }),
    ).not.toBeInTheDocument();
    await act(async () => view.unmount());
    render(<App />);
    expect(
      screen.getByRole('radio', { name: q.options[1].text.pt }),
    ).toBeChecked();
    await user.click(
      screen.getByRole('button', { name: 'Questão 3, sem resposta' }),
    );
    expect(
      screen.getByRole('heading', { name: ordered[2].text.pt }),
    ).toBeVisible();
  });

  it('scores exact multi-answer sets and filters unanswered review after explicit confirmation', async () => {
    const multiple = questions.find((q) => q.required === 2)!;
    seed(
      createSession([multiple, questions[1]], 'practice', 0, Date.now(), 42),
    );
    const user = userEvent.setup();
    render(<App />);
    for (const id of multiple.correct)
      await user.click(
        screen.getByRole('checkbox', {
          name: multiple.options.find((o) => o.id === id)!.text.pt,
        }),
      );
    await user.click(
      screen.getByRole('button', { name: 'Confirmar resposta' }),
    );
    expect(screen.getByText('Resposta correta')).toBeVisible();
    await user.click(screen.getByRole('button', { name: 'Terminar sessão' }));
    const dialog = screen.getByRole('alertdialog');
    expect(within(dialog).getByText(/1 questão/)).toBeVisible();
    await user.click(
      within(dialog).getByRole('button', { name: 'Confirmar e terminar' }),
    );
    expect(screen.getByRole('heading', { name: '1 / 2' })).toBeVisible();
    expect(
      screen.getByRole('region', { name: 'Explicação da questão 1' }),
    ).toBeVisible();
    expect(
      screen.getByRole('region', { name: 'Explicação da questão 2' }),
    ).toBeVisible();
    await user.selectOptions(
      screen.getByRole('combobox', { name: 'Mostrar' }),
      'unanswered',
    );
    expect(
      screen.getByRole('heading', { name: questions[1].text.pt }),
    ).toBeVisible();
    expect(
      screen.queryByRole('heading', { name: multiple.text.pt }),
    ).not.toBeInTheDocument();
    expect(
      JSON.parse(localStorage.getItem('testlearn.v1')!).history,
    ).toHaveLength(1);
    await user.click(screen.getByRole('button', { name: 'Nova prática' }));
    expect(
      screen.getByRole('button', { name: 'Iniciar prática' }),
    ).toBeEnabled();
  });

  it('applies combined practice filters and rejects insufficient eligible counts', async () => {
    const user = userEvent.setup();
    render(<App />);
    await user.click(screen.getByRole('button', { name: 'Praticar' }));
    await user.selectOptions(
      screen.getByRole('combobox', { name: 'Capítulo' }),
      '6',
    );
    expect(
      screen.getByRole('button', { name: 'Iniciar prática' }),
    ).toBeDisabled();
    await user.clear(
      screen.getByRole('spinbutton', { name: 'Número de questões' }),
    );
    await user.type(
      screen.getByRole('spinbutton', { name: 'Número de questões' }),
      '1',
    );
    await user.selectOptions(
      screen.getByRole('combobox', { name: 'Objetivo de aprendizagem' }),
      questions.find((q) => q.chapter === 6)!.lo,
    );
    await user.click(screen.getByRole('button', { name: 'Iniciar prática' }));
    expect(screen.getByText('Questão 1 / 1')).toBeVisible();
    const stored = JSON.parse(localStorage.getItem('testlearn.v1')!);
    expect(
      questions.find((q) => q.id === stored.active.questionIds[0])?.chapter,
    ).toBe(6);
  });

  it('automatically finalizes an expired restored exam only once', async () => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date('2026-10-27T10:00:00Z'));
    seed(createSession(examQuestions, 'exam', 60, Date.now() - 3600001, 42));
    await act(async () => {
      render(<App />);
    });
    await act(async () => {
      vi.advanceTimersByTime(1001);
    });
    expect(screen.getByRole('heading', { name: '0 / 40' })).toBeVisible();
    await act(async () => {
      vi.advanceTimersByTime(3000);
    });
    expect(
      JSON.parse(localStorage.getItem('testlearn.v1')!).history,
    ).toHaveLength(1);
  });

  it('keeps a corrupt saved value intact and blocks silent replacement', () => {
    localStorage.setItem('testlearn.v1', 'broken');
    render(<App />);
    expect(screen.getByRole('alert')).toBeVisible();
    expect(localStorage.getItem('testlearn.v1')).toBe('broken');
  });

  it('restores checked feedback and locks confirmed practice answers after reload', async () => {
    const q = questions.find((question) => question.required === 1)!;
    seed(createSession([q], 'practice', 0));
    const user = userEvent.setup();
    const view = render(<App />);
    await user.click(
      screen.getByRole('radio', {
        name: q.options.find((option) => q.correct.includes(option.id))!.text
          .pt,
      }),
    );
    await user.click(
      screen.getByRole('button', { name: 'Confirmar resposta' }),
    );
    await act(async () => view.unmount());
    render(<App />);
    expect(screen.getByText('Resposta correta')).toBeVisible();
    expect(
      screen.getByRole('radio', { name: q.options[0].text.pt }),
    ).toBeDisabled();
    await user.selectOptions(
      screen.getByRole('combobox', { name: 'Idioma' }),
      'both',
    );
    expect(
      screen.getByRole('heading', { name: `${q.text.en} ${q.text.pt}` }),
    ).toBeVisible();
  });

  it('contains modal keyboard focus and cancels with Escape without losing progress', async () => {
    seed(createSession([questions[0]], 'practice', 0));
    const user = userEvent.setup();
    render(<App />);
    const finishButton = screen.getByRole('button', {
      name: 'Terminar sessão',
    });
    await user.click(finishButton);
    expect(
      screen.getByRole('button', { name: 'Continuar a responder' }),
    ).toHaveFocus();
    await user.tab({ shift: true });
    expect(
      screen.getByRole('button', { name: 'Confirmar e terminar' }),
    ).toHaveFocus();
    fireEvent.keyDown(document, { key: 'Escape' });
    expect(screen.queryByRole('alertdialog')).not.toBeInTheDocument();
    expect(finishButton).toHaveFocus();
    expect(
      JSON.parse(localStorage.getItem('testlearn.v1')!).active,
    ).not.toBeNull();
  });
});
