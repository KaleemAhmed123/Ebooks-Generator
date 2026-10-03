### Implementation (Top-Down)

```ts
function soupServings(N: number): number {
  // Optimization: For massive N, A will almost certainly empty first because
  // operations 1 and 2 aggressively drain A.
  if (N >= 4800) return 1.0; 
  
  // Normalize units (divide by 25)
  const n = Math.ceil(N / 25);
  const memo = new Map<string, number>();

  function dfs(a: number, b: number): number {
    // Base Cases
    if (a <= 0 && b <= 0) return 0.5; // Empty simultaneously
    if (a <= 0) return 1.0;           // A empty first
    if (b <= 0) return 0.0;           // B empty first

    const state = `{a},{b}`;
    if (memo.has(state)) return memo.get(state)!;

    // 25% chance (0.25) for each of the 4 operations
    const prob = 0.25 * (
      dfs(a - 4, b - 0) +
      dfs(a - 3, b - 1) +
      dfs(a - 2, b - 2) +
      dfs(a - 1, b - 3)
    );

    memo.set(state, prob);
    return prob;
  }

  return dfs(n, n);
}
```
