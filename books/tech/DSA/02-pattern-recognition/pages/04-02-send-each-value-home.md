## Send Each Value Home <span class="lv lv2"></span>

- **What:** when values belong to `1..n`, value `v` lives at index `v − 1`. Swap each value home until every slot holds its owner or a stranger; one scan then reads what is missing or doubled
- **Spot it:** "values in the range 1..n", "find the missing / repeated value", "smallest missing positive", "O(1) extra space". The array must stay unchanged → 12-04
- **Why:** every swap settles at least one value for good, so there are at most n swaps in total, though the loop looks nested

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

- **Watch out:** ask "does the *home* already hold this value?", not "is this slot right?". Guarded by `a[i] !== i + 1`, `[1, 1]` swaps a 1 for a 1 forever
### Where it appears

| Problem | What the home-placement reveals |
|---|---|
| [First Missing Positive](https://leetcode.com/problems/first-missing-positive/) (LeetCode 41) | first slot without its owner = first missing |
| [Find All Numbers Disappeared in an Array](https://leetcode.com/problems/find-all-numbers-disappeared-in-an-array/) (LeetCode 448) | sign-flag variant: negate `a[|v| − 1]`; positive slots are missing |
| [Find All Duplicates in an Array](https://leetcode.com/problems/find-all-duplicates-in-an-array/) (LeetCode 442) | already-negative slot = a repeat |
| [Set Mismatch](https://leetcode.com/problems/set-mismatch/) (LeetCode 645) | the one misplaced slot holds the repeat; its index + 1 is the missing |

:::interview
"Why not just sort and scan?"

Sorting is O(n log n). The swap-to-home trick is O(n) — each value moves at most once to its home slot. And it uses O(1) extra space, which sorting (without extra arrays) also claims but cannot always deliver for stability. The constraint "values in 1..n" is what makes it possible: each value has exactly one correct position.
:::
