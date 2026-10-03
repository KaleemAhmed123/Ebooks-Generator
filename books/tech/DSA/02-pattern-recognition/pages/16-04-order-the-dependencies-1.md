## Order the Dependencies <span class="lv lv1"></span>

- **What:** one task unlocks another, so the work is a DAG (a directed graph with no cycle). Kahn's algorithm processes a node once its in-degree is 0, then lowers its neighbours'
- **Spot it:** "prerequisites", "build order", "X must finish before Y", "minimum time if independent tasks run in parallel", "the letter order implied by a sorted word list"
- **Why:** a node with no unfinished prerequisite is always safe next. Fewer than n nodes processed means a cycle. The longest chain, not the number of tasks, sets the finish time

:::mint
<svg viewBox="0 0 470 162" role="img" aria-label="Parallel Courses III, LeetCode 2050 example 2. Tasks sit in columns by Kahn round. Round 0 holds task 1 taking 1 month, task 2 taking 2 and task 3 taking 3; they finish at 1, 2 and 3. Round 1 holds task 4, taking 4 and needing task 3, finishing at 7. Round 2 holds task 5, taking 5 and needing tasks 1, 2, 3 and 4, finishing at 12. The chain 3, 4, 5 is drawn in red: it is the critical path, 3 plus 4 plus 5 equals 12." xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif">
  <style>
    .lb { font: 9.5px Consolas, monospace; fill: #1a1a1a; }
    .sm { font: 8px Georgia, serif; fill: #6b6b6b; }
    .bx { fill: #ffffff; stroke: #1a1a1a; stroke-width: 1; }
    .cr { fill: #ffedf1; stroke: #ef476e; stroke-width: 1.4; }
    .e { stroke: #6b6b6b; stroke-width: 1; }
    .ce { stroke: #ef476e; stroke-width: 1.8; }
  </style>
  <defs>
    <marker id="g1604" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="5" markerHeight="5" orient="auto"><path d="M0 0L10 5L0 10z" fill="#6b6b6b"/></marker>
    <marker id="r1604" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="5" markerHeight="5" orient="auto"><path d="M0 0L10 5L0 10z" fill="#ef476e"/></marker>
  </defs>
  <text x="60" y="12" class="sm" text-anchor="middle">round 0</text>
  <text x="200" y="12" class="sm" text-anchor="middle">round 1</text>
  <text x="340" y="12" class="sm" text-anchor="middle">round 2</text>
  <line class="e" x1="95" y1="36" x2="305" y2="80" marker-end="url(#g1604)"/>
  <line class="e" x1="95" y1="76" x2="305" y2="84" marker-end="url(#g1604)"/>
  <line class="e" x1="95" y1="116" x2="305" y2="90" marker-end="url(#g1604)"/>
  <line class="ce" x1="95" y1="120" x2="165" y2="132" marker-end="url(#r1604)"/>
  <line class="ce" x1="235" y1="132" x2="305" y2="96" marker-end="url(#r1604)"/>
  <rect class="bx" x="25" y="22" width="70" height="28" rx="3"/><text x="60" y="33" class="lb" text-anchor="middle">task 1 · 1</text><text x="60" y="45" class="sm" text-anchor="middle">done 1</text>
  <rect class="bx" x="25" y="62" width="70" height="28" rx="3"/><text x="60" y="73" class="lb" text-anchor="middle">task 2 · 2</text><text x="60" y="85" class="sm" text-anchor="middle">done 2</text>
  <rect class="cr" x="25" y="102" width="70" height="28" rx="3"/><text x="60" y="113" class="lb" text-anchor="middle">task 3 · 3</text><text x="60" y="125" class="sm" text-anchor="middle">done 3</text>
  <rect class="cr" x="165" y="118" width="70" height="28" rx="3"/><text x="200" y="129" class="lb" text-anchor="middle">task 4 · 4</text><text x="200" y="141" class="sm" text-anchor="middle">done 3 + 4 = 7</text>
  <rect class="cr" x="305" y="72" width="70" height="28" rx="3"/><text x="340" y="83" class="lb" text-anchor="middle">task 5 · 5</text><text x="340" y="95" class="sm" text-anchor="middle">done 7 + 5 = 12</text>
  <text x="386" y="80" class="lb">answer 12</text>
  <text x="386" y="94" class="sm">red chain 3 → 4 → 5</text>
  <text x="386" y="106" class="sm">3 rounds, 5 tasks</text>
</svg>
:::

```ts
// Parallel Courses III (LeetCode 2050): relations[i] = [prev, next], 1-indexed
function minimumTime(n: number, relations: number[][], time: number[]): number {
  const adj: number[][] = Array.from({ length: n }, () => []);
  const indeg = new Array(n).fill(0);
  for (const [a, b] of relations) { adj[a - 1].push(b - 1); indeg[b - 1]++; }
  const finish = time.slice(), q: number[] = [];
  for (let v = 0; v < n; v++) if (indeg[v] === 0) q.push(v);
  for (let h = 0; h < q.length; h++) {             // in-degree 0: safe next
    const u = q[h];
    for (const v of adj[u]) {
      finish[v] = Math.max(finish[v], finish[u] + time[v]);
      if (--indeg[v] === 0) q.push(v);
    }
  }
  return Math.max(...finish);
}
```

- **Watch out:** summing every duration treats the tasks as sequential. Independent tasks run together; only the longest chain counts
