### Anchor positioning

A popover in the top layer is no longer positioned relative to its trigger, which is the problem Floating UI and Popper existed to solve: measure both elements in JavaScript, compute a position, reposition on every scroll and resize, flip when it would fall off screen.

CSS does it now. Anchor positioning reached Baseline in 2026, with Chrome and Edge since 125, Safari from 18.2, and Firefox from 147.

```css
.trigger {
  anchor-name: --account-btn;
}

#menu {
  position: fixed;
  position-anchor: --account-btn;
  top: anchor(bottom);
  left: anchor(left);
  margin-top: 0.5rem;
  position-try-fallbacks: flip-block, flip-inline;
}
```

`position-try-fallbacks` is the flip behavior. If the menu would overflow the bottom of the viewport, the browser retries above the trigger on its own. No scroll listener, no measurement code, no layout thrash.
