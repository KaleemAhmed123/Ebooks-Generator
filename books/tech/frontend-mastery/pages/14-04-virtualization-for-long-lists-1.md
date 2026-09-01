## Virtualization for Long Lists

If you fetch 10,000 rows of data from an API and attempt to render them using `data.map(item => <Row key={item.id} />)`, your React application will freeze, crash, or completely lock up the user's browser.

The browser's DOM simply cannot handle 10,000 HTML elements being inserted simultaneously. The memory footprint is too large, and the rendering engine cannot paint that many pixels fast enough.

### The Solution: Windowing (Virtualization)

If you think about it, a user's screen is only tall enough to view about 20 rows of data at any given time. Why should the browser render the other 9,980 rows that the user cannot even see?

**Virtualization (or Windowing)** is a technique where you only render the exact DOM nodes that are currently visible within the user's viewport, plus a few extra "buffer" nodes at the top and bottom to ensure smooth scrolling.

As the user scrolls down, the Virtualization engine destroys the DOM nodes that moved off the top of the screen, and reuses that memory to create the new DOM nodes entering from the bottom. 

No matter how far the user scrolls, there are never more than ~25 actual HTML elements in the DOM! The performance remains blazing fast whether your array has 100 items or 100,000 items.

### How to implement Virtualization

You should almost never write your own Virtualization engine from scratch. Calculating scroll positions, handling variable-height rows, and preventing scroll-jitter is notoriously difficult.

Instead, the industry relies on highly optimized open-source libraries:
1. **`@tanstack/react-virtual`** (The modern standard, headless, UI agnostic).
2. **`react-window`** (The classic library by a React core team member).
