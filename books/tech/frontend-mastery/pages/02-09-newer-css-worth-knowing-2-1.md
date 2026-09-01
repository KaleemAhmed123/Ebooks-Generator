### `field-sizing`

Form controls that grow and shrink to fit their content. This reached Baseline
in 2026 once Firefox 152 shipped it.

```css
textarea, input, select {
  field-sizing: content;
  min-height: 2lh;      /* two line-heights */
  max-height: 10lh;
}
```

That is the whole feature. It replaces the auto-growing textarea component that
every codebase has written at least twice, complete with its `scrollHeight`
measurement, its resize observer, and its bug where the height is wrong on first
paint.

### Container **style** queries

Size container queries were covered earlier. Style queries are the other half:
respond to a custom property's value rather than to a width.

```css
.card { container-name: card; }

@container card style(--variant: featured) {
  .card-title { font-size: var(--text-3xl); }
  .card-badge { display: block; }
}
```

```html
<article class="card" style="--variant: featured">
```

This is how you pass a variant down without a class name and without a prop,
which matters when the element setting the variant is several levels above the
element reacting to it.

### `:open`

One pseudo-class for every element that has an open state: `<details>`,
`<dialog>`, `<select>`, and anything with the `popover` attribute.

```css
:open::backdrop { background: oklch(0 0 0 / 0.4); }

details:open > summary { border-bottom: 1px solid var(--color-border); }
```
