## Keep It Sorted as You Go 🟡

- **What it is:** When each new element must be compared with the *closest* earlier values (the next larger, the next smaller, the nearest), keep the earlier values in a sorted structure and binary search it: an **ordered set**. A heap only knows its top; an ordered set knows every element's neighbours
- **Signal:** "minimum absolute difference between elements at least x apart", "least greater element on the right", "nearby almost duplicate" (index gap ≤ k, value gap ≤ t), "can this booking be added without overlap", "k-th smallest so far"
- **Why it works:** The best partner of a value `v` in a set is either its successor (smallest ≥ v) or its predecessor (largest < v). In a sorted structure both are one binary search away. C++ `std::set` and Java `TreeSet` do insert and neighbour queries in O(log n); in TypeScript, a sorted array with binary-search insertion answers queries in O(log n) and pays O(n) element moves per insert

:::mint
<svg viewBox="0 0 470 104" role="img" aria-label="Minimum absolute difference with constraint x equals 2 on 4, 3, 2, 4. At index 2 the allowed earlier value is 4, so the sorted set holds 4; the value 2 has successor 4, difference 2. At index 3 the set holds 3 and 4; the value 4 finds itself, difference 0. The answer is 0." xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif">
  <style>
    .lb { font: 9.5px Consolas, monospace; fill: #1a1a1a; }
    .sm { font: 8px Georgia, serif; fill: #6b6b6b; }
    .s { fill: #e2fcf3; stroke: #2d6a4f; stroke-width: 1.1; }
    .c { fill: #dbe7f5; stroke: #1d4e89; stroke-width: 1.2; }
  </style>
  <text x="20" y="18" class="sm">nums = [4, 3, 2, 4], x = 2</text>
  <text x="20" y="42" class="lb">i = 2: insert nums[0]</text>
  <rect class="s" x="190" y="30" width="26" height="18"/><text x="203" y="43" class="lb" text-anchor="middle">4</text>
  <text x="240" y="42" class="lb">query 2 → successor 4, |2 − 4| = 2</text>
  <text x="20" y="72" class="lb">i = 3: insert nums[1]</text>
  <rect class="s" x="190" y="60" width="26" height="18"/><text x="203" y="73" class="lb" text-anchor="middle">3</text>
  <rect class="s" x="216" y="60" width="26" height="18"/><text x="229" y="73" class="lb" text-anchor="middle">4</text>
  <text x="252" y="72" class="lb">query 4 → itself, 0</text>
  <text x="20" y="96" class="sm">only values at least x positions back are in the set; each query needs just two neighbours</text>
</svg>
:::
