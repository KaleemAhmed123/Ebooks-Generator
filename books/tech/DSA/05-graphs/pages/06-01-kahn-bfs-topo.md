## Topological Sort (Kahn's BFS)

- **The Problem:** You have a list of tasks and a list of dependencies ("Task A must be completed before Task B"). Find a valid order to complete all tasks.
- This is a **Topological Sort**. It only works on a **DAG (Directed Acyclic Graph)**. If there is a cycle (A depends on B, B depends on A), it is impossible to resolve, and no valid topological order exists.
- **Kahn's Algorithm** is the BFS approach to Topological Sort. It is the most intuitive and robust way to solve dependency problems.

### The In-Degree Concept

- **In-Degree:** The number of incoming edges a node has (how many prerequisites it has).
- If a node has an In-Degree of `0`, it means it has absolutely no prerequisites. It can be processed immediately.

### The Mechanics

1. Calculate the In-Degree of every node.
2. Push all nodes with an In-Degree of `0` into a Queue.
3. While the Queue is not empty:
   - Pop a node. Add it to the final sorted array.
   - For every neighbor of that node: decrement the neighbor's In-Degree by `1` (because we just fulfilled one of its prerequisites).
   - If the neighbor's In-Degree reaches `0`, push it into the Queue.
4. **The Cycle Check:** If the final sorted array has exactly V nodes, you successfully sorted the graph. If it has fewer than V nodes, the graph contains a cycle and topological sorting is impossible.

### Implementation

```ts
function kahnsBFS(n: number, edges: number[][]): number[] {
  const adj = Array.from({ length: n }, () => [] as number[]);
  const inDegree = new Array(n).fill(0);

  // 1. Build graph and calculate in-degrees
  for (const [u, v] of edges) { // u must happen before v
    adj[u].push(v);
    inDegree[v]++;
  }

  // 2. Initialize queue with 0-in-degree nodes
  const queue: number[] = [];
  for (let i = 0; i < n; i++) {
    if (inDegree[i] === 0) queue.push(i);
  }

  // 3. Process
  const order: number[] = [];
  let head = 0;
  
  while (head < queue.length) {
    const u = queue[head++];
    order.push(u);

    for (const v of adj[u]) {
      inDegree[v]--;
      if (inDegree[v] === 0) {
        queue.push(v);
      }
    }
  }

  // 4. Cycle detection
  if (order.length !== n) return []; // Cycle detected!
  
  return order;
}
```

### The trap

- **Assuming only one valid order:** Topological sort is rarely unique. If Task A and Task B both have 0 dependencies, either could go first. Kahn's algorithm will output whatever order the queue processes them in.
- **The fix:** If a problem asks for the "lexicographically smallest" valid order (e.g., "Always do Task A before Task B if both are available"), simply replace the standard array `Queue` with a **Min-Priority Queue**.
