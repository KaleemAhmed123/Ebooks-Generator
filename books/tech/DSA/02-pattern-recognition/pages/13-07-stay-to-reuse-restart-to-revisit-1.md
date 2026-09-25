## Stay to Reuse, Restart to Revisit <span class="lv lv2"></span>

- **What it is:** The start index passed to the next call encodes the rules. `go(i + 1)`: each item once, order ignored. `go(i)`: an item may be reused, order still ignored. `go(0)`: restart the loop from the beginning, so earlier items can come *after* later ones and different orders count as different answers
- **Signal:** "each number may be chosen an unlimited number of times" (stay), "different sequences are counted as different combinations" (restart), "you may visit a city more than once" (restart), coin change *combinations* vs *permutations*
- **Why it works:** Combinations are counted once each by forcing choices to appear in non-decreasing index order; the start index enforces that order. Removing the constraint (restarting at 0) lets every ordering through, which is what "sequences" and "routes that revisit" mean

:::mint
<svg viewBox="0 0 470 104" role="img" aria-label="Coins 1 and 2, amount 3. Staying at index i counts combinations: 1 plus 1 plus 1 and 1 plus 2, two ways. Restarting at 0 counts sequences: 1 1 1, 1 2, and 2 1, three ways. The only code difference is the start index of the next call." xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif">
  <style>
    .lb { font: 10px Consolas, monospace; fill: #1a1a1a; }
    .sm { font: 8px Georgia, serif; fill: #6b6b6b; }
    .a { fill: #e2fcf3; stroke: #2d6a4f; stroke-width: 1.1; }
    .b { fill: #dbe7f5; stroke: #1d4e89; stroke-width: 1.1; }
  </style>
  <text x="20" y="18" class="sm">coins [1, 2], amount 3</text>
  <rect class="a" x="20" y="26" width="200" height="66" rx="4"/>
  <text x="30" y="42" class="lb">go(i): stay, reuse allowed</text>
  <text x="30" y="60" class="lb">1+1+1, 1+2</text>
  <text x="30" y="80" class="lb">→ 2 combinations</text>
  <rect class="b" x="240" y="26" width="210" height="66" rx="4"/>
  <text x="250" y="42" class="lb">go(0): restart, order counts</text>
  <text x="250" y="60" class="lb">1+1+1, 1+2, 2+1</text>
  <text x="250" y="80" class="lb">→ 3 sequences</text>
</svg>
:::
