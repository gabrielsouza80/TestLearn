import '@testing-library/jest-dom/vitest';
import { cleanup } from '@testing-library/react';
import { afterEach, beforeEach } from 'vitest';
import { createTestLocks } from './fixtures/web-locks';

beforeEach(() => {
  Object.defineProperty(navigator, 'locks', {
    configurable: true,
    value: createTestLocks(),
  });
});
afterEach(() => {
  cleanup();
  localStorage.clear();
});
