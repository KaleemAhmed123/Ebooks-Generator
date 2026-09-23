## Visited Timing (DFS vs BFS)

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

### The BFS Rule: Mark upon Enqueue

In Breadth-First Search, the queue holds nodes waiting to be processed. 
**The Trap:** If you wait to mark a node as visited until you *pop* it from the queue, you will push duplicates.

```ts
// THE WRONG APPROACH (BFS)
const queue = [start];
while (queue.length > 0) {
  const curr = queue.shift();
  if (visited.has(curr)) continue;
  visited.add(curr); // Too late!

  for (const neighbor of adj[curr]) {
    queue.push(neighbor); // Pushing duplicates!
  }
}
```

**Why it fails:**
Suppose node A connects to B and C. Node B and C both connect to D.
- Pop A. Push B and C. (Queue: `[B, C]`).
- Pop B. Push D. (Queue: `[C, D]`).
- Pop C. Push D again! (Queue: `[D, D]`).
- Because D was pushed by B, but wasn't popped yet, it wasn't marked visited. C thought D was undiscovered and pushed a duplicate. In a dense graph, the queue size explodes exponentially.

**The Fix:** You must mark a node as visited the exact millisecond it enters the queue.

```ts
// THE FIX (BFS)
const queue = [start];
visited.add(start); // Mark before pushing!

while (queue.length > 0) {
  const curr = queue.shift();
  // Do NOT check visited here. We already did.

  for (const neighbor of adj[curr]) {
    if (!visited.has(neighbor)) {
      visited.add(neighbor); // Mark before pushing!
      queue.push(neighbor);
    }
  }
}
```
