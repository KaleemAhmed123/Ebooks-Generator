## Count Each Element's Reach <span class="lv lv2"></span>

- **What it is:** The contribution technique. Instead of visiting every subarray, ask of each element: *in how many subarrays am I the minimum?* If it can extend `L` steps left and `R` steps right before a smaller value blocks it, it is the minimum of exactly `L · R` subarrays and contributes `a[i] · L · R`
- **Signal:** "sum of the minimum (or maximum) of every subarray", "sum of subarray ranges", "maximum of the minimum for every window size", n up to 3 · 10⁴ or more so O(n²) subarrays is too slow
- **Why it works:** A subarray with minimum `a[i]` must start after the previous smaller element and end before the next smaller one; any start and end in those ranges works. A monotonic stack finds all previous and next smaller elements in O(n) (page 10-05). The n² subarrays are grouped by who their minimum is

:::mint
<svg viewBox="0 0 470 110" role="img" aria-label="Sum of subarray minimums on 3, 1, 2, 4. Element 1 at index 1 has no smaller element on either side: it can start at index 0 or 1 and end at index 1, 2 or 3, so L is 2, R is 3 and it is the minimum of 6 subarrays, contributing 6. Element 3 contributes 3, element 2 contributes 2 times 1 times 2, 4, element 4 contributes 4. Total 17." xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif">
  <style>
    .lb { font: 10px Consolas, monospace; fill: #1a1a1a; }
    .sm { font: 8px Georgia, serif; fill: #6b6b6b; }
    .bx { fill: #ffffff; stroke: #1a1a1a; stroke-width: 1.1; }
    .me { fill: #dbe7f5; stroke: #1d4e89; stroke-width: 1.2; }
    .br { stroke: #2d6a4f; stroke-width: 1.4; fill: none; }
  </style>
  <rect class="bx" x="40" y="14" width="36" height="24"/><text x="58" y="30" class="lb" text-anchor="middle">3</text>
  <rect class="me" x="76" y="14" width="36" height="24"/><text x="94" y="30" class="lb" text-anchor="middle">1</text>
  <rect class="bx" x="112" y="14" width="36" height="24"/><text x="130" y="30" class="lb" text-anchor="middle">2</text>
  <rect class="bx" x="148" y="14" width="36" height="24"/><text x="166" y="30" class="lb" text-anchor="middle">4</text>
  <path class="br" d="M 42 46 L 110 46"/><text x="76" y="58" class="sm" text-anchor="middle">L = 2 starts</text>
  <path class="br" d="M 78 66 L 182 66"/><text x="130" y="78" class="sm" text-anchor="middle">R = 3 ends</text>
  <text x="210" y="30" class="lb">1 is the min of 2 · 3 = 6 subarrays</text>
  <text x="210" y="50" class="lb">3·1·1 + 1·2·3 + 2·1·2 + 4·1·1</text>
  <text x="210" y="66" class="lb">= 3 + 6 + 4 + 4 = 17</text>
  <text x="40" y="100" class="sm">ties: strictly smaller on one side, smaller-or-equal on the other, so each subarray has exactly one owner</text>
</svg>
:::
