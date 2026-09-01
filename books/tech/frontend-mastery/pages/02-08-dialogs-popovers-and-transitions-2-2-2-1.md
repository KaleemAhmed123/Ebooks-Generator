### View Transitions

Navigating between two pages normally means the first is destroyed and the second appears. The View Transitions API lets the browser take a snapshot of the old state, render the new one, and animate between the two.

Same-document, wrap the change:

```js
if (!document.startViewTransition) {
  updateTheDOM();                       // older browsers just jump, which is fine
} else {
  document.startViewTransition(() => updateTheDOM());
}
```

The default is a cross-fade. Naming an element makes the browser morph that specific element between the two states instead.

```css
.product-image { view-transition-name: hero; }
```

Give the thumbnail in the list and the large image on the detail page the same `view-transition-name`, and the browser animates one into the other. The name must be unique per snapshot: two elements sharing it at once cancels the transition.

For a whole page navigation, opt in from CSS:

```css
@view-transition { navigation: auto; }
```

Respect motion preferences. Every transition here should be inside a guard.

```css
@media (prefers-reduced-motion: reduce) {
  ::view-transition-group(*),
  ::view-transition-old(*),
  ::view-transition-new(*) { animation: none !important; }
}
```

React 19.2 exposes `<ViewTransition>` so the same machinery works with transitions and router navigations.
