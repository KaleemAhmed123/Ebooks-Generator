### Interaction tests

A story can drive itself, which turns it into a test that also happens to be
viewable.

```tsx
import { expect, userEvent, within } from 'storybook/test';

export const SubmitsTheForm: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await userEvent.type(canvas.getByLabelText('Email'), 'sam@example.com');
    await userEvent.click(canvas.getByRole('button', { name: 'Sign in' }));
    await expect(canvas.getByText('Welcome back')).toBeInTheDocument();
  },
};
```

Same Testing Library API as Module 17, with one difference that matters: it runs
in a **real browser**, not in `jsdom`. Real layout, real CSS, real focus. A
button covered by a modal fails here and passes in `jsdom`.

### Accessibility, for free

The a11y addon runs axe against every story as you open it, and in CI across all
of them.

```ts
// .storybook/preview.ts
export const parameters = {
  a11y: { test: 'error' },   // fail the run, do not just warn
};
```

This is the cheapest accessibility coverage available. Every component gets
audited in every state, with no test to write, because the stories already
exist.
