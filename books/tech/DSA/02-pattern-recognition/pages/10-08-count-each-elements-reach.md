## Count Each Element's Reach <span class="lv lv2"></span>

- **What:** ask each element *how many subarrays is it the minimum of?* Reaching `L` left and `R` right before a smaller value, it adds `a[i] · L · R`
- **Spot it:** "sum of the minimum (or maximum) of every subarray". *Counting* subarrays whose max is in `[L, R]` → 02-05
- **Why:** a subarray with minimum `a[i]` starts after the previous smaller and ends before the next smaller

:::mint
<svg viewBox="0 0 470 110" role="img" aria-label="Sum of subarray minimums on 3, 1, 2, 4. Element 1 at index 1 has no smaller element on either side: it can start at index 0 or 1 and end at index 1, 2 or 3, so L is 2, R is 3 and it is the minimum of 6 subarrays, contributing 6. Element 3 contributes 3, element 2 contributes 2 times 1 times 2, 4, element 4 contributes 4. Total 17." xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif">
  <style>
    .lb { font: 10px Consolas, monospace; fill: #1a1a1a; }
    .sm { font: 8px Georgia, serif; fill: #6b6b6b; }
    .bx { fill: #ffffff; stroke: #1a1a1a; stroke-width: 1.1; }
    .me { fill: #dbe7f5; stroke: #1d4e89; stroke-width: 1.2; }
    .br { stroke: #2d6a4f; stroke-width: 1.4; fill: none; }
  </style>
  <rect class="bx" x="40" y="14" width="36" height="24"/><text x="58" y="30" class="lb" text-anchor="middle">3</text>
  <rect class="me" x="76" y="14" width="36" height="24"/><text x="94" y="30" class="lb" text-anchor="middle">1</text>
  <rect class="bx" x="112" y="14" width="36" height="24"/><text x="130" y="30" class="lb" text-anchor="middle">2</text>
  <rect class="bx" x="148" y="14" width="36" height="24"/><text x="166" y="30" class="lb" text-anchor="middle">4</text>
  <path class="br" d="M 42 46 L 110 46"/><text x="76" y="58" class="sm" text-anchor="middle">L = 2 starts</text>
  <path class="br" d="M 78 66 L 182 66"/><text x="130" y="78" class="sm" text-anchor="middle">R = 3 ends</text>
  <text x="210" y="30" class="lb">1 is the min of 2 · 3 = 6 subarrays</text>
  <text x="210" y="50" class="lb">3·1·1 + 1·2·3 + 2·1·2 + 4·1·1</text>
  <text x="210" y="66" class="lb">= 3 + 6 + 4 + 4 = 17</text>
  <text x="40" y="100" class="sm">ties: strictly smaller on one side, smaller-or-equal on the other, so each subarray has exactly one owner</text>
</svg>
:::

```ts
// Sum of Subarray Minimums (LeetCode 907), answer mod 1e9+7
function sumSubarrayMins(a: number[]): number {
  const n = a.length, MOD = 1_000_000_007;
  const left = new Array(n), right = new Array(n), st: number[] = [];
  for (let i = 0; i < n; i++) {       // previous strictly smaller
    while (st.length && a[st[st.length - 1]] >= a[i]) st.pop();
    left[i] = st.length ? i - st[st.length - 1] : i + 1;
    st.push(i);
  }
  st.length = 0;
  for (let i = n - 1; i >= 0; i--) {        // next smaller-or-equal
    while (st.length && a[st[st.length - 1]] > a[i]) st.pop();
    right[i] = st.length ? st[st.length - 1] - i : n - i;
    st.push(i);
  }
  let sum = 0;
  for (let i = 0; i < n; i++)
    sum = (sum + a[i] * left[i] * right[i]) % MOD;
  return sum;
}
```

- **Watch out:** ties. On `[1, 1]` (answer 3), `≤` on both sides gives 2, `<` on both gives 4: make one side strict
### Where it appears

| Problem | What each element "owns" |
|---|---|
| [Sum of Subarray Minimums](https://leetcode.com/problems/sum-of-subarray-minimums/) (LeetCode 907) | subarrays where it is the min |
| [Sum of Subarray Ranges](https://leetcode.com/problems/sum-of-subarray-ranges/) (LeetCode 2104) | sum of maxes − sum of mins |

:::interview
"Why make one boundary strict and the other non-strict for ties?"

With `[1, 1]`, the subarray `[1, 1]` has minimum 1 — but which index "owns" it? If both boundaries are `<`, each 1 claims it — double-counted. If both are `<=`, neither claims it — missed. Making one side strict and the other non-strict assigns exactly one owner per subarray, always.
:::
