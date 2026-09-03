## Accessibility Tree

The parallel structure screen readers consume. A `div` with a click handler does
not appear in it as a control, so assistive technology cannot see it.

`<div onClick>` is not focusable, has no role, and cannot be triggered from the
keyboard. `<button>` gives you all three and costs nothing.

| | Role | Focusable | Enter / Space |
|---|---|---|---|
| `<div onClick>` | none | no | no |
| `<button>` | button | yes | yes |

**Reach for a semantic element before reaching for ARIA.** An ARIA role
announces the control correctly and still leaves you implementing focus and
keyboard handling by hand — and the hand-written version is the one that breaks
next quarter.

## Client Boundary

*"use client"*

The directive marking where the client bundle begins. Everything imported below
it becomes client code, so where you put it decides your bundle size.

Putting `"use client"` at the top of a layout drags the entire tree into the
client bundle — including components that render once and never change.

<svg viewBox="0 0 460 76" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="A server layout contains a server page which contains one interactive client component; the boundary belongs at that leaf, not at the top">
  <rect x="4" y="8" width="230" height="18" fill="none" stroke="#1a1a1a" stroke-width="1.2"/>
  <text x="14" y="21" font-family="Consolas,monospace" font-size="8.5" fill="#1a1a1a">layout — server</text>
  <rect x="24" y="30" width="210" height="18" fill="none" stroke="#1a1a1a" stroke-width="1.2"/>
  <text x="34" y="43" font-family="Consolas,monospace" font-size="8.5" fill="#1a1a1a">page — server</text>
  <rect x="44" y="52" width="190" height="18" fill="#e2fcf3" stroke="#1f6f8b" stroke-width="1.4"/>
  <text x="54" y="65" font-family="Consolas,monospace" font-size="8.5" fill="#1f6f8b">Button — "use client"</text>
  <path d="M240 61 H268" stroke="#1f6f8b" stroke-width="1.2"/><path d="M268 61 l-6 -3.5 v7 z" fill="#1f6f8b"/>
  <text x="274" y="64" font-family="Georgia,serif" font-size="9" fill="#1f6f8b">boundary belongs here</text>
  <path d="M240 17 H268" stroke="#b32d2b" stroke-width="1.2"/><path d="M268 17 l-6 -3.5 v7 z" fill="#b32d2b"/>
  <text x="274" y="20" font-family="Georgia,serif" font-size="9" fill="#b32d2b">here, the whole tree ships</text>
</svg>

Push it to the leaf that genuinely needs interactivity.
