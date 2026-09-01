### Naming tokens by role

Name a color for what it does, not what it looks like. When the brand shifts from blue to purple you change one line and every `bg-primary` in the codebase is still accurate. Name it `bg-blue-500` and you are renaming classes in four hundred files.

```css
@theme {
  --color-primary:            oklch(0.62 0.19 259);
  --color-primary-foreground: oklch(0.99 0 0);
  --color-destructive:        oklch(0.63 0.21 25);
  --color-surface:            oklch(0.98 0.005 250);
  --color-border:             oklch(0.92 0.01 250);
}
```

### Theming with a second palette

Because tokens are ordinary CSS variables, dark mode is a variable swap, not a second set of classes. Declare the roles in `@theme` so the utilities exist, then reassign them under a selector.

```css
@theme {
  --color-surface: oklch(0.98 0.005 250);
  --color-ink:     oklch(0.22 0.01 250);
}

.dark {
  --color-surface: oklch(0.21 0.01 250);
  --color-ink:     oklch(0.96 0.005 250);
}
```

`bg-surface` now resolves differently inside `.dark` with no extra utilities generated and no `dark:` prefix on every element.
