import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: 'tests/experimental-e2e',
  fullyParallel: false,
  workers: 1,
  retries: 0,
  reporter: [['list']],
  use: { baseURL: 'http://127.0.0.1:4175', trace: 'retain-on-failure' },
  webServer: [
    {
      command:
        'node node_modules/vite/bin/vite.js --host 127.0.0.1 --port 4175 --strictPort',
      url: 'http://127.0.0.1:4175',
      reuseExistingServer: false,
    },
    {
      command:
        'node node_modules/vite/bin/vite.js preview --host 127.0.0.1 --port 4176 --strictPort',
      url: 'http://127.0.0.1:4176',
      reuseExistingServer: false,
    },
  ],
  projects: [
    { name: 'advanced-desktop', use: { ...devices['Desktop Chrome'] } },
    {
      name: 'advanced-mobile',
      use: { ...devices['iPhone 13'], defaultBrowserType: 'chromium' },
    },
  ],
});
