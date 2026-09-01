### Visual regression testing

This is the part that catches the class of bug nothing else catches.

The mechanism: screenshot every story, store the images as the baseline, and on
every pull request take fresh screenshots and diff them. Any pixel that changed
is surfaced for a human to approve or reject.

```yaml
- run: npx chromatic --project-token=${{ secrets.CHROMATIC_TOKEN }}
```

Playwright can do the same without a service:

```ts
test('button variants look right', async ({ page }) => {
  await page.goto('/iframe.html?id=ui-button--primary');
  await expect(page).toHaveScreenshot('button-primary.png');
});
```

What this catches that assertions never will: a token change that darkened text
on twelve screens, a CSS rule whose specificity changed, a font swap that shifted
every card, a `gap` that a dependency upgrade quietly altered.

The trade is flakiness. Screenshots differ across operating systems, font
rendering and animation frames. The three fixes: run them in a container so the
rendering is identical every time, disable animations and mock time, and set a
small diff threshold rather than demanding pixel equality.
