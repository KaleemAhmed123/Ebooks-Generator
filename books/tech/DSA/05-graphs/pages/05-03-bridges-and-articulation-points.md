## Bridges and Articulation Points 🟡

- In network design (like computer networks or road systems), you care deeply about **Single Points of Failure**.
- **Bridge (Cut-Edge):** An edge whose removal increases the number of disconnected components in the graph. (e.g., The only fiber optic cable connecting North America to Europe).
- **Articulation Point (Cut-Vertex):** A node whose removal increases the number of disconnected components. (e.g., A central router).

### Tarjan's Bridge-Finding Algorithm

To find bridges efficiently in O(V + E) time, we use a specialized DFS that tracks **Discovery Time** and **Lowest Reachable Time**.

1. **`disc[u]`:** The exact step/timestamp when node `u` was first visited during the DFS.
2. **`low[u]`:** The smallest discovery time of any node reachable from `u` (including `u` itself), *using at most one back-edge*.

- **The Core Logic:** We traverse the edge `U -> V`. If `low[v] > disc[u]`, it means `V` (and everything below `V`) has absolutely no alternate back-route to reach `U` or any ancestor of `U`. Therefore, the edge `U -> V` is the *only* way to reach `V`. It is a Bridge.

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

### Articulation Points

Finding Articulation Points uses the exact same `disc` and `low` arrays. The logic changes slightly:
- If `U` is the root of the DFS tree, it is an AP if it has *more than 1 independent child branch*.
- If `U` is not the root, it is an AP if there is some child `V` such that `low[v] >= disc[u]`. (Meaning `V` cannot reach strictly *above* `U` without going through `U`).
