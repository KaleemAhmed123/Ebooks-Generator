## Name the DP Shape <span class="lv lv1"></span> - continued

:::mint
<svg viewBox="0 0 470 92" role="img" aria-label="The constraint on n picks the DP signature. n up to 20: f of mask, a subset of a small set, O of 2 to the n times n, Module 06. n up to 500: f of i and j over one range, trying each split, O of n cubed, page 17-05. n up to 5000: f of i and j with one index per string, O of n squared, Module 06, 03-01. n up to 10 to the 5: f of i plus binary search or a holding state, O of n log n or O of n, pages 17-03 and 17-04." xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif">
  <style>
    .lb { font: bold 10px Consolas, monospace; fill: #1d4e89; }
    .nn { font: 9.5px Consolas, monospace; fill: #1a1a1a; }
    .sm { font: 8px Georgia, serif; fill: #6b6b6b; }
    .ax { stroke: #1a1a1a; stroke-width: 1.2; }
    .t { stroke: #1a1a1a; stroke-width: 1; }
  </style>
  <defs><marker id="m1702" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="5" markerHeight="5" orient="auto"><path d="M0 0L10 5L0 10z" fill="#1a1a1a"/></marker></defs>
  <line class="ax" x1="8" y1="55" x2="462" y2="55" marker-end="url(#m1702)"/>
  <text x="60" y="16" class="lb" text-anchor="middle">f(mask)</text>
  <text x="60" y="28" class="sm" text-anchor="middle">a subset of a small set</text>
  <text x="60" y="40" class="sm" text-anchor="middle">O(2ⁿ · n)</text>
  <line class="t" x1="60" y1="50" x2="60" y2="60"/>
  <text x="60" y="74" class="nn" text-anchor="middle">n ≤ 20</text>
  <text x="60" y="86" class="sm" text-anchor="middle">Module 06</text>
  <text x="170" y="16" class="lb" text-anchor="middle">f(i, j)</text>
  <text x="170" y="28" class="sm" text-anchor="middle">one range, try each split</text>
  <text x="170" y="40" class="sm" text-anchor="middle">O(n³)</text>
  <line class="t" x1="170" y1="50" x2="170" y2="60"/>
  <text x="170" y="74" class="nn" text-anchor="middle">n ≤ 500</text>
  <text x="170" y="86" class="sm" text-anchor="middle">17-05</text>
  <text x="285" y="16" class="lb" text-anchor="middle">f(i, j)</text>
  <text x="285" y="28" class="sm" text-anchor="middle">one index per string</text>
  <text x="285" y="40" class="sm" text-anchor="middle">O(n²)</text>
  <line class="t" x1="285" y1="50" x2="285" y2="60"/>
  <text x="285" y="74" class="nn" text-anchor="middle">n ≤ 5000</text>
  <text x="285" y="86" class="sm" text-anchor="middle">Module 06, 03-01</text>
  <text x="400" y="16" class="lb" text-anchor="middle">f(i)</text>
  <text x="400" y="28" class="sm" text-anchor="middle">+ binary search or holding</text>
  <text x="400" y="40" class="sm" text-anchor="middle">O(n log n) or O(n)</text>
  <line class="t" x1="400" y1="50" x2="400" y2="60"/>
  <text x="400" y="74" class="nn" text-anchor="middle">n ≤ 10⁵</text>
  <text x="400" y="86" class="sm" text-anchor="middle">17-03, 17-04</text>
</svg>
:::

| Common tag | Signature | Read |
|---|---|---|
| Max sum, non-adjacent | `f(i)`: take i and jump to i + 2, or skip | Module 06, 02-02 |
| Grid DP | `f(r, c)`: only right/down moves | Module 06, 04-03 to 04-05 |
| Knapsack 0/1 and 0/N | `f(i, cap)`: 0/1 moves to i + 1 after a pick; 0/N stays at i | Module 06, 03-03, 03-04 |
| Binary search + pick/skip | `f(i)` over items sorted by start; a pick jumps to the next compatible index | 17-03 |
| Stocks | `f(i, holding, k)` | 17-04 |
| String DP | `f(i, j)` over two strings | Module 06, 03-01, 03-02 |
| LIS | `f(i)` = best chain ending at i, or patience sorting | Module 06, 02-04 |
| Partition DP | `f(i, j)`, loop the cut k inside | 17-05 |
| Digit DP | `f(pos, tight, …)` | Module 06, 05-03 |
| Game strategy | `f(i, j)` = score lead of the player to move | 17-06 |

### The failure

- **Choosing the table before the signature.** A 2-D table sized `n × n` for a problem whose recursion only needs `f(i, cap)` wastes memory and hides the transition. Write the recursive signature first; the table is its memo
