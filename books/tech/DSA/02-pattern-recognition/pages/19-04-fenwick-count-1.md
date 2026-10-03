## Fenwick for Counting <span class="lv lv2"></span>

- **What:** a Fenwick tree (binary indexed tree) stores sums in an array where index `i` is responsible for the block of `i & -i` cells ending at `i`. Both `add` and prefix-`sum` walk O(log n) indices by flipping the lowest set bit. Its killer use: **count elements seen so far below a value** while they stream in
- **Spot it:** "how many smaller / to the right", "count inversions", "range count after each insert". The overview and the class are on 19-01; this is the pattern it powers
- **Why:** inserting value v is `add(rank(v), 1)`; "how many already below v" is `sum(rank(v) − 1)`. Each is one O(log n) walk, so n elements processed left or right give O(n log n) — far under the O(n²) of comparing every pair

:::mint
<svg viewBox="0 0 470 150" role="img" aria-label="A Fenwick array of 8 slots. Index 4 covers the block of indices 1 to 4 because 4 and minus 4 is 4. Index 6 covers 5 to 6. Index 8 covers 1 to 8. A prefix sum to 7 adds slots 7, 6, 4 by stripping the lowest set bit: 7 to 6 to 4 to 0. An add at 5 bubbles up through 5, 6, 8." xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif">
  <style>
    .cell { fill: #ffffff; stroke: #1a1a1a; stroke-width: 1; }
    .sumh { fill: #e2fcf3; stroke: #2d6a4f; stroke-width: 1.4; }
    .lb { font: 9px Consolas, monospace; fill: #1a1a1a; }
    .sm { font: 8px Georgia, serif; fill: #6b6b6b; }
    .cov { stroke: #1d4e89; stroke-width: 1.1; }
  </style>
  <text x="10" y="40" class="sm">index</text>
  <!-- 8 cells -->
  <g>
    <rect class="cell" x="50" y="30" width="40" height="22"/><text x="70" y="45" class="lb" text-anchor="middle">1</text>
    <rect class="cell" x="90" y="30" width="40" height="22"/><text x="110" y="45" class="lb" text-anchor="middle">2</text>
    <rect class="cell" x="130" y="30" width="40" height="22"/><text x="150" y="45" class="lb" text-anchor="middle">3</text>
    <rect class="sumh" x="170" y="30" width="40" height="22"/><text x="190" y="45" class="lb" text-anchor="middle">4</text>
    <rect class="cell" x="210" y="30" width="40" height="22"/><text x="230" y="45" class="lb" text-anchor="middle">5</text>
    <rect class="sumh" x="250" y="30" width="40" height="22"/><text x="270" y="45" class="lb" text-anchor="middle">6</text>
    <rect class="sumh" x="290" y="30" width="40" height="22"/><text x="310" y="45" class="lb" text-anchor="middle">7</text>
    <rect class="cell" x="330" y="30" width="40" height="22"/><text x="350" y="45" class="lb" text-anchor="middle">8</text>
  </g>
  <!-- coverage brackets -->
  <line class="cov" x1="52" y1="62" x2="208" y2="62"/><text x="130" y="74" class="sm" text-anchor="middle">idx 4 covers 1..4</text>
  <line class="cov" x1="212" y1="86" x2="288" y2="86"/><text x="250" y="98" class="sm" text-anchor="middle">idx 6 covers 5..6</text>
  <line class="cov" x1="52" y1="110" x2="368" y2="110"/><text x="210" y="122" class="sm" text-anchor="middle">idx 8 covers 1..8</text>
  <text x="50" y="142" class="sm">sum(7): 7 → 6 → 4 → 0   (strip lowest bit)    add(5): 5 → 6 → 8   (add lowest bit)</text>
</svg>
:::
