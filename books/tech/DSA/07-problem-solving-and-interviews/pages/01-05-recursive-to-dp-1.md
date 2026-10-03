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
