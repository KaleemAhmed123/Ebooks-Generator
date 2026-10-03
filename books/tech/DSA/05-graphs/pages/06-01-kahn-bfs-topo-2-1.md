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
