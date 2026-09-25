## Sliding Window (Variable Length) <span class="lv lv1"></span>

- **What it is:** Two indices that only move right. `right` grows the window to take in the next element; `left` shrinks it until the window satisfies the condition again. The best window seen along the way is the answer
- **Signal:** "longest / shortest subarray or substring such that…", "at most k distinct", "sum at least S", "no repeating characters", all values non-negative
- **Why it works:** The condition is **monotone in the window**: if `[L, R]` is too big (sum over the limit, a repeat inside), every window that contains it is too; for the shortest form, a window that meets the target still meets it when it grows. So once `left` passes an index it never needs to come back, and each index enters and leaves once: O(n)

:::mint
<svg viewBox="0 0 470 140" role="img" aria-label="Minimum Size Subarray Sum on 2, 3, 1, 2, 4, 3 with target 7. The window grows right until its sum reaches 7 at 2, 3, 1, 2 (length 4), then shrinks left while the sum stays at least 7. Later 4, 3 sums to 7 with length 2, the answer. A state loop on the right: expand while invalid, shrink while valid, record the shortest while valid." xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif">
  <style>
    .lb { font: 10px Consolas, monospace; fill: #1a1a1a; }
    .sm { font: 8px Georgia, serif; fill: #6b6b6b; }
    .bx { fill: #ffffff; stroke: #1a1a1a; stroke-width: 1; }
    .win { fill: #dbe7f5; stroke: #1d4e89; stroke-width: 1.2; }
    .best { fill: #e2fcf3; stroke: #2d6a4f; stroke-width: 1.4; }
    .st { fill: #ffffff; stroke: #1d4e89; stroke-width: 1.2; }
  </style>
  <defs><marker id="m0203" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto"><path d="M0,0 L10,5 L0,10 z" fill="#1a1a1a"/></marker></defs>
  <text x="10" y="22" class="sm">sum 8 ≥ 7</text>
  <rect class="win" x="62" y="10" width="28" height="20"/><rect class="win" x="90" y="10" width="28" height="20"/><rect class="win" x="118" y="10" width="28" height="20"/><rect class="win" x="146" y="10" width="28" height="20"/><rect class="bx" x="174" y="10" width="28" height="20"/><rect class="bx" x="202" y="10" width="28" height="20"/>
  <text x="76" y="24" class="lb" text-anchor="middle">2</text><text x="104" y="24" class="lb" text-anchor="middle">3</text><text x="132" y="24" class="lb" text-anchor="middle">1</text><text x="160" y="24" class="lb" text-anchor="middle">2</text><text x="188" y="24" class="lb" text-anchor="middle">4</text><text x="216" y="24" class="lb" text-anchor="middle">3</text>
  <text x="10" y="58" class="sm">shrink: 6 &lt; 7</text>
  <rect class="bx" x="62" y="46" width="28" height="20"/><rect class="win" x="90" y="46" width="28" height="20"/><rect class="win" x="118" y="46" width="28" height="20"/><rect class="win" x="146" y="46" width="28" height="20"/><rect class="bx" x="174" y="46" width="28" height="20"/><rect class="bx" x="202" y="46" width="28" height="20"/>
  <text x="76" y="60" class="lb" text-anchor="middle">2</text><text x="104" y="60" class="lb" text-anchor="middle">3</text><text x="132" y="60" class="lb" text-anchor="middle">1</text><text x="160" y="60" class="lb" text-anchor="middle">2</text><text x="188" y="60" class="lb" text-anchor="middle">4</text><text x="216" y="60" class="lb" text-anchor="middle">3</text>
  <text x="10" y="94" class="sm">best: length 2</text>
  <rect class="bx" x="62" y="82" width="28" height="20"/><rect class="bx" x="90" y="82" width="28" height="20"/><rect class="bx" x="118" y="82" width="28" height="20"/><rect class="bx" x="146" y="82" width="28" height="20"/><rect class="best" x="174" y="82" width="28" height="20"/><rect class="best" x="202" y="82" width="28" height="20"/>
  <text x="76" y="96" class="lb" text-anchor="middle">2</text><text x="104" y="96" class="lb" text-anchor="middle">3</text><text x="132" y="96" class="lb" text-anchor="middle">1</text><text x="160" y="96" class="lb" text-anchor="middle">2</text><text x="188" y="96" class="lb" text-anchor="middle">4</text><text x="216" y="96" class="lb" text-anchor="middle">3</text>
  <text x="62" y="124" class="sm">left and right only move right: each index enters once, leaves once</text>
  <rect class="st" x="290" y="18" width="160" height="26" rx="13"/><text x="370" y="35" class="lb" text-anchor="middle">invalid → expand right</text>
  <rect class="st" x="290" y="76" width="160" height="26" rx="13"/><text x="370" y="93" class="lb" text-anchor="middle">valid → record, shrink</text>
  <path d="M330 44 L330 74" fill="none" stroke="#1a1a1a" stroke-width="1" marker-end="url(#m0203)"/><text x="336" y="63" class="sm">condition met</text>
  <path d="M410 76 L410 46" fill="none" stroke="#1a1a1a" stroke-width="1" marker-end="url(#m0203)"/><text x="416" y="63" class="sm">broken</text>
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
