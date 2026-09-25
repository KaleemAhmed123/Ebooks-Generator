## Drop the Baggage 🟡

- **What it is:** Carry "the best subarray that ends *here*" in one or two variables. At each element decide: extend the past, or drop it and restart. Kadane's algorithm (Module 06, Maximum Subarray) is the sum case; this page is the family around it
- **Signal:** "maximum product subarray", "flip the sign of one subarray", "max subarray sum if you may delete one element", "largest variance of any substring"
- **Why it works:** Any subarray ending at `i` is either `[i]` alone or a subarray ending at `i − 1` plus `a[i]`. So the best one ending at `i` needs only the best one ending at `i − 1`, *if* that single number is enough to decide. When it is not, carry the extra state that makes it enough: the worst value, a "deleted yet?" flag, a "seen the rare letter?" flag

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

### Variations

- **Maximum Subarray Sum with One Deletion (LeetCode 1186):** two states per index: `keep` (no deletion yet) and `del` (one element deleted). `del = max(del + x, keep_prev)`, `keep = max(x, keep_prev + x)`. The extra flag is the whole trick
- **Maximize sum by flipping the sign of one subarray (GFG):** flipping `[l, r]` changes the total by `−2 · sum(l..r)`. Run plain Kadane on `−2 · a[i]` to find the best gain; answer = `total + max(0, gain)`
- **Maximum Sum Circular Subarray (LeetCode 918):** carry the worst subarray too, and flip the target (page 02-06)
- **Substring with Largest Variance (LeetCode 2272) 🟡:** for each ordered pair of letters (`hi`, `lo`), map `hi → +1`, `lo → −1`, others → 0, and run Kadane. The catch: a window must contain at least one `lo`, so carry a "seen `lo`" flag and allow a restart only when a later `lo` can still arrive. 26 × 25 pairs × n steps

### The failure

- **Resetting on zero or negative for products.** Sum-Kadane resets when the running sum drops below 0. Copying that rule for products throws away `−2`, which later pairs with `−1` to win. Products need the minimum carried, not a reset rule
- **Using sum-Kadane on "variance".** Variance is `count(hi) − count(lo)` and needs at least one `lo`. Plain Kadane returns windows made only of `hi`, whose "variance" the problem does not allow, and over-reports the answer

:::interview
"Why does maximum product need two variables when maximum sum needs one?" — For sums, the best extension of the past is always the largest past value. For products, multiplying by a negative number turns the smallest past value into the largest. So the minimum ending at `i − 1` is also a candidate, and I carry both: still O(n) time, O(1) space.
:::
