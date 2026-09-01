### How are Stacking Contexts Created?

A new Stacking Context is created by any element that meets certain CSS criteria. The most common triggers are:

1. **Positioned Elements**: An element with `position: relative`, `absolute`, or `fixed`, AND a `z-index` value other than `auto`.
2. **Opacity**: An element with `opacity` less than 1.
3. **Transforms**: An element with a `transform` value other than `none`.
4. **Filters**: An element with a `filter` value other than `none`.
5. **Flex/Grid Children**: A child of a flexbox or grid container that has a `z-index` value other than `auto` (even if it is statically positioned!).
6. **Will-Change**: An element with `will-change: transform` or `will-change: opacity`.

### The "z-index: 9999" Anti-Pattern

When developers don't understand Stacking Contexts, they inevitably create new ones by accident (e.g., by adding an `opacity: 0.9` fade effect to a container). When their child elements suddenly drop behind other parts of the page, they panic and add `z-index: 9999`.

When that fails, they move the element's HTML to the very bottom of the `<body>` tag so it renders last. This is exactly why React introduced **Portals**.

### React Portals and Stacking Contexts

In React, if you render a Modal component deeply nested inside your component tree, it is almost guaranteed to get trapped inside a Stacking Context created by one of its parent containers.

`ReactDOM.createPortal(child, container)` allows you to keep the Modal component logically in your React tree (so it shares state and context), but physically render its HTML DOM nodes at the root of the `<body>`. 

By rendering at the root, the Modal completely escapes all deep Stacking Contexts and guarantees it will overlay the entire page.
