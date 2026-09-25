## Guess a Value, Count Below It 🟡

- **What it is:** To find the k-th smallest item of a set you cannot list cheaply, binary search on the *value*. For a guess `x`, count the items `≤ x`. The answer is the smallest `x` whose count reaches k
- **Signal:** "k-th smallest in a sorted matrix", "median of a row-wise sorted matrix", "k-th smallest pair distance", "k-th number in the multiplication table", sets of size n² or n·m that are too big to build
- **Why it works:** `count(x)` never decreases as `x` grows, so "count(x) ≥ k" is a boundary `F…FT…T` (Chapter 18). The first `T` is exactly the k-th smallest value: it is in the set, because the count only changes at values that are in the set. The search costs `log(range)` guesses, each paid with one structural count, usually O(n) or O(n log m)

:::mint
<svg viewBox="0 0 470 118" role="img" aria-label="Sorted matrix rows 1 5 9, 10 11 13, 12 13 15, k equals 8. Guess x equals 13: the staircase walk from the bottom-left counts 8 values at most 13, so 13 is feasible. Guess 12 counts 6, not enough. The smallest feasible value is 13." xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif">
  <style>
    .lb { font: 10px Consolas, monospace; fill: #1a1a1a; }
    .sm { font: 8px Georgia, serif; fill: #6b6b6b; }
    .c { fill: #ffffff; stroke: #1a1a1a; stroke-width: 1; }
    .in { fill: #e2fcf3; stroke: #2d6a4f; stroke-width: 1; }
  </style>
  <rect class="in" x="30" y="14" width="34" height="24"/><text x="47" y="30" class="lb" text-anchor="middle">1</text>
  <rect class="in" x="64" y="14" width="34" height="24"/><text x="81" y="30" class="lb" text-anchor="middle">5</text>
  <rect class="in" x="98" y="14" width="34" height="24"/><text x="115" y="30" class="lb" text-anchor="middle">9</text>
  <rect class="in" x="30" y="38" width="34" height="24"/><text x="47" y="54" class="lb" text-anchor="middle">10</text>
  <rect class="in" x="64" y="38" width="34" height="24"/><text x="81" y="54" class="lb" text-anchor="middle">11</text>
  <rect class="in" x="98" y="38" width="34" height="24"/><text x="115" y="54" class="lb" text-anchor="middle">13</text>
  <rect class="in" x="30" y="62" width="34" height="24"/><text x="47" y="78" class="lb" text-anchor="middle">12</text>
  <rect class="in" x="64" y="62" width="34" height="24"/><text x="81" y="78" class="lb" text-anchor="middle">13</text>
  <rect class="c" x="98" y="62" width="34" height="24"/><text x="115" y="78" class="lb" text-anchor="middle">15</text>
  <text x="30" y="104" class="sm">shaded: values ≤ 13 (8 of them)</text>
  <text x="170" y="30" class="lb">k = 8</text>
  <text x="170" y="50" class="lb">count(12) = 6  &lt; 8  → too small</text>
  <text x="170" y="66" class="lb">count(13) = 8  ≥ 8  → feasible</text>
  <text x="170" y="90" class="lb" fill="#2d6a4f">answer = smallest feasible = 13</text>
</svg>
:::
