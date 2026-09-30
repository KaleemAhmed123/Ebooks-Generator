## Shortest Path by Layers <span class="lv lv1"></span>

- **What:** on a graph where every edge costs the same, BFS settles nodes in rings of equal distance. The ring a node first appears in *is* its shortest distance
- **Spot it:** "fewest steps / moves", "shortest path" with **unweighted** edges, "minimum number of transformations"
- **Why:** BFS drains the queue in first-in order, so all distance-`d` nodes are processed before any distance-`d+1` node. The first time a node is reached is along a shortest path — no later path can be shorter

:::mint
<svg viewBox="0 0 470 140" role="img" aria-label="BFS rings from source S. Ring 0 is S. Ring 1, distance 1, holds two neighbours of S. Ring 2, distance 2, holds their unvisited neighbours. A node in ring 2 also has an edge back to ring 1, but it was already settled at distance 2, so that edge is ignored. Distance equals the ring number." xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif">
  <style>
    .lb { font: 9.5px Consolas, monospace; fill: #1a1a1a; }
    .sm { font: 8px Georgia, serif; fill: #6b6b6b; }
    .n0 { fill: #ffedf1; stroke: #ef476e; stroke-width: 1.3; }
    .n1 { fill: #e2fcf3; stroke: #2d6a4f; stroke-width: 1.2; }
    .n2 { fill: #dbe7f5; stroke: #1d4e89; stroke-width: 1.2; }
    .e { stroke: #6b6b6b; stroke-width: 1; }
    .ring { fill: none; stroke: #c9c9c9; stroke-width: 1; stroke-dasharray: 3 3; }
  </style>
  <ellipse class="ring" cx="70" cy="70" rx="24" ry="52"/>
  <ellipse class="ring" cx="70" cy="70" rx="150" ry="60"/>
  <line class="e" x1="70" y1="70" x2="150" y2="34"/><line class="e" x1="70" y1="70" x2="150" y2="106"/>
  <line class="e" x1="150" y1="34" x2="250" y2="50"/><line class="e" x1="150" y1="106" x2="250" y2="92"/>
  <line class="e" x1="250" y1="50" x2="250" y2="92"/>
  <circle class="n0" cx="70" cy="70" r="14"/><text x="70" y="74" class="lb" text-anchor="middle">S</text>
  <circle class="n1" cx="150" cy="34" r="13"/><text x="150" y="38" class="lb" text-anchor="middle">1</text>
  <circle class="n1" cx="150" cy="106" r="13"/><text x="150" y="110" class="lb" text-anchor="middle">1</text>
  <circle class="n2" cx="250" cy="50" r="13"/><text x="250" y="54" class="lb" text-anchor="middle">2</text>
  <circle class="n2" cx="250" cy="92" r="13"/><text x="250" y="96" class="lb" text-anchor="middle">2</text>
  <text x="60" y="132" class="sm" text-anchor="middle">ring 0</text>
  <text x="150" y="132" class="sm" text-anchor="middle">ring 1</text>
  <text x="330" y="54" class="lb">edge 2–2 within a ring</text>
  <text x="330" y="70" class="sm">both already settled → skip</text>
  <text x="330" y="92" class="lb" fill="#1d4e89">distance = ring number</text>
</svg>
:::

```ts
// Shortest hops from src on an unweighted graph; -1 if unreachable
function bfsDist(n: number, edges: number[][], src: number): number[] {
  const adj: number[][] = Array.from({ length: n }, () => []);
  for (const [u, v] of edges) { adj[u].push(v); adj[v].push(u); }
  const dist = new Array(n).fill(-1), q = [src];
  dist[src] = 0;
  for (let h = 0; h < q.length; h++)                  // head index, not shift()
    for (const v of adj[q[h]])
      if (dist[v] < 0) { dist[v] = dist[q[h]] + 1; q.push(v); }
  return dist;
}
```

- **Watch out:** set `dist` (mark visited) when you **enqueue**, not when you dequeue. Marking on dequeue lets a node join the queue several times, and a later, longer path can overwrite the first
