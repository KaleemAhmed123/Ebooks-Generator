## Place, Check, Undo 🟡

- **What it is:** Constraint puzzles fill one decision point at a time (a row, a cell, a vertex, a bucket). At each point, try every option, **check** it against O(1) bookkeeping, **place** it by updating the bookkeeping, recurse, then **undo** exactly what you placed
- **Signal:** "N-Queens", "solve the Sudoku", "colour the graph with at most m colours", "partition into k subsets with equal sum", "use all matchsticks to form a square", "knight's tour"
- **Why it works:** Each decision point narrows the rest, and a conflict found early kills a whole subtree. The speed comes from the check: keeping sets of used columns and diagonals (or row/column/box digits) makes each test O(1) instead of rescanning the board. Undo restores the bookkeeping so siblings see a clean state

:::mint
<svg viewBox="0 0 470 124" role="img" aria-label="4 queens. One queen per row. A cell r, c is attacked if column c, diagonal r minus c, or anti-diagonal r plus c is already used. Sets for columns, diagonals and anti-diagonals make each check constant time. A solution: queens at columns 1, 3, 0, 2." xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif">
  <style>
    .lb { font: 9.5px Consolas, monospace; fill: #1a1a1a; }
    .sm { font: 8px Georgia, serif; fill: #6b6b6b; }
    .w { fill: #ffffff; stroke: #1a1a1a; stroke-width: 1; }
    .d { fill: #f0f0f0; stroke: #1a1a1a; stroke-width: 1; }
    .q { fill: #1d4e89; }
  </style>
  <rect class="w" x="20" y="12" width="24" height="24"/><rect class="d" x="44" y="12" width="24" height="24"/><rect class="w" x="68" y="12" width="24" height="24"/><rect class="d" x="92" y="12" width="24" height="24"/>
  <rect class="d" x="20" y="36" width="24" height="24"/><rect class="w" x="44" y="36" width="24" height="24"/><rect class="d" x="68" y="36" width="24" height="24"/><rect class="w" x="92" y="36" width="24" height="24"/>
  <rect class="w" x="20" y="60" width="24" height="24"/><rect class="d" x="44" y="60" width="24" height="24"/><rect class="w" x="68" y="60" width="24" height="24"/><rect class="d" x="92" y="60" width="24" height="24"/>
  <rect class="d" x="20" y="84" width="24" height="24"/><rect class="w" x="44" y="84" width="24" height="24"/><rect class="d" x="68" y="84" width="24" height="24"/><rect class="w" x="92" y="84" width="24" height="24"/>
  <circle class="q" cx="56" cy="24" r="7"/><circle class="q" cx="104" cy="48" r="7"/><circle class="q" cx="32" cy="72" r="7"/><circle class="q" cx="80" cy="96" r="7"/>
  <text x="150" y="28" class="lb">safe(r, c) ⇔ c ∉ cols</text>
  <text x="150" y="44" class="lb">           ∧ r − c ∉ diag</text>
  <text x="150" y="60" class="lb">           ∧ r + c ∉ anti</text>
  <text x="150" y="84" class="sm">place: add to all three sets → recurse on r + 1</text>
  <text x="150" y="98" class="sm">undo: delete from all three sets</text>
  <text x="150" y="116" class="sm">keys from page 05-01: a diagonal is r − c, an anti-diagonal r + c</text>
</svg>
:::
