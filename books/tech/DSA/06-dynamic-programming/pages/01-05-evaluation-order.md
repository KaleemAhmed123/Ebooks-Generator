## Evaluation Order (Tabulation)

When you write a Top-Down Memoised solution, you don't have to worry about the order of evaluation. The recursion automatically dives down to the base cases and bubbles back up.
When you write a Bottom-Up Tabulated solution, **you** must design the `for` loops. 

### The Golden Rule of Tabulation

> You can only evaluate `dp[state]` if every single state that it depends on has *already been calculated*.

If your transition is `dp[i] = dp[i-1] + dp[i-2]`, you must calculate `0` and `1` before you can calculate `2`. You must loop forwards: `for (let i = 2; i <= n; i++)`.

### Analyzing Dependencies

Before writing your `for` loops, draw a box representing `dp[i][j]`. Look at your Transition formula. Which other boxes does it read from?

- **Scenario A (Standard Grid):** `dp[i][j] = dp[i-1][j] + dp[i][j-1]`
  - `dp[i][j]` depends on the cell *above* it and the cell to its *left*.
  - Therefore, the top row must be filled before the bottom rows, and the left columns must be filled before the right columns.
  - **Loop Order:** Standard nested loops. `for i from 0 to rows`, `for j from 0 to cols`.

- **Scenario B (Interval DP):** `dp[i][j] = dp[i+1][j] + dp[i][j-1]`
  - `i` is a start index, `j` is an end index.
  - `dp[i][j]` depends on the cell *below* it (`i+1`) and the cell to its *left* (`j-1`).
  - If you loop `i` forwards from 0 to N, when you try to calculate `dp[0][j]`, it asks for `dp[1][j]`. But `i=1` hasn't been calculated yet!
  - **Loop Order:** You must loop `i` backwards! `for i from N down to 0`, `for j from i to N`. (Because smaller intervals must be calculated before larger intervals).

:::mint
<svg viewBox="0 0 470 140" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="DP Matrix Evaluation Order">
  <!-- Scenario A -->
  <rect x="50" y="20" width="30" height="30" fill="#f4f4f4" stroke="#12121a" stroke-width="1" />
  <rect x="80" y="20" width="30" height="30" fill="#e2fcf3" stroke="#12121a" stroke-width="1" />
  <rect x="110" y="20" width="30" height="30" fill="#f4f4f4" stroke="#12121a" stroke-width="1" />
  
  <rect x="50" y="50" width="30" height="30" fill="#e2fcf3" stroke="#12121a" stroke-width="1" />
  <rect x="80" y="50" width="30" height="30" fill="#1d4e89" stroke="#12121a" stroke-width="2" />
  <rect x="110" y="50" width="30" height="30" fill="#f4f4f4" stroke="#12121a" stroke-width="1" />
  
  <path d="M95 35 L95 50" stroke="#12121a" stroke-width="2" marker-end="url(#arrow)" />
  <path d="M65 65 L80 65" stroke="#12121a" stroke-width="2" marker-end="url(#arrow)" />
  
  <text x="50" y="105" class="s">Standard Grid</text>
  <text x="50" y="120" class="s">Top-to-Bottom, L-to-R</text>

  <!-- Scenario B -->
  <rect x="280" y="20" width="30" height="30" fill="#f4f4f4" stroke="#12121a" stroke-width="1" />
  <rect x="310" y="20" width="30" height="30" fill="#f4f4f4" stroke="#12121a" stroke-width="1" />
  <rect x="340" y="20" width="30" height="30" fill="#f4f4f4" stroke="#12121a" stroke-width="1" />
  
  <rect x="280" y="50" width="30" height="30" fill="#e2fcf3" stroke="#12121a" stroke-width="1" />
  <rect x="310" y="50" width="30" height="30" fill="#1d4e89" stroke="#12121a" stroke-width="2" />
  <rect x="340" y="50" width="30" height="30" fill="#f4f4f4" stroke="#12121a" stroke-width="1" />
  
  <rect x="280" y="80" width="30" height="30" fill="#f4f4f4" stroke="#12121a" stroke-width="1" />
  <rect x="310" y="80" width="30" height="30" fill="#e2fcf3" stroke="#12121a" stroke-width="1" />
  
  <path d="M325 80 L325 65" stroke="#12121a" stroke-width="2" marker-end="url(#arrow)" />
  <path d="M295 65 L310 65" stroke="#12121a" stroke-width="2" marker-end="url(#arrow)" />
  
  <text x="280" y="130" class="s">Interval DP</text>
  <text x="280" y="145" class="s">Bottom-to-Top, L-to-R</text>
</svg>
:::

### The trap

- **Copy-pasting loops:** If you memorize `for i = 0 to N` and use it for every DP problem, you will eventually hit an Interval DP or String DP problem where the transition relies on `i+1`. Your code will produce garbage values or `NaN` because it reads uninitialized matrix cells.
- **The fix:** Always sketch a 3 times 3 grid on the whiteboard, point to the middle cell, and draw arrows from the cells it depends on. Your outer loops must move in the same direction as those arrows.
