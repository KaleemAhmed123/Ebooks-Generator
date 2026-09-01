## The CSS-First Theme

In v3, your design tokens lived in a JavaScript object inside `tailwind.config.ts`. Tailwind read that object at build time and generated classes from it. The tokens were invisible to the browser, so using one in hand written CSS meant importing `resolveConfig` and reading it back out in JavaScript.

v4 moves the tokens into CSS with the `@theme` directive. They become real CSS custom properties, which means the browser can see them, DevTools can show them, and hand written CSS can use them without any JavaScript at all.

```css
@import "tailwindcss";

@theme {
  --color-brand-500: oklch(0.62 0.19 259);
  --font-display: "Satoshi", sans-serif;
  --breakpoint-3xl: 120rem;
}
```

That single block does three things at once: it creates the utilities `bg-brand-500`, `text-brand-500`, `border-brand-500` and the rest, it creates the `font-display` utility and the `3xl:` variant, and it emits `--color-brand-500` as a CSS variable on `:root`.

### `@theme` is not `:root`

Both define custom properties. Only `@theme` tells Tailwind to build utilities from them.

- Use `@theme` for a design token that should have a utility class.
- Use `:root` for a plain variable that should not, such as a computed header height.

`@theme` must sit at the top level of the file. It cannot be nested.
