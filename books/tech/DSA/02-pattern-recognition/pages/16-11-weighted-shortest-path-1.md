## Weighted Shortest Path <span class="lv lv1"></span>

- **What:** when edges carry different non-negative weights, BFS rings break. **Dijkstra** keeps a min-heap of `(distance, node)`, always settles the closest unsettled node, and relaxes its edges
- **Spot it:** "minimum cost / time / distance" with **weighted**, non-negative edges; "cheapest flight within k stops" (add stops to the state)
- **Why:** with no negative edge, the smallest tentative distance in the heap can never be improved by a longer detour — so popping it settles it for good. Each edge is relaxed at most once it matters

:::mint
<svg viewBox="0 0 470 132" role="img" aria-label="Dijkstra from S. Edges S to A cost 1, S to B cost 4, A to B cost 2, B to T cost 1. The heap settles S at 0, then A at 1, then relaxes A to B giving B distance 3 which beats the direct 4, then B at 3, then T at 4. Settling on pop, not on push, is what keeps B at 3 rather than 4." xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif">
  <style>
    .lb { font: 9.5px Consolas, monospace; fill: #1a1a1a; }
    .sm { font: 8px Georgia, serif; fill: #6b6b6b; }
    .wt { font: 8px Consolas, monospace; fill: #8a5a00; }
    .n { fill: #e2fcf3; stroke: #2d6a4f; stroke-width: 1.3; }
    .e { stroke: #6b6b6b; stroke-width: 1.2; }
  </style>
  <defs><marker id="d1611" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto"><path d="M0 0L10 5L0 10z" fill="#6b6b6b"/></marker></defs>
  <line class="e" x1="46" y1="60" x2="118" y2="34" marker-end="url(#d1611)"/><text x="72" y="38" class="wt">1</text>
  <line class="e" x1="46" y1="72" x2="118" y2="98" marker-end="url(#d1611)"/><text x="72" y="98" class="wt">4</text>
  <line class="e" x1="140" y1="46" x2="140" y2="86" marker-end="url(#d1611)"/><text x="146" y="70" class="wt">2</text>
  <line class="e" x1="158" y1="96" x2="214" y2="72" marker-end="url(#d1611)"/><text x="182" y="80" class="wt">1</text>
  <circle class="n" cx="32" cy="66" r="15"/><text x="32" y="70" class="lb" text-anchor="middle">S0</text>
  <circle class="n" cx="134" cy="32" r="15"/><text x="134" y="36" class="lb" text-anchor="middle">A1</text>
  <circle class="n" cx="140" cy="100" r="15"/><text x="140" y="104" class="lb" text-anchor="middle">B3</text>
  <circle class="n" cx="230" cy="66" r="15"/><text x="230" y="70" class="lb" text-anchor="middle">T4</text>
  <text x="280" y="30" class="sm">pop S(0) → relax A=1, B=4</text>
  <text x="280" y="48" class="sm">pop A(1) → relax B: 1+2=3 &lt; 4</text>
  <text x="280" y="66" class="sm">pop B(3) → relax T=4</text>
  <text x="280" y="84" class="sm">pop T(4) → done</text>
  <text x="280" y="108" class="lb" fill="#2d6a4f">settle on POP, not on push</text>
</svg>
:::

```ts
// Network Delay Time (LeetCode 743): times[i] = [u, v, w], signal from k
function networkDelayTime(times: number[][], n: number, k: number): number {
  const adj: [number, number][][] = Array.from({ length: n + 1 }, () => []);
  for (const [u, v, w] of times) adj[u].push([v, w]);
  const dist = new Array(n + 1).fill(Infinity); dist[k] = 0;
  const heap = new Heap<[number, number]>((x, y) => x[0] < y[0]); // [dist, node] · Heap: 15-11
  heap.push([0, k]);
  while (heap.size()) {
    const [d, u] = heap.pop()!;
    if (d > dist[u]) continue;                          // stale entry, already settled
    for (const [v, w] of adj[u])
      if (d + w < dist[v]) { dist[v] = d + w; heap.push([dist[v], v]); }
  }
  let ans = 0;
  for (let i = 1; i <= n; i++) {
    if (dist[i] === Infinity) return -1;                // unreachable node
    ans = Math.max(ans, dist[i]);
  }
  return ans;
}
```

- **Watch out:** Dijkstra assumes **no negative edge** — a negative weight can improve a node already settled, breaking the pop-settles-it guarantee. For negative edges use Bellman–Ford (Module 05). Skip a popped entry when `d > dist[u]`: the heap holds stale copies, and settling them re-relaxes edges
