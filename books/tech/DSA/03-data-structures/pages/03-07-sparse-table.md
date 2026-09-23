## Sparse Table

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

### The O(1) Query

- To answer a query for range `[L, R]`, find the largest power of 2 that fits inside the range: `j = Math.floor(Math.log2(R - L + 1))`.
- The length of this block is `2^j`.
- You take the minimum of the block starting at `L`, and the block ending at `R`.
- `return Math.min(table[L][j], table[R - (1 << j) + 1][j])`.
- This takes strict O(1) time.

### The Idempotency Rule

- A Sparse Table with O(1) queries **only works for idempotent operations**.
- An operation is idempotent if applying it multiple times to the same element doesn't change the result.
  - `min(5, 5) = 5` (Idempotent: O(1) overlap query works)
  - `max(5, 5) = 5` (Idempotent: O(1) overlap query works)
  - `gcd(5, 5) = 5` (Idempotent: O(1) overlap query works)
  - `sum(5, 5) = 10` (NOT Idempotent. The overlap double-counts. You must query a Sparse Table for Sums in O(log N) time by stitching non-overlapping blocks together).

:::interview
"If a Segment Tree can answer RMQ in O(log N) and supports updates, why ever use a Sparse Table?" — If the array is static (no updates), and the number of queries is massive (e.g. $10^7$ queries), an O(log N) Segment Tree might Time Limit Exceed. The O(1) query of a Sparse Table is fundamentally faster. In competitive programming, Sparse Tables are standard for static RMQ.
:::
