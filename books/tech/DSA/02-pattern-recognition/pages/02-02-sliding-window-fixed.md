## Sliding Window (Fixed Length) <span class="lv lv1"></span>

- **What it is:** Keep one running summary of exactly k consecutive elements. Each step, one element leaves on the left and one enters on the right; update the summary with those two and nothing else
- **Signal:** "every subarray / substring of length k", "window of size k", "k consecutive days", "all anagrams of p in s"
- **Why it works:** Neighbouring windows share k − 1 elements. If the summary can *undo* an element (a sum, a count, a letter map), the shared part never needs re-reading, so n − k + 1 windows cost O(n) instead of O(n · k)

:::mint
<svg viewBox="0 0 470 138" role="img" aria-label="Array 2, 1, 5, 3, 4 with k equal to 3. Window 1 covers 2, 1, 5 with sum 8. Sliding right, 2 leaves and 3 enters, so the sum becomes 8 minus 2 plus 3 equals 9. Sliding again, 1 leaves and 4 enters: 9 minus 1 plus 4 equals 12. The shared middle is never re-read." xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif">
  <style>
    .lb { font: 10px Consolas, monospace; fill: #1a1a1a; }
    .sm { font: 8px Georgia, serif; fill: #6b6b6b; }
    .bx { fill: #ffffff; stroke: #1a1a1a; stroke-width: 1; }
    .sh { fill: #dbe7f5; stroke: #1d4e89; stroke-width: 1; }
    .out { fill: #ffedf1; stroke: #ef476e; stroke-width: 1.2; }
    .in { fill: #e2fcf3; stroke: #2d6a4f; stroke-width: 1.2; }
    .br { fill: none; stroke: #1d4e89; stroke-width: 1.4; }
  </style>
  <text x="14" y="20" class="sm">window 1</text>
  <rect class="sh" x="70" y="8" width="34" height="22"/><rect class="sh" x="104" y="8" width="34" height="22"/><rect class="sh" x="138" y="8" width="34" height="22"/><rect class="bx" x="172" y="8" width="34" height="22"/><rect class="bx" x="206" y="8" width="34" height="22"/>
  <text x="87" y="23" class="lb" text-anchor="middle">2</text><text x="121" y="23" class="lb" text-anchor="middle">1</text><text x="155" y="23" class="lb" text-anchor="middle">5</text><text x="189" y="23" class="lb" text-anchor="middle">3</text><text x="223" y="23" class="lb" text-anchor="middle">4</text>
  <text x="260" y="23" class="lb">sum = 8</text>
  <text x="14" y="62" class="sm">window 2</text>
  <rect class="out" x="70" y="50" width="34" height="22"/><rect class="sh" x="104" y="50" width="34" height="22"/><rect class="sh" x="138" y="50" width="34" height="22"/><rect class="in" x="172" y="50" width="34" height="22"/><rect class="bx" x="206" y="50" width="34" height="22"/>
  <text x="87" y="65" class="lb" text-anchor="middle">2</text><text x="121" y="65" class="lb" text-anchor="middle">1</text><text x="155" y="65" class="lb" text-anchor="middle">5</text><text x="189" y="65" class="lb" text-anchor="middle">3</text><text x="223" y="65" class="lb" text-anchor="middle">4</text>
  <text x="260" y="65" class="lb">8 − 2 + 3 = 9</text>
  <text x="14" y="104" class="sm">window 3</text>
  <rect class="bx" x="70" y="92" width="34" height="22"/><rect class="out" x="104" y="92" width="34" height="22"/><rect class="sh" x="138" y="92" width="34" height="22"/><rect class="sh" x="172" y="92" width="34" height="22"/><rect class="in" x="206" y="92" width="34" height="22"/>
  <text x="87" y="107" class="lb" text-anchor="middle">2</text><text x="121" y="107" class="lb" text-anchor="middle">1</text><text x="155" y="107" class="lb" text-anchor="middle">5</text><text x="189" y="107" class="lb" text-anchor="middle">3</text><text x="223" y="107" class="lb" text-anchor="middle">4</text>
  <text x="260" y="107" class="lb">9 − 1 + 4 = 12</text>
  <rect class="out" x="70" y="124" width="10" height="8"/><text x="84" y="131" class="sm">leaves</text>
  <rect class="in" x="130" y="124" width="10" height="8"/><text x="144" y="131" class="sm">enters</text>
  <rect class="sh" x="190" y="124" width="10" height="8"/><text x="204" y="131" class="sm">shared, never re-read</text>
</svg>
:::

```ts
// Maximum Average Subarray I (LeetCode 643)
function findMaxAverage(nums: number[], k: number): number {
  let sum = 0;
  for (let i = 0; i < k; i++) sum += nums[i];   // first window
  let best = sum;
  for (let i = k; i < nums.length; i++) {
    sum += nums[i] - nums[i - k];               // enter, leave
    best = Math.max(best, sum);
  }
  return best / k;
}
```

### Variations

- **Maximum Number of Vowels in a Substring of Given Length (LeetCode 1456):** the summary is a count of vowels; add 1 on enter, subtract 1 on leave
- **Find All Anagrams in a String (LeetCode 438):** the summary is a 26-letter count map; a window matches when it equals p's map (the same map is worked for LeetCode 567 in Module 03, 02-03)
- **First negative integer in every window of size k (GFG):** keep a queue of indices of negatives; drop the front once it falls out of the window
- **K Radius Subarray Averages (LeetCode 2090):** a window of 2k + 1 centred on i; windows that would cross an edge answer −1
- **Maximum of every window (LeetCode 239):** a max cannot be undone, so the summary becomes a monotonic deque (10-10)

### The failure

- **Starting `best` at 0.** With all-negative input the true best window is negative: `[−1, −2]` with k = 1 should give −1, but `best = 0` returns 0. Start from the first window, as above

:::interview
"When is a running sum not enough for a fixed window?" — When the summary cannot undo the leaving element. Sums, counts and letter maps subtract cleanly, so each step is O(1). A maximum or minimum cannot forget an element, so I keep a monotonic deque of candidates instead; still O(n) overall.
:::
