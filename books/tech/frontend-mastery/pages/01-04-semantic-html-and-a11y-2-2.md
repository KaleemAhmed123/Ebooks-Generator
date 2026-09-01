### ARIA (Accessible Rich Internet Applications)

ARIA attributes allow you to patch accessibility gaps in complex, dynamic web applications. However, the first rule of ARIA is: **No ARIA is better than bad ARIA.** Native semantic HTML is always preferred.

Use ARIA when building custom UI components that have no native HTML equivalent (like tabs, accordions, or custom modals).

#### Key ARIA Concepts:
- **Roles (`role="dialog"`, `role="alert"`)**: Defines what an element is.
- **Properties (`aria-required="true"`)**: Defines characteristics of an element.
- **States (`aria-expanded="true"`, `aria-hidden="true"`)**: Defines the current condition of an element. These often change dynamically via JavaScript.

#### The `aria-hidden` vs `hidden` vs `display: none`
- `display: none`: Hides the element visually and removes it from the accessibility tree.
- `hidden` attribute: The native HTML equivalent of `display: none`.
- `aria-hidden="true"`: Removes the element from the accessibility tree, but **leaves it visible** on screen. This is used for decorative icons that add no meaning.

### Focus Management

In a Single Page Application (SPA), routing happens client-side. The browser does not perform a hard refresh, which means the focus remains wherever it was before the route change.

If a screen reader user clicks a "Next Page" link, the content changes, but their focus might still be at the bottom of the page. You must proactively manage focus, typically by sending focus to the new page's `<main>` element or its `<h1>` on route transition.
