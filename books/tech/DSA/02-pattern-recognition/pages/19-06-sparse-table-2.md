### The trap

- **Using a Sparse Table for range sums.** Sparse tables rely on the property that overlapping coverage doesn't affect the answer. max(a, a) = a. But sum(a, a) = 2a. If you overlap sum ranges, you double-count the intersection. For static range sums, use a simple Prefix Sum array (O(n) build, O(1) query)

:::interview
"We need to query the maximum value between any two indices in a massive static log file, millions of times."

Since the data is static, we should build a Sparse Table. It takes O(N log N) to build, but every query is answered in O(1) time, which is optimal for a heavily query-bound system.
:::
