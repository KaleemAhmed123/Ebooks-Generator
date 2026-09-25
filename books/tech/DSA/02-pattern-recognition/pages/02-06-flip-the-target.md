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

### Variations

- **Maximum Points You Can Obtain from Cards (LeetCode 1423):** take exactly k cards from the ends. What stays is a fixed window of `n − k`. Answer = `total − min(sum of any n − k window)`, a fixed-size window from page 02-02
- **Maximum Sum Circular Subarray (LeetCode 918):** a circular subarray that wraps is the whole array minus a normal middle. Answer = `max(bestKadane, total − worstKadane)`. One guard: if every number is negative, `total − worst` is the empty array's 0, so return `bestKadane` instead
- **Minimum Swaps to Group All 1's Together (LeetCode 1151):** flip to "which window of length `ones` already holds the most 1s". Swaps = `ones − best`

### The failure

- **Greedy on the ends.** "Take the larger end while it fits" looks natural. On `[3, 5, 1, 4]` with x = 9 it grabs the 4, then the 3, then the 1, and is stuck needing 1 with a 5 left. The answer takes 3, 5, 1 from the left: three operations. Local choices at two ends interact; the kept middle does not
- **Using the flip on negative numbers.** The window shrink needs positives. With negatives, "longest subarray with sum = target" needs a prefix-sum map (page 03-03) instead

:::interview
"You can remove from either end — isn't that exponential?" — The removals are exponential; what remains is not. Any sequence of end-removals leaves one contiguous subarray, so I search over subarrays instead: longest one with sum `total − x`, one sliding-window pass, O(n) time, O(1) space.
:::
