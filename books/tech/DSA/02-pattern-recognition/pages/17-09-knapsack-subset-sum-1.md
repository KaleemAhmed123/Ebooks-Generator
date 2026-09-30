## Knapsack & Subset Sum <span class="lv lv1"></span>

- **What:** each item is **take or skip**, and the only thing the future needs is the capacity (or the sum) still available. `dp[s]` = reachable-or-best at budget `s`. One boolean or number array over the budget
- **Spot it:** "can we reach sum S", "partition into two equal halves", "max value within weight W", "fewest coins to make N"
- **Why:** collapsing the item index into a single budget array works because each item is processed once. The **loop direction over the budget encodes reuse**: descend for 0/1 (each item once), ascend for unbounded (reuse allowed)

:::mint
<svg viewBox="0 0 470 140" role="img" aria-label="Subset sum over budget. A boolean array indexed 0 to target starts with only index 0 true. Adding item 5 turns on index 5. For 0/1, the budget loop runs high to low so the new item is not counted twice. For unbounded, the loop runs low to high so an item can be reused. Descending versus ascending is the whole difference." xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif">
  <style>
    .lb { font: 9px Consolas, monospace; fill: #1a1a1a; }
    .sm { font: 8px Georgia, serif; fill: #6b6b6b; }
    .on { fill: #e2fcf3; stroke: #2d6a4f; stroke-width: 1.2; }
    .off { fill: #ffffff; stroke: #c9c9c9; stroke-width: 1; }
    .a1 { stroke: #1d4e89; stroke-width: 1.4; }
    .a2 { stroke: #ef476e; stroke-width: 1.4; }
  </style>
  <defs>
    <marker id="k1a" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto"><path d="M0 0L10 5L0 10z" fill="#1d4e89"/></marker>
    <marker id="k2a" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto"><path d="M0 0L10 5L0 10z" fill="#ef476e"/></marker>
  </defs>
  <text x="20" y="26" class="sm">budget s:</text>
  <g transform="translate(70,14)">
    <rect class="on" x="0" y="0" width="28" height="22"/><text x="14" y="15" class="lb" text-anchor="middle">0</text>
    <rect class="off" x="28" y="0" width="28" height="22"/><text x="42" y="15" class="lb" text-anchor="middle">1</text>
    <rect class="off" x="56" y="0" width="28" height="22"/><text x="70" y="15" class="lb" text-anchor="middle">2</text>
    <rect class="off" x="84" y="0" width="28" height="22"/><text x="98" y="15" class="lb" text-anchor="middle">3</text>
    <rect class="off" x="112" y="0" width="28" height="22"/><text x="126" y="15" class="lb" text-anchor="middle">4</text>
    <rect class="on" x="140" y="0" width="28" height="22"/><text x="154" y="15" class="lb" text-anchor="middle">5</text>
  </g>
  <text x="250" y="20" class="sm">item 5: dp[5] |= dp[0]</text>
  <text x="250" y="34" class="sm">index 0 true → index 5 true</text>
  <line class="a2" x1="238" y1="66" x2="82" y2="66" marker-end="url(#k2a)"/>
  <text x="90" y="60" class="lb" fill="#ef476e">0/1: high → low</text>
  <text x="250" y="70" class="sm">each item used once</text>
  <line class="a1" x1="82" y1="96" x2="238" y2="96" marker-end="url(#k1a)"/>
  <text x="90" y="90" class="lb" fill="#1d4e89">unbounded: low → high</text>
  <text x="250" y="100" class="sm">an item can repeat</text>
  <text x="70" y="128" class="lb">the loop direction is the only difference</text>
</svg>
:::

```ts
// Partition Equal Subset Sum (LeetCode 416): can a subset hit total/2?
function canPartition(nums: number[]): boolean {
  const total = nums.reduce((a, b) => a + b, 0);
  if (total % 2) return false;                          // odd total can't split
  const target = total / 2;
  const dp = new Array(target + 1).fill(false);
  dp[0] = true;                                         // sum 0 always reachable
  for (const x of nums)
    for (let s = target; s >= x; s--)                   // 0/1 → descend
      dp[s] = dp[s] || dp[s - x];
  return dp[target];
}
```

- **Watch out:** the loop direction is not a style choice. Ascending the budget for a 0/1 item lets `dp[s - x]` already include `x`, silently reusing it — that is the unbounded recurrence. Descend for 0/1, ascend for unbounded (coin change). For **max value**, swap the boolean for `Math.max(dp[s], v + dp[s - w])`
