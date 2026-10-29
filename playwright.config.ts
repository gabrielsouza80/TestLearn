import { defineConfig, devices } from '@playwright/test';
export default defineConfig({
  testDir: 'tests/e2e',
  fullyParallel: true,
  // Bound memory for the four-project matrix; do not mask failures with retries.
  workers: 2,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 1 : 0,
  reporter: [['list'], ['html', { open: 'never' }]],
  use: { baseURL: 'http://127.0.0.1:4174', trace: 'retain-on-failure' },
  webServer: {
    command:
      'npm run build && node node_modules/vite/bin/vite.js preview --host 127.0.0.1 --port 4174 --strictPort',
    url: 'http://127.0.0.1:4174',
    reuseExistingServer: false,
  },
  projects: [
    { name: 'chromium', use: { ...devices['Desktop Chrome'] } },
    { name: 'firefox', use: { ...devices['Desktop Firefox'] } },
    { name: 'webkit', use: { ...devices['Desktop Safari'] } },
    {
      name: 'mobile',
      use: { ...devices['iPhone 13'], defaultBrowserType: 'chromium' },
    },
  ],
});
