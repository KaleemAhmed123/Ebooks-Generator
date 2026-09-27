## Drop the Baggage <span class="lv lv1"></span>

- **What:** carry the best subarray that ends *here*. At each element, extend the past or drop it and restart. Kadane's algorithm is the sum case
- **Spot it:** "largest product of a contiguous run", "you may delete one element", "largest absolute sum". Elements need not be contiguous ("no two adjacent") → Module 06
- **Why:** a subarray ending at `i` is `[i]` alone or one ending at `i − 1` plus `a[i]`. When one number cannot decide, carry the state that can: the worst value, a "deleted yet?" flag

:::mint
<svg viewBox="0 0 470 108" role="img" aria-label="Maximum product subarray on 2, 3, minus 2, 4, minus 1. Track both the largest and smallest product ending at each index. A negative number swaps them: the smallest, minus 48, times minus 1 becomes the largest, 48." xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif">
  <style>
    .lb { font: 9.5px Consolas, monospace; fill: #1a1a1a; }
    .sm { font: 8px Georgia, serif; fill: #6b6b6b; }
    .hi { fill: #e2fcf3; stroke: #2d6a4f; stroke-width: 1.1; }
    .hot { fill: #ffedf1; stroke: #ef476e; stroke-width: 1.1; }
    .bx { fill: #ffffff; stroke: #1a1a1a; stroke-width: 1.1; }
  </style>
  <text x="14" y="26" class="sm">a[i]</text>
  <rect class="bx" x="70" y="12" width="56" height="22"/><text x="98" y="27" class="lb" text-anchor="middle">2</text>
  <rect class="bx" x="126" y="12" width="56" height="22"/><text x="154" y="27" class="lb" text-anchor="middle">3</text>
  <rect class="hot" x="182" y="12" width="56" height="22"/><text x="210" y="27" class="lb" text-anchor="middle">−2</text>
  <rect class="bx" x="238" y="12" width="56" height="22"/><text x="266" y="27" class="lb" text-anchor="middle">4</text>
  <rect class="hot" x="294" y="12" width="56" height="22"/><text x="322" y="27" class="lb" text-anchor="middle">−1</text>
  <text x="14" y="56" class="sm">maxHere</text>
  <text x="98" y="56" class="lb" text-anchor="middle">2</text><text x="154" y="56" class="lb" text-anchor="middle">6</text><text x="210" y="56" class="lb" text-anchor="middle">−2</text><text x="266" y="56" class="lb" text-anchor="middle">4</text>
  <rect class="hi" x="302" y="44" width="40" height="17"/><text x="322" y="56" class="lb" text-anchor="middle">48</text>
  <text x="14" y="78" class="sm">minHere</text>
  <text x="98" y="78" class="lb" text-anchor="middle">2</text><text x="154" y="78" class="lb" text-anchor="middle">3</text><text x="210" y="78" class="lb" text-anchor="middle">−12</text><text x="266" y="78" class="lb" text-anchor="middle">−48</text><text x="322" y="78" class="lb" text-anchor="middle">−4</text>
  <path d="M 280 74 L 312 60" stroke="#ef476e" stroke-width="1.1" fill="none"/>
  <text x="360" y="60" class="sm">−48 · −1 = 48</text>
  <text x="14" y="100" class="sm">a negative number swaps the roles: yesterday's worst becomes today's best</text>
</svg>
:::

```ts
// Maximum Product Subarray (LeetCode 152)
function maxProduct(nums: number[]): number {
  let maxHere = nums[0], minHere = nums[0], best = nums[0];
  for (let i = 1; i < nums.length; i++) {
    const x = nums[i];
    // sign flip swaps roles
    if (x < 0) [maxHere, minHere] = [minHere, maxHere];
    // extend or restart
    maxHere = Math.max(x, maxHere * x);
    minHere = Math.min(x, minHere * x);
    best = Math.max(best, maxHere);
  }
  return best;
}
```

- **Watch out:** copying sum-Kadane's "reset below 0" to products. It throws away `−2`, which later pairs with `−1` to win. Carry the minimum instead
- **Also solves:** [Maximum Subarray](https://leetcode.com/problems/maximum-subarray/) (LeetCode 53) · [Maximum Subarray Sum with One Deletion](https://leetcode.com/problems/maximum-subarray-sum-with-one-deletion/) (LeetCode 1186) (a second state: one element deleted) · [Maximum Absolute Sum of Any Subarray](https://leetcode.com/problems/maximum-absolute-sum-of-any-subarray/) (LeetCode 1749) (carry the best and the worst)
- **Follow-up (LeetCode 2272):** per letter pair, map `hi → +1`, `lo → −1` and run Kadane. A window must hold at least one `lo`, so carry a "seen `lo`" flag
