## How to Fail at DP

Dynamic Programming is unforgiving. A single off-by-one error will break the entire matrix. Here are the most common ways candidates fail DP interviews.

### 1. The Greedy Trap

- **The Mistake:** Trying to solve a DP problem using a Greedy approach.
- **Example:** Coin Change with coins `[1, 3, 4]`, target `6`. 
  - A Greedy algorithm picks the biggest coin first: `4`. Remaining: `2`.
  - Pick `1`, pick `1`. Total coins: 3 (`4, 1, 1`).
  - The DP optimal answer is 2 (`3, 3`).
- **Why it happens:** Greedy is intuitive. Our brains naturally want to make the "best local choice". DP exists specifically for problems where the best local choice ruins the global optimal.
- **The Fix:** If the problem asks for a minimum/maximum, and the choices are not completely independent, it is almost never Greedy.

### 2. Forgetting the Base Cases

- **The Mistake:** Writing a beautiful transition but starting the `for` loops without initializing `dp[0]`.
- **Why it happens:** In many array problems, the default `0` or `undefined` works fine. In DP, `dp[1]` inherently multiplies or adds to `dp[0]`. If `dp[0]` is undefined, the entire matrix fills with `NaN`. 
- **The Fix:** Before writing the `for` loops, explicitly write `// BASE CASES` and initialize the first row/column.

### 3. The `Math.min` Infinity Trap

- **The Mistake:** Initializing a DP array for a `Math.min()` problem with `0`.
- **Why it breaks:** `Math.min(0, anything)` is always `0`. The algorithm will just return 0.
- **The Fix:** If the transition uses `Math.min`, you MUST initialize the array with `Infinity` (or a guaranteed impossible maximum value like `target + 1`).

### 4. Panicking over Tabulation

- **The Mistake:** The candidate correctly identifies the DP state and the recursive transition, but spends 25 minutes struggling to figure out the `for` loop order for Tabulation, eventually failing to write working code.
- **The Fix:** Stop trying to write Tabulation if you are stuck. Write the **Top-Down Memoized** solution. It takes 30 seconds to write if you know the transition, and it will pass 95% of interviews. Only write Tabulation if you are 100% confident in the loop order, or if the interviewer specifically asks for O(1) space optimization.
