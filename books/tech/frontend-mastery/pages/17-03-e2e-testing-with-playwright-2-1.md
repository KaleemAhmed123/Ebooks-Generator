### Setting up

```bash
npm init playwright@latest
```

That writes `playwright.config.ts`, installs the browser binaries, and creates an example test.

```ts
// playwright.config.ts
import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './e2e',
  fullyParallel: true,
  retries: process.env.CI ? 2 : 0,
  use: {
    baseURL: 'http://localhost:3000',
    trace: 'on-first-retry',      // records a replay of any flaky failure
  },
  projects: [
    { name: 'chromium', use: { ...devices['Desktop Chrome'] } },
    { name: 'webkit',   use: { ...devices['Desktop Safari'] } },
    { name: 'mobile',   use: { ...devices['iPhone 15'] } },
  ],
  webServer: {
    command: 'npm run build && npm run start',
    url: 'http://localhost:3000',
    reuseExistingServer: !process.env.CI,
  },
});
```

`webServer` matters more than it looks. Playwright builds and starts the app itself, so the test runs against a production build rather than the dev server. Dev builds have different bundling, different error handling, and no minification, so they hide a whole class of failure.
