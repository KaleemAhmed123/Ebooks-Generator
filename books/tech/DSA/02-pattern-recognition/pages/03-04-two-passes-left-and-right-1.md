## Two Passes, Left and Right <span class="lv lv1"></span>

- **What it is:** When the answer at `i` depends on something to its left *and* something to its right, compute each side in its own pass and combine them per index. Two O(n) passes replace an O(n) scan per index
- **Signal:** "water trapped above each bar", "product of all other elements", "each child must beat both neighbours", "longest increasing-then-decreasing run", "index where left sum equals right sum"
- **Not this page if:** each `j` needs only the best value on its left, never its right: one variable in one pass → 03-05
- **Why it works:** The left side of `i` is the left side of `i − 1` plus one element, so a forward pass builds all left answers incrementally. The same holds backwards for the right side. Neither pass needs the other until the final combine

:::mint
<svg viewBox="0 0 470 124" role="img" aria-label="Trapping rain water on heights 0, 1, 0, 2, 1, 0, 1, 3, 2, 1, 2, 1. A blue step line, leftMax, rises from left to right: 0, 1, 1, 2, 2, 2, 2, then 3 to the end. A red step line, rightMax, falls from left to right: 3 up to the tallest bar, then 2, 2, 2, 1. Over each bar the water fills up to the lower of the two lines, minus the bar. Left of the tallest bar the blue line is lower, right of it the red line is lower. Total water is 6." xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif">
  <style>
    .lb { font: 9px Consolas, monospace; fill: #1a1a1a; }
    .sm { font: 8px Georgia, serif; fill: #6b6b6b; }
    .bar { fill: #1a1a1a; }
    .w { fill: #9cc3e6; }
    .lm { fill: none; stroke: #1d4e89; stroke-width: 1.6; }
    .rm { fill: none; stroke: #ef476e; stroke-width: 1.6; stroke-dasharray: 4 2; }
  </style>
  <rect class="bar" x="37" y="70" width="18" height="18"/>
  <rect class="w" x="57" y="70" width="18" height="18"/>
  <rect class="bar" x="77" y="52" width="18" height="36"/>
  <rect class="w" x="97" y="52" width="18" height="18"/>
  <rect class="bar" x="97" y="70" width="18" height="18"/>
  <rect class="w" x="117" y="52" width="18" height="36"/>
  <rect class="w" x="137" y="52" width="18" height="18"/>
  <rect class="bar" x="137" y="70" width="18" height="18"/>
  <rect class="bar" x="157" y="34" width="18" height="54"/>
  <rect class="bar" x="177" y="52" width="18" height="36"/>
  <rect class="w" x="197" y="52" width="18" height="18"/>
  <rect class="bar" x="197" y="70" width="18" height="18"/>
  <rect class="bar" x="217" y="52" width="18" height="36"/>
  <rect class="bar" x="237" y="70" width="18" height="18"/>
  <path class="lm" d="M16 86.5 L16 86.5 L36 86.5 L36 68.5 L56 68.5 L56 68.5 L76 68.5 L76 50.5 L96 50.5 L96 50.5 L116 50.5 L116 50.5 L136 50.5 L136 50.5 L156 50.5 L156 32.5 L176 32.5 L176 32.5 L196 32.5 L196 32.5 L216 32.5 L216 32.5 L236 32.5 L236 32.5 L256 32.5"/>
  <path class="rm" d="M16 35.5 L16 35.5 L36 35.5 L36 35.5 L56 35.5 L56 35.5 L76 35.5 L76 35.5 L96 35.5 L96 35.5 L116 35.5 L116 35.5 L136 35.5 L136 35.5 L156 35.5 L156 35.5 L176 35.5 L176 53.5 L196 53.5 L196 53.5 L216 53.5 L216 53.5 L236 53.5 L236 71.5 L256 71.5"/>
  <path d="M14 88 L258 88" stroke="#6b6b6b" stroke-width="1"/>
  <text x="26.0" y="99" class="sm" text-anchor="middle">0</text>
  <text x="46.0" y="99" class="sm" text-anchor="middle">1</text>
  <text x="66.0" y="99" class="sm" text-anchor="middle">0</text>
  <text x="86.0" y="99" class="sm" text-anchor="middle">2</text>
  <text x="106.0" y="99" class="sm" text-anchor="middle">1</text>
  <text x="126.0" y="99" class="sm" text-anchor="middle">0</text>
  <text x="146.0" y="99" class="sm" text-anchor="middle">1</text>
  <text x="166.0" y="99" class="sm" text-anchor="middle">3</text>
  <text x="186.0" y="99" class="sm" text-anchor="middle">2</text>
  <text x="206.0" y="99" class="sm" text-anchor="middle">1</text>
  <text x="226.0" y="99" class="sm" text-anchor="middle">2</text>
  <text x="246.0" y="99" class="sm" text-anchor="middle">1</text>
  <text x="16" y="116" class="sm">heights; water fills to the lower line</text>
  <line x1="275" y1="14" x2="297" y2="14" class="lm"/><text x="303" y="17" class="lb">leftMax: pass 1, rises</text>
  <line x1="275" y1="30" x2="297" y2="30" class="rm"/><text x="303" y="33" class="lb">rightMax: pass 2, falls</text>
  <text x="275" y="54" class="lb">water[i] = min(lines) − h[i]</text>
  <text x="275" y="74" class="sm">left of the peak the blue line is lower,</text>
  <text x="275" y="85" class="sm">right of it the red one: the two-pointer</text>
  <text x="275" y="96" class="sm">version follows whichever line is lower</text>
  <text x="275" y="114" class="lb" fill="#1d4e89">total = 6</text>
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
