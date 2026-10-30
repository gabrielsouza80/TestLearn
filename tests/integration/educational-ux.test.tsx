import { beforeAll, it, expect } from 'vitest';
import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../../src/App';
import { QuestionReference } from '../../src/learning/ObjectiveHelp';
import { questions } from '../../src/data/questions';
import { answer, createSession, finish } from '../../src/domain/engine';
import { selectPracticeExam } from '../../src/domain/blueprint';
import { save } from '../../src/storage/store';
import { prepareHistoricalBanks } from '../fixtures/banks';
beforeAll(prepareHistoricalBanks);
const item = (id: string) => questions.find((q) => q.id === id)!;
async function reviewOnlyHistory(user: ReturnType<typeof userEvent.setup>) {
  await user.click(screen.getByRole('button', { name: 'Progresso' }));
  await user.click(screen.getByRole('button', { name: 'Rever' }));
}
it('shows official LO wording, K-level explanations and coherent native chapter/topic/LO filters', async () => {
  const user = userEvent.setup();
  render(<App />);
  await user.click(screen.getByRole('button', { name: 'Praticar' }));
  await user.selectOptions(screen.getByLabelText('Capítulo'), '1');
  await user.selectOptions(
    screen.getByLabelText('Tópico'),
    item('tl-041').topic,
  );
  await user.selectOptions(
    screen.getByLabelText('Objetivo de aprendizagem'),
    'FL-1.5.2',
  );
  const summary = screen.getByText('Conhecer o objetivo FL-1.5.2', {
    exact: true,
  });
  await user.click(summary);
  expect(summary.closest('details')).toHaveAttribute('open');
  expect(
    within(summary.closest('details')!).getByText(
      /Recordar as vantagens do Whole Team Approach/,
    ),
  ).toBeVisible();
  await user.selectOptions(screen.getByLabelText('Idioma'), 'en');
  expect(
    within(summary.closest('details')!).getByText(
      /Recall the advantages of the whole team approach/,
    ),
  ).toBeVisible();
  const level = screen.getByText('K1, K2 and K3 — what do they mean?', {
    exact: true,
  });
  await user.click(level);
  for (const name of ['K1 — Remember', 'K2 — Understand', 'K3 — Apply'])
    expect(
      within(level.closest('details')!).getByText(name, { exact: true }),
    ).toBeVisible();
  await user.selectOptions(screen.getByLabelText('Chapter'), '6');
  expect(screen.getByLabelText('Topic')).toHaveValue('');
  expect(screen.getByLabelText('Learning objective')).toHaveValue('');
  expect(screen.getByRole('button', { name: 'Start practice' })).toBeDisabled();
  expect(
    screen.getByText('Choose between 1 and 4 questions.', { exact: true }),
  ).toBeVisible();
  await user.clear(screen.getByLabelText('Number of questions'));
  await user.type(screen.getByLabelText('Number of questions'), '1');
  expect(screen.getByRole('button', { name: 'Start practice' })).toBeEnabled();
});
it('reports absent provenance and references honestly instead of substituting current metadata', async () => {
  const user = userEvent.setup();
  render(
    <QuestionReference
      question={{
        ...item('tl-003'),
        review: 'pending',
        academicReview: undefined,
      }}
      language="en"
    />,
  );
  await user.click(
    screen.getByText('Question origin and reference', {
      exact: true,
    }),
  );
  expect(
    screen.getByText('Origin not fully documented for this revision.', {
      exact: false,
    }),
  ).toBeVisible();
  expect(
    screen.getByText(
      'Reference and pages for this revision are not fully documented.',
      { exact: false },
    ),
  ).toBeVisible();
  expect(
    screen.queryByText(
      'Original TestLearn question — AI-assisted creation and review.',
      { exact: false },
    ),
  ).not.toBeInTheDocument();
});
it('renders all option identities and statuses, retains original numbering under filters and exposes the complete explanations', async () => {
  const user = userEvent.setup(),
    bank = ['tl-089', 'tl-083', 'tl-090'].map(item);
  let s = createSession(bank, 'practice', 0, Date.now() - 10000, 42);
  s = {
    ...s,
    optionOrder: Object.fromEntries(
      bank.map((q) => [q.id, q.options.map((o) => o.id).reverse()]),
    ),
  };
  s = answer(s, bank[0].id, bank[0].correct, Date.now() - 9000);
  s = answer(s, bank[1].id, ['o1', 'o2'], Date.now() - 8000);
  save({ version: 1, active: null, history: [finish(s, Date.now())] });
  render(<App />);
  await reviewOnlyHistory(user);
  expect(screen.getByRole('heading', { name: '1 / 3' })).toBeVisible();
  const navigation = screen.getByRole('navigation', {
    name: 'Navegação da revisão',
  });
  expect(
    within(navigation).getByRole('button', { name: /^Questão 1\b.*Correta/i }),
  ).toBeVisible();
  expect(
    within(navigation).getByRole('button', {
      name: /^Questão 2\b.*Incorreta/i,
    }),
  ).toBeVisible();
  expect(
    within(navigation).getByRole('button', {
      name: /^Questão 3\b.*Sem resposta/i,
    }),
  ).toBeVisible();
  expect(document.querySelectorAll('.review-question')).toHaveLength(1);
  const first = document.querySelector('[data-question-id="tl-089"]')!;
  expect(
    Array.from(first.querySelectorAll('.option-letter')).map(
      (n) => n.textContent,
    ),
  ).toEqual(['A.', 'B.', 'C.', 'D.', 'E.']);
  expect(first.querySelector('[data-option-id="o4"]')).toHaveTextContent(
    'Selecionada por si',
  );
  await user.selectOptions(screen.getByLabelText('Mostrar'), 'incorrect');
  expect(document.querySelectorAll('.review-question')).toHaveLength(1);
  expect(
    screen.getByText('Questão 2 de 3 · FL-3.2.4 · K2', { exact: true }),
  ).toBeVisible();
  expect(
    screen.getByText(
      'É necessário o conjunto exato de respostas; não há crédito parcial.',
      { exact: true },
    ),
  ).toBeVisible();
  const details = screen.getByText('Porque está A incorreta?', { exact: true });
  await user.click(details);
  expect(
    within(details.closest('li')!).getByText(
      bank[1].options.find((o) => o.id === 'o5')!.explanation.pt,
      { exact: true },
    ),
  ).toBeVisible();
  await user.click(
    within(navigation).getByRole('button', { name: /^Questão 2\b/ }),
  );
  expect(screen.getByRole('heading', { name: bank[1].text.pt })).toHaveFocus();
  await user.selectOptions(screen.getByLabelText('Mostrar'), 'unanswered');
  expect(
    screen.getByText('Questão 3 de 3 · FL-5.5.1 · K3', { exact: true }),
  ).toBeVisible();
});
it('uses a neutral topic-practice summary and an explicit empty review filter, without a certification threshold', async () => {
  const user = userEvent.setup(),
    s = finish(
      createSession([item('tl-089')], 'practice', 0, Date.now() - 1000, 42),
      Date.now(),
    );
  save({ version: 1, active: null, history: [s] });
  render(<App />);
  await reviewOnlyHistory(user);
  expect(screen.queryByText(/Limiar de referência/)).not.toBeInTheDocument();
  expect(
    screen.queryByText('Não aprovado na simulação de prática', { exact: true }),
  ).not.toBeInTheDocument();
  await user.selectOptions(screen.getByLabelText('Mostrar'), 'correct');
  expect(screen.getByRole('status')).toHaveTextContent(
    'Nenhuma questão nesta categoria',
  );
  expect(document.querySelectorAll('.review-question')).toHaveLength(0);
});
it('keeps question-specific learning objectives and references out of an active timed exam', () => {
  save({
    version: 1,
    active: createSession(
      selectPracticeExam(questions, 42),
      'exam',
      60,
      Date.now(),
      42,
    ),
    history: [],
  });
  render(<App />);
  expect(screen.queryByText(/Conhecer o objetivo/)).not.toBeInTheDocument();
  expect(
    screen.queryByText('Origem e referência da pergunta', {
      exact: true,
    }),
  ).not.toBeInTheDocument();
  expect(
    screen.getByText('K1, K2 e K3 — o que significam?', { exact: true }),
  ).toBeVisible();
  expect(
    screen.queryByRole('region', { name: 'Explicação' }),
  ).not.toBeInTheDocument();
});
