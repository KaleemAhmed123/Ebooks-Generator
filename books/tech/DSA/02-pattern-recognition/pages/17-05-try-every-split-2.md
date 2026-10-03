### Where it appears

| Problem | What k represents at each split |
|---|---|
| [Minimum Cost to Cut a Stick](https://leetcode.com/problems/minimum-cost-to-cut-a-stick/) (LeetCode 1547) | the next cut position inside the range |
| [Burst Balloons](https://leetcode.com/problems/burst-balloons/) (LeetCode 312) | the *last* balloon popped — its neighbours are `i` and `j` |
| [Minimum Score Triangulation of Polygon](https://leetcode.com/problems/minimum-score-triangulation-of-polygon/) (LeetCode 1039) | the apex vertex of the triangle on edge (i, j) |
| [Matrix Chain Multiplication](https://www.geeksforgeeks.org/problems/matrix-chain-multiplication0303/1) (GFG) | where to split the chain of multiplications |

:::interview
"Burst Balloons: why model k as the *last* balloon, not the first?"

If k is the first balloon popped, its neighbours change — they depend on what was popped before, creating order-dependent subproblems that don't decompose cleanly. If k is the last balloon in range `(i, j)`, its neighbours are guaranteed to be `i` and `j` (everything between is already gone). That makes `dp[i][j]` self-contained.
:::
