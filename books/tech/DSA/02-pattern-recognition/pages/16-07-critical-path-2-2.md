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
"Why do we use Math.max when accumulating the time?"

Because a task cannot start until ALL of its prerequisites are finished. If task C depends on A (takes 2 hours) and B (takes 5 hours), C cannot start at hour 2. It must wait until hour 5. The completion time of C is bottlenecked by the longest path leading to it.
:::
