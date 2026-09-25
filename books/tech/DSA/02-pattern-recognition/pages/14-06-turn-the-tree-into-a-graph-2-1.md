## Turn the Tree into a Graph 🟡 - continued

:::mint
<svg viewBox="0 0 470 124" role="img" aria-label="All nodes at distance 2 from target 5 in the tree 3 with children 5 and 1, 5 with children 6 and 2, 2 with children 7 and 4, 1 with children 0 and 8. From 5, level 1 is 6, 2 and the parent 3. Level 2 is 7, 4 and 1. The answer is 7, 4, 1; reaching 1 required going up through the parent." xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif">
  <style>
    .lb { font: 9px Consolas, monospace; fill: #1a1a1a; }
    .sm { font: 8px Georgia, serif; fill: #6b6b6b; }
    .n { fill: #ffffff; stroke: #1a1a1a; stroke-width: 1.1; }
    .t { fill: #ffedf1; stroke: #ef476e; stroke-width: 1.3; }
    .k { fill: #e2fcf3; stroke: #2d6a4f; stroke-width: 1.3; }
    .e { stroke: #1a1a1a; stroke-width: 1; }
    .up { stroke: #1d4e89; stroke-width: 1.2; stroke-dasharray: 3 2; fill: none; }
  </style>
  <defs><marker id="m1406" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="5" markerHeight="5" orient="auto"><path d="M0 0L10 5L0 10z" fill="#1d4e89"/></marker></defs>
  <circle class="n" cx="130" cy="16" r="10"/><text x="130" y="19" class="lb" text-anchor="middle">3</text>
  <line class="e" x1="122" y1="23" x2="84" y2="44"/><line class="e" x1="138" y1="23" x2="176" y2="44"/>
  <circle class="t" cx="78" cy="52" r="10"/><text x="78" y="55" class="lb" text-anchor="middle">5</text>
  <circle class="k" cx="182" cy="52" r="10"/><text x="182" y="55" class="lb" text-anchor="middle">1</text>
  <line class="e" x1="72" y1="60" x2="52" y2="80"/><line class="e" x1="84" y1="60" x2="104" y2="80"/>
  <line class="e" x1="176" y1="60" x2="162" y2="80"/><line class="e" x1="188" y1="60" x2="202" y2="80"/>
  <circle class="n" cx="48" cy="88" r="10"/><text x="48" y="91" class="lb" text-anchor="middle">6</text>
  <circle class="n" cx="108" cy="88" r="10"/><text x="108" y="91" class="lb" text-anchor="middle">2</text>
  <circle class="n" cx="158" cy="88" r="10"/><text x="158" y="91" class="lb" text-anchor="middle">0</text>
  <circle class="n" cx="206" cy="88" r="10"/><text x="206" y="91" class="lb" text-anchor="middle">8</text>
  <line class="e" x1="102" y1="96" x2="90" y2="110"/><line class="e" x1="114" y1="96" x2="126" y2="110"/>
  <circle class="k" cx="86" cy="114" r="9"/><text x="86" y="117" class="lb" text-anchor="middle">7</text>
  <circle class="k" cx="130" cy="114" r="9"/><text x="130" y="117" class="lb" text-anchor="middle">4</text>
  <path class="up" d="M 70 44 Q 90 10 120 12" marker-end="url(#m1406)"/>
  <text x="250" y="30" class="lb">target 5, k = 2</text>
  <text x="250" y="50" class="lb">level 1: 6, 2, 3 (parent)</text>
  <text x="250" y="66" class="lb">level 2: 7, 4, 1</text>
  <text x="250" y="90" class="sm">1 is reachable only by going</text>
  <text x="250" y="102" class="sm">up to 3 first: the parent edge</text>
</svg>
:::

```ts
// All Nodes Distance K in Binary Tree (LeetCode 863)
function distanceK(
  root: TreeNode, target: TreeNode, k: number
): number[] {
  const parent = new Map<TreeNode, TreeNode | null>();
  const link = (n: TreeNode | null, p: TreeNode | null) => {
    if (!n) return;
    parent.set(n, p); link(n.left, n); link(n.right, n);
  };
  link(root, null);
  const seen = new Set<TreeNode>([target]);
  let level: TreeNode[] = [target];
  // BFS, one level per step
  for (let d = 0; d < k && level.length; d++) {
    const next: TreeNode[] = [];
    for (const n of level)
      for (const m of [n.left, n.right, parent.get(n)!])
        if (m && !seen.has(m)) { seen.add(m); next.push(m); }
    level = next;
  }
  return level.map(n => n.val);
}
```
