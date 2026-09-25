## Stack the Rows <span class="lv lv2"></span>

- **What it is:** A 2-D "largest rectangle of 1s" problem is a 1-D histogram problem asked once per row. Let `h[c]` be the number of consecutive 1s ending at the current row in column `c`; the best rectangle whose bottom edge is this row is the largest rectangle in the histogram `h`
- **Signal:** "maximal rectangle containing only 1s", "largest rectangle in a histogram", "max area rectangle in a binary matrix"
- **Why it works:** Every rectangle has a bottom row. Fixing the bottom row, a rectangle of 1s spanning columns `[l, r]` can be as tall as the shortest `h` in that span. So each row reduces to "largest `min(h[l..r]) · width`", which a monotonic stack answers in O(cols): each bar's rectangle stretches until the first shorter bar on each side (page 10-08's reach)

:::mint
<svg viewBox="0 0 470 118" role="img" aria-label="Binary matrix rows 1 0 1 0 0, 1 0 1 1 1, 1 1 1 1 1, 1 0 0 1 0. At the third row the column heights are 3, 1, 3, 2, 2. The largest rectangle in that histogram has height 2 and width 3 over the last three columns, area 6, which is the answer." xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif">
  <style>
    .lb { font: 9.5px Consolas, monospace; fill: #1a1a1a; }
    .sm { font: 8px Georgia, serif; fill: #6b6b6b; }
    .bar { fill: #1a1a1a; }
    .win { fill: #e2fcf3; stroke: #2d6a4f; stroke-width: 1.4; }
  </style>
  <text x="20" y="20" class="lb">1 0 1 0 0</text>
  <text x="20" y="34" class="lb">1 0 1 1 1</text>
  <text x="20" y="48" class="lb" fill="#1d4e89">1 1 1 1 1   ← bottom row</text>
  <text x="20" y="62" class="lb">1 0 0 1 0</text>
  <text x="20" y="84" class="sm">heights at row 3: 3 1 3 2 2</text>
  <rect class="win" x="298" y="58" width="96" height="44"/>
  <rect class="bar" x="236" y="36" width="28" height="66"/>
  <rect class="bar" x="268" y="80" width="28" height="22" opacity="0.8"/>
  <rect class="bar" x="300" y="36" width="28" height="66" opacity="0.8"/>
  <rect class="bar" x="332" y="58" width="28" height="44" opacity="0.8"/>
  <rect class="bar" x="364" y="58" width="28" height="44" opacity="0.8"/>
  <text x="250" y="114" class="sm" text-anchor="middle">3</text><text x="282" y="114" class="sm" text-anchor="middle">1</text><text x="314" y="114" class="sm" text-anchor="middle">3</text><text x="346" y="114" class="sm" text-anchor="middle">2</text><text x="378" y="114" class="sm" text-anchor="middle">2</text>
  <text x="300" y="30" class="lb" fill="#2d6a4f">height 2 × width 3 = 6</text>
</svg>
:::
