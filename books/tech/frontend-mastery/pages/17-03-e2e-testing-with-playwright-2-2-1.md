### A test

```ts
import { test, expect } from '@playwright/test';

test('a user can log in and reach the dashboard', async ({ page }) => {
  await page.goto('/login');

  await page.getByLabel('Email').fill('admin@company.com');
  await page.getByLabel('Password').fill('supersecret');
  await page.getByRole('button', { name: 'Sign in' }).click();

  await expect(page).toHaveURL('/dashboard');
  await expect(page.getByRole('heading', { name: 'Dashboard' })).toBeVisible();
});
```

Note the selectors: `getByRole` and `getByLabel`, not CSS classes. A test written against `.btn-primary-v2` breaks when a designer renames a class, which teaches the team that tests are noise. A test written against the accessible role and name breaks only when the user-visible behavior changes, which is the only time you want to hear from it. It also means a test that passes is weak evidence that a screen reader can use the page.

### Assertions retry

`expect(locator).toBeVisible()` polls until it passes or times out. This is why Playwright suites do not need sleeps.

```ts
// Wrong: reads once, immediately, before the request has come back
expect(await page.getByTestId('total').textContent()).toBe('$42.00');

// Right: retries until the value arrives or the timeout expires
await expect(page.getByTestId('total')).toHaveText('$42.00');
```
