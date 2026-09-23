## Cycle Detection

Cycles are the enemy of standard graph traversal. If you don't detect them and handle them, your recursive DFS will stack overflow and your BFS queue will blow up.

### Undirected Graphs

Detecting a cycle in an undirected graph is straightforward.
1. Run a standard DFS or BFS.
2. Maintain a `visited` set.
3. If you encounter a node that is *already* in the `visited` set, you have found a cycle... **UNLESS** that visited node is the exact node you just came from (your immediate parent).
- Why? Because in an undirected graph, if A connects to B, B inherently connects back to A. Moving `A -> B` and seeing `A` in the neighbor list of `B` is not a cycle; it's just the edge you just walked across.

```ts
function undirectedCycle(node: number, parent: number, visited: Set<number>, adj: number[][]): boolean {
  visited.add(node);
  for (const neighbor of adj[node]) {
    if (!visited.has(neighbor)) {
      if (undirectedCycle(neighbor, node, visited, adj)) return true;
    } else if (neighbor !== parent) {
      // We hit a visited node that ISN'T the one we just came from.
      return true; 
    }
  }
  return false;
}
```

### Directed Graphs

In a Directed Graph, `A -> B` and `A -> C -> B` is not a cycle. It's just two paths to the same destination. 
We must use the **3-Color Method** to detect if a back-edge exists (an edge pointing to an ancestor currently on the recursion stack).

- `0` (White): Unvisited
- `1` (Gray): Visiting (currently in the ancestral chain on the stack)
- `2` (Black): Visited (fully processed, removed from stack)

```ts
function directedCycle(node: number, colors: number[], adj: number[][]): boolean {
  colors[node] = 1; // Mark as Gray
  for (const neighbor of adj[node]) {
    if (colors[neighbor] === 1) return true; // Hit a Gray node = Back-edge = Cycle
    if (colors[neighbor] === 0) {
      if (directedCycle(neighbor, colors, adj)) return true;
    }
  }
  colors[node] = 2; // Mark as Black
  return false;
}
```

### Disjoint Set Union (DSU)

For undirected graphs, you can also use DSU for cycle detection. 
- Iterate through all edges. 
- Attempt to `union(u, v)`. 
- If `find(u) === find(v)`, they are already in the same component. Adding this edge creates a cycle.
- This is incredibly fast and avoids recursion entirely.
