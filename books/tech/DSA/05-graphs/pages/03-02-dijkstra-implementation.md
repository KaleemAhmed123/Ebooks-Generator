## Dijkstra's Implementation

- Implementing Dijkstra in C++, Java, or Python is trivial because they have built-in Priority Queues (`std::priority_queue`, `PriorityQueue`, `heapq`).
- **The JS/TS Problem:** JavaScript does not have a built-in Priority Queue. In a real interview, you have two choices:
  1. Write a 50-line Min-Heap class from scratch (dangerous and time-consuming).
  2. Ask the interviewer if you can assume a `MinPriorityQueue` class exists, or use a naive array and sort it at every step.

*For the sake of this manual, we assume you have access to a standard `MinPriorityQueue` interface.*

### The Gold Standard Template

```ts
function dijkstra(n: number, adjList: {node: number, weight: number}[][], start: number): number[] {
  // 1. Initialize distances to Infinity
  const dist = new Array(n).fill(Infinity);
  dist[start] = 0;

  // 2. Initialize Min-Heap (stores tuples of [cost, node])
  const pq = new MinPriorityQueue((a, b) => a[0] - b[0]);
  pq.push([0, start]);

  // 3. Process the queue
  while (!pq.isEmpty()) {
    const [currentCost, u] = pq.pop();

    // 4. Stale path check (Crucial for performance)
    if (currentCost > dist[u]) continue;

    // 5. Relax edges
    for (const { node: v, weight } of adjList[u]) {
      const newCost = currentCost + weight;
      
      if (newCost < dist[v]) {
        dist[v] = newCost;
        pq.push([newCost, v]);
      }
    }
  }

  return dist;
}
```

### Complexity

- **Time:** O(E log V). Every edge is evaluated once, and pushing/popping from the Priority Queue takes log V time.
- **Space:** O(V + E) for the adjacency list and the distances array, plus O(V) for the priority queue.

### The trap

- **Returning too early:** If you are looking for the shortest path to a specific `target` node, you might be tempted to return `currentCost` the moment you *push* the target into the PQ. 
- **The fix:** NEVER return when you push. You must wait until the target is **popped** from the PQ. Only when it is popped has Dijkstra mathematically proven that no cheaper path can possibly exist. If you return on push, you might return a sub-optimal path of cost 100, while a path of cost 5 was waiting to be evaluated.
