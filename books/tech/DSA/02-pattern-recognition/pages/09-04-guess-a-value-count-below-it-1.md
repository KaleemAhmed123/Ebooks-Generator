## Guess a Value, Count Below It <span class="lv lv2"></span>

- **What it is:** To find the k-th smallest item of a set too big to list, binary search on the *value*. For a guess `x`, count the items `≤ x`. The answer is the smallest `x` whose count reaches k
- **Signal:** the k-th smallest (or the median) of a set defined by a rule, such as the cells of a sorted matrix, every pairwise distance or every product `i · j`, when the set has n² or n·m members and is too big to build
- **Not this page if:** k is small and the set is the merge of k sorted lists → 15-03 (pop k heads from a heap)
- **Why it works:** `count(x)` never decreases as `x` grows, so "count(x) ≥ k" is a boundary `F…FT…T`, the minimise case pictured on 09-02. The first `T` is exactly the k-th smallest value: it is in the set, because the count only changes at values that are in the set. The search costs `log(range)` guesses, each paid with one structural count, usually O(n) or O(n log m)

:::mint
<svg viewBox="0 0 470 118" role="img" aria-label="Sorted matrix rows 1 5 9, 10 11 13, 12 13 15, k equals 8. The count for x equals 13 walks from the bottom-left: 12 is at most 13, so its whole column of 3 counts, step right; 13 is at most 13, add 3, step right; 15 is above 13, step up; 13 is at most 13, add 2, and the walk leaves the matrix. count of 13 is 8, feasible. count of 12 is 3 plus 2 plus 1, 6, too small. The smallest feasible value, 13, is the answer." xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif">
  <style>
    .lb { font: 10px Consolas, monospace; fill: #1a1a1a; }
    .sm { font: 8px Georgia, serif; fill: #6b6b6b; }
    .c { fill: #ffffff; stroke: #1a1a1a; stroke-width: 1; }
    .in { fill: #b7e4c7; stroke: #2d6a4f; stroke-width: 1; }
    .p { stroke: #1d4e89; stroke-width: 1.4; fill: none; }
  </style>
  <defs><marker id="m0904" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="4" markerHeight="4" orient="auto"><path d="M0 0L10 5L0 10z" fill="#1d4e89"/></marker></defs>
  <rect class="in" x="30" y="10" width="34" height="24"/><text x="47" y="26" class="lb" text-anchor="middle">1</text>
  <rect class="in" x="64" y="10" width="34" height="24"/><text x="81" y="26" class="lb" text-anchor="middle">5</text>
  <rect class="in" x="98" y="10" width="34" height="24"/><text x="115" y="26" class="lb" text-anchor="middle">9</text>
  <rect class="in" x="30" y="34" width="34" height="24"/><text x="47" y="50" class="lb" text-anchor="middle">10</text>
  <rect class="in" x="64" y="34" width="34" height="24"/><text x="81" y="50" class="lb" text-anchor="middle">11</text>
  <rect class="in" x="98" y="34" width="34" height="24"/><text x="115" y="50" class="lb" text-anchor="middle">13</text>
  <rect class="in" x="30" y="58" width="34" height="24"/><text x="47" y="74" class="lb" text-anchor="middle">12</text>
  <rect class="in" x="64" y="58" width="34" height="24"/><text x="81" y="74" class="lb" text-anchor="middle">13</text>
  <rect class="c" x="98" y="58" width="34" height="24"/><text x="115" y="74" class="lb" text-anchor="middle">15</text>
  <path class="p" d="M 34 79 L 127 79 L 127 54 L 146 54" marker-end="url(#m0904)"/>
  <text x="47" y="94" class="sm" text-anchor="middle">+3</text>
  <text x="81" y="94" class="sm" text-anchor="middle">+3</text>
  <text x="115" y="94" class="sm" text-anchor="middle">+2</text>
  <text x="30" y="112" class="sm">shaded: values ≤ 13 · arrow: the walk for x = 13</text>
  <text x="190" y="24" class="lb">k = 8</text>
  <text x="190" y="42" class="lb">count(12) = 3 + 2 + 1 = 6  &lt; 8</text>
  <text x="190" y="60" class="lb">count(13) = 3 + 3 + 2 = 8  ≥ 8</text>
  <text x="190" y="78" class="lb" fill="#2d6a4f">answer = smallest feasible = 13</text>
  <text x="190" y="100" class="sm">each step adds a whole column part (≤ x) or drops a row (&gt; x)</text>
</svg>
:::
