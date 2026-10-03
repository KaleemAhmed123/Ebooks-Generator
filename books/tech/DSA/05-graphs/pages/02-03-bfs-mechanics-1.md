## Breadth-First Search (BFS) Mechanics <span class="lv lv1"></span>

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
