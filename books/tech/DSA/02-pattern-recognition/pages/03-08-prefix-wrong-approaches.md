## The wrong approach: Prefix & Range Sums 🟢

- **Naive idea:** Iterating from L to R to calculate the sum, or iterating from L to R to add a value.
- **Why it looks right:** It answers a single query correctly.
- **Why it breaks:** It takes O(K) time per query, where K is the length of the range. If there are N elements and Q queries, the worst case is O(N · Q). If N = 10⁵ and Q = 10⁵, this is 10¹⁰ operations. It will Time Limit Exceed.
- **The fix:** For static queries, build a Prefix Sum array in O(N) once, then answer each query in O(1). Total time O(N + Q). For offline updates, build a Difference Array in O(Q), then resolve it in O(N). Total time O(N + Q).

### Recognition drills

You have 20 seconds per problem. Identify which Range Interaction pattern applies.

| # | Problem sketch | Your answer |
|---|---|---|
| 1 | Given an array of integers, find the number of contiguous subarrays that sum to exactly K. The array contains negative numbers. | |
| 2 | You have an array of 0s. You are given 100,000 commands of the form "Add X to all indices from L to R". Return the final array. | |
| 3 | You have a static 2D grid of numbers. You must rapidly answer queries asking for the sum of elements within a rectangular subgrid from (r1, c1) to (r2, c2). | |
| 4 | You need to add X to range [L, R], and immediately after each addition, you need to query the maximum value in the array. | |

:::note
**Answers:** 
1. **Prefix Hash Map.** Sliding window fails due to negative numbers. We need O(1) lookups of past prefix sums.
2. **Difference Array.** "Add to range, read at the end".
3. **2D Prefix Sums.** Same concept as 1D, but with Inclusion-Exclusion principle for area calculations.
4. **Segment Tree.** Difference arrays cannot answer queries *during* the update phase. They only work if you can defer all reads to the end. The presence of interleaved updates and queries mandates a Segment Tree (with lazy propagation for range adds, 19-05).
:::
