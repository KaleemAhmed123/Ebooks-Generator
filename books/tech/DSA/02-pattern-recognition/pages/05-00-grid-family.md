# Chapter 5 - Grids & Matrices

## The Grid Family <span class="lv lv1"></span>

- **What it is:** A 2-D array is a *table* (cells found by index arithmetic), a *graph* (cells are nodes, neighbours are edges) or a *DP table* (each cell built from cells already solved). This chapter owns the table
- **Signal:** a rule about rows, columns, diagonals, rings or sorted order; "in place", "rotate", "spiral", "reshape"; nothing about paths or regions
- **Why it works:** A table has a visit order that index math produces directly: a diagonal is `r − c`, a ring is four boundaries, a sorted corner is one comparison. In a graph or a DP the data decides the order

| Pattern | Page | What it does | Canonical problem |
|---|---|---|---|
| **10 · Matrix Geometry** | **05-01 Coordinate Keys** | one formula maps `(r, c)` to a group or a flat index | Sort the Matrix Diagonally (LeetCode 1329) |
| | **05-02 Peel the Layers** | four boundaries shrink ring by ring | Spiral Matrix (LeetCode 54) |
| **11 · State in the Cell** | **05-03** | old and new value share one cell | Game of Life (LeetCode 289) |
| **12 · Staircase Search** | **05-04** | one corner comparison drops a row or a column | Search a 2D Matrix II (LeetCode 240) |

| The statement says | The grid is | Go to |
|---|---|---|
| diagonal, ring, rotate, reshape, rows and columns sorted | a table | this chapter |
| island, region, connected, spreads, fewest steps in four directions | a graph | 16-01 |
| moves only right or down, number of paths, minimum cost to reach a cell | a DP table | 17-02 |

### The trap

- **"Minimum steps" on a grid is not automatically DP.** With four-way moves, cells depend on each other in cycles and no fill order exists: that is BFS (16-01). DP needs one-way moves, right and down, so every cell's inputs are solved before it
