### Testing it

Automated tools catch roughly a third of WCAG failures. That third is worth catching, because it is cheap and it never regresses.

```bash
npm install -D @axe-core/playwright
```

```ts
import AxeBuilder from '@axe-core/playwright';

test('the dashboard has no detectable accessibility violations', async ({ page }) => {
  await page.goto('/dashboard');
  const results = await new AxeBuilder({ page })
    .withTags(['wcag2a', 'wcag2aa', 'wcag22aa'])
    .analyze();
  expect(results.violations).toEqual([]);
});
```

The other two thirds need people. In order of value for the time spent:

1. **Unplug the mouse.** Tab through the whole flow. Can you reach everything, see where you are, and escape every menu and modal?
2. **Zoom to 200% and to 400%.** Text must reflow, not clip or require horizontal scrolling.
3. **Turn on a screen reader.** VoiceOver on macOS is `Cmd + F5`, NVDA on Windows is free. Twenty minutes here teaches more than any checklist.
4. **Test with disabled users.** Nothing else substitutes for this, and no tool predicts what will actually confuse someone.
