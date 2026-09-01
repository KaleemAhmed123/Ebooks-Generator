### Extending, overriding, and removing

Adding a new variable **extends** the default theme. `theme.extend` from v3 has no equivalent because extending is now the default behavior.

```css
@theme {
  --font-script: "Great Vibes", cursive;   /* adds font-script */
}
```

Reusing an existing name **overrides** just that one value. Everything else stays.

```css
@theme {
  --breakpoint-sm: 30rem;   /* sm: now fires at 30rem, other breakpoints unchanged */
}
```

To wipe a whole namespace and start from nothing, set it to `initial` with the wildcard. This is how you build a closed design system where `bg-red-500` is a compile error rather than a silent inconsistency.

```css
@theme {
  --color-*: initial;              /* every default color utility is now gone */
  --color-white: #fff;
  --color-brand-50:  oklch(0.97 0.02 259);
  --color-brand-500: oklch(0.62 0.19 259);
  --color-brand-900: oklch(0.38 0.14 259);
}
```

`--*: initial` resets the entire theme, every namespace at once.
