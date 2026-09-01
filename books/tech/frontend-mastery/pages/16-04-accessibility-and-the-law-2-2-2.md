### What compliance looks like in practice

There is no certificate and nobody inspects your repository. What you can be
asked for is evidence of a process.

**1. An accessibility statement.** The EAA requires a published one: what the
product conforms to, what does not conform yet, and how someone reports a
problem. This is the first thing a regulator looks for and the cheapest thing to
produce.

**2. Automated testing in CI.** Catches roughly a third of failures, and stops
regressions for free.

```ts
import AxeBuilder from '@axe-core/playwright';

test('checkout has no detectable violations', async ({ page }) => {
  await page.goto('/checkout');
  const results = await new AxeBuilder({ page })
    .withTags(['wcag2a', 'wcag2aa', 'wcag21aa', 'wcag22aa'])
    .analyze();
  expect(results.violations).toEqual([]);
});
```

**3. A manual audit of the critical paths.** Sign up, sign in, search, checkout.
Keyboard only, then with a screen reader.

**4. A VPAT or accessibility conformance report** if you sell to enterprises or
governments. Procurement will ask, and not having one loses deals independently
of any regulator.

**5. Testing with disabled users.** Nothing substitutes for it, and no tool
predicts what will actually confuse someone.

### Two things worth being honest about

**An overlay widget is not compliance.** The scripts that promise a one-line fix
have been the subject of their own lawsuits, and disability advocacy groups have
campaigned against them. They do not repair the underlying markup.

**Automated tools catch about a third.** A perfect axe score is necessary and is
not a defense. The remaining two thirds are things only a person notices: a
label that is technically present and describes the wrong thing, a focus order
that is valid and makes no sense, an error message that is announced and does
not say how to fix the problem.
