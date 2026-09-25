### Variations

- **Matrix Chain Multiplication (GFG):** `dp[i][j] = min over k of dp[i][k] + dp[k+1][j] + d[i−1] · d[k] · d[j]`; the split is the last multiplication
- **Burst Balloons (LeetCode 312):** pad with 1s; k is the **last** balloon burst in `(i, j)`, so its neighbours at that moment are exactly `i` and `j`
- **Minimum Score Triangulation of Polygon (LeetCode 1039):** edge `(i, j)` belongs to one triangle `(i, k, j)`; try every k
- **Boolean Parenthesization (GFG):** each range stores two counts, ways to be true and ways to be false; combine them by the operator at k
- **Optimal Binary Search Tree (GFG):** k is the root; every key in `(i, j)` sinks one level, so add the range's total frequency
- **Palindrome Partitioning II (LeetCode 132):** the one-dimensional cousin: `f(i)` tries every palindrome `s[i..k]` as the next piece

### The failure

- **Cutting nearest the middle first.** It looks balanced but is not optimal: n = 10, cuts `[4, 5, 6]`. Middle-first cuts at 5 for 20; cutting at 6 first costs 10 + 6 + 2 = 18
- **Row-by-row loop order.** Filling `dp[i][j]` with `i` ascending reads `dp[k][j]` for `k > i` before it is computed. On LeetCode 1547's first example (n = 7, cuts `[1, 3, 4, 5]`) that returns 7 instead of 16. Loop by range length, or `i` descending
- **Choosing the wrong "split" operation.** For Burst Balloons, "first balloon burst" leaves its neighbours depending on later choices, so the sides are not independent. Choose the operation whose context is fixed

:::interview
"How do you find the split for a range DP?" — I ask which single operation, once fixed, makes the two sides independent. For cutting a stick it is the first cut; for bursting balloons it is the last burst. Then `dp[i][j]` tries every k, adds the cost that depends only on `i`, `k`, `j`, and I fill ranges by increasing length. O(n³) time, O(n²) space.
:::
