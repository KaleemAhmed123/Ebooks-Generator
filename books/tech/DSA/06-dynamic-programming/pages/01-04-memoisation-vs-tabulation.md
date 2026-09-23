## Memoisation vs Tabulation

Once you have defined your State, Transition, and Base Cases, you have to write the code. There are two ways to implement a DP solution: Top-Down (Memoisation) and Bottom-Up (Tabulation).

### Top-Down (Memoisation)

You write a Brute Force recursive function, but you add a cache (a `memo`).

1. Check if `memo[state]` exists. If yes, return it.
2. If not, calculate the answer using recursion.
3. Save the answer in `memo[state]` before returning.

**Pros:**
- It is incredibly intuitive to write. It reads exactly like the mathematical transition formula.
- It is "lazy". It only evaluates the subproblems that are strictly necessary to solve the top-level problem.

**Cons:**
- It uses the Call Stack. Deep recursion can cause Stack Overflow errors (especially in JS/Python if N > 10,000).
- Function call overhead is slow. It will consistently benchmark slower than Tabulation.

```ts
function fibMemo(n: number, memo = new Map<number, number>()): number {
  if (n <= 1) return n;
  if (memo.has(n)) return memo.get(n)!;
  
  const result = fibMemo(n - 1, memo) + fibMemo(n - 2, memo);
  memo.set(n, result);
  return result;
}
```

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
