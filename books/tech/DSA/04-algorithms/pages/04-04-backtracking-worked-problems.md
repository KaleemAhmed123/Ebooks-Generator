## Backtracking Worked Problems

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

### Combination Sum

- **Problem:** Given an array of distinct integers `candidates` and a target, return all unique combinations that sum to target. Each number may be used unlimited times
- **Key difference from subsets:** pass `i` (not `i + 1`) as the start index, allowing the same element to be reused. Pass `i + 1` for 0-1 (each element used at most once)

```ts
function combinationSum(candidates: number[], target: number): number[][] {
  const results: number[][] = [];
  const path: number[] = [];
  candidates.sort((a, b) => a - b);  // sort for pruning

  function backtrack(start: number, remaining: number): void {
    if (remaining === 0) { results.push([...path]); return; }
    for (let i = start; i < candidates.length; i++) {
      if (candidates[i] > remaining) break;  // prune: sorted, so all later are larger
      path.push(candidates[i]);
      backtrack(i, remaining - candidates[i]);  // i, not i+1: reuse allowed
      path.pop();
    }
  }

  backtrack(0, target);
  return results;
}
```

### The trap

- **Generating duplicates.** If the input is `[1, 1, 2]` and you do not skip duplicates, you get `[1, 2]` twice — once using the first `1`, once using the second. Sort the array, then after processing `nums[i]`, skip while the next element equals it
- **Forgetting to copy.** `results.push(path)` pushes a reference. When `path` mutates later, all stored results change. Always `results.push([...path])` or `path.slice()`

:::interview
"Generate all valid combinations of n pairs of parentheses."

Backtracking with two counters: `open` (how many `(` placed) and `close` (how many `)` placed). At each step, you can place `(` if open < n, and `)` if close < open. Base case: path length = 2n. This prunes invalid sequences without generating them. Time: O(4ⁿ / √n) — the nth Catalan number.
:::
