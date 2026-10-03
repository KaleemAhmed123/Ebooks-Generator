## Sliding Window (Variable Length) <span class="lv lv1"></span>

- **What:** `right` takes in the next item; `left` shrinks the window until the condition holds again. The best window seen is the answer
- **Spot it:** "longest / shortest subarray such that…", "at most k distinct", "no repeating characters", values ≥ 0. Negatives can lower a sum → 03-03 (sum = K) or 10-10 (sum ≥ K)
- **Why:** the condition is monotone in the window, so `left` never moves back. Each index enters once and leaves once: O(n)

:::mint
<svg viewBox="0 0 470 146" role="img" aria-label="Two loops side by side. Longest: take a right element; while the window is invalid, move left; then record the window length as a candidate maximum, and take the next element. Shortest: take a right element; while the window is valid, record its length as a candidate minimum, then move left; once it is invalid, take the next element. The record step sits after the shrink loop for longest and inside it for shortest." xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif">
  <style>
    .lb { font: 9.5px Consolas, monospace; fill: #1a1a1a; }
    .hd { font: bold 10px Georgia, serif; fill: #1a1a1a; }
    .sm { font: 8px Georgia, serif; fill: #6b6b6b; }
    .st { fill: #ffffff; stroke: #1d4e89; stroke-width: 1.1; }
    .lp { fill: #dbe7f5; stroke: #1d4e89; stroke-width: 1.1; }
    .rec { fill: #e2fcf3; stroke: #2d6a4f; stroke-width: 1.4; }
    .ar { fill: none; stroke: #1a1a1a; stroke-width: 1; }
  </style>
  <defs><marker id="m0203" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto"><path d="M0,0 L10,5 L0,10 z" fill="#1a1a1a"/></marker></defs>
  <text x="30" y="13" class="hd">LONGEST</text><text x="96" y="13" class="sm">(LeetCode 3, 424, 904, 1004)</text>
  <rect class="st" x="30" y="22" width="170" height="20" rx="4"/><text x="115" y="36" class="lb" text-anchor="middle">right++, take a[right]</text>
  <path class="ar" d="M115 42 L115 54" marker-end="url(#m0203)"/>
  <rect class="lp" x="30" y="56" width="170" height="20" rx="4"/><text x="115" y="70" class="lb" text-anchor="middle">while invalid: left++</text>
  <path class="ar" d="M200 60 C 218 60, 218 72, 202 72" marker-end="url(#m0203)"/>
  <path class="ar" d="M115 76 L115 88" marker-end="url(#m0203)"/>
  <rect class="rec" x="30" y="90" width="170" height="20" rx="4"/><text x="115" y="104" class="lb" text-anchor="middle">★ record max(best, len)</text>
  <path class="ar" d="M30 100 L18 100 L18 32 L28 32" marker-end="url(#m0203)"/>
  <text x="30" y="126" class="sm">the loop exits on a valid window:</text>
  <text x="30" y="137" class="sm">record after it</text>
  <text x="262" y="13" class="hd">SHORTEST</text><text x="332" y="13" class="sm">(LeetCode 209, 76)</text>
  <rect class="st" x="262" y="22" width="170" height="20" rx="4"/><text x="347" y="36" class="lb" text-anchor="middle">right++, take a[right]</text>
  <path class="ar" d="M347 42 L347 54" marker-end="url(#m0203)"/>
  <rect class="lp" x="262" y="56" width="170" height="54" rx="4"/><text x="272" y="70" class="lb">while valid:</text>
  <rect class="rec" x="280" y="75" width="140" height="15" rx="3"/><text x="286" y="86" class="lb">★ record min(best, len)</text>
  <text x="286" y="104" class="lb">left++</text>
  <path class="ar" d="M432 100 C 452 100, 452 70, 434 70" marker-end="url(#m0203)"/>
  <path class="ar" d="M262 104 L250 104 L250 32 L260 32" marker-end="url(#m0203)"/>
  <text x="262" y="126" class="sm">every shrink starts from a valid window:</text>
  <text x="262" y="137" class="sm">record inside the loop, before left++</text>
</svg>
:::

```ts
// Minimum Size Subarray Sum (LeetCode 209): shortest, sum ≥ target
function minSubArrayLen(target: number, nums: number[]): number {
  let left = 0, sum = 0, best = Infinity;
  for (let right = 0; right < nums.length; right++) {
    sum += nums[right];                      // expand
    // valid: record, shrink
    while (sum >= target) {
      best = Math.min(best, right - left + 1);
      sum -= nums[left++];
    }
  }
  return best === Infinity ? 0 : best;
}
```

- **Watch out:** where the record goes. *Longest:* shrink while invalid, then record. *Shortest:* record inside the loop, while still valid, before `left++`
