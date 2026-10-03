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

### Where it appears

| Problem | Why it belongs here |
|---|---|
| [Range Minimum Query](https://leetcode.com/problems/range-minimum-query/) (LeetCode 2569) | Static RMQ in O(1) per query |
| [Longest Common Extension](https://leetcode.com/problems/sum-of-scores-of-built-strings/) (LeetCode 2223) | Sparse table on LCP array for O(1) range min |
| [Maximize Score After N Operations](https://leetcode.com/problems/maximize-score-after-n-operations/) (LeetCode 1799) | Precompute GCD of all pairs via sparse table |

:::interview
"If a Segment Tree can answer RMQ in O(log N) and supports updates, why ever use a Sparse Table?"

If the array is static (no updates), and the number of queries is massive (e.g. $10^7$ queries), an O(log N) Segment Tree might Time Limit Exceed. The O(1) query of a Sparse Table is fundamentally faster. In competitive programming, Sparse Tables are standard for static RMQ.
:::
