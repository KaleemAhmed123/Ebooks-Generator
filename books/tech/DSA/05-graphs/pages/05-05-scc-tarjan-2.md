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
