## Critical Path Analysis

- In dependency graphs (like job scheduling or build systems), you often need to find the **minimum time required to complete all tasks**
- Because tasks can run in parallel, the total time is not the sum of all task durations. The total time is dictated entirely by the **Critical Path** — the longest sequence of dependent tasks

### The Mechanism

- The critical path is simply the **longest path in a Directed Acyclic Graph (DAG)**, where the edge weights (or node weights) represent time
- Standard Dijkstra cannot find the longest path (it finds shortest). DFS can find it, but it's slow if there are many overlapping paths
- **The insight:** Because dependencies form a DAG (no cycles), we can process the nodes in **Topological Order**
- If we process nodes topologically, we guarantee that when we evaluate a node, all of its prerequisites have already been fully evaluated

### The Algorithm

1. Compute the in-degree of all nodes (how many prerequisites they have)
2. Put all nodes with 0 in-degree into a queue. Set their `completionTime = duration`
3. Process the queue (Kahn's Algorithm):
   - Pop a node $U$
   - For each dependent node $V$:
     - Update its completion time: `completionTime[V] = max(completionTime[V], completionTime[U] + duration[V])`
     - Decrement the in-degree of $V$. If it reaches 0, push it to the queue
4. The answer is the `max(completionTime)` across all nodes

```ts
function minimumTimeToComplete(n: number, relations: number[][], time: number[]): number {
  const adj: number[][] = Array.from({ length: n + 1 }, () => []);
  const inDegree = new Array(n + 1).fill(0);
  const completionTime = new Array(n + 1).fill(0);
  
  for (const [prev, next] of relations) {
    adj[prev].push(next);
    inDegree[next]++;
  }
  
  const queue: number[] = [];
  for (let i = 1; i <= n; i++) {
    if (inDegree[i] === 0) {
      queue.push(i);
      completionTime[i] = time[i - 1]; // 0-indexed time array
    }
  }
  
  let totalTime = 0;
  while (queue.length > 0) {
    const u = queue.shift()!;
    totalTime = Math.max(totalTime, completionTime[u]);
    
    for (const v of adj[u]) {
      // The critical path to V is the MAXIMUM of all paths leading to it
      completionTime[v] = Math.max(completionTime[v], completionTime[u] + time[v - 1]);
      inDegree[v]--;
      if (inDegree[v] === 0) queue.push(v);
    }
  }
  
  return totalTime;
}
```

:::interview
"Why do we use Math.max when accumulating the time?" — Because a task cannot start until ALL of its prerequisites are finished. If task C depends on A (takes 2 hours) and B (takes 5 hours), C cannot start at hour 2. It must wait until hour 5. The completion time of C is bottlenecked by the longest path leading to it.
:::
