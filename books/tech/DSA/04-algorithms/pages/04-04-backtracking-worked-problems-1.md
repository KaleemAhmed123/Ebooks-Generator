## Backtracking Worked Problems <span class="lv lv1"></span>

### N-Queens

- **Problem:** Place n queens on an n×n chessboard so that no two queens attack each other. Return all valid arrangements
- **State-space tree:** Row by row. At row `r`, try placing a queen in each column `c`. Prune columns, diagonals, and anti-diagonals already occupied
- **Pruning sets:** Track used columns in a Set, used diagonals in a Set keyed by `r - c`, used anti-diagonals keyed by `r + c`. Check all three before placing

```ts
function solveNQueens(n: number): string[][] {
  const results: string[][] = [];
  const cols = new Set<number>();
  const diag = new Set<number>();     // r - c is constant on each diagonal
  const anti = new Set<number>();     // r + c is constant on each anti-diagonal
  const board: number[] = [];         // board[r] = column of queen in row r

  function backtrack(row: number): void {
    if (row === n) {
      results.push(board.map(c =>
        '.'.repeat(c) + 'Q' + '.'.repeat(n - c - 1)));
      return;
    }
    for (let c = 0; c < n; c++) {
      if (cols.has(c) || diag.has(row - c) || anti.has(row + c)) continue;
      cols.add(c); diag.add(row - c); anti.add(row + c);
      board.push(c);
      backtrack(row + 1);
      board.pop();
      cols.delete(c); diag.delete(row - c); anti.delete(row + c);
    }
  }

  backtrack(0);
  return results;
}
```

- **Complexity:** O(n!) branches (each row has at most n − previously_placed columns). Pruning reduces this massively — for n = 8, only 92 solutions exist out of 4 billion placements
