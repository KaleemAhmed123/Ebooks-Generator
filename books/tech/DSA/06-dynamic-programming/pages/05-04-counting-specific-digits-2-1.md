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
