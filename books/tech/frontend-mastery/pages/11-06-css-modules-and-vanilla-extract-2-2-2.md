### The Zero-Runtime Future: Vanilla Extract

If you love the developer experience of writing CSS in TypeScript (so you get autocomplete and type safety on your design tokens), but you cannot pay the performance cost of runtime injection, the solution is **Vanilla Extract**.

Vanilla Extract is a "Zero-Runtime CSS-in-JS" framework. You write your styles in `.css.ts` files.

```typescript
// button.css.ts
import { style } from '@vanilla-extract/css';
import { vars } from './theme.css';

export const buttonClass = style({
  backgroundColor: vars.color.primary,
  padding: vars.spacing.medium,
  ':hover': {
    backgroundColor: vars.color.primaryHover,
  }
});
```

During your build step (Webpack/Vite), Vanilla Extract executes this TypeScript file, extracts the styles, generates a standard, static `.css` file, and replaces `buttonClass` with a hashed string (like CSS Modules).

By the time it hits the browser, there is zero JavaScript overhead. It is purely static CSS, making it blazingly fast and fully compatible with React Server Components.
