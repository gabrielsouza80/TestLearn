import { it, expect, vi } from 'vitest';
import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ResultReview from '../../src/learning/ResultReview';
import AnswerReview from '../../src/learning/AnswerReview';
import { questions } from '../../src/data/questions';
import { visualExam } from '../fixtures/visual-review';

it('bounds a 40-question review without hiding numbers, losing filter scope, stealing filter focus or mutating source data', async () => {
  const session = visualExam(),
    before = JSON.stringify(session),
    bankBefore = JSON.stringify(questions);
  const user = userEvent.setup();
  render(
    <ResultReview
      session={session}
      bank={questions}
      language="pt"
      hasActive={false}
      canCreateExam={true}
      onPractice={vi.fn()}
      onExam={vi.fn()}
    />,
  );
  const nav = screen.getByRole('navigation', { name: 'Navegação da revisão' });
  expect(
    within(nav).getAllByRole('button', { name: /^Questão \d/ }),
  ).toHaveLength(40);
  expect(document.querySelectorAll('.review-question')).toHaveLength(1);
  expect(
    screen.getByRole('heading', { name: 'Ideia principal', level: 4 }),
  ).toBeVisible();
  await user.click(within(nav).getByRole('button', { name: /^Questão 40\b/ }));
  const last = questions.find((q) => q.id === session.questionIds[39])!;
  expect(screen.getByRole('heading', { name: last.text.pt })).toHaveFocus();
  await user.click(within(nav).getByRole('button', { name: /^Questão 40\b/ }));
  expect(screen.getByRole('heading', { name: last.text.pt })).toHaveFocus();
  const filter = screen.getByLabelText('Mostrar');
  filter.focus();
  await user.selectOptions(filter, 'incorrect');
  expect(filter).toHaveFocus();
  expect(
    within(nav).getAllByRole('button', { name: /^Questão \d/ }),
  ).toHaveLength(9);
  expect(
    within(nav).getByRole('button', { name: /^Questão 27\b/ }),
  ).toHaveAttribute('aria-current', 'true');
  expect(
    within(nav).queryByRole('button', { name: /^Questão 1\b/ }),
  ).not.toBeInTheDocument();
  await user.selectOptions(filter, 'unanswered');
  expect(
    within(nav).getAllByRole('button', { name: /^Questão \d/ }),
  ).toHaveLength(5);
  expect(JSON.stringify(session)).toBe(before);
  expect(JSON.stringify(questions)).toBe(bankBefore);
});

it('keeps selected wrong and all correct rationales visible, other distractors expandable, and source explanations unmodified', async () => {
  const q = questions.find((q) => q.id === 'tl-083')!,
    user = userEvent.setup();
  const { container, rerender } = render(
    <AnswerReview
      question={q}
      selected={['o1', 'o2']}
      order={q.options.map((o) => o.id).reverse()}
      language="pt"
      name="Revisão de teste"
    />,
  );
  expect(screen.getByText('Resposta incorreta', { exact: true })).toBeVisible();
  expect(
    screen.getByRole('heading', { name: 'Ideia principal', level: 3 }),
  ).toBeVisible();
  const wrong = container.querySelector('[data-option-id="o1"]')!;
  expect(wrong).toHaveClass('review-option-wrong');
  expect(
    within(wrong as HTMLElement).getByText(
      q.options.find((o) => o.id === 'o1')!.explanation.pt,
      { exact: true },
    ),
  ).toBeVisible();
  for (const id of q.correct) {
    const card = container.querySelector(`[data-option-id="${id}"]`)!;
    expect(card).toHaveClass('review-option-correct');
    expect(
      within(card as HTMLElement).getByText(
        q.options.find((o) => o.id === id)!.explanation.pt,
        { exact: true },
      ),
    ).toBeVisible();
  }
  const unselected = container.querySelector('[data-option-id="o4"]')!;
  expect(unselected).toHaveTextContent('Não selecionada');
  expect(unselected).not.toHaveTextContent('Selecionada por si');
  const neutral = container.querySelector(
      '[data-option-id="o5"]',
    ) as HTMLElement,
    explanation = q.options.find((o) => o.id === 'o5')!.explanation;
  expect(
    within(neutral).getByText(explanation.pt, { exact: true }),
  ).not.toBeVisible();
  await user.click(
    within(neutral).getByText('Porque está A incorreta?', { exact: true }),
  );
  expect(
    within(neutral).getByText(explanation.pt, { exact: true }),
  ).toBeVisible();
  expect(container.querySelectorAll('.learning-takeaway')).toHaveLength(1);
  expect(container.querySelector('.learning-takeaway')).toHaveTextContent(
    q.explanation.pt,
  );
  rerender(
    <AnswerReview
      question={q}
      selected={['o1', 'o2']}
      order={q.options.map((o) => o.id).reverse()}
      language="en"
      name="Test review"
    />,
  );
  expect(container.querySelector('.learning-takeaway')).toHaveTextContent(
    q.explanation.en,
  );
  expect(
    screen.getByText('Question origin and reference', { exact: true }),
  ).toBeVisible();
});

it('retains the threshold and an explicit early warning, and does not invent a legacy completion reason', () => {
  const session = visualExam();
  const props = {
    session,
    bank: questions,
    language: 'pt' as const,
    hasActive: false,
    canCreateExam: true,
    onPractice: vi.fn(),
    onExam: vi.fn(),
  };
  const { rerender } = render(<ResultReview {...props} />);
  expect(screen.getByRole('heading', { name: '26 / 40' })).toBeVisible();
  expect(
    screen.getByText('Limiar de referência: 26/40 (65%)', { exact: true }),
  ).toBeVisible();
  expect(
    screen.getByText('Conclusão antecipada, com perguntas sem resposta.', {
      exact: true,
    }),
  ).toBeVisible();
  expect(screen.getByText(/Submissão antecipada/)).toBeVisible();
  const old = { ...session };
  delete old.completionReason;
  rerender(<ResultReview {...props} session={old} />);
  expect(
    screen.getByText(
      'O motivo de conclusão não está registado nestas sessões.',
      { exact: true },
    ),
  ).toBeVisible();
  expect(screen.queryByText(/Submissão antecipada/)).not.toBeInTheDocument();
});
