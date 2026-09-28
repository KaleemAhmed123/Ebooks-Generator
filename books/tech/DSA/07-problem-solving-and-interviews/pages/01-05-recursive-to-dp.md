## Transformation: Recursive to DP <span class="lv lv1"></span>

Every Dynamic Programming solution is just a brute-force recursive backtracking solution that has been transformed by adding memory.

### The Signal

- "Find the number of ways..."
- "Find the minimum/maximum cost..."
- The constraints are too large for exponential O(2^N) backtracking, but small enough for O(N²) or O(N · M).

### The Mapping

- **Recursive Parameters:** Become the dimensions of the DP state.
- **Base Cases:** Become the initial values of the DP array.
- **Return Value:** Becomes the value stored at `dp[state]`.

### The Transformation Process

If you cannot immediately see the DP table, do not try to write it. Write the backtracking solution first.

1. **Write the brute force:**
   ```ts
   function solve(i, remainingCapacity) {
     if (i === n) return 0;
     let skip = solve(i + 1, remainingCapacity);
     let take = 0;
     if (weight[i] <= remainingCapacity) {
       take = value[i] + solve(i + 1, remainingCapacity - weight[i]);
     }
     return Math.max(skip, take);
   }
   ```
2. **Identify the changing parameters:** `i` and `remainingCapacity`.
3. **Add a cache (Top-Down):** Create `memo = new Map()` or a 2D array. Before calculating, check if `memo[i][remainingCapacity]` exists. Before returning, save the result to `memo`.
4. **Transform to Tabulation (Bottom-Up) (Optional):**
   - Create `dp[n+1][maxCapacity+1]`.
   - Initialize base cases.
   - Write nested `for` loops that iterate in the exact opposite direction of the recursive calls.

### Why this matters in interviews

Interviewers respect a candidate who writes a working Top-Down Memoized solution much more than a candidate who stares blankly at a whiteboard trying to invent a 2D Bottom-Up Tabulation table in their head. The transformation from Recursion rightarrow Top-Down DP is mechanical and foolproof.

### Where it appears

| Problem | Why it belongs here |
|---|---|
| [0/1 Knapsack](https://leetcode.com/problems/partition-equal-subset-sum/) (LeetCode 416) | Recursive take/skip becomes 2D memoized table on index and capacity |
| [Coin Change](https://leetcode.com/problems/coin-change/) (LeetCode 322) | Recursive min-coins per amount becomes 1D tabulation |
| [Longest Common Subsequence](https://leetcode.com/problems/longest-common-subsequence/) (LeetCode 1143) | Two-pointer recursion becomes 2D DP on string indices |
| [House Robber](https://leetcode.com/problems/house-robber/) (LeetCode 198) | Recursive rob/skip becomes linear DP with two variables |
