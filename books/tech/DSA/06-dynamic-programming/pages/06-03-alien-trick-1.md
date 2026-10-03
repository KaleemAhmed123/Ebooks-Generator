## Alien's Trick (WQS Binary Search) <span class="lv lv3"></span>

This is an elite-level optimization. It is rarely expected in standard interviews but is a staple in competitive programming and hard LC problems.

- **The Problem Signature:** "Find the optimal configuration (e.g., maximum profit) with exactly **K operations**."
- **Standard DP:** `dp[i][k]` = optimal answer for prefix `i` using exactly `k` operations. Time complexity: O(N times K).
- **The Issue:** What if N = 10⁵ and K = 10⁵? The O(N times K) DP will TLE (Time Limit Exceeded).

### The Core Concept

Imagine a graph where the X-axis is the number of operations used (k), and the Y-axis is the maximum profit we can achieve using exactly that many operations.
For many problems (like allocating items, dividing arrays), this graph is **Concave** (or convex).
- The first few operations give massive profit.
- As you use more and more operations, you hit diminishing returns.
- This creates a smooth curve.

If the curve is concave, we don't need the 2D `dp[i][k]` array. We can drop the `k` dimension entirely and solve the unconstrained version of the problem in 1D O(N) time.
