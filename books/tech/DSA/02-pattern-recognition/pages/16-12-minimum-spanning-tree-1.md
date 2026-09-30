## Minimum Spanning Tree <span class="lv lv2"></span>

- **What:** connect every node at least total edge cost, with no cycle. **Kruskal** sorts all edges cheapest first and adds an edge only if it joins two different groups (union–find decides)
- **Spot it:** "connect all points / cities at minimum cost", "cheapest network that links everything", "minimum wiring"
- **Why:** the cheapest edge crossing between any two groups is always safe to take (the cut property). Sorting edges and skipping any that would close a cycle takes exactly n − 1 edges and builds a minimum tree

:::mint
<svg viewBox="0 0 470 128" role="img" aria-label="Kruskal on four nodes. Edges sorted by weight: A-B 1, C-D 2, B-C 3, A-C 4, B-D 5. Take A-B (1) joining groups, take C-D (2) joining groups, take B-C (3) joining the two pairs. Now all four are one group with three edges, so stop. A-C 4 and B-D 5 are skipped as they would close a cycle. Total cost 6." xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif">
  <style>
    .lb { font: 9.5px Consolas, monospace; fill: #1a1a1a; }
    .sm { font: 8px Georgia, serif; fill: #6b6b6b; }
    .n { fill: #dbe7f5; stroke: #1d4e89; stroke-width: 1.3; }
    .take { stroke: #2d6a4f; stroke-width: 2.4; }
    .skip { stroke: #ef476e; stroke-width: 1.2; stroke-dasharray: 4 3; }
    .wt { font: 8px Consolas, monospace; fill: #1a1a1a; }
  </style>
  <line class="take" x1="46" y1="34" x2="120" y2="34"/><text x="83" y="28" class="wt" text-anchor="middle">1</text>
  <line class="take" x1="46" y1="98" x2="120" y2="98"/><text x="83" y="114" class="wt" text-anchor="middle">2</text>
  <line class="take" x1="128" y1="46" x2="128" y2="86"/><text x="135" y="70" class="wt">3</text>
  <line class="skip" x1="52" y1="44" x2="118" y2="90"/><text x="70" y="76" class="wt" fill="#ef476e">4</text>
  <line class="skip" x1="118" y1="44" x2="52" y2="90"/><text x="100" y="76" class="wt" fill="#ef476e">5</text>
  <circle class="n" cx="40" cy="34" r="14"/><text x="40" y="38" class="lb" text-anchor="middle">A</text>
  <circle class="n" cx="126" cy="34" r="14"/><text x="126" y="38" class="lb" text-anchor="middle">B</text>
  <circle class="n" cx="126" cy="98" r="14"/><text x="126" y="102" class="lb" text-anchor="middle">C</text>
  <circle class="n" cx="40" cy="98" r="14"/><text x="40" y="102" class="lb" text-anchor="middle">D</text>
  <text x="190" y="30" class="sm" fill="#2d6a4f">take 1, 2, 3 — each joins two groups</text>
  <text x="190" y="52" class="sm" fill="#ef476e">skip 4, 5 — both ends already joined</text>
  <text x="190" y="80" class="lb">n − 1 = 3 edges → stop</text>
  <text x="190" y="102" class="lb" fill="#2d6a4f">total cost = 1 + 2 + 3 = 6</text>
</svg>
:::

```ts
// Min Cost to Connect All Points (LeetCode 1584): Kruskal + DSU (16-10)
function minCostConnectPoints(points: number[][]): number {
  const n = points.length, edges: [number, number, number][] = []; // [w, i, j]
  for (let i = 0; i < n; i++) for (let j = i + 1; j < n; j++) {
    const w = Math.abs(points[i][0] - points[j][0]) +
              Math.abs(points[i][1] - points[j][1]);   // Manhattan distance
    edges.push([w, i, j]);
  }
  edges.sort((a, b) => a[0] - b[0]);                    // cheapest first
  const dsu = new DSU(n);                               // class from 16-10
  let cost = 0, used = 0;
  for (const [w, i, j] of edges) {
    if (dsu.union(i, j)) {                              // joins two groups → safe
      cost += w;
      if (++used === n - 1) break;                      // tree complete
    }
  }
  return cost;
}
```

- **Watch out:** stop at n − 1 edges — reading further wastes time and, on a disconnected graph, no MST exists (fewer than n − 1 usable edges). Kruskal needs the union–find cycle check; without it a cheap edge inside one group is wrongly taken. On a **dense** graph, Prim with a heap (Module 05) beats sorting every edge
