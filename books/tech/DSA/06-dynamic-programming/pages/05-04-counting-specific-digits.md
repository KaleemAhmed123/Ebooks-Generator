## Digit DP: Counting Specific Digits 🔴

Let's apply the Digit DP template to a concrete problem.

- **The Problem:** Given an integer n, count the total number of times the digit `1` appears in all non-negative integers less than or equal to n.
- **Example:** n = 13. The numbers containing `1` are 1, 10, 11, 12, 13.
  - Notice that 11 contains two `1`s. The total count of the *digit* `1` is 6.

### Expanding the State

Our standard state was `dfs(index, isTight)`.
Because we need to count how many `1`s we have accumulated in our currently constructed number, we must add that to our state.
New State: `dfs(index, isTight, countOfOnes)`.

### The Transition

When we are at `index`, and we choose a `digit` from `0` to `limit`:
- If `digit === 1`, the new count for the next recursive call is `countOfOnes + 1`.
- Otherwise, the count remains `countOfOnes`.

### Implementation

```ts
function countDigitOne(n: number): number {
  if (n < 0) return 0;
  
  const s = n.toString();
  const len = s.length;
  
  // dp[index][isTight][countOfOnes]
  const memo = new Map<string, number>();

  function dfs(index: number, isTight: boolean, countOfOnes: number): number {
    // Base Case: We placed all digits. Return the total '1's accumulated in this specific number path.
    if (index === len) return countOfOnes;

    const state = `{index},{isTight},${countOfOnes}`;
    if (memo.has(state)) return memo.get(state)!;

    const limit = isTight ? parseInt(s[index]) : 9;
    let total = 0;

    for (let digit = 0; digit <= limit; digit++) {
      const nextIsTight = isTight && (digit === limit);
      const nextCount = countOfOnes + (digit === 1 ? 1 : 0);
      
      total += dfs(index + 1, nextIsTight, nextCount);
    }

    memo.set(state, total);
    return total;
  }

  return dfs(0, true, 0);
}
```

### The Leading Zero Trap

In some Digit DP problems, leading zeros drastically change the math. (e.g., "Count numbers where no two adjacent digits are the same". `007` would fail the rule, but `7` is a valid number, meaning the implicit leading zeros shouldn't be evaluated).
If a problem cares about leading zeros, you add a 4th boolean parameter to your state: `isLeadingZero`. 
- If `isLeadingZero` is true and `digit === 0`, you pass `true` to the next state, and do *not* trigger the problem's mathematical rules.
- If `digit > 0`, you pass `false` to the next state.
