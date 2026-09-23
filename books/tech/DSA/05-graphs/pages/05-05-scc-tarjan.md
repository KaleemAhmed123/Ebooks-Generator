## Strongly Connected Components (Tarjan) 🔴

- Tarjan's Algorithm accomplishes exactly the same thing as Kosaraju's Algorithm (finding all SCCs in O(V + E) time).
- **The Difference:** Tarjan does it in a **single pass** of DFS, without needing to reverse the graph.
- It is significantly harder to memorize, but mathematically more elegant. It shares the same `disc` and `low` concept as the Bridge-finding algorithm.

### The Mechanics

As Tarjan's DFS runs, it pushes nodes onto a `Stack`. 
It maintains `disc` (discovery time) and `low` (lowest reachable discovery time).
- A node `U` is considered the **"Root" of an SCC** if its `low[u] === disc[u]` after all its children have been processed.
- This means `U` cannot reach any node older/higher than itself in the DFS tree. The SCC is completely bounded by `U`.
- When a root is found, Tarjan pops all nodes off the stack until it pops `U`. That cluster of popped nodes is one complete SCC.

### Implementation

```ts
function tarjan(n: number, adj: number[][]): number[][] {
  const sccs: number[][] = [];
  const disc = new Array(n).fill(-1);
  const low = new Array(n).fill(-1);
  const inStack = new Array(n).fill(false);
  const stack: number[] = [];
  let time = 0;

  function dfs(u: number) {
    disc[u] = low[u] = ++time;
    stack.push(u);
    inStack[u] = true;

    for (const v of adj[u]) {
      if (disc[v] === -1) {
        dfs(v);
        low[u] = Math.min(low[u], low[v]);
      } else if (inStack[v]) {
        // Back-edge to a node currently in our active SCC cluster
        low[u] = Math.min(low[u], disc[v]);
      }
    }

    // If u is the root of an SCC, pop the stack
    if (low[u] === disc[u]) {
      const currentSCC: number[] = [];
      let poppedNode = -1;
      while (poppedNode !== u) {
        poppedNode = stack.pop()!;
        inStack[poppedNode] = false;
        currentSCC.push(poppedNode);
      }
      sccs.push(currentSCC);
    }
  }

  for (let i = 0; i < n; i++) {
    if (disc[i] === -1) dfs(i);
  }

  return sccs;
}
```

### Kosaraju vs Tarjan

- For an interview, always learn **Kosaraju** first. It is intuitive and relies on simple DFS concepts.
- Learn **Tarjan** only if you are targeting HFT (High-Frequency Trading) firms, competitive programming, or environments where the memory overhead of creating a fully reversed adjacency list and running a second pass is strictly unacceptable.
