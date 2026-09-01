### `color-mix()`

Deriving a hover state used to mean generating a second variable in a build step.

```css
.button {
  background: var(--color-primary);
}
.button:hover {
  background: color-mix(in oklch, var(--color-primary) 85%, black);
}

/* A tinted surface from the same brand color */
.notice {
  background: color-mix(in oklch, var(--color-primary) 12%, white);
}
```

Mix `in oklch` rather than `in srgb`. An sRGB mix passes through a gray dead zone halfway between two hues. An oklch mix stays saturated the whole way.

This is what Tailwind 4 uses for opacity modifiers. `bg-blue-500/50` is a `color-mix()` computed by the browser, not a pre-generated class.

### `light-dark()`

Two themes without duplicating every rule.

```css
:root {
  color-scheme: light dark;
}

.card {
  background: light-dark(oklch(0.99 0 0), oklch(0.21 0.01 250));
  color:      light-dark(oklch(0.22 0.01 250), oklch(0.96 0 0));
}
```

`color-scheme` also tells the browser to render form controls, scrollbars, and the default page background in the right theme, which is the part hand-rolled dark modes usually forget.
