## Exactly K by Subtraction <span class="lv lv2"></span>

- **What it is:** Count subarrays with *exactly* K of something as `atMost(K) − atMost(K − 1)`. Two monotone windows replace one broken one
- **Signal:** "exactly K distinct", "exactly K odd numbers", "sum equals goal" on a 0/1 array, and a counting question rather than a longest one
- **Why it works:** "Exactly K" is not shrink-safe: drop one element from a window with K distinct values and it may hold K − 1, so the left pointer has no single correct position. "At most K" *is* shrink-safe, so it counts cleanly with `right − left + 1` (page 02-04). Every subarray with at most K is either exactly K or at most K − 1, so the difference is exactly K

:::mint
<svg viewBox="0 0 470 100" role="img" aria-label="Two nested regions. The outer region holds all subarrays with at most K distinct values. The inner region holds those with at most K minus 1. The ring between them is the subarrays with exactly K distinct values." xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif">
  <style>
    .lb { font: 10px Consolas, monospace; fill: #1a1a1a; }
    .sm { font: 8px Georgia, serif; fill: #6b6b6b; }
    .out { fill: #e2fcf3; stroke: #2d6a4f; stroke-width: 1.2; }
    .in { fill: #ffffff; stroke: #1a1a1a; stroke-width: 1.1; stroke-dasharray: 4 3; }
  </style>
  <rect class="out" x="20" y="8" width="220" height="84" rx="6"/>
  <text x="30" y="24" class="lb">atMost(K)</text>
  <rect class="in" x="90" y="34" width="140" height="50" rx="5"/>
  <text x="100" y="52" class="lb">atMost(K − 1)</text>
  <text x="100" y="66" class="sm">windows missing a value</text>
  <text x="30" y="84" class="sm" fill="#2d6a4f">exactly K</text>
  <text x="262" y="30" class="lb">nums = [1, 2, 1, 2, 3], K = 2</text>
  <text x="262" y="50" class="lb">atMost(2) = 12</text>
  <text x="262" y="66" class="lb">atMost(1) =  5</text>
  <text x="262" y="86" class="lb" fill="#2d6a4f">exactly(2) = 12 − 5 = 7</text>
</svg>
:::

```ts
// Subarrays with K Different Integers (LeetCode 992)
function subarraysWithKDistinct(nums: number[], k: number): number {
  return atMost(nums, k) - atMost(nums, k - 1);
}
function atMost(nums: number[], k: number): number {
  // atMost(−1) is empty, not a loop
  if (k < 0) return 0;
  const freq = new Map<number, number>();
  let left = 0, count = 0;
  for (let right = 0; right < nums.length; right++) {
    freq.set(nums[right], (freq.get(nums[right]) ?? 0) + 1);
    // too many distinct: shrink
    while (freq.size > k) {
      const v = nums[left++];
      const c = freq.get(v)! - 1;
      c === 0 ? freq.delete(v) : freq.set(v, c);
    }
    // count by the right end
    count += right - left + 1;
  }
  return count;
}
```

### Variations

- **Binary Subarrays With Sum (LeetCode 930):** on a 0/1 array the window sum is the count of ones. `atMost(goal) − atMost(goal − 1)`, with `atMost(−1) = 0`
- **Count Number of Nice Subarrays (LeetCode 1248):** map each number to `n % 2`. "Exactly K odd numbers" becomes the binary problem above
- **Same answer, other route:** a prefix-count map (page 03-03) also solves both, in one pass. The subtraction trick wins when the condition is "distinct values", which a prefix sum cannot express

### The failure

- **One window for "exactly".** Shrink while `distinct > K`, then count when `distinct === K`. On `[1, 2, 1, 2, 3]` with K = 2 the true answer is 7. Adding 1 per window gives 4: it misses short subarrays like `[1, 2]` inside a longer valid window. Adding `right − left + 1` gives 11: it also counts `[2]` and `[1]`, which hold only one distinct value. The window is right for *longest*, wrong for *count*
- **Forgetting `k − 1` can be negative.** When K = 0, the second call is `atMost(nums, −1)`. Without the guard, `freq.size > −1` is true even for an empty window, so `left` runs past `right`, reads `undefined`, and the loop never ends

:::interview
"Why not shrink until the window has exactly K distinct and count there?" — Because the valid starts for a fixed right end form a *range*, not a single point. The left end of that range is where `distinct` drops to K; the right end is where it would drop to K − 1. `atMost(K) − atMost(K − 1)` measures that range for every right end at once, in two O(n) passes.
:::
