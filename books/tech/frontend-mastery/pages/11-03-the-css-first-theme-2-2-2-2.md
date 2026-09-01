### `@theme inline`

If a token points at another variable, use `inline`. Without it the utility emits `var(--font-sans)` and the browser resolves that where it was **defined** rather than where it is **used**, which makes fallbacks fire when you did not expect them.

```css
@theme inline {
  --font-sans: var(--font-inter);   /* --font-inter comes from next/font */
}
```

### If you still have a JavaScript config

v4 reads one, but only when you ask.

```css
@import "tailwindcss";
@config "../tailwind.config.js";
```

`corePlugins`, `safelist`, `separator`, and `resolveConfig()` are gone and have no equivalent. Treat `@config` as a migration bridge, not a destination.
