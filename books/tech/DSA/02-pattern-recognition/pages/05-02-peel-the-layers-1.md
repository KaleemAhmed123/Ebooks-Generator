## Peel the Layers 🟢

- **What it is:** Treat a matrix as nested rings. Keep four boundaries (`top`, `bottom`, `left`, `right`), walk one side, then pull that boundary inward. Rotations use the same ring view, or its shortcut: two reflections
- **Signal:** "return the elements in spiral order", "fill an n×n matrix in spiral order", "rotate the image 90° in place", "print the boundary", "rotate each ring by k"
- **Why it works:** After the top row is walked it is never needed again, so `top++` removes it from the problem. Each of the four walks shrinks the rectangle by one row or column, and the loop ends when the rectangle is empty. Every cell is visited exactly once, with no `visited` grid
