## Two Passes, Left and Right <span class="lv lv1"></span>

- **What it is:** When the answer at `i` depends on something to its left *and* something to its right, compute each side in its own pass and combine them per index. Two O(n) passes replace an O(n) scan per index
- **Signal:** "water trapped above each bar", "product of all other elements", "each child must beat both neighbours", "longest increasing-then-decreasing run", "index where left sum equals right sum"
- **Why it works:** The left side of `i` is the left side of `i − 1` plus one element, so a forward pass builds all left answers incrementally. The same holds backwards for the right side. Neither pass needs the other until the final combine

:::mint
<svg viewBox="0 0 470 118" role="img" aria-label="Trapping rain water on heights 0, 1, 0, 2, 1, 0, 1, 3, 2, 1, 2, 1. Water above each bar is the minimum of the highest bar to its left and the highest bar to its right, minus its own height. Total water is 6." xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif">
  <style>
    .lb { font: 9px Consolas, monospace; fill: #1a1a1a; }
    .sm { font: 8px Georgia, serif; fill: #6b6b6b; }
    .bar { fill: #1a1a1a; }
    .w { fill: #9cc3e6; }
  </style>
  <!-- unit = 20px, base y = 90, bar width 18, x0 = 20 -->
  <rect class="bar" x="40" y="70" width="18" height="20"/>
  <rect class="w" x="60" y="70" width="18" height="20"/>
  <rect class="bar" x="80" y="50" width="18" height="40"/>
  <rect class="w" x="100" y="50" width="18" height="20"/><rect class="bar" x="100" y="70" width="18" height="20"/>
  <rect class="w" x="120" y="50" width="18" height="40"/>
  <rect class="w" x="140" y="50" width="18" height="20"/><rect class="bar" x="140" y="70" width="18" height="20"/>
  <rect class="bar" x="160" y="30" width="18" height="60"/>
  <rect class="bar" x="180" y="50" width="18" height="40"/>
  <rect class="w" x="200" y="50" width="18" height="20"/><rect class="bar" x="200" y="70" width="18" height="20"/>
  <rect class="bar" x="220" y="50" width="18" height="40"/>
  <rect class="bar" x="240" y="70" width="18" height="20"/>
  <path d="M 18 90 L 262 90" stroke="#6b6b6b" stroke-width="1"/>
  <text x="20" y="108" class="sm">heights 0 1 0 2 1 0 1 3 2 1 2 1</text>
  <text x="290" y="36" class="lb">leftMax[i]  = max(h[0..i])</text>
  <text x="290" y="52" class="lb">rightMax[i] = max(h[i..n−1])</text>
  <text x="290" y="72" class="lb">water[i] = min(leftMax,</text>
  <text x="290" y="84" class="lb">   rightMax) − h[i]</text>
  <text x="290" y="104" class="lb" fill="#1d4e89">total = 6</text>
</svg>
:::

```ts
// Trapping Rain Water (LeetCode 42)
function trap(h: number[]): number {
  const n = h.length;
  const leftMax = new Array(n), rightMax = new Array(n);
  for (let i = 0; i < n; i++)
    leftMax[i] = Math.max(h[i], i > 0 ? leftMax[i - 1] : 0);
  for (let i = n - 1; i >= 0; i--)
    rightMax[i] = Math.max(h[i], i < n - 1 ? rightMax[i + 1] : 0);
  let water = 0;
  for (let i = 0; i < n; i++)
    water += Math.min(leftMax[i], rightMax[i]) - h[i];
  return water;
}
```

### Variations

- **Product of Array Except Self (LeetCode 238):** left pass writes the product of everything before `i`; right pass multiplies in everything after `i`. No division, so zeros need no special case
- **Candy (LeetCode 135):** left pass: `c[i] = c[i−1] + 1` if rating rises. Right pass: `c[i] = max(c[i], c[i+1] + 1)` if rating falls. The `max` keeps the left rule satisfied while fixing the right one
- **Maximum Length Bitonic Subarray (GFG):** `inc[i]` = rising run ending at `i` (left pass), `dec[i]` = falling run starting at `i` (right pass). Answer = `max(inc[i] + dec[i] − 1)`
- **Equilibrium Point (GFG):** left pass is a running sum; the right side is `total − left − a[i]`. Two passes, no second array
- **O(1) space for water:** move two pointers inward from both ends; the side with the smaller running max is already decided, because the other side is guaranteed to be at least as tall

### The failure

- **Recomputing max per index.** `Math.max(...h.slice(0, i))` inside the loop reads the same prefix again and again: O(n²), and it fails on 10⁵ bars
- **One pass for a two-sided rule.** Candy with only a left pass breaks the rule on falling runs: ratings `[1, 3, 2, 1]` need candies `1, 3, 2, 1`, but a left-only pass gives `1, 2, 1, 1`, and the child rated 2 gets no more than the child rated 1

:::interview
"What does the O(1)-space two-pointer version rely on?" — At each step I advance the side whose running max is smaller. That side's water is `itsMax − h`, because the other side already has a bar at least as tall somewhere, so the true right-or-left max can only be larger and the minimum is already known. The two arrays become two variables.
:::
