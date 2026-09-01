# Module 6: React Core

## The Virtual DOM Deep Dive

To understand why React is fast, you must first understand why the actual DOM (Document Object Model) is slow. 

When you use vanilla JavaScript to update a node (`document.getElementById('header').innerText = 'New'`), the browser does not just swap the text in memory. It triggers a cascade of expensive operations:
1. **Style Recalculation:** The browser checks if this new text affects the CSS rules of any adjacent elements.
2. **Layout (Reflow):** The browser recalculates the exact pixel positions and geometry of every element on the page, just in case the new text pushed another element down by 1 pixel.
3. **Paint:** The browser redraws the pixels on the screen.

If you have a complex dashboard and you manually update 50 rows in a table, you might accidentally trigger 50 separate Reflows and Paints. This causes the UI to stutter and freeze.

### Enter the Virtual DOM
React solves this by creating a **Virtual DOM**. The Virtual DOM is nothing more than a giant JavaScript Object that represents what the real DOM *should* look like. 

Because it is just a JavaScript object living in your computer's RAM, updating it is practically instantaneous. No CSS is recalculated, and no pixels are painted.
