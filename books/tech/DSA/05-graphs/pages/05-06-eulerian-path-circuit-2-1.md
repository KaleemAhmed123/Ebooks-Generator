### Hierholzer's Algorithm

To actually reconstruct the path, we use Hierholzer's Algorithm.
1. Start at a valid starting node (an odd-degree node, or any node for a circuit).
2. Follow edges arbitrarily. As you traverse an edge, **delete it** from the graph so you never use it again.
3. Keep going until you get completely stuck.
4. When you get stuck, push the current node to a result array, and backtrack to a previous node that still has unvisited edges.
5. Reverse the result array at the end.

```ts
function findEulerianPath(adj: Map<string, string[]>): string[] {
  const path: string[] = [];
  
  // Start node is assumed to be known based on degree rules
  function dfs(node: string) {
    const edges = adj.get(node) || [];
    while (edges.length > 0) {
      // Lexicographical sorting here if the problem requires smallest path
      const next = edges.shift()!; // Remove edge
      dfs(next);
    }
    // Post-order: add to path only when stuck
    path.push(node);
  }

  dfs("START_NODE");
  
  return path.reverse();
}
```
