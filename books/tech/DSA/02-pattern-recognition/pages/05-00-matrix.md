# Chapter 5 - Grids & Matrices

## Matrix <span class="lv lv1"></span>

- **What it is:** a 2-D array read as a *table*: cells found by index arithmetic, visited in an order the indices produce
- **Signal:** a rule about rows, columns, diagonals, rings or sorted order; "in place", "rotate", "spiral", "reshape"; nothing about paths or regions
- **Mechanism:** a diagonal is `r − c`, a ring is four boundaries, a sorted corner is one comparison. The order comes from the indices, not from the data

### The moves

| Move | When to use | What it exploits |
|---|---|---|
| **05-01** | diagonals, boxes, one sorted list | one formula groups the cells |
| **05-02** | spiral, rings, rotate | four boundaries shrink |
| **05-03** | all cells change at once, in place | old and new share one cell |
| **05-04** | rows and columns sorted apart | a corner drops a line |

**Not a table:** island, region, fewest steps in four directions → a graph, 16-01. Moves only right or down, number of paths → a DP table, 17-02.

### The skeleton

```ts
const dirs = [[0, 1], [1, 0], [0, -1], [-1, 0]];     // right, down, left, up
for (const [dr, dc] of dirs) {
  const nr = r + dr, nc = c + dc;
  if (nr < 0 || nr >= R || nc < 0 || nc >= C) continue;  // off the grid
  visit(nr, nc);
}
const k = r * C + c;                                  // flat index …
const back = [Math.floor(k / C), k % C];              // … and back
```

### The trap

- **"Minimum steps" on a grid is not automatically DP.** With four-way moves, cells depend on each other in cycles and no fill order exists: that is BFS (16-01). DP needs one-way moves, right and down
