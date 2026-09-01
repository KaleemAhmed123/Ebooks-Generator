### The AA criteria that fail most often

| Criterion | The rule | Where it breaks |
|---|---|---|
| 1.4.3 Contrast | 4.5:1 for normal text, 3:1 for large text and UI borders | gray placeholder text, disabled buttons, brand colors on white |
| 1.4.11 Non-text contrast | 3:1 for icons, borders, focus rings | a 1px `#e5e5e5` input border |
| 2.4.7 Focus visible | keyboard focus must be visible | `outline: none` in a reset with no replacement |
| 2.1.1 Keyboard | every function works from a keyboard | a `<div onClick>` with no role or tabindex |
| 4.1.2 Name, role, value | every control exposes all three | an icon button with no accessible name |
| 1.3.1 Info and relationships | structure is in the markup | headings faked with `<div class="h2">` |

WCAG 2.2 added nine criteria. The two that most often need code changes are **2.4.11 Focus Not Obscured**, meaning a focused element must not be hidden behind a sticky header, and **2.5.8 Target Size**, meaning interactive targets should be at least 24 by 24 CSS pixels.

### Never delete the focus ring

```css
/* Wrong. Removes the only signal a keyboard user has. */
*:focus { outline: none; }

/* Right. Hides it for mouse clicks, keeps it for keyboard. */
:focus-visible {
  outline: 2px solid var(--color-primary);
  outline-offset: 2px;
}
```

`:focus-visible` is the browser's own judgement about whether the focus was keyboard-driven. It is the answer to the entire "the focus ring is ugly" argument.
