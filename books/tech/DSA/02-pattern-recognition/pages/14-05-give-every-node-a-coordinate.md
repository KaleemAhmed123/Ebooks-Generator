## Give Every Node a Coordinate <span class="lv lv2"></span>

- **What it is:** Assign each node a position: the root is `(row 0, col 0)`, a left child is `(row + 1, col − 1)`, a right child `(row + 1, col + 1)`. "Views" and "vertical orders" become grouping and sorting by those numbers, the same move as coordinate keys on a grid (page 05-01)
- **Signal:** "vertical order traversal", "top view", "bottom view", "diagonal traversal", "nodes that share a column", "what is visible from above"
- **Why it works:** Looking at a tree from above or below means projecting every node onto the horizontal axis; its column is that projection. Within one column, the row says who is in front. Once every node carries `(col, row)`, the tree shape no longer matters: a map from column to nodes, plus a tie-breaking rule, answers the question

:::mint
<svg viewBox="0 0 470 124" role="img" aria-label="Vertical order traversal of 3 with children 9 and 20, and 20 with children 15 and 7. Columns: 9 at column minus 1; 3 and 15 at column 0; 20 at column 1; 7 at column 2. Output columns left to right: 9, then 3 15, then 20, then 7. The top view is 9, 3, 20, 7 and the bottom view is 9, 15, 20, 7." xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif">
  <style>
    .lb { font: 9.5px Consolas, monospace; fill: #1a1a1a; }
    .sm { font: 8px Georgia, serif; fill: #6b6b6b; }
    .n { fill: #ffffff; stroke: #1a1a1a; stroke-width: 1.1; }
    .e { stroke: #1a1a1a; stroke-width: 1; }
    .col { stroke: #1d4e89; stroke-width: 1; stroke-dasharray: 2 3; }
  </style>
  <line class="col" x1="60" y1="6" x2="60" y2="110"/><line class="col" x1="110" y1="6" x2="110" y2="110"/><line class="col" x1="160" y1="6" x2="160" y2="110"/><line class="col" x1="210" y1="6" x2="210" y2="110"/>
  <text x="60" y="120" class="sm" text-anchor="middle">−1</text><text x="110" y="120" class="sm" text-anchor="middle">0</text><text x="160" y="120" class="sm" text-anchor="middle">1</text><text x="210" y="120" class="sm" text-anchor="middle">2</text>
  <circle class="n" cx="110" cy="20" r="11"/><text x="110" y="24" class="lb" text-anchor="middle">3</text>
  <line class="e" x1="102" y1="28" x2="68" y2="50"/><line class="e" x1="118" y1="28" x2="152" y2="50"/>
  <circle class="n" cx="60" cy="58" r="11"/><text x="60" y="62" class="lb" text-anchor="middle">9</text>
  <circle class="n" cx="160" cy="58" r="11"/><text x="160" y="62" class="lb" text-anchor="middle">20</text>
  <line class="e" x1="152" y1="66" x2="118" y2="88"/><line class="e" x1="168" y1="66" x2="202" y2="88"/>
  <circle class="n" cx="110" cy="96" r="11"/><text x="110" y="100" class="lb" text-anchor="middle">15</text>
  <circle class="n" cx="210" cy="96" r="11"/><text x="210" y="100" class="lb" text-anchor="middle">7</text>
  <text x="250" y="30" class="lb">vertical: [9] [3,15] [20] [7]</text>
  <text x="250" y="52" class="lb">top view:    9 3 20 7</text>
  <text x="250" y="68" class="sm">(smallest row per column)</text>
  <text x="250" y="90" class="lb">bottom view: 9 15 20 7</text>
  <text x="250" y="106" class="sm">(largest row per column)</text>
</svg>
:::

```ts
// Vertical Order Traversal of a Binary Tree (LeetCode 987)
function verticalTraversal(root: TreeNode | null): number[][] {
  // [col, row, val]
  const cells: [number, number, number][] = [];
  const go = (n: TreeNode | null, row: number, col: number) => {
    if (!n) return;
    cells.push([col, row, n.val]);
    go(n.left, row + 1, col - 1);
    go(n.right, row + 1, col + 1);
  };
  go(root, 0, 0);
  // column, then row, then value: LeetCode 987's tie rule
  cells.sort((a, b) => a[0] - b[0] || a[1] - b[1] || a[2] - b[2]);
  const out: number[][] = [];
  let lastCol = NaN;
  for (const [col, , val] of cells) {
    if (col !== lastCol) { out.push([]); lastCol = col; }
    out[out.length - 1].push(val);
  }
  return out;
}
```

### Variations

- **Top View of Binary Tree (GFG):** BFS carrying the column; keep only the *first* node seen per column. BFS order guarantees the first is the highest
- **Bottom View of Binary Tree (GFG):** the same BFS, but *overwrite* per column, so the last (lowest) node wins; on equal rows GFG wants the later one in level order, which overwriting also gives
- **Vertical traversal (GFG):** BFS order within a column instead of sorting by value; the tie rule differs from LeetCode 987, so read which one is asked
- **Diagonal Traversal of Binary Tree (GFG):** the coordinate is "number of left moves": a right child keeps its parent's diagonal, a left child adds one
- **Boundary Traversal of binary tree (GFG):** *not* coordinates: left boundary top-down (excluding leaves), all leaves left to right, right boundary bottom-up. Three separate walks

### The failure

- **DFS for the top view.** Recursion reaches a deep left-subtree node in column 1 before the shallow right child in column 1, and "first seen" keeps the wrong one. Either use BFS, or store the row and keep the smallest
- **Ignoring the tie rule.** Nodes sharing both row and column (possible after a left-right and a right-left step) must be ordered by value in LeetCode 987. Sorting by column and row only makes the output depend on traversal order

:::interview
"How do you print the top view of a binary tree?" — Give each node a column (left −1, right +1) and traverse breadth-first, so rows are visited top to bottom. The first node seen in each column is the one visible from above. Collect the columns in order with a map plus the minimum and maximum column, O(n) time apart from ordering the columns.
:::
