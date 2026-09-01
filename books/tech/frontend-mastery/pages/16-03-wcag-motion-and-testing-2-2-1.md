### `prefers-reduced-motion`

Large motion causes real symptoms for people with vestibular disorders: nausea, dizziness, migraine. Parallax, zooming transitions, and sliding page changes are the worst offenders. Operating systems expose a setting for this, and the browser passes it through.

The safest pattern is to disable animation globally, then opt specific things back in.

```css
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
}
```

Reduced does not mean none. A cross-fade or a small opacity change is usually fine and still communicates that something changed. What causes harm is large movement across the screen.

Read it from JavaScript for animation libraries:

```js
const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
```

### The other preference queries

```css
@media (prefers-contrast: more)   { :root { --color-border: oklch(0.4 0 0); } }
@media (prefers-color-scheme: dark) { /* handled by color-scheme and light-dark() */ }
@media (forced-colors: active)    { /* Windows High Contrast: do not fight it */ }
```

Under `forced-colors`, Windows replaces your palette with the user's chosen one. Do not try to override it. Do check that your UI still makes sense, because backgrounds set with `background-image` disappear and icons drawn as CSS shapes can vanish entirely.
