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
