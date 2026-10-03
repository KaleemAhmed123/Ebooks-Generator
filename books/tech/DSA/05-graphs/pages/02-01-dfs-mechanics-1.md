## Depth-First Search (DFS) Mechanics <span class="lv lv1"></span>

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
