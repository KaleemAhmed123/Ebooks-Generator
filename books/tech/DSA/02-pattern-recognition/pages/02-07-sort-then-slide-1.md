## Sort, then Slide <span class="lv lv2"></span>

- **What it is:** When the question picks a *subset* (order does not matter) and scores it by its spread or by how close its values are, sort first. The best subset is then a contiguous run of the sorted array, and a window finds it
- **Signal:** "choose m packets so the max − min is smallest", "you may increment any element at most k times in total, maximise the frequency", "pick k scores with the smallest range", any subset question where only the values matter, not the positions
- **Why it works:** Take any chosen subset and look at its min and max in sorted order. Every value between them can be swapped in without widening the range. So some optimal subset is contiguous in sorted order, and the n-choose-m search collapses to n − m + 1 windows

:::mint
<svg viewBox="0 0 470 104" role="img" aria-label="Frequency of the most frequent element. Sorted array 1, 2, 4 with k equal to 5. Raising every element of the window to the rightmost value 4 costs 4 times 3 minus the window sum 7, which is 5, within budget, so frequency 3 is reachable." xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif">
  <style>
    .lb { font: 10px Consolas, monospace; fill: #1a1a1a; }
    .sm { font: 8px Georgia, serif; fill: #6b6b6b; }
    .hi { fill: #e2fcf3; stroke: #2d6a4f; stroke-width: 1.1; }
    .gap { fill: #ffedf1; stroke: #ef476e; stroke-width: 1; stroke-dasharray: 3 2; }
  </style>
  <rect class="hi" x="30" y="72" width="34" height="10"/>
  <rect class="gap" x="30" y="42" width="34" height="30"/>
  <rect class="hi" x="74" y="62" width="34" height="20"/>
  <rect class="gap" x="74" y="42" width="34" height="20"/>
  <rect class="hi" x="118" y="42" width="34" height="40"/>
  <text x="47" y="96" class="lb" text-anchor="middle">1</text>
  <text x="91" y="96" class="lb" text-anchor="middle">2</text>
  <text x="135" y="96" class="lb" text-anchor="middle">4</text>
  <text x="47" y="36" class="sm" text-anchor="middle" fill="#ef476e">+3</text>
  <text x="91" y="36" class="sm" text-anchor="middle" fill="#ef476e">+2</text>
  <text x="135" y="36" class="sm" text-anchor="middle">target</text>
  <text x="190" y="30" class="lb">cost = nums[right] · len − windowSum</text>
  <text x="190" y="48" class="lb">     = 4 · 3 − 7 = 5 ≤ k = 5  ✓</text>
  <text x="190" y="70" class="sm">sorted order: the cheapest values to raise to nums[right]</text>
  <text x="190" y="82" class="sm">are the ones just below it, which is always a window</text>
</svg>
:::

```ts
// Frequency of the Most Frequent Element (LeetCode 1838)
function maxFrequency(nums: number[], k: number): number {
  nums.sort((a, b) => a - b);
  let left = 0, sum = 0, best = 0;
  for (let right = 0; right < nums.length; right++) {
    sum += nums[right];
    // raise everything in [left, right] to nums[right]
    while (nums[right] * (right - left + 1) - sum > k) {
      sum -= nums[left++];
    }
    best = Math.max(best, right - left + 1);
  }
  return best;
}
```
