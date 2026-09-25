## DAG Dynamic Programming 🟡

- **What it is:** Performing Dynamic Programming transitions along the topological order of a Directed Acyclic Graph
- **When to reach for it:** "Longest path in a DAG", "Number of ways to reach node X", "Minimum time to complete all tasks"
- **Why it works:** DP requires that a state is fully resolved before it is used to calculate other states. A DAG provides this guarantee natively. By processing nodes in topological order, you guarantee that when you are at node U, all paths *leading* to U have already been completely processed

### The mechanism

- Consider finding the longest path. You can't use Dijkstra's because edge weights might be negative, and you can't use Bellman-Ford because it's O(V · E).
- In a DAG, you can find the longest (or shortest) path in O(V + E) time.
- `longestPath[V] = max(longestPath[U_i] + weight(U_i, V))` for all incoming neighbors U_i

```ts
// After performing Kahn's Topological Sort to get 'order'
function longestPathDAG(order: number[], adj: [number, number][][], n: number): number {
  const dist = new Array(n).fill(-Infinity);
  dist[order[0]] = 0; // Starting node
  
  for (const u of order) {
    if (dist[u] !== -Infinity) {
      for (const [v, weight] of adj[u]) {
        if (dist[v] < dist[u] + weight) {
          dist[v] = dist[u] + weight; // Relax the edge
        }
      }
    }
  }
  
  return Math.max(...dist);
}
```

### Critical Path Method (CPM)

- Used extensively in project management and parallel computing.
- If multiple tasks can run in parallel, but Task D requires Task A, B, and C to finish first, the start time of D is constrained by the *slowest* of A, B, and C.
- This is exactly finding the longest path in a DAG.
- `startTime[D] = max(endTime[A], endTime[B], endTime[C])`
- You compute this effortlessly by modifying Kahn's algorithm: when you decrement `inDegree[neighbor]`, you also update its required start time

### The trap

- **Trying to use Dijkstra for the longest path.** Dijkstra's algorithm fundamentally relies on the fact that adding edges makes paths *longer* (hence positive weights only). If you negate weights to find the longest path, Dijkstra's greedy choice property fails. But on a DAG, the topological order forces the correct resolution sequence, allowing DP to solve it optimally in linear time
