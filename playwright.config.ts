import { defineConfig, devices } from '@playwright/test';

const PORT = 3000;
const baseURL = `http://localhost:${PORT}`;

export default defineConfig({
  testDir: './tests',
  // e2e specs only; the node schema guard (tests/schema.test.ts) runs via tsx, not Playwright.
  testMatch: '**/*.spec.ts',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 1 : 0,
  reporter: 'list',
  use: { baseURL, trace: 'on-first-retry' },
  projects: [
    { name: 'mobile', use: { ...devices['iPhone 13'] } },
    { name: 'desktop', use: { ...devices['Desktop Chrome'] } },
  ],
  // Next 16: `next dev` writes to .next/dev and a lockfile blocks a 2nd instance,
  // so locally we reuse a running dev server; CI does a prod build + start.
  webServer: {
    command: process.env.CI ? 'npm run build && npm run start' : 'npm run dev',
    url: baseURL,
    reuseExistingServer: !process.env.CI,
    timeout: 120_000,
    // Expose the client-event test seam even under a production `build && start`
    // server (NEXT_PUBLIC_* is inlined at build, so it must be set for the build).
    // Never set this in real production — keeps the seam off there.
    env: { NEXT_PUBLIC_RG_TEST: '1' },
  },
});
