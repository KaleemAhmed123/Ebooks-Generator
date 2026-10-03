## How to Fail at DP <span class="lv lv1"></span>

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
