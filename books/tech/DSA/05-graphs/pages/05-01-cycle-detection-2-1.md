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
