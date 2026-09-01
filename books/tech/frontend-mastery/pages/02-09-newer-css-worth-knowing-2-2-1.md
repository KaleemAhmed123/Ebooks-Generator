### `contrast-color()`

Picks black or white text based on the background, computed by the browser.

```css
.badge {
  background: var(--badge-color);
  color: contrast-color(var(--badge-color));
}
```

Previously this needed either a build-time calculation or a JavaScript helper
that read the computed style. Now it works with a color the browser only
learns about at runtime, which is the case that was genuinely hard: a badge
tinted by a value from your API.

### Gap decorations

Lines between grid and flex items, without the pseudo-element and negative
margin trick.

```css
.grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 2rem;
  column-rule: 1px solid var(--color-border);
  row-rule: 1px solid var(--color-border);
}
```

In development in Chrome 149 and Edge, not Baseline. The State of CSS survey
found this is the feature most developers saved to read about later, which tells
you how long people have wanted it. Use it as progressive enhancement: without
support you get the same layout minus the lines.

### `text-fit`

Scale a font size to fill its container's width.

```css
.headline { text-fit: consistent; }
```

In development, Chrome 150. Until it lands, `clamp()` with a `vw` term is the
approximation, and the SVG-based hacks people use for this today can be deleted
when it ships.
