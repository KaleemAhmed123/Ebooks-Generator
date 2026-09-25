# Chapter 14 - Trees

## Which Way Does Information Flow? <span class="lv lv1"></span>

- **What it is:** Almost every binary-tree problem is decided by one question: does the answer at a node need information from **above** it (its ancestors), from **below** it (its subtrees), from **beside** it (its level), or from **anywhere** (distance to other nodes)? The answer picks the traversal and the function's signature
- **The signal:** "root-to-leaf path", "valid range", "good nodes" (above); "height", "diameter", "balanced", "subtree sum" (below); "left view", "zig-zag", "width" (beside); "nodes at distance k", "burn the tree", "distance between two nodes" (anywhere)
- **The mechanism:** Information from above travels as **parameters** of the recursive call. Information from below travels as **return values**, available in post-order. Information across a level needs a **queue**. Information in all directions needs **parent pointers**, which turn the tree into an undirected graph

:::mint
<svg viewBox="0 0 470 124" role="img" aria-label="Four directions of information in a tree. Down: pass values as parameters, as in carrying a range or a path sum. Up: return values from children in post-order, as in height and diameter. Across: a queue per level, as in views and zig-zag. Anywhere: add parent pointers and search the tree as a graph, as in nodes at distance k." xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif">
  <style>
    .lb { font: 9.5px Consolas, monospace; fill: #1a1a1a; }
    .sm { font: 8px Georgia, serif; fill: #6b6b6b; }
    .n { fill: #ffffff; stroke: #1a1a1a; stroke-width: 1.1; }
    .e { stroke: #1a1a1a; stroke-width: 1; }
    .a { stroke: #1d4e89; stroke-width: 1.4; fill: none; }
  </style>
  <defs><marker id="m1401" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="5" markerHeight="5" orient="auto"><path d="M0 0L10 5L0 10z" fill="#1d4e89"/></marker></defs>
  <circle class="n" cx="90" cy="20" r="10"/><circle class="n" cx="50" cy="62" r="10"/><circle class="n" cx="130" cy="62" r="10"/><circle class="n" cx="30" cy="104" r="10"/><circle class="n" cx="70" cy="104" r="10"/>
  <line class="e" x1="84" y1="28" x2="56" y2="54"/><line class="e" x1="96" y1="28" x2="124" y2="54"/><line class="e" x1="46" y1="72" x2="34" y2="95"/><line class="e" x1="54" y1="72" x2="66" y2="95"/>
  <path class="a" d="M 150 18 L 150 58" marker-end="url(#m1401)"/><text x="156" y="40" class="sm">down</text>
  <text x="200" y="22" class="lb">down     parameters (range, path so far)</text>
  <text x="200" y="44" class="lb">up       return values, post-order</text>
  <text x="200" y="66" class="lb">across   queue, one level at a time</text>
  <text x="200" y="88" class="lb">anywhere parent map → graph search</text>
  <text x="200" y="110" class="sm">pick the direction first; the traversal follows from it</text>
</svg>
:::
