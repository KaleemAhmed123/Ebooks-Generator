## Sparse Table <span class="lv lv2"></span>

- **What it is:** A 2D array that precomputes answers for intervals of length $2^k$ (1, 2, 4, 8, 16...)
- **The Contract:** O(N log N) time to build. O(1) time to answer Range Minimum/Maximum Queries (RMQ). Does **NOT** support updates
- **Why it works:** It uses **Idempotent Overlap**. If you want the minimum of a range of length 13, you can take the minimum of a pre-computed block of length 8 from the start, and a pre-computed block of length 8 from the end. They overlap by 3 elements in the middle, but `min(X, X)` is just `X`. The overlap does not corrupt the answer

### The Build Phase (Dynamic Programming)

- `table[i][j]` stores the answer for the interval starting at index `i` with length $2^j$.
- If you know the answer for two adjacent blocks of length $2^{j-1}$, you can easily combine them into a block of length $2^j$.
- This is a classic DP transition:
  `table[i][j] = min(table[i][j - 1], table[i + (1 << (j - 1))][j - 1])`

```ts
function buildSparseTable(arr: number[]): number[][] {
  const n = arr.length;
  const maxJ = Math.floor(Math.log2(n));
  const table = Array.from({ length: n }, () => new Array(maxJ + 1).fill(0));

  // Base case: length 2^0 = 1
  for (let i = 0; i < n; i++) table[i][0] = arr[i];

  // DP phase: build increasing power-of-2 lengths
  for (let j = 1; j <= maxJ; j++) {
    for (let i = 0; i + (1 << j) <= n; i++) {
      table[i][j] = Math.min(
        table[i][j - 1], 
        table[i + (1 << (j - 1))][j - 1]
      );
    }
  }
  return table;
}
```
