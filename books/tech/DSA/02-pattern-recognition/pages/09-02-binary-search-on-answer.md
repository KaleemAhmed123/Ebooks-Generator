## Binary Search on the Answer <span class="lv lv1"></span>

- **What:** search the *answer*: guess X, check "can it be done with X?", and halve the range of X by where the check flips
- **Spot it:** "minimise the maximum", "maximise the minimum", "the least capacity / speed / days". Pieces whose costs are *added*, not capped → DP, 17-02
- **Why:** checking one capacity is a greedy O(n) pass, and if C works so does C + 1: O(n log range)

:::mint
<svg viewBox="0 0 470 106" role="img" aria-label="Koko with piles 8 and 5 and 3 hours. Speeds 1 to 8; canEat is false for 1 to 4 and true for 5 to 8. Probes: lo 1, hi 8, mid 4 is false so lo becomes 5; mid 6 is true so hi becomes 6; mid 5 is true so hi becomes 5; lo equals hi equals 5, the answer." xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif">
  <style>
    .lb { font: 9.5px Consolas, monospace; fill: #1a1a1a; }
    .sm { font: 8px Georgia, serif; fill: #6b6b6b; }
    .f { fill: #ffedf1; stroke: #ef476e; stroke-width: 1; }
    .t { fill: #e2fcf3; stroke: #2d6a4f; stroke-width: 1; }
    .ans { fill: #e2fcf3; stroke: #2d6a4f; stroke-width: 2.2; }
  </style>
  <text x="14" y="14" class="sm">piles [8, 5], h = 3: can speed K eat both piles in 3 hours?</text>
  <text x="14" y="36" class="sm">K</text><text x="14" y="56" class="sm">canEat(K)</text>
  <text x="85" y="36" class="lb" text-anchor="middle">1</text>
  <rect class="f" x="73" y="42" width="24" height="20" rx="2"/><text x="85" y="56" class="lb" text-anchor="middle" fill="#ef476e">F</text>
  <text x="115" y="36" class="lb" text-anchor="middle">2</text>
  <rect class="f" x="103" y="42" width="24" height="20" rx="2"/><text x="115" y="56" class="lb" text-anchor="middle" fill="#ef476e">F</text>
  <text x="145" y="36" class="lb" text-anchor="middle">3</text>
  <rect class="f" x="133" y="42" width="24" height="20" rx="2"/><text x="145" y="56" class="lb" text-anchor="middle" fill="#ef476e">F</text>
  <text x="175" y="36" class="lb" text-anchor="middle">4</text>
  <rect class="f" x="163" y="42" width="24" height="20" rx="2"/><text x="175" y="56" class="lb" text-anchor="middle" fill="#ef476e">F</text>
  <text x="205" y="36" class="lb" text-anchor="middle">5</text>
  <rect class="ans" x="193" y="42" width="24" height="20" rx="2"/><text x="205" y="56" class="lb" text-anchor="middle" fill="#2d6a4f">T</text>
  <text x="235" y="36" class="lb" text-anchor="middle">6</text>
  <rect class="t" x="223" y="42" width="24" height="20" rx="2"/><text x="235" y="56" class="lb" text-anchor="middle" fill="#2d6a4f">T</text>
  <text x="265" y="36" class="lb" text-anchor="middle">7</text>
  <rect class="t" x="253" y="42" width="24" height="20" rx="2"/><text x="265" y="56" class="lb" text-anchor="middle" fill="#2d6a4f">T</text>
  <text x="295" y="36" class="lb" text-anchor="middle">8</text>
  <rect class="t" x="283" y="42" width="24" height="20" rx="2"/><text x="295" y="56" class="lb" text-anchor="middle" fill="#2d6a4f">T</text>
  <text x="175" y="76" class="sm" text-anchor="middle">probe 1</text>
  <text x="235" y="76" class="sm" text-anchor="middle">probe 2</text>
  <text x="205" y="76" class="sm" text-anchor="middle">probe 3</text>
  <text x="322" y="36" class="lb">1. [1, 8] mid 4: F → lo = 5</text>
  <text x="322" y="52" class="lb">2. [5, 8] mid 6: T → hi = 6</text>
  <text x="322" y="68" class="lb">3. [5, 6] mid 5: T → hi = 5</text>
  <text x="322" y="84" class="lb">[5, 5] lo = hi: answer 5</text>
  <text x="14" y="98" class="sm">answer = the first T · mid = (lo + hi) &gt;&gt; 1 · T: hi = mid (mid may be the answer) · F: lo = mid + 1</text>
</svg>
:::

```ts
// Capacity To Ship Packages Within D Days (LeetCode 1011)
function shipWithinDays(weights: number[], days: number): number {
  const fits = (cap: number) => {   // greedy: fill each day
    let used = 1, load = 0;
    for (const w of weights) {
      if (load + w > cap) { used++; load = 0; }
      load += w;
    }
    return used <= days;
  };
  let lo = weights.reduce((m, w) => Math.max(m, w), 0);
  let hi = weights.reduce((a, b) => a + b);
  while (lo < hi) {                 // first capacity that fits
    const mid = (lo + hi) >> 1;
    if (fits(mid)) hi = mid; else lo = mid + 1;
  }
  return lo;
}
```

- **Watch out:** starting `lo` at 1. The check gives an oversized package its own day, so `[5, 1]` looks shippable in 3 days at capacity 3. Start at `max(weights)`
- **Also solves:** [Koko Eating Bananas](https://leetcode.com/problems/koko-eating-bananas/) (LeetCode 875) · [Split Array Largest Sum](https://leetcode.com/problems/split-array-largest-sum/) (LeetCode 410) · [Magnetic Force Between Two Balls](https://leetcode.com/problems/magnetic-force-between-two-balls/) (LeetCode 1552) (maximise the minimum: the last true)
