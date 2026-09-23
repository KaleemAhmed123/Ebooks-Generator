## Traveling Salesperson Problem (TSP) 🔴

TSP is the classic NP-Hard problem. 
- **The Setup:** Given a list of cities and the distances between each pair of cities, what is the shortest possible route that visits each city exactly once and returns to the origin city?
- **Brute Force:** O(N!). For 15 cities, 15! is 1.3 trillion operations. Too slow.
- **Bitmask DP:** We can optimize this to O(N² · 2^N). For 15 cities, this is only 7.3 million operations. Blazing fast.

### The DP State

To figure out the optimal next city to visit, what do we need to know?
1. Where are we currently? (The `lastVisitedCity`).
2. Which cities have we already visited? (The `mask`).

- **State:** `dp[mask][u]` = the minimum distance to visit all the *unvisited* cities in `mask`, assuming we are currently standing at city `u`.

### The Transition

We are at city `u`. We look at every other city `v`. 
- If `v` is *not* in our `mask` (we haven't visited it yet):
- The cost to go to `v` is `dist[u][v]`.
- The remaining cost to finish the journey from `v` is `dp[mask | (1 << v)][v]`.
- We take the minimum of all possible valid `v`s.

`dp[mask][u] = min( dist[u][v] + dp[mask | (1<<v)][v] )`

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

### The takeaway

If an interview problem asks for an optimal sequence, grouping, or permutation, and the size of the input is extremely small (N ≤ 20), write a Bitmask DP. The state will almost always be `dfs(mask, lastUsedElement)`.
