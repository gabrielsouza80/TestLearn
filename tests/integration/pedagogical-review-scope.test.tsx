import { expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import PedagogicalReviewNotice from '../../src/learning/PedagogicalReviewNotice';
import { questions } from '../../src/data/questions';

it.each(['pt', 'en', 'both'] as const)(
  'renders no notice for any of the other 89 IDs in %s',
  (language) => {
    const others = questions.filter((q) => q.id !== 'tl-038');
    expect(others).toHaveLength(89);
    for (const q of others) {
      const view = render(
        <PedagogicalReviewNotice questionId={q.id} language={language} />,
      );
      expect(view.container).toBeEmptyDOMElement();
      view.unmount();
    }
    const unknown = render(
      <PedagogicalReviewNotice questionId="unknown" language={language} />,
    );
    expect(unknown.container).toBeEmptyDOMElement();
  },
);

it('uses the existing bilingual text pattern and exposes no answer data or controls', () => {
  render(<PedagogicalReviewNotice questionId="tl-038" language="both" />);
  const note = screen.getByRole('note');
  expect(screen.getByText('Under pedagogical review')).toHaveAttribute(
    'lang',
    'en',
  );
  expect(screen.getByText('Em revisão pedagógica')).toHaveAttribute(
    'lang',
    'pt-PT',
  );
  expect(note.querySelectorAll('button, input, a, details')).toHaveLength(0);
  expect(note).toHaveAttribute('tabindex', '0');
  expect(note.textContent).not.toMatch(/o1|o2|201|500|correta|correct answer/);
});
