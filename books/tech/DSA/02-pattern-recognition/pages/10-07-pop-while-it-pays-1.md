## Pop While It Pays 🟡

- **What it is:** A monotonic stack with a *budget*. To build the smallest (or largest) sequence you can, pop the top whenever the newcomer is better *and* you can still afford to lose the top. Stop popping when the budget runs out or the top is already better
- **Signal:** "remove k digits to make the smallest number", "smallest subsequence containing each letter once", "most competitive subsequence of length k", lexicographically smallest/largest with deletions
- **Why it works:** Lexicographic order is decided by the first position that differs. A larger digit sitting before a smaller one can always be improved by deleting the larger one, and doing it as early as possible fixes the most significant position first. Each digit is pushed and popped at most once: O(n)

:::mint
<svg viewBox="0 0 470 110" role="img" aria-label="Remove K digits on 1432219 with k equal to 3. Push 1, push 4. 3 arrives: 4 is larger and k allows, pop 4. Push 3. 2 arrives: pop 3. Push 2. 2 arrives: equal, push. 1 arrives: pop 2, k becomes 0, push 1. Push 9. Result 1219." xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif">
  <style>
    .lb { font: 9.5px Consolas, monospace; fill: #1a1a1a; }
    .sm { font: 8px Georgia, serif; fill: #6b6b6b; }
    .hot { fill: #ef476e; }
  </style>
  <text x="20" y="18" class="lb">num = "1432219", k = 3</text>
  <text x="20" y="38" class="lb">1 → [1]        4 → [1 4]</text>
  <text x="20" y="54" class="lb">3 → pop 4 (k=2) → [1 3]</text>
  <text x="20" y="70" class="lb">2 → pop 3 (k=1) → [1 2]      2 → [1 2 2]</text>
  <text x="20" y="86" class="lb">1 → pop 2 (k=0) → [1 2 1]    9 → [1 2 1 9]</text>
  <text x="20" y="104" class="lb" fill="#1d4e89">answer "1219"</text>
  <text x="300" y="38" class="sm">pop only while</text>
  <text x="300" y="50" class="sm">top &gt; newcomer AND k &gt; 0</text>
  <text x="300" y="70" class="sm">the earliest bad digit is the</text>
  <text x="300" y="82" class="sm">most significant one to fix</text>
</svg>
:::

```ts
// Remove K Digits (LeetCode 402)
function removeKdigits(num: string, k: number): string {
  const st: string[] = [];
  for (const d of num) {
    while (k > 0 && st.length && st[st.length - 1] > d) {
      st.pop();
      k--;
    }
    st.push(d);
  }
  // still owe deletions: cut the tail
  st.length -= k;
  const s = st.join("").replace(/^0+/, "");
  return s === "" ? "0" : s;
}
```
