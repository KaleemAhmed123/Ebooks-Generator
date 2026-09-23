## Eulerian Path & Circuit 🔴

- A **Hamiltonian Path** visits every *node* exactly once. (This is NP-Hard—e.g., the Traveling Salesperson Problem).
- An **Eulerian Path** visits every *edge* exactly once. (This is O(E) and trivial to solve, famously originating from the Bridges of Königsberg puzzle).

### The Mathematical Rules

Before even trying to find a path, you can prove if one exists instantly by counting the degrees of the nodes.
*Degree = Number of edges connected to a node.*

**For an Undirected Graph:**
- **Eulerian Circuit (Starts and ends at same node):** Every single node in the graph must have an **even** degree.
- **Eulerian Path (Starts at A, ends at B):** Exactly **two** nodes must have an **odd** degree. (One is the start, one is the end). All other nodes must have an even degree.
- If there are 4 nodes with odd degrees, it is mathematically impossible to draw a path.

**For a Directed Graph:**
- **Eulerian Circuit:** Every node must have `inDegree === outDegree`.
- **Eulerian Path:** Exactly one node has `outDegree - inDegree === 1` (Start). Exactly one node has `inDegree - outDegree === 1` (End). All other nodes have `inDegree === outDegree`.

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

### The trap

- **Stuck early:** A naive candidate will just do a standard DFS and return the path. 
- **Why it breaks:** If there are two loops attached to the start node, a standard DFS might take Loop A, get back to start, think it's "done" because the path connects, and completely miss Loop B. 
- **The fix:** The post-order traversal (`path.push` happens *after* the `while` loop finishes) is the magic of Hierholzer's. It ensures that if the algorithm gets stuck on Loop A, it puts Loop A at the end of the path array, and seamlessly splices Loop B into the middle as it backtracks.
