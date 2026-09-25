## Give Every Node a Coordinate <span class="lv lv2"></span>

- **What it is:** Assign each node a position: the root is `(row 0, col 0)`, a left child is `(row + 1, col − 1)`, a right child `(row + 1, col + 1)`. "Views" and "vertical orders" become grouping and sorting by those numbers, the same move as coordinate keys on a grid (page 05-01)
- **Signal:** "vertical order traversal", "top view", "bottom view", "diagonal traversal", "nodes that share a column", "what is visible from above"
- **Why it works:** Looking at a tree from above or below means projecting every node onto the horizontal axis; its column is that projection. Within one column, the row says who is in front. Once every node carries `(col, row)`, the tree shape no longer matters: a map from column to nodes, plus a tie-breaking rule, answers the question

:::mint
<svg viewBox="0 0 470 124" role="img" aria-label="Vertical order traversal of 3 with children 9 and 20, and 20 with children 15 and 7. Columns: 9 at column minus 1; 3 and 15 at column 0; 20 at column 1; 7 at column 2. Output columns left to right: 9, then 3 15, then 20, then 7. The top view is 9, 3, 20, 7 and the bottom view is 9, 15, 20, 7." xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif">
  <style>
    .lb { font: 9.5px Consolas, monospace; fill: #1a1a1a; }
    .sm { font: 8px Georgia, serif; fill: #6b6b6b; }
    .n { fill: #ffffff; stroke: #1a1a1a; stroke-width: 1.1; }
    .e { stroke: #1a1a1a; stroke-width: 1; }
    .col { stroke: #1d4e89; stroke-width: 1; stroke-dasharray: 2 3; }
  </style>
  <line class="col" x1="60" y1="6" x2="60" y2="110"/><line class="col" x1="110" y1="6" x2="110" y2="110"/><line class="col" x1="160" y1="6" x2="160" y2="110"/><line class="col" x1="210" y1="6" x2="210" y2="110"/>
  <text x="60" y="120" class="sm" text-anchor="middle">−1</text><text x="110" y="120" class="sm" text-anchor="middle">0</text><text x="160" y="120" class="sm" text-anchor="middle">1</text><text x="210" y="120" class="sm" text-anchor="middle">2</text>
  <circle class="n" cx="110" cy="20" r="11"/><text x="110" y="24" class="lb" text-anchor="middle">3</text>
  <line class="e" x1="102" y1="28" x2="68" y2="50"/><line class="e" x1="118" y1="28" x2="152" y2="50"/>
  <circle class="n" cx="60" cy="58" r="11"/><text x="60" y="62" class="lb" text-anchor="middle">9</text>
  <circle class="n" cx="160" cy="58" r="11"/><text x="160" y="62" class="lb" text-anchor="middle">20</text>
  <line class="e" x1="152" y1="66" x2="118" y2="88"/><line class="e" x1="168" y1="66" x2="202" y2="88"/>
  <circle class="n" cx="110" cy="96" r="11"/><text x="110" y="100" class="lb" text-anchor="middle">15</text>
  <circle class="n" cx="210" cy="96" r="11"/><text x="210" y="100" class="lb" text-anchor="middle">7</text>
  <text x="250" y="30" class="lb">vertical: [9] [3,15] [20] [7]</text>
  <text x="250" y="52" class="lb">top view:    9 3 20 7</text>
  <text x="250" y="68" class="sm">(smallest row per column)</text>
  <text x="250" y="90" class="lb">bottom view: 9 15 20 7</text>
  <text x="250" y="106" class="sm">(largest row per column)</text>
</svg>
:::
