### What "AA" actually obliges you to do

WCAG has three levels. **A** is the floor. **AA** is what every law above
points at. **AAA** is aspirational and not achievable for all content, which the
specification says itself.

The AA criteria that fail most often in audits:

| Criterion | The rule |
|---|---|
| 1.4.3 Contrast | 4.5:1 for body text, 3:1 for large text |
| 1.4.11 Non-text contrast | 3:1 for icons, form borders, focus rings |
| 2.4.7 Focus visible | keyboard focus must be visible |
| 2.1.1 Keyboard | every function reachable from a keyboard |
| 4.1.2 Name, role, value | every control exposes all three |
| 1.3.1 Info and relationships | structure lives in the markup, not the styling |

WCAG 2.2 added nine criteria on top of 2.1. The two that most often need code
changes:

- **2.4.11 Focus Not Obscured.** A focused element must not be hidden behind a
  sticky header. Fix with `scroll-margin-top` on focusable elements.
- **2.5.8 Target Size (Minimum).** Interactive targets at least 24 by 24 CSS
  pixels, with exceptions for inline links.
