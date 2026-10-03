### 3. The `Math.min` Infinity Trap

- **The Mistake:** Initializing a DP array for a `Math.min()` problem with `0`.
- **Why it breaks:** `Math.min(0, anything)` is always `0`. The algorithm will just return 0.
- **The Fix:** If the transition uses `Math.min`, you MUST initialize the array with `Infinity` (or a guaranteed impossible maximum value like `target + 1`).

### 4. Panicking over Tabulation

- **The Mistake:** The candidate correctly identifies the DP state and the recursive transition, but spends 25 minutes struggling to figure out the `for` loop order for Tabulation, eventually failing to write working code.
- **The Fix:** Stop trying to write Tabulation if you are stuck. Write the **Top-Down Memoized** solution. It takes 30 seconds to write if you know the transition, and it will pass 95% of interviews. Only write Tabulation if you are 100% confident in the loop order, or if the interviewer specifically asks for O(1) space optimization.
