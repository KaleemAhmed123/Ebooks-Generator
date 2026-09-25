### O(1) Queries

- To query any range `[L, R]`, find the largest power of 2 that fits inside the range: `k = floor(log2(R - L + 1))`
- The answer is simply `min(table[L][k], table[R - 2^k + 1][k])`
- Because minimum is idempotent, the fact that these two blocks might overlap still covers the entire range with no double-counting penalty

### Structural parallel to Segment Trees

- **Sparse Table:** O(N log N) build, O(1) query. Cannot handle updates. Requires idempotence for O(1) (though can do O(log N) queries for non-idempotent ops)
- **Segment Tree:** O(N) build, O(log N) query. Can handle point and range updates. Works for any associative operation

:::interview
"The array is static and we have 10^6 range minimum queries. Segment Tree?"

A Segment Tree would take O(log N) per query, which might TLE for 10^6 queries. Since the array is static and MIN is an idempotent operation, a Sparse Table is strictly superior. It takes O(N log N) to build, but answers each query in O(1) using block overlap.
:::
