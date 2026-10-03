### The Standard Template

```ts
function countValidNumbers(X: string): number {
  const n = X.length;
  // memo state depends on the problem. Usually memo[index][isTight][custom...]
  const memo = new Map<string, number>();

  function dfs(index: number, isTight: boolean): number {
    // Base Case: We placed all digits. We formed 1 valid number.
    if (index === n) return 1; 

    const state = `{index},{isTight}`;
    if (memo.has(state)) return memo.get(state)!;

    // Determine the upper bound for this digit
    const limit = isTight ? parseInt(X[index]) : 9;
    let totalValid = 0;

    for (let digit = 0; digit <= limit; digit++) {
      // If we are currently tight, and we pick the absolute maximum digit allowed,
      // the NEXT state remains tight. Otherwise, it becomes loose (false).
      const nextIsTight = isTight && (digit === limit);
      
      totalValid += dfs(index + 1, nextIsTight);
    }

    memo.set(state, totalValid);
    return totalValid;
  }

  // Start at index 0. The very first digit is ALWAYS tight to the original number.
  return dfs(0, true);
}
```

This template instantly solves any problem asking to construct large numbers, dropping the complexity from O(X) down to O(text{Number of Digits}) ≈ O(18).
