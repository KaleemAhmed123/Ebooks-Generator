### Implementation (Memoization)

TSP is vastly easier to write using Top-Down Memoization than Bottom-Up Tabulation because the bitmask states don't perfectly align with a simple `for` loop order.

```ts
function tsp(n: number, dist: number[][]): number {
  // dp[mask][u] initialized with -1
  const dp = Array.from({ length: 1 << n }, () => new Array(n).fill(-1));
  const ALL_VISITED = (1 << n) - 1; // e.g., 1111 in binary for N=4

  function dfs(mask: number, u: number): number {
    // Base Case: All cities visited. Return the cost to go back to origin (city 0)
    if (mask === ALL_VISITED) {
      return dist[u][0]; 
    }

    if (dp[mask][u] !== -1) return dp[mask][u];

    let minCost = Infinity;

    for (let v = 0; v < n; v++) {
      // If city v is NOT visited
      if ((mask & (1 << v)) === 0) {
        // Mark v as visited and recurse
        const newCost = dist[u][v] + dfs(mask | (1 << v), v);
        minCost = Math.min(minCost, newCost);
      }
    }

    return dp[mask][u] = minCost;
  }

  // Start at city 0, with city 0 marked as visited (1 << 0)
  return dfs(1, 0);
}
```
