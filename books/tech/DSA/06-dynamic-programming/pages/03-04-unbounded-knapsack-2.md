### The Difference in 3 Lines

The entirety of 0/1 Knapsack vs Unbounded Knapsack in a 1D space-optimized array comes down to the direction of the inner `for` loop.

```ts
// 0/1 Knapsack (Each item exactly once)
for (let w = W; w >= weight; w--) { ... }

// Unbounded Knapsack (Infinite items)
for (let w = weight; w <= W; w++) { ... }
```

If you understand *why* the loop direction dictates whether an item can be reused, you have mastered the core of dynamic programming state management.

### Where it appears

| Problem | Why it belongs here |
|---|---|
| [Coin Change](https://leetcode.com/problems/coin-change/) (LeetCode 322) | Infinite supply of each coin — unbounded knapsack |
| [Coin Change II](https://leetcode.com/problems/coin-change-ii/) (LeetCode 518) | Count combinations with unlimited coins |
| [Perfect Squares](https://leetcode.com/problems/perfect-squares/) (LeetCode 279) | Unlimited use of each square number |
| [Integer Break](https://leetcode.com/problems/integer-break/) (LeetCode 343) | Maximise product by splitting n — reuse allowed |
