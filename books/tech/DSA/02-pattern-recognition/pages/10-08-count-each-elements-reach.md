## Count Each Element's Reach <span class="lv lv2"></span>

- **What it is:** The contribution technique. Instead of visiting every subarray, ask of each element: *in how many subarrays am I the minimum?* If it can extend `L` steps left and `R` steps right before a smaller value blocks it, it is the minimum of exactly `L · R` subarrays and contributes `a[i] · L · R`
- **Signal:** "sum of the minimum (or maximum) of every subarray", "sum of subarray ranges", "maximum of the minimum for every window size", n up to 3 · 10⁴ or more so O(n²) subarrays is too slow
- **Why it works:** A subarray with minimum `a[i]` must start after the previous smaller element and end before the next smaller one; any start and end in those ranges works. A monotonic stack finds all previous and next smaller elements in O(n) (page 10-05). The n² subarrays are grouped by who their minimum is

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

### The failure

- **The same tie rule on both sides.** On `[1, 1]` (true answer 3): stop at a smaller-*or-equal* element on both sides and the subarray `[1, 1]` belongs to nobody, giving 2; stop only at *strictly* smaller elements on both sides and it belongs to both, giving 4. One side strict, the other non-strict, gives every subarray exactly one owner
- **Overflow of `a[i] · left · right`.** Values up to 3 · 10⁴ and n up to 3 · 10⁴ make the product reach about 7 · 10¹² (left · right ≤ n²/4): fine in a JS number, but it overflows 32-bit integers, and in some languages even the running sum needs 64-bit before the `% MOD`

:::interview
"How do you sum the minimum of all subarrays in O(n)?" — I turn it around and count, for each element, how many subarrays it is the minimum of. That is the number of valid starts times the number of valid ends, found from the previous smaller and next smaller elements with two monotonic-stack passes. The only subtle part is ties: strict on one side, non-strict on the other.
:::
