## Memoisation vs Tabulation <span class="lv lv1"></span>

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
