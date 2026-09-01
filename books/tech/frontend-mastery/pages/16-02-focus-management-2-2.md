### `focusgroup`, coming soon

Arrow-key navigation inside a composite control, a toolbar, a tab list, a menu,
is a WCAG expectation and normally means writing a keyboard handler that tracks
the active index and wraps at both ends. Every codebase has one and most have a
bug in it.

The platform is taking that over. The `focusgroup` attribute, in development in
Chrome 150, makes it declarative.

```html
<div focusgroup="wrap">
  <button>Bold</button>
  <button>Italic</button>
  <button>Underline</button>
</div>
```

Arrow keys move focus between the children, `wrap` makes it loop, and there is
no JavaScript. Not Baseline yet, so keep the roving tabindex implementation and
watch this one, because it deletes a component every design system maintains.
