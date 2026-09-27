# Chapter 14 - Trees

## Which Way Does Information Flow? <span class="lv lv1"></span>

- **What it is:** Almost every binary-tree problem is decided by one question: does the answer at a node need information from **above** it (its ancestors), from **below** it (its subtrees), from **beside** it (its level), or from **anywhere** (distance to other nodes)? The answer picks the traversal and the function's signature
- **Signal:** "root-to-leaf path", "valid range", "good nodes" (above); "height", "diameter", "balanced", "subtree sum" (below); "left view", "zig-zag", "width" (beside); "nodes at distance k", "burn the tree", "distance between two nodes" (anywhere)
- **Why it works:** A recursive call sees only what its caller passed in and what its children return. Anything else needs a structure built for it: a queue that holds one level, or a parent map that lets a walk go up. Name the direction first and the signature follows

:::mint
<svg viewBox="0 0 470 168" role="img" aria-label="One seven-node tree with four overlays. A blue arrow runs down beside the edge from the root to its left child, labelled go of child and max, down, LeetCode 1448. A green arrow runs up beside the edge from the rightmost leaf to its parent, labelled return h, up, LeetCode 543. An amber band covers the four leaves, labelled queue holds one level, across, LeetCode 199. Red dashed arrows run from a leaf to its parent and from that parent to the root, labelled parent map, anywhere, LeetCode 863." xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif">
  <style>
    .lb { font: 9.5px Consolas, monospace; }
    .sm { font: 8px Georgia, serif; }
    .n { fill: #ffffff; stroke: #1a1a1a; stroke-width: 1.1; }
    .e { stroke: #1a1a1a; stroke-width: 1; }
    .dn { stroke: #1d4e89; stroke-width: 1.6; fill: none; }
    .up { stroke: #2d6a4f; stroke-width: 1.6; fill: none; }
    .pm { stroke: #ef476e; stroke-width: 1.3; fill: none; stroke-dasharray: 4 3; }
    .band { fill: #fdf3dc; stroke: #b7791f; stroke-width: 1; }
  </style>
  <defs>
    <marker id="a1401" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="5" markerHeight="5" orient="auto"><path d="M0 0L10 5L0 10z" fill="#1d4e89"/></marker>
    <marker id="b1401" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="5" markerHeight="5" orient="auto"><path d="M0 0L10 5L0 10z" fill="#2d6a4f"/></marker>
    <marker id="c1401" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="5" markerHeight="5" orient="auto"><path d="M0 0L10 5L0 10z" fill="#ef476e"/></marker>
  </defs>
  <rect class="band" x="126" y="104" width="218" height="28" rx="14"/>
  <line class="e" x1="235" y1="22" x2="175" y2="70"/><line class="e" x1="235" y1="22" x2="295" y2="70"/>
  <line class="e" x1="175" y1="70" x2="145" y2="118"/><line class="e" x1="175" y1="70" x2="205" y2="118"/>
  <line class="e" x1="295" y1="70" x2="265" y2="118"/><line class="e" x1="295" y1="70" x2="325" y2="118"/>
  <circle class="n" cx="235" cy="22" r="10"/><circle class="n" cx="175" cy="70" r="10"/><circle class="n" cx="295" cy="70" r="10"/>
  <circle class="n" cx="145" cy="118" r="10"/><circle class="n" cx="205" cy="118" r="10"/><circle class="n" cx="265" cy="118" r="10"/><circle class="n" cx="325" cy="118" r="10"/>
  <path class="dn" d="M 216 21 L 180 50" marker-end="url(#a1401)"/>
  <path class="up" d="M 338 106 L 319 76" marker-end="url(#b1401)"/>
  <path class="pm" d="M 215 110 Q 212 86 188 76" marker-end="url(#c1401)"/>
  <path class="pm" d="M 188 64 Q 214 58 226 34" marker-end="url(#c1401)"/>
  <text x="20" y="24" class="lb" fill="#1d4e89">go(child, max)</text>
  <text x="20" y="36" class="sm" fill="#1d4e89">down · LeetCode 1448</text>
  <text x="20" y="84" class="lb" fill="#ef476e">parent map</text>
  <text x="20" y="96" class="sm" fill="#ef476e">anywhere · LeetCode 863</text>
  <text x="352" y="84" class="lb" fill="#2d6a4f">return h</text>
  <text x="352" y="96" class="sm" fill="#2d6a4f">up · LeetCode 543</text>
  <text x="235" y="150" class="lb" fill="#b7791f" text-anchor="middle">queue holds one level</text>
  <text x="235" y="162" class="sm" fill="#b7791f" text-anchor="middle">across · LeetCode 199</text>
</svg>
:::
