## Sweep Line <span class="lv lv1"></span>

- **What:** each interval becomes two events, `+1` at its start and `−1` at its end. Sort the events, walk them with a running count: the count is how many intervals are open
- **Spot it:** *how many* are open at one moment: "at the same time", "fewest rooms / platforms / groups", "busiest moment". *Which* stretches are covered → 07-07
- **Why:** overlap changes only at an endpoint, so 2n sorted events describe every moment: O(n log n) instead of comparing all pairs

:::mint
<svg viewBox="0 0 470 142" role="img" aria-label="Intervals A from 1 to 5, B from 2 to 4 and C from 6 to 8 on a timeline. Events: plus 1 at times 1, 2 and 6, minus 1 at times 4, 5 and 8. The running count goes 1, 2, 1, 0, 1, 0; its peak of 2 lies between times 2 and 4, when A and B overlap." xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif">
  <style>
    .lb { font: 9px Consolas, monospace; fill: #1a1a1a; }
    .sm { font: 8px Georgia, serif; fill: #6b6b6b; }
    .iv { fill: #dbe7f5; stroke: #1d4e89; stroke-width: 1; }
    .up { font: bold 9px Consolas, monospace; fill: #2d6a4f; }
    .dn { font: bold 9px Consolas, monospace; fill: #ef476e; }
  </style>
    <rect class="iv" x="84" y="14" width="176" height="11" rx="3"/><text x="88" y="23" class="lb">A [1, 5]</text>
  <rect class="iv" x="128" y="30" width="88" height="11" rx="3"/><text x="132" y="39" class="lb">B [2, 4]</text>
  <rect class="iv" x="304" y="14" width="88" height="11" rx="3"/><text x="308" y="23" class="lb">C [6, 8]</text>
  <line x1="30" y1="62" x2="436" y2="62" stroke="#1a1a1a" stroke-width="1"/>
  <line x1="84" y1="59" x2="84" y2="65" stroke="#1a1a1a" stroke-width="0.8"/><text x="84" y="74" class="sm" text-anchor="middle">1</text>
  <line x1="128" y1="59" x2="128" y2="65" stroke="#1a1a1a" stroke-width="0.8"/><text x="128" y="74" class="sm" text-anchor="middle">2</text>
  <line x1="172" y1="59" x2="172" y2="65" stroke="#1a1a1a" stroke-width="0.8"/><text x="172" y="74" class="sm" text-anchor="middle">3</text>
  <line x1="216" y1="59" x2="216" y2="65" stroke="#1a1a1a" stroke-width="0.8"/><text x="216" y="74" class="sm" text-anchor="middle">4</text>
  <line x1="260" y1="59" x2="260" y2="65" stroke="#1a1a1a" stroke-width="0.8"/><text x="260" y="74" class="sm" text-anchor="middle">5</text>
  <line x1="304" y1="59" x2="304" y2="65" stroke="#1a1a1a" stroke-width="0.8"/><text x="304" y="74" class="sm" text-anchor="middle">6</text>
  <line x1="348" y1="59" x2="348" y2="65" stroke="#1a1a1a" stroke-width="0.8"/><text x="348" y="74" class="sm" text-anchor="middle">7</text>
  <line x1="392" y1="59" x2="392" y2="65" stroke="#1a1a1a" stroke-width="0.8"/><text x="392" y="74" class="sm" text-anchor="middle">8</text>
  <text x="84" y="88" class="up" text-anchor="middle">+1</text>
  <text x="128" y="88" class="up" text-anchor="middle">+1</text>
  <text x="216" y="88" class="dn" text-anchor="middle">−1</text>
  <text x="260" y="88" class="dn" text-anchor="middle">−1</text>
  <text x="304" y="88" class="up" text-anchor="middle">+1</text>
  <text x="392" y="88" class="dn" text-anchor="middle">−1</text>
  <path d="M53.2 128 L84 128 L84 116 L128 116 L128 104 L216 104 L216 116 L260 116 L260 128 L304 128 L304 116 L392 116 L392 128 L436 128 L436 128" fill="none" stroke="#1d4e89" stroke-width="1.6"/>
  <line x1="30" y1="128" x2="436" y2="128" stroke="#c9c9c9" stroke-width="0.8"/>
  <rect x="128" y="104" width="88" height="24" fill="#e2fcf3" stroke="none" opacity="0.8"/>
  <text x="172" y="100" class="lb" text-anchor="middle">peak 2</text>
  <text x="40" y="138" class="sm">running count = intervals open at that moment</text>
  <text x="40" y="52" class="sm">sort the 6 events by time, add them in time order</text>
</svg>
:::

```ts
// Divide Intervals Into Minimum Number of Groups (LeetCode 2406)
function minGroups(intervals: number[][]): number {
  const ev: number[][] = [];
  for (const [s, e] of intervals) ev.push([s, 1], [e + 1, -1]); // closed: off after e
  ev.sort((a, b) => a[0] - b[0] || a[1] - b[1]);                 // tie: −1 first
  let open = 0, best = 0;
  for (const [, d] of ev) best = Math.max(best, (open += d));
  return best;
}
```

- **Watch out:** the tie rule. Whether `[1, 3]` and `[3, 5]` overlap depends on the statement. Closed intervals switch off at `e + 1`; half-open ones at `e`, with ends before starts at equal times. Get it wrong and the peak is one off
- **Also solves:** [Minimum Platforms](https://www.geeksforgeeks.org/problems/minimum-platforms-1587115620/1) (GFG) · [Number of Flowers in Full Bloom](https://leetcode.com/problems/number-of-flowers-in-full-bloom/) (LeetCode 2251) (sort starts and ends apart; count with binary search) · [The Skyline Problem](https://leetcode.com/problems/the-skyline-problem/) (LeetCode 218) (events carry heights; a max-heap of the open ones)
