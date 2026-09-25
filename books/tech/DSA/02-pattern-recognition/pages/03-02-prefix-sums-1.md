## Prefix Sums <span class="lv lv1"></span>

- **What it is:** Store running totals `P[i] = a[0] + … + a[i − 1]`, with `P[0] = 0`. Any range sum is then the difference of two stored totals: `sum(L..R) = P[R + 1] − P[L]`
- **Signal:** "sum of elements between i and j", many range queries on data that never changes, "running sum", "pivot / equilibrium index", a 2-D grid with rectangle-sum queries
- **Why it works:** Addition can be undone. The total up to R contains the total before L, so subtracting it leaves exactly the range. One O(n) pass buys O(1) per query, for any number of queries

:::mint
<svg viewBox="0 0 470 132" role="img" aria-label="Array 3, 1, 4, 1, 5 and its prefix array 0, 3, 4, 8, 9, 14. The query L equals 1, R equals 3 covers 1, 4, 1. The long bar P of 4 equals 9 covers everything up to index 3; the short bar P of 1 equals 3 covers everything before index 1. Their difference, 6, is exactly the range." xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif">
  <style>
    .lb { font: 10px Consolas, monospace; fill: #1a1a1a; }
    .sm { font: 8px Georgia, serif; fill: #6b6b6b; }
    .bx { fill: #ffffff; stroke: #1a1a1a; stroke-width: 1; }
    .q { fill: #e2fcf3; stroke: #2d6a4f; stroke-width: 1.3; }
    .long { fill: #dbe7f5; stroke: #1d4e89; stroke-width: 1; }
    .short { fill: #ffedf1; stroke: #ef476e; stroke-width: 1; }
  </style>
  <text x="14" y="24" class="sm">a</text>
  <rect class="bx" x="40" y="10" width="40" height="22"/><rect class="q" x="80" y="10" width="40" height="22"/><rect class="q" x="120" y="10" width="40" height="22"/><rect class="q" x="160" y="10" width="40" height="22"/><rect class="bx" x="200" y="10" width="40" height="22"/>
  <text x="60" y="25" class="lb" text-anchor="middle">3</text><text x="100" y="25" class="lb" text-anchor="middle">1</text><text x="140" y="25" class="lb" text-anchor="middle">4</text><text x="180" y="25" class="lb" text-anchor="middle">1</text><text x="220" y="25" class="lb" text-anchor="middle">5</text>
  <text x="80" y="44" class="sm" text-anchor="middle">L = 1</text><text x="180" y="44" class="sm" text-anchor="middle">R = 3</text>
  <rect class="long" x="40" y="56" width="160" height="16"/><text x="206" y="68" class="lb">P[4] = 9</text>
  <rect class="short" x="40" y="80" width="40" height="16"/><text x="86" y="92" class="lb">P[1] = 3</text>
  <text x="40" y="118" class="lb">sum(1..3) = P[4] − P[1] = 9 − 3 = 6</text>
  <text x="290" y="24" class="sm">P = [0, 3, 4, 8, 9, 14]</text>
  <text x="290" y="44" class="sm">P has n + 1 entries, so L = 0</text>
  <text x="290" y="56" class="sm">subtracts P[0] = 0 with no special case</text>
  <text x="290" y="82" class="sm">build once: O(n)</text>
  <text x="290" y="96" class="sm">each query: O(1)</text>
</svg>
:::

```ts
// Range Sum Query – Immutable (LeetCode 303)
class NumArray {
  private p: number[];
  constructor(nums: number[]) {
    this.p = new Array(nums.length + 1).fill(0);
    for (let i = 0; i < nums.length; i++)
      this.p[i + 1] = this.p[i] + nums[i];
  }
  sumRange(left: number, right: number): number {
    return this.p[right + 1] - this.p[left];
  }
}
```
