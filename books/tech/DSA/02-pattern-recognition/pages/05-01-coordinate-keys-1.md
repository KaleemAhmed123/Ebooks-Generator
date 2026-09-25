# Chapter 5 - Grids & Matrices

## Coordinate Keys 🟢

- **What it is:** Most grid tricks are one formula that turns `(r, c)` into a key. Cells that share a key belong together: a row, a diagonal, a 3×3 box, or one slot of an imaginary flat array
- **Signal:** "sort each diagonal", "traverse the diagonals", "each 3×3 box must be valid", "the matrix is sorted as if it were one list", "reshape an m×n matrix"
- **Why it works:** Moving along a diagonal adds 1 to both `r` and `c`, so `r − c` never changes. Moving along an anti-diagonal keeps `r + c` fixed. Integer division groups rows and columns into blocks. Once the key is a number, a map or an array groups the cells in one pass, and no loop has to "walk" a diagonal by hand
