import { defineConfig } from '@playwright/test';
import 'dotenv/config';

export default defineConfig({
  testDir: './tests',
  timeout: 60_000,
  workers: 1,
  reporter: [['list'], ['html', { outputFolder: 'reports/html', open: 'never' }]],
  use: {
    baseURL: process.env.BASE_URL,
    trace: 'retain-on-failure',
    screenshot: 'only-on-failure',
  },
  projects: [
    { name: 'setup', testMatch: /auth\.setup\.ts/ },
    {
      name: 'migration',
      dependencies: ['setup'],
      use: { storageState: '.auth/user.json' },
    },
  ],
});
