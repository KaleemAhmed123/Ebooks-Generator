# Module 3 - Indexes and query plans

## What an index is

- Without an index, finding every order for one seller means reading every row in the table and discarding almost all of them
- That is a **sequential scan**. It is fine at a thousand rows and fatal at ten million
- An **index** is a second structure holding just the column you search by, kept in sorted order, with a pointer back to the row
- Sorted order is the whole trick. It lets the database halve the search space at every step instead of walking the table
- Ten million rows becomes about 23 steps, which is the difference between a millisecond and thirty seconds
- The structure is a **B-tree**, a shallow tree where every leaf sits the same distance from the root, so every lookup costs the same

:::mint
<svg viewBox="0 0 470 150" xmlns="http://www.w3.org/2000/svg" role="img">
  <style>
    .n { fill: #ffffff; stroke: #1a1a1a; stroke-width: 1.1; }
    .t { font: 8px Consolas, monospace; fill: #1a1a1a; }
    .s { font: 7.5px Georgia, serif; fill: #4a4a4a; }
    .a { stroke: #1a1a1a; stroke-width: 1; fill: none; }
    .hot { stroke: #ef476e; stroke-width: 1.6; fill: none; }
    .hl { font: bold 7.5px Consolas, monospace; fill: #ef476e; }
  </style>
  <rect class="n" x="196" y="10" width="78" height="20" rx="3"/>
  <text x="235" y="24" class="t" text-anchor="middle">m | s</text>

  <rect class="n" x="60" y="58" width="76" height="20" rx="3"/>
  <text x="98" y="72" class="t" text-anchor="middle">d | h</text>
  <rect class="n" x="196" y="58" width="76" height="20" rx="3"/>
  <text x="234" y="72" class="t" text-anchor="middle">o | q</text>
  <rect class="n" x="332" y="58" width="76" height="20" rx="3"/>
  <text x="370" y="72" class="t" text-anchor="middle">u | x</text>

  <rect class="n" x="14"  y="106" width="60" height="20" rx="3"/>
  <text x="44" y="120" class="t" text-anchor="middle">a b c</text>
  <rect class="n" x="86"  y="106" width="60" height="20" rx="3"/>
  <text x="116" y="120" class="t" text-anchor="middle">e f g</text>
  <rect class="n" x="158" y="106" width="60" height="20" rx="3"/>
  <text x="188" y="120" class="t" text-anchor="middle">i j k</text>
  <rect class="n" x="230" y="106" width="60" height="20" rx="3"/>
  <text x="260" y="120" class="t" text-anchor="middle">p</text>
  <rect class="n" x="302" y="106" width="60" height="20" rx="3"/>
  <text x="332" y="120" class="t" text-anchor="middle">r s t</text>
  <rect class="n" x="374" y="106" width="60" height="20" rx="3"/>
  <text x="404" y="120" class="t" text-anchor="middle">v w</text>

  <line class="a" x1="215" y1="30" x2="98"  y2="56"/>
  <line class="a" x1="245" y1="30" x2="370" y2="56"/>
  <line class="hot" x1="235" y1="30" x2="234" y2="56"/>
  <line class="a" x1="214" y1="78" x2="188" y2="104"/>
  <line class="hot" x1="250" y1="78" x2="260" y2="104"/>
  <line class="a" x1="98" y1="78" x2="44" y2="104"/>
  <line class="a" x1="112" y1="78" x2="116" y2="104"/>
  <line class="a" x1="360" y1="78" x2="332" y2="104"/>
  <line class="a" x1="384" y1="78" x2="404" y2="104"/>

  <text x="24" y="24" class="hl">looking for p</text>
  <text x="24" y="36" class="s">three reads, not ten million</text>
  <text x="235" y="146" class="s" text-anchor="middle">every leaf sits at the same depth, so every lookup costs the same</text>
</svg>
:::

- The cost is that every insert, update and delete must maintain the index too, so an index is never free
