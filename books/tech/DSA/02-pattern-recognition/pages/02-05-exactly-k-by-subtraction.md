## Exactly K by Subtraction <span class="lv lv2"></span>

- **What:** count "exactly K" as `atMost(K) − atMost(K − 1)`
- **Spot it:** "exactly K distinct", "exactly K odd numbers", "sum equals goal" on a 0/1 array, asked as a count. Sum = K with negatives → 03-03
- **Why:** "exactly K" is not shrink-safe, "at most K" is (02-04). Every subarray with at most K has exactly K or at most K − 1, so the difference is exactly K

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
const subarraysWithKDistinct = (nums: number[], k: number) =>
  atMost(nums, k) - atMost(nums, k - 1);

function atMost(nums: number[], k: number): number {
  if (k < 0) return 0;                       // atMost(−1) is empty
  const freq = new Map<number, number>();
  let left = 0, count = 0;
  for (let right = 0; right < nums.length; right++) {
    freq.set(nums[right], (freq.get(nums[right]) ?? 0) + 1);
    while (freq.size > k) {                  // too many distinct: shrink
      const v = nums[left++], c = freq.get(v)! - 1;
      c === 0 ? freq.delete(v) : freq.set(v, c);
    }
    count += right - left + 1;               // count by the right end
  }
  return count;
}
```

- **Watch out:** guard `k < 0`. With K = 0 the second call is `atMost(−1)`: `freq.size > −1` holds even for an empty window and the loop never ends
- **Also solves:** [Binary Subarrays With Sum](https://leetcode.com/problems/binary-subarrays-with-sum/) (LeetCode 930) · [Count Number of Nice Subarrays](https://leetcode.com/problems/count-number-of-nice-subarrays/) (LeetCode 1248) (map each number to `n % 2`) · [Number of Subarrays with Bounded Maximum](https://leetcode.com/problems/number-of-subarrays-with-bounded-maximum/) (LeetCode 795) (maximum ≤ R minus maximum ≤ L − 1)
