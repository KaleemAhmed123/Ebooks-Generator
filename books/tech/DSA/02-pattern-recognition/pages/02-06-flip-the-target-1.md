## Flip the Target 🟡

- **What it is:** When the question is about what you *remove* from both ends, solve for what *stays*. Removing a prefix and a suffix always leaves one contiguous middle, and a contiguous middle is a sliding window
- **Signal:** "take from the left or the right end", "remove elements from either end", "circular array, best subarray", "pick exactly k cards from the ends"
- **Why it works:** A choice at each end is a branching decision, which smells like DP or backtracking. But every valid choice leaves the same *shape*: `nums[l..r]`. Fix the shape instead of the choices. "Minimise what I take" becomes "maximise what I leave"; "sum taken = x" becomes "sum left = total − x"

:::mint
<svg viewBox="0 0 470 96" role="img" aria-label="Array 3, 2, 20, 1, 1, 3 with x equal to 10. Taking 3 and 2 from the left and 1, 1, 3 from the right leaves the middle 20. Instead of choosing ends, find the longest middle whose sum is total minus x, 30 minus 10 equals 20." xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif">
  <style>
    .lb { font: 10px Consolas, monospace; fill: #1a1a1a; }
    .sm { font: 8px Georgia, serif; fill: #6b6b6b; }
    .hot { fill: #ffedf1; stroke: #ef476e; stroke-width: 1.1; }
    .hi { fill: #e2fcf3; stroke: #2d6a4f; stroke-width: 1.1; }
  </style>
  <rect class="hot" x="20" y="14" width="34" height="24"/><text x="37" y="30" class="lb" text-anchor="middle">3</text>
  <rect class="hot" x="54" y="14" width="34" height="24"/><text x="71" y="30" class="lb" text-anchor="middle">2</text>
  <rect class="hi" x="88" y="14" width="34" height="24"/><text x="105" y="30" class="lb" text-anchor="middle">20</text>
  <rect class="hot" x="122" y="14" width="34" height="24"/><text x="139" y="30" class="lb" text-anchor="middle">1</text>
  <rect class="hot" x="156" y="14" width="34" height="24"/><text x="173" y="30" class="lb" text-anchor="middle">1</text>
  <rect class="hot" x="190" y="14" width="34" height="24"/><text x="207" y="30" class="lb" text-anchor="middle">3</text>
  <text x="54" y="54" class="sm" text-anchor="middle" fill="#ef476e">taken</text>
  <text x="105" y="54" class="sm" text-anchor="middle" fill="#2d6a4f">kept</text>
  <text x="173" y="54" class="sm" text-anchor="middle" fill="#ef476e">taken</text>
  <text x="20" y="80" class="lb">5 removals, sum 10  ⇔  longest middle with sum 30 − 10 = 20, length 1</text>
  <text x="250" y="30" class="sm">x = 10, total = 30</text>
  <text x="250" y="44" class="sm">answer = n − longest middle = 6 − 1 = 5</text>
</svg>
:::

```ts
// Minimum Operations to Reduce X to Zero (LeetCode 1658)
// nums[i] ≥ 1
function minOperations(nums: number[], x: number): number {
  // what must stay
  const target = nums.reduce((a, b) => a + b, 0) - x;
  if (target < 0) return -1;
  let left = 0, sum = 0, longest = -1;
  for (let right = 0; right < nums.length; right++) {
    sum += nums[right];
    // positives: shrink-safe
    while (sum > target) sum -= nums[left++];
    if (sum === target) {
      longest = Math.max(longest, right - left + 1);
    }
  }
  return longest === -1 ? -1 : nums.length - longest;
}
```
