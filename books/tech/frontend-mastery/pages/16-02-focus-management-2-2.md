### The `tabindex` Attribute
By default, only interactive elements (`<button>`, `<a>`, `<input>`) can be focused.
If you build a custom interactive element out of a `<div>`, you must give it a `tabindex="0"` so the browser knows to include it in the Tab flow.

```html
<!-- Now a keyboard user can actually land on this custom element -->
<div role="button" tabindex="0" onclick="handleClick()">Custom Button</div>
```

If you give an element `tabindex="-1"`, it removes it from the Tab flow entirely, but still allows you to programmatically focus it using JavaScript (`ref.current.focus()`). This is useful for routing. When a user clicks a link to change pages in a React SPA, you should programmatically focus the `<h1>` of the new page so screen readers announce the transition.

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
