## Fix One, Collide Two 🟢

- **What it is:** For triplets (or k-tuples) on sorted data, fix the first element with a loop and run collision two pointers (page 02-08) on the rest. k-Sum costs O(n^(k−1)), one power below brute force
- **Signal:** "find all unique triplets summing to 0", "closest sum to target", "count triplets with sum < X", "how many triangles can be formed"
- **Why it works:** With `a[i]` fixed, the question is a two-sum on the sorted suffix, which collision pointers settle in O(n): if the sum is too small only `left++` can raise it, if too big only `right--` can lower it. Sorting also puts duplicates side by side, so skipping them is a single comparison

:::mint
<svg viewBox="0 0 470 92" role="img" aria-label="Sorted array minus 4, minus 1, minus 1, 0, 1, 2. Index i is fixed at minus 1. Left starts after i and right at the end. The sum minus 1 plus minus 1 plus 2 equals 0, a triplet." xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif">
  <style>
    .lb { font: 10px Consolas, monospace; fill: #1a1a1a; }
    .sm { font: 8px Georgia, serif; fill: #6b6b6b; }
    .bx { fill: #ffffff; stroke: #1a1a1a; stroke-width: 1.1; }
    .fx { fill: #dbe7f5; stroke: #1d4e89; stroke-width: 1.2; }
    .hi { fill: #e2fcf3; stroke: #2d6a4f; stroke-width: 1.1; }
    .a { stroke: #1a1a1a; stroke-width: 1; fill: none; }
  </style>
  <defs><marker id="m0210" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="5" markerHeight="5" orient="auto"><path d="M0 0L10 5L0 10z" fill="#1a1a1a"/></marker></defs>
  <rect class="bx" x="20" y="14" width="36" height="24"/><text x="38" y="30" class="lb" text-anchor="middle">−4</text>
  <rect class="fx" x="56" y="14" width="36" height="24"/><text x="74" y="30" class="lb" text-anchor="middle">−1</text>
  <rect class="hi" x="92" y="14" width="36" height="24"/><text x="110" y="30" class="lb" text-anchor="middle">−1</text>
  <rect class="bx" x="128" y="14" width="36" height="24"/><text x="146" y="30" class="lb" text-anchor="middle">0</text>
  <rect class="bx" x="164" y="14" width="36" height="24"/><text x="182" y="30" class="lb" text-anchor="middle">1</text>
  <rect class="hi" x="200" y="14" width="36" height="24"/><text x="218" y="30" class="lb" text-anchor="middle">2</text>
  <text x="74" y="52" class="sm" text-anchor="middle" fill="#1d4e89">i (fixed)</text>
  <text x="110" y="52" class="sm" text-anchor="middle">left →</text>
  <text x="218" y="52" class="sm" text-anchor="middle">← right</text>
  <text x="20" y="78" class="lb">−1 + (−1) + 2 = 0 → record, then skip equal neighbours on both sides</text>
  <text x="260" y="30" class="sm">sum &lt; 0 → left++ (need bigger)</text>
  <text x="260" y="44" class="sm">sum &gt; 0 → right−− (need smaller)</text>
</svg>
:::

```ts
// 3Sum (LeetCode 15): all unique triplets with sum 0
function threeSum(nums: number[]): number[][] {
  nums.sort((a, b) => a - b);
  const out: number[][] = [];
  for (let i = 0; i < nums.length - 2; i++) {
    // same first value, same triplets
    if (i > 0 && nums[i] === nums[i - 1]) continue;
    let left = i + 1, right = nums.length - 1;
    while (left < right) {
      const sum = nums[i] + nums[left] + nums[right];
      if (sum < 0) left++;
      else if (sum > 0) right--;
      else {
        out.push([nums[i], nums[left], nums[right]]);
        while (left < right && nums[left] === nums[left + 1])
          left++;
        while (left < right && nums[right] === nums[right - 1])
          right--;
        left++; right--;
      }
    }
  }
  return out;
}
```

### Variations

- **Count Triplets with Sum Smaller than X (GFG):** when `sum < X`, every `right' ∈ (left, right]` also works, so add `right − left` and move `left`. Counting jumps a whole block at once, like page 02-04
- **3Sum Closest (LeetCode 16):** same loop, no dedupe; track the sum with the smallest `|sum − target|`
- **Valid Triangle Number (LeetCode 611):** fix the *largest* side `c` from the right; any `a + b > c` makes every `a'` between `a` and `b` work too, so add `right − left`
- **4Sum (LeetCode 18):** fix two with nested loops, collide two. Add the same duplicate skip to the second loop, and compute the sum in a way that cannot overflow in fixed-width languages

### The failure

- **Deduping with a `Set` of joined strings.** It returns the right answer, but on 3,000 zeros it builds millions of equal keys and burns time and memory for nothing. Sorting already put duplicates next to each other; skip them in place
- **Skipping before using.** Put `while (nums[left] === nums[left + 1]) left++` *before* the sum check and `[0, 0, 0, −1, …]` loses `[0, 0, 0]`: the skip jumps `left` onto the last zero, where `left` meets `right`. Skip duplicates only *after* recording a match
- **Skipping against the wrong neighbour.** `if (nums[i] === nums[i + 1]) continue` looks symmetric but drops `[−1, −1, 2]` from `[3, −1, 3, 0, −1, 2]`: the first −1 is skipped and the second has no −1 left to its right. Compare the fixed value with its *previous* neighbour

:::interview
"Can 3Sum be done faster than O(n²)?" — Not meaningfully. The 3SUM conjecture says no algorithm runs in O(n^(2−ε)) for any ε > 0; the known improvements shave only logarithmic factors. The engineering choices are O(1) extra space, no hashing, and in-place duplicate skipping, which is why the sort-plus-collide version is preferred over the hash-set version.
:::
