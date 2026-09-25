## Count Each Element's Reach 🟡 - continued

```ts
// Sum of Subarray Minimums (LeetCode 907), answer mod 1e9+7
function sumSubarrayMins(a: number[]): number {
  const n = a.length, MOD = 1_000_000_007;
  const left = new Array(n), right = new Array(n);
  const st: number[] = [];
  // previous strictly smaller
  for (let i = 0; i < n; i++) {
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

### Variations

- **Sum of Subarray Ranges (LeetCode 2104):** range = max − min, so the answer is Σ(max contributions) − Σ(min contributions). Run the same routine twice with the comparisons flipped
- **Maximum of minimum for every window size (GFG):** `a[i]` is the minimum of a window of length `len = left[i] + right[i] − 1`. Record `best[len] = max(best[len], a[i])`, then sweep `best` from long to short windows, because an answer for length L is also achievable for every shorter length
- **Largest Rectangle in Histogram:** the same reach arrays; the rectangle at bar `i` has width `left[i] + right[i] − 1` (page 10-09)
- **Number of subarrays with maximum in [L, R] (GFG / LeetCode 795):** count subarrays whose maximum ≤ R minus those whose maximum ≤ L − 1: a counting pass, same "at most" subtraction as page 02-05
