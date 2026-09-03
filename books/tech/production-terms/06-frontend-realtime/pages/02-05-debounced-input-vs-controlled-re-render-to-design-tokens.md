## Debounced Input vs Controlled Re-render

Even with no network call involved, updating state on every keystroke re-renders
the tree. On a heavy page that is visible input lag.

Typing into a filter over a 3,000-row table drops to 8 frames a second. The
network is not involved at all — each keystroke is costing 120ms of rendering.

Three fixes, in increasing order of how much they change:

- **Debounce the state update** to around 150ms, so typing and filtering are
  decoupled.
- **`useDeferredValue`**, which keeps the input responsive and lets the expensive
  subtree lag behind on purpose.
- **Make the input uncontrolled** and read it only when you need the value.

The instinct is to memoise the table. That helps and it does not fix this — the
render is triggered by the input's own state, so the cost is paid before any
memo is consulted.

## Design Tokens

Named values — colour, spacing, radius, type scale — defined once and referenced
everywhere, instead of literals scattered through components.

Changing brand blue means editing one token rather than finding 340 hex codes,
some of which are subtly different because someone eyeballed one.

The real benefit arrives with the second theme. A codebase using tokens supports
dark mode by swapping values; a codebase using literals supports it by touching
every component that ever specified a colour.
