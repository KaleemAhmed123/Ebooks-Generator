## Stack the Rows <span class="lv lv2"></span> - continued

```ts
// Maximal Rectangle (LeetCode 85); rows of "0"/"1"
function maximalRectangle(m: string[][]): number {
  const cols = m[0].length, h = new Array(cols).fill(0);
  let best = 0;
  for (const row of m) {
    for (let c = 0; c < cols; c++)
      h[c] = row[c] === "1" ? h[c] + 1 : 0;
    best = Math.max(best, largestRectangle(h));
  }
  return best;
}

// Largest Rectangle in Histogram (LeetCode 84)
function largestRectangle(h: number[]): number {
  // indices, heights increasing
  const st: number[] = [];
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
