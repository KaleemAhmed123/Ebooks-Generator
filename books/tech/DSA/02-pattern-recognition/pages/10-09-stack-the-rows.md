## Stack the Rows <span class="lv lv2"></span>

- **What:** "largest rectangle of 1s" is a histogram asked once per row: `h[c]` = the run of 1s ending at this row in column `c`, and the best rectangle on this row is the largest rectangle under `h`
- **Spot it:** the largest all-1s rectangle in a binary matrix; the largest rectangle under bars. A *square* → a grid DP, `1 + min(up, left, diagonal)`, 17-02
- **Why:** every rectangle has a bottom row and is as tall as its shortest bar. The stack gives each bar its reach to the first shorter bar on each side: O(cols) per row

:::mint
<svg viewBox="0 0 470 118" role="img" aria-label="Binary matrix rows 1 0 1 0 0, 1 0 1 1 1, 1 1 1 1 1, 1 0 0 1 0. At the third row the column heights are 3, 1, 3, 2, 2. The largest rectangle in that histogram has height 2 and width 3 over the last three columns, area 6, which is the answer." xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif">
  <style>
    .lb { font: 9.5px Consolas, monospace; fill: #1a1a1a; }
    .sm { font: 8px Georgia, serif; fill: #6b6b6b; }
    .bar { fill: #1a1a1a; }
    .win { fill: #e2fcf3; stroke: #2d6a4f; stroke-width: 1.4; }
  </style>
  <text x="20" y="20" class="lb">1 0 1 0 0</text>
  <text x="20" y="34" class="lb">1 0 1 1 1</text>
  <text x="20" y="48" class="lb" fill="#1d4e89">1 1 1 1 1   ← bottom row</text>
  <text x="20" y="62" class="lb">1 0 0 1 0</text>
  <text x="20" y="84" class="sm">heights at row 3: 3 1 3 2 2</text>
  <rect class="win" x="298" y="58" width="96" height="44"/>
  <rect class="bar" x="236" y="36" width="28" height="66"/>
  <rect class="bar" x="268" y="80" width="28" height="22" opacity="0.8"/>
  <rect class="bar" x="300" y="36" width="28" height="66" opacity="0.8"/>
  <rect class="bar" x="332" y="58" width="28" height="44" opacity="0.8"/>
  <rect class="bar" x="364" y="58" width="28" height="44" opacity="0.8"/>
  <text x="250" y="114" class="sm" text-anchor="middle">3</text><text x="282" y="114" class="sm" text-anchor="middle">1</text><text x="314" y="114" class="sm" text-anchor="middle">3</text><text x="346" y="114" class="sm" text-anchor="middle">2</text><text x="378" y="114" class="sm" text-anchor="middle">2</text>
  <text x="300" y="30" class="lb" fill="#2d6a4f">height 2 × width 3 = 6</text>
</svg>
:::

```ts
// Maximal Rectangle (LeetCode 85): for each row, h[c] = row[c] === "1" ? h[c] + 1 : 0,
// then best = max(best, largestRectangle(h))
function largestRectangle(h: number[]): number {
  const st: number[] = [];          // indices, heights increasing
  let best = 0;
  for (let i = 0; i <= h.length; i++) {
    // height-0 sentinel flushes
    const cur = i === h.length ? 0 : h[i];
    while (st.length && h[st[st.length - 1]] >= cur) {
      const height = h[st.pop()!];
      const left = st.length ? st[st.length - 1] : -1;
      best = Math.max(best, height * (i - left - 1));
    }
    st.push(i);
  }
  return best;
}
```

- **Watch out:** the sentinel. Without the final height 0, bars never popped stay on the stack: `[1, 2, 3]` reports 0 instead of 4
### Where it appears

| Problem | What the histogram represents |
|---|---|
| [Maximal Rectangle](https://leetcode.com/problems/maximal-rectangle/) (LeetCode 85) | column heights of consecutive 1s per row |
| [Largest Rectangle in Histogram](https://leetcode.com/problems/largest-rectangle-in-histogram/) (LeetCode 84) | the helper alone — bar widths are 1 |

:::interview
"Why append a zero-height sentinel instead of flushing the stack after the loop?"

The sentinel triggers the same `while` branch that already handles shorter arrivals — every bar still on the stack gets popped and measured with one extra iteration, zero extra code paths. A separate flush loop duplicates the width calculation and is easy to get wrong (the `left` boundary after the last pop differs from the mid-loop case).
:::
