## Name the DP Shape 🟢

- **What it is:** Every DP problem is named by the arguments of its recursion. Before writing a transition, write the signature: `f(i)`, `f(i, cap)`, `f(i, j)` over two strings, `f(i, j)` over one range, `f(i, holding)`, `f(mask)`. The signature decides the table, the loop order and the pages to reread
- **Signal:** "maximum / minimum / number of ways" plus a choice at each step, and a brute-force recursion whose calls repeat
- **Why it works:** The arguments are exactly what the future needs to know about the past (Module 06, 01-03). Problems with the same signature share a loop skeleton; only the transition line changes

:::mint
<svg viewBox="0 0 470 150" role="img" aria-label="Six DP signatures as cards. f of i: one choice per element, such as house robber, LIS, word break. f of i and cap: element plus remaining budget, knapsack and coin change. f of i and j over two strings: LCS and edit distance. f of i and j over one range: try every split, matrix chain and burst balloons, plus games. f of i and holding: a state machine, stocks. f of mask: bitmask over a small set, TSP and assignment." xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif">
  <style>
    .lb { font: bold 10px Consolas, monospace; fill: #1d4e89; }
    .sm { font: 8.5px Georgia, serif; fill: #1a1a1a; }
    .bx { fill: #ffffff; stroke: #1a1a1a; stroke-width: 1; }
    .hi { fill: #e2fcf3; stroke: #2d6a4f; stroke-width: 1.2; }
  </style>
  <rect class="bx" x="6" y="6" width="148" height="64" rx="5"/>
  <text x="16" y="24" class="lb">f(i)</text><text x="16" y="40" class="sm">one choice per element</text><text x="16" y="56" class="sm">robber · LIS · word break</text>
  <rect class="bx" x="161" y="6" width="148" height="64" rx="5"/>
  <text x="171" y="24" class="lb">f(i, cap)</text><text x="171" y="40" class="sm">element + budget left</text><text x="171" y="56" class="sm">knapsack · coin change</text>
  <rect class="bx" x="316" y="6" width="148" height="64" rx="5"/>
  <text x="326" y="24" class="lb">f(i, j) two strings</text><text x="326" y="40" class="sm">a prefix of each</text><text x="326" y="56" class="sm">LCS · edit distance</text>
  <rect class="hi" x="6" y="80" width="148" height="64" rx="5"/>
  <text x="16" y="98" class="lb">f(i, j) one range</text><text x="16" y="114" class="sm">try every split (17-05)</text><text x="16" y="130" class="sm">or whose turn (17-06)</text>
  <rect class="hi" x="161" y="80" width="148" height="64" rx="5"/>
  <text x="171" y="98" class="lb">f(i, holding)</text><text x="171" y="114" class="sm">a state machine (17-04)</text><text x="171" y="130" class="sm">stocks · cooldown</text>
  <rect class="bx" x="316" y="80" width="148" height="64" rx="5"/>
  <text x="326" y="98" class="lb">f(mask)</text><text x="326" y="114" class="sm">subset of ≤ 20 items</text><text x="326" y="130" class="sm">TSP · assignment</text>
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
