import { render, screen } from '@testing-library/react';
import { it, expect, vi } from 'vitest';
import ApplicationBoundary from '../../src/ApplicationBoundary';
it('unexpected rendering failure offers a generic bilingual reload and preserves the saved record', () => {
  const raw = '{"kept":"private"}';
  localStorage.setItem('testlearn.v1', raw);
  const error = vi.spyOn(console, 'error').mockImplementation(() => {});
  function Broken() {
    throw new Error('SECRET_INTERNAL_DETAILS');
    return null;
  }
  try {
    render(
      <ApplicationBoundary>
        <Broken />
      </ApplicationBoundary>,
    );
    expect(screen.getByRole('alert')).toHaveTextContent(
      'Saved data has not been deleted',
    );
    expect(
      screen.queryByText('SECRET_INTERNAL_DETAILS'),
    ).not.toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: 'Recarregar / Reload' }),
    ).toBeEnabled();
    expect(localStorage.getItem('testlearn.v1')).toBe(raw);
  } finally {
    error.mockRestore();
  }
});
