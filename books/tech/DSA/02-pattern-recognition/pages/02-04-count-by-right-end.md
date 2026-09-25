## Count by the Right End 🟢

- **What it is:** Counting *every* valid subarray, not the longest one. Each time the right edge settles, add the number of valid subarrays that **end** there: `right − left + 1`
- **Signal:** "count the subarrays / substrings such that…", with a condition that stays true when the window shrinks (product < K, at most K distinct, sum ≤ S on non-negatives)
- **Why it works:** If `[left, right]` is valid and shrinking keeps it valid, then every start in `[left, right]` is valid too. Those starts are exactly `right − left + 1` subarrays, and no subarray is counted twice because each is counted at its own right end

:::mint
<svg viewBox="0 0 470 92" role="img" aria-label="Array 10, 5, 2, 6 with k equal to 100. At right index 3 the window is 5, 2, 6. The three subarrays ending at index 3 are 6, then 2 6, then 5 2 6, so the count adds 3, which is right minus left plus one." xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif">
  <style>
    .lb { font: 10px Consolas, monospace; fill: #1a1a1a; }
    .sm { font: 8px Georgia, serif; fill: #6b6b6b; }
    .bx { fill: #ffffff; stroke: #1a1a1a; stroke-width: 1.1; }
    .hi { fill: #e2fcf3; stroke: #2d6a4f; stroke-width: 1.1; }
    .br { stroke: #1d4e89; stroke-width: 1.4; fill: none; }
  </style>
  <rect class="bx" x="20" y="10" width="34" height="24"/><text x="37" y="26" class="lb" text-anchor="middle">10</text>
  <rect class="hi" x="54" y="10" width="34" height="24"/><text x="71" y="26" class="lb" text-anchor="middle">5</text>
  <rect class="hi" x="88" y="10" width="34" height="24"/><text x="105" y="26" class="lb" text-anchor="middle">2</text>
  <rect class="hi" x="122" y="10" width="34" height="24"/><text x="139" y="26" class="lb" text-anchor="middle">6</text>
  <text x="71" y="46" class="sm" text-anchor="middle">left</text><text x="139" y="46" class="sm" text-anchor="middle">right</text>
  <path class="br" d="M 124 56 L 154 56"/><text x="162" y="59" class="lb">[6]</text>
  <path class="br" d="M 90 68 L 154 68"/><text x="162" y="71" class="lb">[2, 6]</text>
  <path class="br" d="M 56 80 L 154 80"/><text x="162" y="83" class="lb">[5, 2, 6]</text>
  <text x="260" y="26" class="lb">k = 100, product 5·2·6 = 60</text>
  <text x="260" y="62" class="lb">count += right − left + 1</text>
  <text x="260" y="78" class="lb">       = 3 − 1 + 1 = 3</text>
</svg>
:::

```ts
// Subarray Product Less Than K (LeetCode 713)
function numSubarrayProductLessThanK(
  nums: number[], k: number,
): number {
  // no product of integers ≥ 1 is < 1
  if (k <= 1) return 0;
  let prod = 1, left = 0, count = 0;
  for (let right = 0; right < nums.length; right++) {
    prod *= nums[right];
    while (prod >= k) prod /= nums[left++];   // restore validity
    // every start in [left, right]
    count += right - left + 1;
  }
  return count;
}
```

- **Variation — Number of Substrings Containing All Three Characters (LeetCode 1358):** here validity survives *growing*, not shrinking. Shrink while `a`, `b`, `c` are all present, then add `left`: every start before `left` still contains all three
- Pick the formula by asking which direction keeps the window valid. Shrink-safe → `right − left + 1`. Grow-safe → `left` (or `n − right`)

### The failure

- Counting only maximal windows. `[5, 2, 6]` is one window, but it adds three answers at its right end. Summing lengths of maximal windows double-counts overlaps, and counting windows undercounts. Count at the right end and both errors vanish
- Forgetting the `k ≤ 1` guard. With `k = 0` the `while` loop pops past `right`, `left` exceeds `right`, and the count goes negative

:::interview
"Why is the answer not just the number of windows you see?" — Each position of `right` owns all valid subarrays ending there. The window tells you the smallest valid start; every later start is also valid because the condition is monotone under shrinking. So one window at `right` stands for `right − left + 1` subarrays, and the total is O(n).
:::
