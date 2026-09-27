## Monotonic Stack <span class="lv lv1"></span>

- **What:** the next greater (or smaller) element for every index in one pass. The stack holds indices still waiting; an arrival that beats the top settles it
- **Spot it:** for each element, the first later or earlier one that is larger or smaller; "days until a warmer day"; "span". Old elements must *expire* (a window) → 10-10
- **Why:** a beaten element has its answer: the newcomer. The unbeaten wait in decreasing order, so a newcomer settles a run from the top and stops at the first it does not beat

:::mint
<svg viewBox="0 0 470 150" role="img" aria-label="Next greater element on 2, 1, 5, 3, traced row by row. i 0, value 2: nothing popped, stack 2. i 1, value 1: nothing popped, stack 2, 1. i 2, value 5: pop 1, which sets ans[1] to 5, then pop 2, which sets ans[0] to 5; stack 5. i 3, value 3: nothing popped, stack 5, 3. At the end 5 and 3 are still on the stack and get minus 1. Answer 5, 5, minus 1, minus 1." xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif">
  <style>
    .lb { font: 9.5px Consolas, monospace; fill: #1a1a1a; }
    .sm { font: 8px Georgia, serif; fill: #6b6b6b; }
    .hot { font: 9.5px Consolas, monospace; fill: #ef476e; }
    .bx { fill: #ffffff; stroke: #1a1a1a; stroke-width: 1; }
    .ln { stroke: #d0d0d0; stroke-width: 1; }
  </style>
  <text x="20" y="16" class="sm">i</text><text x="44" y="16" class="sm">a[i]</text>
  <text x="84" y="16" class="sm">pops, and the answer each pop sets</text>
  <text x="330" y="16" class="sm">stack after (bottom → top)</text>
  <line class="ln" x1="16" y1="22" x2="456" y2="22"/>
  <text x="20" y="38" class="lb">0</text><text x="48" y="38" class="lb">2</text><text x="84" y="38" class="sm">none</text>
  <rect class="bx" x="330" y="27" width="22" height="15"/><text x="341" y="38" class="lb" text-anchor="middle">2</text>
  <text x="20" y="60" class="lb">1</text><text x="48" y="60" class="lb">1</text><text x="84" y="60" class="sm">none: 1 does not beat 2</text>
  <rect class="bx" x="330" y="49" width="22" height="15"/><text x="341" y="60" class="lb" text-anchor="middle">2</text>
  <rect class="bx" x="354" y="49" width="22" height="15"/><text x="365" y="60" class="lb" text-anchor="middle">1</text>
  <text x="20" y="82" class="lb">2</text><text x="48" y="82" class="lb">5</text>
  <text x="84" y="82" class="hot">pop 1 → ans[1] = 5,  pop 2 → ans[0] = 5</text>
  <rect class="bx" x="330" y="71" width="22" height="15"/><text x="341" y="82" class="lb" text-anchor="middle">5</text>
  <text x="20" y="104" class="lb">3</text><text x="48" y="104" class="lb">3</text><text x="84" y="104" class="sm">none: 3 does not beat 5</text>
  <rect class="bx" x="330" y="93" width="22" height="15"/><text x="341" y="104" class="lb" text-anchor="middle">5</text>
  <rect class="bx" x="354" y="93" width="22" height="15"/><text x="365" y="104" class="lb" text-anchor="middle">3</text>
  <line class="ln" x1="16" y1="114" x2="456" y2="114"/>
  <text x="20" y="128" class="sm">end</text><text x="84" y="128" class="lb">still waiting: 5, 3 → ans[2] = ans[3] = −1</text>
  <text x="84" y="144" class="lb" fill="#1d4e89">ans = [5, 5, −1, −1]</text>
</svg>
:::

```ts
// Daily Temperatures (LeetCode 739)
function dailyTemperatures(t: number[]): number[] {
  const ans = new Array(t.length).fill(0), st: number[] = []; // indices waiting
  for (let i = 0; i < t.length; i++) {
    while (st.length && t[st[st.length - 1]] < t[i]) {
      const j = st.pop()!;
      ans[j] = i - j;                                  // i settles j
    }
    st.push(i);
  }
  return ans;
}
```

- **Watch out:** match the comparison to the word. Popping on `>=` for "greater" lets equals settle each other: on `[2, 2]` the first 2 gets 2 instead of −1
### Where it appears

| Problem | What each element waits for |
|---|---|
| [Daily Temperatures](https://leetcode.com/problems/daily-temperatures/) (LeetCode 739) | next warmer day |
| [Next Greater Element I](https://leetcode.com/problems/next-greater-element-i/) (LeetCode 496) | next greater value |
| [Online Stock Span](https://leetcode.com/problems/online-stock-span/) (LeetCode 901) | previous greater (read top after popping) |
| [Next Greater Element II](https://leetcode.com/problems/next-greater-element-ii/) (LeetCode 503) | circular; push only first lap (→ 04-06) |

:::interview
"What changes for 'next smaller' instead of 'next greater'?"

Flip the comparison: pop while the top is *greater than* the newcomer instead of *less than*. The stack then holds values in increasing order (bottom to top) instead of decreasing. Everything else — the loop, the answer assignment, the sentinel — stays the same.
:::
