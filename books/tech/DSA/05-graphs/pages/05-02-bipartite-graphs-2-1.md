### The Implementation (Graph Coloring)

You can use either DFS or BFS. The logic is identical: assign the opposite color of the current node to all its neighbors. If a neighbor already has a color, check if it conflicts.

```ts
function isBipartite(graph: number[][]): boolean {
  const colors = new Map<number, number>(); // 0 for Red, 1 for Blue

  for (let i = 0; i < graph.length; i++) {
    if (colors.has(i)) continue;

    // Run BFS for each disconnected component
    const queue = [i];
    colors.set(i, 0);

    let head = 0;
    while (head < queue.length) {
      const node = queue[head++];
      const myColor = colors.get(node)!;
      const targetColor = 1 - myColor; // Toggle 0 and 1

      for (const neighbor of graph[node]) {
        if (!colors.has(neighbor)) {
          colors.set(neighbor, targetColor);
          queue.push(neighbor);
        } else if (colors.get(neighbor) === myColor) {
          // Conflict! Two adjacent nodes have the same color.
          return false;
        }
      }
    }
  }
  return true;
}
```
