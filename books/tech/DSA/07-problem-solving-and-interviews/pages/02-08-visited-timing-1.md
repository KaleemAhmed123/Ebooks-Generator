## Visited Timing (DFS vs BFS) <span class="lv lv1"></span>

The exact moment you mark a node as `visited` dictates whether your algorithm is lightning-fast or exponentially slow.

### The DFS Rule: Mark upon Entry

In Depth-First Search, you mark a node as visited the exact second you enter the recursive function.

```ts
function dfs(node) {
  if (visited.has(node)) return;
  visited.add(node); // Mark immediately!
  
  for (const neighbor of adj[node]) {
    dfs(neighbor);
  }
}
```
