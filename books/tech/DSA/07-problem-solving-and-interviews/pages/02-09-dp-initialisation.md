## DP Initialisation Traps

Dynamic Programming is notoriously sensitive to how the array is initialised. If the default values are wrong, the transitions will combine garbage data into more garbage data.

### 1. Min/Max Problems

- If the transition formula uses `Math.min()`, you **must** initialize the array with `Infinity`.
  - *Trap:* If you initialize with `0`, `Math.min(0, cost)` will always be `0`. The answer will never change.
- If the transition formula uses `Math.max()`, you **must** initialize with `-Infinity` (or `0` if all values are strictly positive).
  - *Trap:* If negative profits are possible, and you initialize with `0`, `Math.max(0, -5)` will incorrectly choose `0` instead of accepting the penalty.

### 2. The 1D Tabulation Base Case

When you pad an array (e.g., `dp = new Array(n + 1)`), index `0` represents the base case (an empty string, zero items, zero capacity). 
You must explicitly set `dp[0]` based on the mathematical reality of the problem.

- **Counting Ways (e.g., Climbing Stairs):** `dp[0] = 1`. There is exactly 1 way to do nothing.
- **Finding Minimum Cost (e.g., Min Coin Change):** `dp[0] = 0`. The cost to make amount 0 is 0 coins.

If you are doing a "Counting Ways" problem and you initialize the array with `0` everywhere, `dp[1] = dp[0] + something`, which is `0 + 0 = 0`. The entire array stays `0` forever.

### 3. The 2D Grid Edge Initialization

In a Grid DP (like Unique Paths or Minimum Path Sum), the top row and left column are boundaries. They can only be reached from one direction.

- **The Trap:** Writing a double `for` loop starting from `r=1, c=1` and assuming the top row is fine.
- **The Fix:** Always run two explicit `for` loops *before* the main nested loops to manually initialize the top row and left column.

```ts
// Explicit boundary initialization
for (let r = 1; r < m; r++) dp[r][0] = dp[r-1][0] + grid[r][0];
for (let c = 1; c < n; c++) dp[0][c] = dp[0][c-1] + grid[0][c];

// Now run the main logic safely
for (let r = 1; r < m; r++) {
  for (let c = 1; c < n; c++) {
     dp[r][c] = ...
  }
}
```

### 4. JavaScript/TypeScript `.fill()` Trap

If you create a 2D array in JS using `.fill([])`, you are filling every row with a reference to the **exact same array object in memory**.
If you change `dp[0][0] = 5`, then `dp[1][0]`, `dp[2][0]`, and `dp[3][0]` all miraculously become `5`.

```ts
// THE WRONG APPROACH
const dp = new Array(m).fill(new Array(n).fill(0)); // Disastrous bug

// THE FIX
const dp = Array.from({ length: m }, () => new Array(n).fill(0));
```
