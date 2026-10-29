import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';
import securityHeaders from './config/security-headers.json';
export default defineConfig({
  base: './',
  appType: 'mpa',
  build: { sourcemap: false, manifest: true },
  preview: { headers: securityHeaders },
  plugins: [react()],
  test: {
    environment: 'jsdom',
    setupFiles: ['./tests/setup.ts'],
    include: ['tests/unit/**/*.test.ts', 'tests/integration/**/*.test.tsx'],
  },
});
