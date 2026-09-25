## Give Every Node a Coordinate <span class="lv lv2"></span> - continued

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
