## Derivation worked example: Tree Diameter <span class="lv lv1"></span>

- This example proves the derivation method works beyond arrays, on a fundamentally different data structure
- **Problem:** Given a tree with n nodes and n-1 edges, find the **diameter** — the longest path between any two nodes

### Step 1: Brute Force

- What is the most naive approach? For every node, run BFS (or DFS) to find the farthest node from it. Track the maximum distance found
- **Complexity:** n BFS traversals, each O(n). Total: O(n²)

```ts
// Brute force: BFS from every node
let maxDist = 0;
for (let start = 0; start < n; start++) {
  const dist = bfs(graph, start);  // returns max distance from start
  maxDist = Math.max(maxDist, dist);
}
```

### Step 2: What is repeated?

- Each BFS explores paths that overlap massively with other BFS runs
- BFS from node 0 might find that node 7 is the farthest. BFS from node 1 discovers the same long path through the same corridor of nodes
- The repetition: we are rediscovering the same longest paths from multiple starting points
