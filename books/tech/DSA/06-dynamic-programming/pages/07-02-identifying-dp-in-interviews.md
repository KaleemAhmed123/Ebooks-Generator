## Identifying DP in Interviews

The hardest part of DP is knowing that you need to use DP. Interviewers will never say "Use dynamic programming."

### The 3 Core Clues

If an interview problem contains **Clue 1** PLUS either **Clue 2** or **Clue 3**, it is almost certainly Dynamic Programming.

**Clue 1: The Return Type**
The problem asks for an optimal value, not the specific configuration.
- "Find the **minimum** cost..."
- "Find the **maximum** profit..."
- "Return the **longest** length..."
- "Return the **number of ways** to..."
- *(If the problem asks you to "Return ALL possible combinations", it is Backtracking, not DP).*

**Clue 2: The Decisions Affect the Future**
- If you make Choice A, it limits or changes what Choice B can do.
- "You cannot rob adjacent houses."
- "You have exactly K transactions."
- "The array must be strictly increasing."

**Clue 3: Overlapping Subproblems (The Smell Test)**
- Can you solve a small part of the array, and use that answer if that exact same subarray appears again later?
- If yes, it has overlapping subproblems.

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
