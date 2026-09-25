### The Template (Kahn's BFS)

```ts
function topologicalSort(numCourses: number, prerequisites: number[][]): number[] {
  const adj: number[][] = Array.from({ length: numCourses }, () => []);
  const inDegree = new Array(numCourses).fill(0);
  
  // 1. Build Graph and In-Degree array
  for (const [course, prereq] of prerequisites) {
    adj[prereq].push(course); // prereq -> course
    inDegree[course]++;
  }
  
  // 2. Initialise Queue with 0-in-degree nodes
  const queue: number[] = [];
  for (let i = 0; i < numCourses; i++) {
    if (inDegree[i] === 0) queue.push(i);
  }
  
  const order: number[] = [];
  
  // 3. Process
  while (queue.length > 0) {
    const node = queue.shift()!;
    order.push(node);
    
    // "Remove" outgoing edges
    for (const neighbor of adj[node]) {
      inDegree[neighbor]--;
      if (inDegree[neighbor] === 0) {
        queue.push(neighbor);
      }
    }
  }
  
  // 4. Cycle Detection Check
  if (order.length !== numCourses) return []; // Cycle detected
  return order;
}
```
