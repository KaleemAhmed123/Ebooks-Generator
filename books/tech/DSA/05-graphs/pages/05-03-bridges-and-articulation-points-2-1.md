### Implementation

```ts
function findBridges(n: number, adj: number[][]): number[][] {
  const bridges: number[][] = [];
  const disc = new Array(n).fill(-1);
  const low = new Array(n).fill(-1);
  let time = 0;

  function dfs(u: number, parent: number) {
    disc[u] = low[u] = ++time;

    for (const v of adj[u]) {
      if (v === parent) continue; // Ignore the edge we just came from

      if (disc[v] === -1) { // Unvisited
        dfs(v, u);
        
        // After v finishes, update u's low link
        low[u] = Math.min(low[u], low[v]);

        // Bridge condition!
        if (low[v] > disc[u]) {
          bridges.push([u, v]);
        }
      } else {
        // We hit an already visited node (a back-edge)
        // Update low[u] using the discovery time of v
        low[u] = Math.min(low[u], disc[v]);
      }
    }
  }

  // Handle disconnected graphs
  for (let i = 0; i < n; i++) {
    if (disc[i] === -1) dfs(i, -1);
  }

  return bridges;
}
```
