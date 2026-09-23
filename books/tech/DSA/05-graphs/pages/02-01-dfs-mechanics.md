## Depth-First Search (DFS) Mechanics

- DFS explores as deep as possible along each branch before backtracking.
- It is naturally implemented using **Recursion** (which uses the call stack implicitly). It can also be implemented iteratively using an explicit `Stack` data structure.

### The Mental Model

Imagine walking through a maze. At every intersection, you pick the first available path and keep walking until you hit a dead end. When you hit a dead end, you retrace your steps (backtrack) to the last intersection and try the next available path. You mark the floor with chalk (`visited`) so you never walk in circles.

### Implementation Template

```ts
function dfs(node: number, adjList: number[][], visited: Set<number>): void {
  // 1. Mark as visited immediately to prevent infinite cycles
  visited.add(node);
  
  // (Optional) Process the node pre-order here

  // 2. Explore all neighbors
  for (const neighbor of adjList[node]) {
    if (!visited.has(neighbor)) {
      dfs(neighbor, adjList, visited);
    }
  }
  
  // (Optional) Process the node post-order here
}

// How to trigger it (handling disconnected components):
const visited = new Set<number>();
for (let i = 0; i < N; i++) {
  if (!visited.has(i)) {
    dfs(i, adjList, visited);
  }
}
```

### Pre-order vs Post-order

- **Pre-order:** You do work *before* visiting neighbors (as you travel down the tree). Good for passing information downwards.
- **Post-order:** You do work *after* visiting all neighbors (as you bubble back up). Good for aggregating information from children (e.g., "what is the size of my subtree?").

### The trap

- **Stack Overflow:** The call stack in JavaScript has a limit (usually around 10,000 frames). If the graph is a single straight line of 20,000 nodes, recursive DFS will crash with `Maximum call stack size exceeded`.
- **The fix:** If constraints say N ≥ 10⁵ and the graph could be highly skewed, you must use an iterative DFS with a manual `Stack` array, or transition to BFS if you only need connectivity. 
