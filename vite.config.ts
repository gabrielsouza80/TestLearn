import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';
import securityHeaders from './config/security-headers.json';
export default defineConfig({
  base: './',
  appType: 'mpa',
  build: { sourcemap: false, manifest: true },
  preview: { headers: securityHeaders },
  plugins: [
    react(),
    {
      name: 'development-training-entry',
      apply: 'serve',
      transformIndexHtml(html) {
        return html.replace(
          'src="/src/main.tsx"',
          'src="/src/experimental/main.tsx"',
        );
      },
    },
  ],
  test: {
    environment: 'jsdom',
    setupFiles: ['./tests/setup.ts'],
    include: ['tests/unit/**/*.test.ts', 'tests/integration/**/*.test.tsx'],
  },
});
