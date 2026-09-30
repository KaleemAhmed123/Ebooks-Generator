## Detect a Cycle <span class="lv lv1"></span>

- **What:** a cycle is a node reached again while it is still on the current path. In a **directed** graph, colour nodes white / grey / black; an edge to a grey node is a cycle
- **Spot it:** "is this schedule possible", "are there circular dependencies", "does the graph have a loop", "valid course order"
- **Why:** grey means "on the stack right now, still open". Reaching a grey node closes a loop back to an ancestor. Black means "fully explored, its edges lead nowhere new" — safe to skip

:::mint
<svg viewBox="0 0 470 138" role="img" aria-label="Directed graph 0 to 1 to 2 to 0. DFS colours 0 grey, then 1 grey, then 2 grey. From 2 the edge points back to 0, which is still grey — a back edge, so a cycle exists. The legend explains white is unseen, grey is on the current path, black is finished." xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif">
  <style>
    .lb { font: 9.5px Consolas, monospace; fill: #1a1a1a; }
    .sm { font: 8px Georgia, serif; fill: #6b6b6b; }
    .grey { fill: #d9d9d9; stroke: #6b6b6b; stroke-width: 1.3; }
    .e { stroke: #1a1a1a; stroke-width: 1.2; }
    .back { stroke: #ef476e; stroke-width: 2; }
    .w { fill: #ffffff; stroke: #1a1a1a; stroke-width: 1; }
    .bk { fill: #1a1a1a; }
  </style>
  <defs>
    <marker id="c1608" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto"><path d="M0 0L10 5L0 10z" fill="#1a1a1a"/></marker>
    <marker id="cb1608" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto"><path d="M0 0L10 5L0 10z" fill="#ef476e"/></marker>
  </defs>
  <line class="e" x1="86" y1="34" x2="150" y2="58" marker-end="url(#c1608)"/>
  <line class="e" x1="150" y1="78" x2="86" y2="102" marker-end="url(#c1608)"/>
  <line class="back" x1="66" y1="98" x2="66" y2="42" marker-end="url(#cb1608)"/>
  <circle class="grey" cx="60" cy="30" r="15"/><text x="60" y="34" class="lb" text-anchor="middle">0</text>
  <circle class="grey" cx="165" cy="68" r="15"/><text x="165" y="72" class="lb" text-anchor="middle">2</text>
  <circle class="grey" cx="60" cy="108" r="15"/><text x="60" y="112" class="lb" text-anchor="middle">1</text>
  <text x="92" y="76" class="sm" fill="#ef476e">back edge → cycle</text>
  <rect class="w" x="250" y="24" width="14" height="14"/><text x="272" y="35" class="sm">white — not yet seen</text>
  <rect class="grey" x="250" y="48" width="14" height="14"/><text x="272" y="59" class="sm">grey — on the current path</text>
  <rect class="bk" x="250" y="72" width="14" height="14"/><text x="272" y="83" class="sm">black — fully explored, safe</text>
  <text x="250" y="112" class="lb">edge to grey = a loop to an ancestor</text>
</svg>
:::

```ts
// Directed cycle via 3-colour DFS; true if any cycle exists
function hasCycleDirected(n: number, edges: number[][]): boolean {
  const adj: number[][] = Array.from({ length: n }, () => []);
  for (const [u, v] of edges) adj[u].push(v);
  const colour = new Array(n).fill(0);                 // 0 white, 1 grey, 2 black
  const dfs = (u: number): boolean => {
    colour[u] = 1;                                     // enter: grey
    for (const v of adj[u]) {
      if (colour[v] === 1) return true;               // back edge to an open node
      if (colour[v] === 0 && dfs(v)) return true;
    }
    colour[u] = 2;                                     // leave: black
    return false;
  };
  for (let u = 0; u < n; u++) if (colour[u] === 0 && dfs(u)) return true;
  return false;
}
```

- **Watch out:** two colours (visited / not) is not enough for a directed graph. A visited **black** node reached again is fine — it is a shared descendant, not a loop. Only a **grey** node signals a cycle. In an *undirected* graph, use union–find (16-10) or DFS that ignores the edge back to its parent
