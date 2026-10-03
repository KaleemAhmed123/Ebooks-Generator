### Bottom-Up (Tabulation)

You create an array (or grid) representing all possible states. You manually fill the base cases, and then you use a `for` loop to fill the rest of the array from the smallest subproblem up to the final answer.

**Pros:**
- Blisteringly fast. No function call overhead. No stack limits.
- Allows for **Space Optimization** (e.g., reducing a 2D matrix to two 1D arrays).

**Cons:**
- It is "eager". It must calculate the answer for every single possible state in the grid, even if the final answer didn't actually need them.
- Figuring out the correct order to loop through the matrix can be mind-bending for complex problems.

```ts
function fibTab(n: number): number {
  if (n <= 1) return n;
  const dp = new Array(n + 1);
  dp[0] = 0;
  dp[1] = 1;
  
  for (let i = 2; i <= n; i++) {
    dp[i] = dp[i - 1] + dp[i - 2];
  }
  return dp[n];
}
```

### The Interview Strategy

- Start by explaining the recursive Transition.
- If you are stuck, or the problem is deeply complex (like a 3D state), write the **Top-Down (Memoisation)** solution. It is much easier to debug.
- If the problem is a standard 1D or 2D grid, write the **Bottom-Up (Tabulation)** solution. Interviewers strongly prefer it because it demonstrates you understand evaluation order and opens the door for space optimization follow-ups.
