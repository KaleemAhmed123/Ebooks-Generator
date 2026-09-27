## State in the Cell <span class="lv lv2"></span>

- **What it is:** When every cell's new value depends on its neighbours' *old* values, and a copy of the grid is not allowed, store both values in the cell: the old one in bit 0, the new one in bit 1. Read with `& 1`, finish with `>> 1`
- **Signal:** every cell changes "simultaneously" from its neighbours' old values, or a zero wipes its row and column, with "in place" or O(1) extra space
- **Not this page if:** a change spreads outward in rounds (rotting, infection, distance to the nearest cell): each cell reads its neighbours' *new* values → 16-01 (multi-source BFS)
- **Why it works:** The update is a function of the old grid. Writing new values directly would let later cells read already-updated neighbours. Bit 0 keeps the old grid intact while bit 1 accumulates the new one; a final pass shifts every cell once. The same idea shows up as "use the first row and column as markers" when the extra state is one flag per row and per column

:::mint
<svg viewBox="0 0 470 100" role="img" aria-label="Game of Life encoding. A cell value has two bits: bit 0 is the old state, bit 1 is the new state. 0 means dead stays dead, 1 means alive dies, 2 means dead becomes alive, 3 means alive stays alive. Neighbours are counted with value and 1, and the final pass shifts right by one." xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif">
  <style>
    .lb { font: 10px Consolas, monospace; fill: #1a1a1a; }
    .sm { font: 8px Georgia, serif; fill: #6b6b6b; }
    .c { fill: #ffffff; stroke: #1a1a1a; stroke-width: 1.1; }
    .hi { fill: #e2fcf3; stroke: #2d6a4f; stroke-width: 1.1; }
  </style>
  <text x="20" y="20" class="sm">cell value = (new ≪ 1) | old</text>
  <rect class="c" x="20" y="30" width="96" height="22"/><text x="68" y="45" class="lb" text-anchor="middle">0 = 00 dead→dead</text>
  <rect class="c" x="120" y="30" width="96" height="22"/><text x="168" y="45" class="lb" text-anchor="middle">1 = 01 live→dead</text>
  <rect class="hi" x="220" y="30" width="96" height="22"/><text x="268" y="45" class="lb" text-anchor="middle">2 = 10 dead→live</text>
  <rect class="hi" x="320" y="30" width="96" height="22"/><text x="368" y="45" class="lb" text-anchor="middle">3 = 11 live→live</text>
  <text x="20" y="74" class="lb">pass 1: read neighbours with  v &amp; 1   (old state only)</text>
  <text x="20" y="90" class="lb">pass 2: every cell  v &gt;&gt;= 1          (new state wins)</text>
</svg>
:::
