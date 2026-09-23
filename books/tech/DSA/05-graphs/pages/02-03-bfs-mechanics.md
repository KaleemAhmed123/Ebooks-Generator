## Breadth-First Search (BFS) Mechanics

- BFS explores the graph uniformly in all directions, radiating outward like a ripple in a pond.
- It processes all nodes at distance `1`, then all nodes at distance `2`, etc.
- **The Core Property:** In an *unweighted* graph, the first time BFS encounters a node, it has definitively found the **Shortest Path** to that node.
- It is always implemented iteratively using a **Queue** (FIFO: First In, First Out).

### The Implementation Template

```ts
function bfs(startNode: number, adjList: number[][]): number {
  const queue = [startNode];
  const visited = new Set<number>();
  visited.add(startNode);
  
  let distance = 0;
  let head = 0; // Pointer to avoid O(N) shift() operations

  while (head < queue.length) {
    const levelSize = queue.length - head; // Snapshot the current layer
    
    for (let i = 0; i < levelSize; i++) {
      const node = queue[head++];
      
      // Explore neighbors
      for (const neighbor of adjList[node]) {
        if (!visited.has(neighbor)) {
          visited.add(neighbor); // Mark visited IMMEDIATELY upon pushing
          queue.push(neighbor);
        }
      }
    }
    distance++; // Increment distance after processing the entire layer
  }
  return distance;
}
```

### The Layer-by-Layer Trick

Notice the `const levelSize = queue.length - head;` block. 
- If you just pop from the queue and push neighbors indiscriminately, you lose track of which "radius" or "distance level" you are currently processing. 
- By taking a snapshot of the queue size before the inner loop, you guarantee that the inner `for` loop processes *exactly* the nodes at the current distance, and leaves the newly pushed neighbors for the next iteration of the `while` loop.

### The trap

- **Delayed Visited Marking:** A catastrophic mistake is adding a node to the queue, but waiting to mark it `visited` until you *pop* it off the queue.
- **Why it breaks:** If node `A` and node `B` both point to `C`, `A` pushes `C` to the queue. If `C` isn't marked visited immediately, `B` will also push `C` to the queue. `C` gets processed twice. In dense graphs, this causes the queue to explode exponentially, resulting in Memory Limit Exceeded.
- **The fix:** Always `visited.add()` in the exact same block of code where you `queue.push()`. 
