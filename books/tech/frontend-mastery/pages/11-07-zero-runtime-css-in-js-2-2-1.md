### vanilla-extract

The strictest of the three. TypeScript in, CSS out, at build time.

```ts
// button.css.ts
import { style, createVar } from '@vanilla-extract/css';
import { vars } from './theme.css';

export const button = style({
  padding: `${vars.space.sm} ${vars.space.md}`,
  background: vars.color.primary,
  borderRadius: vars.radius.md,
  selectors: {
    '&:hover': { background: vars.color.primaryHover },
  },
});
```

```tsx
import * as styles from './button.css';
<button className={styles.button}>Save</button>
```

Because `vars` is a real TypeScript object, a token that does not exist is a
compile error. Its constraint is the flip side: styles must live in a `.css.ts`
file and be statically analysable, so there is no dynamic value at runtime
without going through a CSS variable.

### Panda CSS

Closer to Tailwind's model, with a typed API and a build step.

```tsx
import { css } from '../styled-system/css';

<button className={css({
  px: '4', py: '2',
  bg: 'primary',
  rounded: 'md',
  _hover: { bg: 'primaryHover' },
})}>Save</button>
```

It generates atomic classes, so repeated declarations across a codebase collapse
into one rule, and it works with Server Components because everything resolves
at build time. Useful when a team wants Tailwind's output characteristics with
TypeScript autocompletion on every property.
