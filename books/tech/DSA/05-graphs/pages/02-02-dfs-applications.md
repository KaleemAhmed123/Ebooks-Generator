## DFS Applications

DFS is more than just a way to traverse a graph. Its recursive nature makes it the optimal tool for problems requiring exhaustive pathfinding, backtracking, or topological analysis.

### Finding Connected Components

- A Connected Component is a subgraph where every node can reach every other node, but it is isolated from the rest of the graph.
- To count them, loop over all nodes. If a node is unvisited, increment your `componentCount`, and launch a DFS. The DFS will organically sweep up and mark every node connected to it. The number of DFS launches equals the number of components.

### Cycle Detection (Directed Graphs)

- An undirected cycle is trivial (if you hit a visited node that isn't your immediate parent, it's a cycle).
- A directed cycle is harder. If `A -> B` and `A -> C -> B`, there is no cycle, even though `B` is visited twice.
- **The Solution:** Use a "3-Color" state system.
  - `0 (White)`: Unvisited.
  - `1 (Gray)`: Currently visiting (on the recursion stack).
  - `2 (Black)`: Completely finished visiting all children.
- If you ever encounter a neighbor that is `Gray`, you have found a **back-edge** to a node currently in your ancestral chain. You have proved a cycle exists.

```ts
function hasCycle(node: number, colors: number[], adj: number[][]): boolean {
  colors[node] = 1; // Mark Gray (Visiting)
  
  for (const next of adj[node]) {
    if (colors[next] === 1) return true; // Cycle detected!
    if (colors[next] === 0) {
      if (hasCycle(next, colors, adj)) return true;
    }
  }
  
  colors[node] = 2; // Mark Black (Finished)
  return false;
}
```

### Backtracking (Path Generation)

- If a problem asks "Return *all* possible paths from A to B", you cannot just mark nodes as `visited` and leave them.
- You must add a node to the path, mark it visited, recurse, and then **backtrack**: remove it from the path and mark it *unvisited* so other divergent branches can reuse it. (See the Backtracking module for more detail).
