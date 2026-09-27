LV1 = '<span class="lv lv1"></span>'
LV2 = '<span class="lv lv2"></span>'
DELETE = ['05-00', '05-01', '05-02', '05-03', '05-04', '05-05']
PAGES = [
('05-00', '05-00-matrix.md', '# Chapter 5 - Grids & Matrices\n\n## Matrix ' + LV1, [
 '- **What it is:** a 2-D array read as a *table*: cells found by index arithmetic, visited in an order the indices produce',
 '- **Signal:** a rule about rows, columns, diagonals, rings or sorted order; "in place", "rotate", "spiral", "reshape"; nothing about paths or regions',
 '- **Mechanism:** a diagonal is `r − c`, a ring is four boundaries, a sorted corner is one comparison. The order comes from the indices, not from the data',
], [
 '### The moves',
 '',
 '| Move | When to use | What it exploits |',
 '|---|---|---|',
 '| **05-01** | diagonals, boxes, one sorted list | one formula groups the cells |',
 '| **05-02** | spiral, rings, rotate | four boundaries shrink |',
 '| **05-03** | all cells change at once, in place | old and new share one cell |',
 '| **05-04** | rows and columns sorted apart | a corner drops a line |',
 '',
 '**Not a table:** island, region, fewest steps in four directions → a graph, 16-01. Moves only right or down, number of paths → a DP table, 17-02.',
 '',
 '### The skeleton',
 '',
 '```ts',
 'const dirs = [[0, 1], [1, 0], [0, -1], [-1, 0]];     // right, down, left, up',
 'for (const [dr, dc] of dirs) {',
 '  const nr = r + dr, nc = c + dc;',
 '  if (nr < 0 || nr >= R || nc < 0 || nc >= C) continue;  // off the grid',
 '  visit(nr, nc);',
 '}',
 'const k = r * C + c;                                  // flat index …',
 'const back = [Math.floor(k / C), k % C];              // … and back',
 '```',
 '',
 '### The trap',
 '',
 '- **"Minimum steps" on a grid is not automatically DP.** With four-way moves, cells depend on each other in cycles and no fill order exists: that is BFS (16-01). DP needs one-way moves, right and down',
], None, None),

('05-01', '05-01-coordinate-keys.md', '## Coordinate Keys ' + LV1, [
 '- **What:** one formula turns `(r, c)` into a key, and cells sharing a key belong together: a diagonal `r − c`, an anti-diagonal `r + c`, a box `⌊r/3⌋·3 + ⌊c/3⌋`, a flat index `r·C + c`',
 '- **Spot it:** cells grouped by diagonal or 3×3 box; "each row starts above the previous row\'s end"; "reshape", "shift the grid". Rows and columns sorted separately → 05-04',
 '- **Why:** along a diagonal both `r` and `c` grow by 1, so `r − c` is fixed. Once the key is a number, one pass with a map groups the cells; nothing walks a diagonal by hand',
], [
 '- **Watch out:** `r = ⌊k / cols⌋`, never `⌊k / rows⌋`. On a square matrix both agree, so the bug passes every square test and fails the first 2×3 one',
 '- **Also solves:** {LC 74} (binary search `k` over `m·n`; read `mat[⌊k/n⌋][k % n]`) · {LC 498} (group by `r + c`, reverse every other group) · {LC 36} (a set per row, column and box) · {LC 1260}',
], '05-01', '05-01'),

('05-02', '05-02-peel-the-layers.md', '## Peel the Layers ' + LV1, [
 '- **What:** treat the matrix as nested rings. Keep four boundaries; walk one side, then pull that boundary in',
 '- **Spot it:** spiral order, the boundary, "rotate each layer", a 90° turn in place. A zig-zag along diagonals → 05-01',
 '- **Why:** a walked side is never needed again, so moving its boundary removes it. Each walk shrinks the rectangle, and the loop ends when it is empty',
], [
 '- **Watch out:** drop the two `if` guards and a 3×1 matrix returns `[1, 2, 3, 2]`: the left walk reads the middle cell back. Re-check the rectangle after each side',
 '- **Also solves:** {LC 59} (write `1, 2, 3, …` instead of reading) · {LC 48} (transpose, then reverse each row; swap only where `c > r`)',
], '05-02', '05-02'),

('05-03', '05-03-state-in-the-cell.md', '## State in the Cell ' + LV2, [
 '- **What:** when each cell\'s new value depends on its neighbours\' *old* values and no copy is allowed, keep both in the cell: old in bit 0, new in bit 1. Read with `& 1`, finish with `>> 1`',
 '- **Spot it:** every cell changes "at the same moment" from its neighbours; a zero wipes its row and column; "in place". A change that spreads in rounds (rotting, infection) → 16-01',
 '- **Why:** bit 0 keeps the old grid intact while bit 1 builds the new one; one final pass shifts every cell',
], [
 '- **Watch out:** Set Matrix Zeroes keeps its flags in row 0 and column 0. Clear those *last*: zeroing row 0 first erases every column\'s marker and the whole matrix becomes 0',
 '- **Also solves:** {LC 73} (flags in row 0 and column 0, plus one boolean for column 0)',
], '05-03', '05-03'),

('05-04', '05-04-staircase-matrix-search.md', '## Staircase Search ' + LV1, [
 '- **What:** rows sorted left to right, columns top to bottom: start at the top-right. Too big, step left; too small, step down. Each comparison drops a row or a column',
 '- **Spot it:** rows and columns sorted *separately*; "count the cells ≤ x"; "the row with the most 1s". Each row starts above the previous row\'s end: one binary search → 05-01',
 '- **Why:** at the top-right, everything to the left is smaller and everything below is larger, so one comparison rules out a whole line: O(m + n)',
], [
 '- **Watch out:** starting at the top-left. Both moves increase the value, so a comparison never says which way to go. Only the top-right and bottom-left corners work',
 '- **Also solves:** {LC 1351} (start bottom-left; add `n − c`) · {LC 378} (the staircase counts cells ≤ x; binary search on x → 09-04)',
], '05-04', '05-04'),

('05-05', '05-05-grid-drills.md', '## Drills: Grids & Matrices ' + LV1, [
 'The most-asked problems for this chapter. Cover the right column and name the page first.',
 '',
 '| Problem | Page · the deciding fact |',
 '|---|---|',
 '| {LC 54} | 05-02 · four boundaries, guard single rows and columns |',
 '| {LC 48} | 05-02 · transpose, then reverse each row |',
 '| {LC 1886} | 05-02 · compare after each of four turns |',
 '| {LC 73} | 05-03 · flags in row 0 and column 0, cleared last |',
 '| {LC 289} | 05-03 · old state in bit 0, new in bit 1 |',
 '| {LC 240} | 05-04 · start top-right, drop a row or a column |',
 '| {LC 74} | 05-01 · one sorted list: `k → (⌊k/n⌋, k % n)` |',
 '| {LC 36} | 05-01 · box key `⌊r/3⌋·3 + ⌊c/3⌋` |',
 '| {LC 1329} | 05-01 · group by `r − c` |',
 '| {LC 766} | 05-01 · every cell equals its up-left neighbour |',
], [], None, None),
]
