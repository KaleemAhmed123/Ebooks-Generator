### The Problem Dictionary

If you see these words, immediately think of the associated DP pattern:

- **"Two Strings", "Convert A to B", "Common Subsequence"** 
  rightarrow 2D Grid DP `dp[i][j]` (LCS / Edit Distance)
- **"Contiguous", "Subarray"** 
  rightarrow 1D DP `dp[i]` (Kadane's)
- **"Capacity", "Weights and Values", "Subset Sum"** 
  rightarrow Knapsack DP `dp[i][capacity]`
- **"Given a Tree", "Maximum Path"** 
  rightarrow Tree DP (Post-order traversal returning multiple states)
- **"Number of ways to reach bottom-right corner"** 
  rightarrow 2D Grid DP `dp[r][c]`
- **"1 to N", "Permutations", "Small N (N ≤ 20)"** 
  rightarrow Bitmask DP `dp[mask][lastNode]`
- **"Numbers between 1 and 10¹⁸", "Digit constraints"** 
  rightarrow Digit DP `dfs(index, isTight)`
