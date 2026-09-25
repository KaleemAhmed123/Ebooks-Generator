### Variations

- **Spiral Matrix II (LeetCode 59):** the same four walks, writing `1, 2, 3, …` instead of reading
- **Rotate Image (LeetCode 48):** transpose (swap `a[r][c]` with `a[c][r]` for `c > r`), then reverse every row. Both steps are in place; together they are the 2-D form of "reverse to rotate" (page 04-03)
- **Boundary traversal of a matrix (GFG):** a single ring of the spiral: one iteration of the `while` loop
- **Rotate each ring by k:** copy one ring into a list in spiral order, rotate that list by k (page 04-03), write it back in the same order. Every ring shrinks the problem as in the template

### The failure

- **Double-counting a single row or column.** Drop the two `if` guards and a 3×1 matrix returns `[1, 2, 3, 2]`: the left-column walk reads the middle cell back (on a 1×3 matrix the bottom-row walk does the same, giving `[1, 2, 3, 2, 1]`). The guards re-check the rectangle after each side, not once per loop
- **Rotating by writing into the same matrix cell by cell.** `a[c][n−1−r] = a[r][c]` overwrites values that have not been read yet. Either use four-way swaps per ring or the transpose-and-reverse pair

:::interview
"How do you rotate an n×n matrix in place?" — A 90° clockwise turn equals a transpose followed by reversing each row. Both are swaps on the matrix itself, so the extra space is O(1) and the time is O(n²), which is optimal because every cell moves. For the spiral, I shrink four boundaries and never need a visited grid.
:::
