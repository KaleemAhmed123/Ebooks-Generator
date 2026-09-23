## Constraints are fingerprints

- Every competitive-programming problem and every interview question gives you the input size. That number is not decoration — it tells you which algorithms can finish in time
- A modern judge executes roughly **10⁸ operations per second**. If the time limit is 1 second and n = 10⁵, an O(n²) solution runs 10¹⁰ operations. It will not pass. O(n log n) runs ~1.7 × 10⁶. It will
- Reading the constraint before reading the problem is the single fastest way to narrow the search

:::mint
<svg viewBox="0 0 470 168" role="img" aria-label="Constraint ranges mapped to algorithm families: n ≤ 20 maps to bitmask, n ≤ 5000 to O(n²), n ≤ 10⁵ to O(n log n), and so on" xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif">
  <style>
    .lb { font: 9px Consolas, monospace; fill: #1a1a1a; }
    .sm { font: 7.5px Georgia, serif; fill: #6b6b6b; }
    .bx { fill: #ffffff; stroke: #1a1a1a; stroke-width: 1.1; }
    .hi { fill: #e2fcf3; stroke: #2d6a4f; stroke-width: 1.1; }
  </style>

  <text x="8" y="14" class="sm">constraint</text>
  <text x="150" y="14" class="sm">target complexity</text>
  <text x="310" y="14" class="sm">candidate techniques</text>

  <rect class="hi" x="8" y="22" width="130" height="18" rx="3"/>
  <text x="73" y="35" class="lb" text-anchor="middle">n ≤ 20</text>
  <text x="150" y="35" class="lb">O(2ⁿ · n)</text>
  <text x="310" y="35" class="lb">bitmask DP, brute force</text>

  <rect class="bx" x="8" y="44" width="130" height="18" rx="3"/>
  <text x="73" y="57" class="lb" text-anchor="middle">n ≤ 40</text>
  <text x="150" y="57" class="lb">O(2ⁿ/²)</text>
  <text x="310" y="57" class="lb">meet in the middle</text>

  <rect class="hi" x="8" y="66" width="130" height="18" rx="3"/>
  <text x="73" y="79" class="lb" text-anchor="middle">n ≤ 500</text>
  <text x="150" y="79" class="lb">O(n³)</text>
  <text x="310" y="79" class="lb">Floyd-Warshall, DP</text>

  <rect class="bx" x="8" y="88" width="130" height="18" rx="3"/>
  <text x="73" y="101" class="lb" text-anchor="middle">n ≤ 5,000</text>
  <text x="150" y="101" class="lb">O(n²)</text>
  <text x="310" y="101" class="lb">simple DP, nested scans</text>

  <rect class="hi" x="8" y="110" width="130" height="18" rx="3"/>
  <text x="73" y="123" class="lb" text-anchor="middle">n ≤ 10⁵</text>
  <text x="150" y="123" class="lb">O(n log n)</text>
  <text x="310" y="123" class="lb">sorting, segment tree, binary search</text>

  <rect class="bx" x="8" y="132" width="130" height="18" rx="3"/>
  <text x="73" y="145" class="lb" text-anchor="middle">n ≤ 10⁷</text>
  <text x="150" y="145" class="lb">O(n)</text>
  <text x="310" y="145" class="lb">two pointers, prefix sum, linear scan</text>

  <text x="73" y="164" class="sm" text-anchor="middle">first diagnostic, not a rigid rule</text>
</svg>
:::

- These are first diagnostics, not laws. An O(n²) solution with a tiny constant can beat an O(n log n) solution with a heavy one. But the table gets you to the right neighbourhood in seconds

:::interview
"What's the first thing you do when you see a problem?" — Read the constraints. n ≤ 20 means I can probably brute-force with bitmasks. n ≤ 10⁵ means I need O(n log n) or better. The constraint narrows the algorithm before I even understand the problem.
:::
