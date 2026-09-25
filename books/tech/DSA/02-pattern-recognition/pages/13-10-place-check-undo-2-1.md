## Place, Check, Undo <span class="lv lv2"></span> - continued

```ts
// N-Queens (LeetCode 51)
function solveNQueens(n: number): string[][] {
  const out: string[][] = [], colOf: number[] = [];
  const cols = new Set<number>();
  const diag = new Set<number>(), anti = new Set<number>();
  const row = (c: number) =>
    ".".repeat(c) + "Q" + ".".repeat(n - c - 1);
  const place = (r: number) => {
    if (r === n) { out.push(colOf.map(row)); return; }
    for (let c = 0; c < n; c++) {
      if (cols.has(c) || diag.has(r - c) || anti.has(r + c))
        continue;                                          // check
      cols.add(c); diag.add(r - c); anti.add(r + c);       // place
      colOf.push(c);
      place(r + 1);
      // undo
      cols.delete(c); diag.delete(r - c); anti.delete(r + c);
      colOf.pop();
    }
  };
  place(0);
  return out;
}
```

### Variations

- **Sudoku Solver (LeetCode 37):** decision points are empty cells; the check is three sets per digit (row, column, box `⌊r/3⌋·3 + ⌊c/3⌋`). Fill the cell with the fewest legal digits first to cut the tree sharply
- **M-Coloring Problem (GFG):** decision points are vertices; a colour is legal if no already-coloured neighbour has it
- **Partition to K Equal Sum Subsets (LeetCode 698) / Matchsticks to Square (LeetCode 473):** decision points are items; options are the k buckets. Sort items descending (big items fail fast), and skip a bucket whose current sum equals a bucket already tried at this level (equal siblings again, page 13-06)
- **The Knight's Tour (GFG):** decision points are moves; Warnsdorff's rule (try the square with the fewest onward moves first) finds a tour on large boards almost without backtracking
