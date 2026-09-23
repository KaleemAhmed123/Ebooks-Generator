## Stale Heap Entries (Dijkstra's Silent Killer)

When writing Dijkstra's algorithm using a Priority Queue, there is a fundamental difference between how textbook pseudocode works and how standard library heaps work.

### The Textbook Pseudocode

Standard textbooks say: "If you find a shorter path to a node that is already in the Priority Queue, use `decrease-key` to update its priority."

### The Reality

Almost no standard library in any language (Java `PriorityQueue`, C++ `priority_queue`, Python `heapq`) supports an efficient `decrease-key` operation. Finding an arbitrary element in a heap takes O(N) time.
Instead of updating the existing entry, we simply **push a duplicate, better entry** into the heap.

```ts
// Found a better path to 'neighbor'
if (newDist < dist[neighbor]) {
  dist[neighbor] = newDist;
  pq.push([newDist, neighbor]); // Pushing a duplicate!
}
```

Because it's a Min-Heap, the better entry will naturally bubble to the top and be processed first. 
But this creates a trap: the old, worse entry (the "Stale Entry") is still sitting in the heap, waiting to be processed later.

### The Trap

If you do not explicitly discard stale entries when you pop them, your algorithm will process the same node multiple times, exploring its edges with a suboptimal distance. This can trigger an exponential explosion of duplicate paths, turning your fast Dijkstra into a massive TLE.

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
