## Send Each Value Home 🟡

- **What it is:** Cyclic placement. When values belong to `1..n`, value `v` has a home at index `v − 1`. Swap each value into its home until every slot holds its owner or a value with no home. One scan then reads off what is missing or doubled
- **Signal:** "values in the range 1..n (or 0..n)", "find the missing / duplicate / first missing positive", "O(n) time and O(1) extra space"
- **Why it works:** Every swap puts at least one value into its final slot, and a settled value never moves again. So there are at most n swaps in total, even though the loop looks nested. After placement, the first index `i` with `a[i] ≠ i + 1` names the first missing value

:::mint
<svg viewBox="0 0 470 112" role="img" aria-label="First missing positive on 3, 4, minus 1, 1. Swap 3 to index 2, swap minus 1 stays, swap 4 to index 3, swap 1 to index 0. The result is 1, minus 1, 3, 4. Index 1 does not hold 2, so the answer is 2." xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif">
  <style>
    .lb { font: 10px Consolas, monospace; fill: #1a1a1a; }
    .sm { font: 8px Georgia, serif; fill: #6b6b6b; }
    .bx { fill: #ffffff; stroke: #1a1a1a; stroke-width: 1.1; }
    .hi { fill: #e2fcf3; stroke: #2d6a4f; stroke-width: 1.1; }
    .hot { fill: #ffedf1; stroke: #ef476e; stroke-width: 1.1; }
  </style>
  <text x="20" y="28" class="sm">start</text>
  <rect class="bx" x="80" y="14" width="34" height="22"/><text x="97" y="29" class="lb" text-anchor="middle">3</text>
  <rect class="bx" x="114" y="14" width="34" height="22"/><text x="131" y="29" class="lb" text-anchor="middle">4</text>
  <rect class="bx" x="148" y="14" width="34" height="22"/><text x="165" y="29" class="lb" text-anchor="middle">−1</text>
  <rect class="bx" x="182" y="14" width="34" height="22"/><text x="199" y="29" class="lb" text-anchor="middle">1</text>
  <text x="20" y="72" class="sm">placed</text>
  <rect class="hi" x="80" y="58" width="34" height="22"/><text x="97" y="73" class="lb" text-anchor="middle">1</text>
  <rect class="hot" x="114" y="58" width="34" height="22"/><text x="131" y="73" class="lb" text-anchor="middle">−1</text>
  <rect class="hi" x="148" y="58" width="34" height="22"/><text x="165" y="73" class="lb" text-anchor="middle">3</text>
  <rect class="hi" x="182" y="58" width="34" height="22"/><text x="199" y="73" class="lb" text-anchor="middle">4</text>
  <text x="97" y="96" class="sm" text-anchor="middle">1 ✓</text><text x="131" y="96" class="sm" text-anchor="middle" fill="#ef476e">≠ 2</text>
  <text x="250" y="30" class="lb">swap a[i] ↔ a[a[i] − 1]</text>
  <text x="250" y="44" class="sm">while a[i] is in 1..n and not already home</text>
  <text x="250" y="76" class="lb" fill="#ef476e">first i with a[i] ≠ i + 1 → 2</text>
</svg>
:::

```ts
// First Missing Positive (LeetCode 41)
function firstMissingPositive(a: number[]): number {
  const n = a.length;
  for (let i = 0; i < n; i++) {
    // swap until a[i] has no home or its home holds a[i]
    while (a[i] >= 1 && a[i] <= n && a[a[i] - 1] !== a[i]) {
      const home = a[i] - 1;
      [a[i], a[home]] = [a[home], a[i]];
    }
  }
  for (let i = 0; i < n; i++) if (a[i] !== i + 1) return i + 1;
  // 1..n all present
  return n + 1;
}
```

### Variations

- **Find Missing and Repeating (GFG):** place values home; the one index `i` with `a[i] ≠ i + 1` holds the repeated value, and `i + 1` is the missing one
- **Find All Numbers Disappeared in an Array (LeetCode 448):** the sign-flag version. For each `v`, make `a[|v| − 1]` negative. Indices still positive at the end are the missing values
- **Minimum Swaps to Sort (GFG), distinct values:** map each value to its sorted position, then follow cycles. A cycle of length L needs L − 1 swaps, so the answer is `n − (number of cycles)`
- **Find the Duplicate Number (LeetCode 287):** the array must *not* be modified. Swapping is banned; follow `i → a[i]` as a linked list instead and find the cycle entry (Chapter 12)

### The failure

- **Looping forever on duplicates.** Guard the swap with `a[i] !== i + 1` instead of `a[a[i] − 1] !== a[i]` and `[1, 1]` never terminates: at `i = 1` the 1 is not home, its home already holds a 1, and the swap exchanges a 1 for a 1 forever. Ask "does the *home* already hold this value?", not "is this slot correct?"
- **Advancing `i` after one swap.** An `if` instead of a `while` moves on while `a[i]` still holds a stranger that needed its own trip home, and the final scan reports the wrong missing value

:::interview
"The nested loop looks O(n²) — why is it O(n)?" — Each swap sends one value to its home, and a value at home is never moved again because the guard skips it. So the inner `while` runs at most n times across the whole outer loop. It is the same amortised argument as a monotonic stack.
:::
