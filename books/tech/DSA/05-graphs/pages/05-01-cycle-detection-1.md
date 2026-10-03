## Cycle Detection <span class="lv lv1"></span>

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
