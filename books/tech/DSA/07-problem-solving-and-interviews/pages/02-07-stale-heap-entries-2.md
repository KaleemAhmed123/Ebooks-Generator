### The Fix

Immediately after popping a node from the heap, check if its stored distance matches your global `dist` array. If the popped distance is greater, it is a stale ghost entry. Throw it away instantly.

```ts
while (!pq.isEmpty()) {
  const [d, u] = pq.pop();

  // THE FIX: Discard stale entries instantly
  if (d > dist[u]) continue; 

  for (const [v, weight] of adj[u]) {
    // ... relax edges
  }
}
```

This single `if (d > dist[u]) continue;` line is mandatory for any Priority Queue graph algorithm that pushes duplicates.
