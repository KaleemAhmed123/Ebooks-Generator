## Two Pointers: Collide from Both Ends <span class="lv lv1"></span>

- **What it is:** On sorted data, start one index at each end and move them toward each other. Each comparison moves exactly one pointer, and the pair it leaves behind is never needed again
- **Signal:** "sorted array", "pair / two values that sum to X", "in place, O(1) space", "palindrome", "most water between two lines"
- **Why it works:** Picture every pair `(i, j)` as a cell in a grid. If `a[i] + a[j]` is too small, `a[i]` is too small for *every* remaining `j` (they are all ≤ `a[j]`), so the whole row goes. Too big, and the whole column goes. n − 1 moves clear n² / 2 cells

:::mint
<svg viewBox="0 0 470 176" role="img" aria-label="Pair grid for sorted array 1, 2, 4, 6, 8, 9 and target 12. Rows are the left value, columns the right value; only cells above the diagonal are pairs. 1 plus 9 is 10, too small, so row 1 is eliminated. 2 plus 9 is 11, too small, row 2 eliminated. 4 plus 9 is 13, too big, column 9 eliminated. 4 plus 8 is 12, found. Four moves instead of fifteen pairs." xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif">
  <style>
    .lb { font: 9.5px Consolas, monospace; fill: #1a1a1a; }
    .sm { font: 8px Georgia, serif; fill: #6b6b6b; }
    .c { fill: #ffffff; stroke: #c9c9c9; stroke-width: 0.8; }
    .na { fill: #f3f3f3; stroke: #e2e2e2; stroke-width: 0.6; }
    .row { fill: #ffedf1; stroke: #ef476e; stroke-width: 0.8; }
    .col { fill: #dbe7f5; stroke: #1d4e89; stroke-width: 0.8; }
    .hit { fill: #e2fcf3; stroke: #2d6a4f; stroke-width: 1.6; }
  </style>
  <text x="40" y="12" class="sm">right value →</text>
  <text x="62" y="26" class="lb" text-anchor="middle">1</text><text x="86" y="26" class="lb" text-anchor="middle">2</text><text x="110" y="26" class="lb" text-anchor="middle">4</text><text x="134" y="26" class="lb" text-anchor="middle">6</text><text x="158" y="26" class="lb" text-anchor="middle">8</text><text x="182" y="26" class="lb" text-anchor="middle">9</text>
  <text x="36" y="44" class="lb" text-anchor="middle">1</text><text x="36" y="68" class="lb" text-anchor="middle">2</text><text x="36" y="92" class="lb" text-anchor="middle">4</text><text x="36" y="116" class="lb" text-anchor="middle">6</text><text x="36" y="140" class="lb" text-anchor="middle">8</text><text x="36" y="164" class="lb" text-anchor="middle">9</text>
  <g>
    <rect class="na" x="50" y="32" width="24" height="24"/><rect class="row" x="74" y="32" width="24" height="24"/><rect class="row" x="98" y="32" width="24" height="24"/><rect class="row" x="122" y="32" width="24" height="24"/><rect class="row" x="146" y="32" width="24" height="24"/><rect class="row" x="170" y="32" width="24" height="24"/>
    <rect class="na" x="50" y="56" width="24" height="24"/><rect class="na" x="74" y="56" width="24" height="24"/><rect class="row" x="98" y="56" width="24" height="24"/><rect class="row" x="122" y="56" width="24" height="24"/><rect class="row" x="146" y="56" width="24" height="24"/><rect class="row" x="170" y="56" width="24" height="24"/>
    <rect class="na" x="50" y="80" width="24" height="24"/><rect class="na" x="74" y="80" width="24" height="24"/><rect class="na" x="98" y="80" width="24" height="24"/><rect class="c" x="122" y="80" width="24" height="24"/><rect class="hit" x="146" y="80" width="24" height="24"/><rect class="col" x="170" y="80" width="24" height="24"/>
    <rect class="na" x="50" y="104" width="24" height="24"/><rect class="na" x="74" y="104" width="24" height="24"/><rect class="na" x="98" y="104" width="24" height="24"/><rect class="na" x="122" y="104" width="24" height="24"/><rect class="c" x="146" y="104" width="24" height="24"/><rect class="col" x="170" y="104" width="24" height="24"/>
    <rect class="na" x="50" y="128" width="24" height="24"/><rect class="na" x="74" y="128" width="24" height="24"/><rect class="na" x="98" y="128" width="24" height="24"/><rect class="na" x="122" y="128" width="24" height="24"/><rect class="na" x="146" y="128" width="24" height="24"/><rect class="col" x="170" y="128" width="24" height="24"/>
    <rect class="na" x="50" y="152" width="24" height="24"/><rect class="na" x="74" y="152" width="24" height="24"/><rect class="na" x="98" y="152" width="24" height="24"/><rect class="na" x="122" y="152" width="24" height="24"/><rect class="na" x="146" y="152" width="24" height="24"/><rect class="na" x="170" y="152" width="24" height="24"/>
  </g>
  <text x="182" y="48" class="lb" text-anchor="middle">10</text><text x="182" y="72" class="lb" text-anchor="middle">11</text><text x="182" y="96" class="lb" text-anchor="middle">13</text><text x="158" y="96" class="lb" text-anchor="middle">12</text>
  <text x="220" y="44" class="lb">1 + 9 = 10 &lt; 12  → left++</text><text x="220" y="56" class="sm">row "1" can never reach 12: gone</text>
  <text x="220" y="76" class="lb">2 + 9 = 11 &lt; 12  → left++</text><text x="220" y="88" class="sm">row "2" gone</text>
  <text x="220" y="108" class="lb">4 + 9 = 13 &gt; 12  → right−−</text><text x="220" y="120" class="sm">column "9" is too big for every row left</text>
  <text x="220" y="140" class="lb">4 + 8 = 12  ✓</text>
  <text x="220" y="162" class="sm">4 comparisons instead of 15 pairs</text>
</svg>
:::

```ts
// Two Sum II – Input Array Is Sorted (LeetCode 167), 1-indexed
function twoSum(numbers: number[], target: number): number[] {
  let left = 0, right = numbers.length - 1;
  while (left < right) {
    const sum = numbers[left] + numbers[right];
    if (sum === target) return [left + 1, right + 1];
    if (sum < target) left++;   // row eliminated
    else right--;               // column eliminated
  }
  return [];
}
```

### Variations

- **Container With Most Water (LeetCode 11):** move the *shorter* wall; the area is capped by it, so every pair it could still form is already beaten
- **Valid Palindrome (LeetCode 125):** skip non-alphanumerics from both ends, compare lower-cased characters as the pointers meet
- **Squares of a Sorted Array (LeetCode 977):** the largest square sits at one of the two ends; fill the output from the back
- **3Sum, 3Sum Closest, 4Sum:** fix the outer index, collide on the rest (02-10)

### The failure

- **Colliding on unsorted input.** Two Sum (LeetCode 1) is unsorted and asks for the *original* indices. Sorting destroys them, and without sorting the row/column argument is false. Use a map from value to index there (03-05)

:::interview
"Why is it safe to move the shorter wall in Container With Most Water?" — The area is `min(h[l], h[r]) · (r − l)`. Every other pair using the shorter wall has a smaller width and the same or lower cap, so none can beat the current area. That wall is finished; drop it. O(n).
:::
