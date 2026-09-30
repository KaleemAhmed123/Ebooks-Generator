## Two-Colour It <span class="lv lv2"></span>

- **What:** a graph is **bipartite** if its nodes split into two sides with every edge crossing between them. Walk it and paint each node the opposite colour of its neighbour; a clash means no split exists
- **Spot it:** "split into two groups", "can everyone be seated at two tables", "is this graph 2-colourable", "no two enemies together"
- **Why:** an edge forces its ends into different sides, so colours are determined once a start is picked. A conflict means an **odd cycle** — a loop of odd length can never be 2-coloured

:::mint
<svg viewBox="0 0 470 132" role="img" aria-label="Left: a bipartite graph, nodes 0 and 2 coloured green, nodes 1 and 3 coloured blue, every edge crosses between colours. Right: a triangle 0-1-2, an odd cycle; colouring 0 green forces 1 blue and 2 green, but the edge 2-0 joins two greens, a conflict, so it is not bipartite." xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif">
  <style>
    .lb { font: 9.5px Consolas, monospace; fill: #1a1a1a; }
    .sm { font: 8px Georgia, serif; fill: #6b6b6b; }
    .a { fill: #e2fcf3; stroke: #2d6a4f; stroke-width: 1.3; }
    .b { fill: #dbe7f5; stroke: #1d4e89; stroke-width: 1.3; }
    .e { stroke: #6b6b6b; stroke-width: 1.1; }
    .bad { stroke: #ef476e; stroke-width: 2.2; }
  </style>
  <line class="e" x1="50" y1="34" x2="120" y2="34"/><line class="e" x1="50" y1="34" x2="120" y2="96"/>
  <line class="e" x1="50" y1="96" x2="120" y2="34"/><line class="e" x1="50" y1="96" x2="120" y2="96"/>
  <circle class="a" cx="50" cy="34" r="14"/><text x="50" y="38" class="lb" text-anchor="middle">0</text>
  <circle class="b" cx="120" cy="34" r="14"/><text x="120" y="38" class="lb" text-anchor="middle">1</text>
  <circle class="a" cx="50" cy="96" r="14"/><text x="50" y="100" class="lb" text-anchor="middle">2</text>
  <circle class="b" cx="120" cy="96" r="14"/><text x="120" y="100" class="lb" text-anchor="middle">3</text>
  <text x="85" y="124" class="sm" text-anchor="middle" fill="#2d6a4f">every edge crosses → bipartite</text>
  <line class="e" x1="300" y1="30" x2="270" y2="90"/><line class="e" x1="300" y1="30" x2="345" y2="90"/>
  <line class="bad" x1="270" y1="90" x2="345" y2="90"/>
  <circle class="a" cx="300" cy="30" r="14"/><text x="300" y="34" class="lb" text-anchor="middle">0</text>
  <circle class="b" cx="270" cy="90" r="14"/><text x="270" y="94" class="lb" text-anchor="middle">1</text>
  <circle class="a" cx="345" cy="90" r="14"/><text x="345" y="94" class="lb" text-anchor="middle">2</text>
  <text x="360" y="70" class="sm" fill="#ef476e">2 and 0 clash</text>
  <text x="308" y="124" class="sm" text-anchor="middle" fill="#ef476e">odd cycle → not bipartite</text>
</svg>
:::

```ts
// Is Graph Bipartite (LeetCode 785): graph[u] = neighbours of u
function isBipartite(graph: number[][]): boolean {
  const n = graph.length, colour = new Array(n).fill(0); // 0 uncoloured, ±1 sides
  for (let s = 0; s < n; s++) {
    if (colour[s] !== 0) continue;                     // new component
    colour[s] = 1; const q = [s];
    for (let h = 0; h < q.length; h++) {
      const u = q[h];
      for (const v of graph[u]) {
        if (colour[v] === colour[u]) return false;    // same side across an edge
        if (colour[v] === 0) { colour[v] = -colour[u]; q.push(v); }
      }
    }
  }
  return true;
}
```

- **Watch out:** the graph may be disconnected — loop over every node as a possible new start, or an unvisited component goes unchecked. A self-loop makes it instantly non-bipartite
