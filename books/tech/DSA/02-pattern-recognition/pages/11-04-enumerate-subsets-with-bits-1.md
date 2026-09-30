## Enumerate Subsets with Bits <span class="lv lv2"></span>

- **What:** with n ≤ ~20 items, every integer from 0 to 2ⁿ − 1 *is* a subset: bit `i` set means item `i` is chosen. One loop over the integers visits every subset exactly once
- **Spot it:** "all subsets / the power set", "try every combination", "n is small (≤ 20), check all", "assign or not each of n"
- **Why:** n bits map one-to-one onto 2ⁿ subsets, so counting the integers counts the subsets — no recursion, no dedup. It is also the state key for bitmask DP (17-13) and the enumeration behind meet-in-the-middle

:::mint
<svg viewBox="0 0 470 128" role="img" aria-label="Three items map to eight masks. Mask 000 is the empty set, 001 is item 0, 010 is item 1, 101 is items 0 and 2, 111 is all three. Bit i set means item i is in the subset, so iterating 0 to 7 lists every subset once." xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif">
  <style>
    .lb { font: 9px Consolas, monospace; fill: #1a1a1a; }
    .sm { font: 8px Georgia, serif; fill: #6b6b6b; }
    .m { font: bold 9px Consolas, monospace; fill: #1d4e89; }
    .box { fill: #ffffff; stroke: #1a1a1a; stroke-width: 1; }
    .set { fill: #e2fcf3; stroke: #2d6a4f; stroke-width: 1.1; }
  </style>
  <text x="30" y="20" class="sm">mask → subset of {a, b, c}   (bit 0 = a)</text>
  <text x="40" y="44" class="m">000</text><text x="90" y="44" class="lb">{ }</text>
  <text x="40" y="62" class="m">001</text><text x="90" y="62" class="lb">{a}</text>
  <text x="40" y="80" class="m">010</text><text x="90" y="80" class="lb">{b}</text>
  <text x="40" y="98" class="m">011</text><text x="90" y="98" class="lb">{a, b}</text>
  <text x="190" y="44" class="m">100</text><text x="240" y="44" class="lb">{c}</text>
  <text x="190" y="62" class="m">101</text><text x="240" y="62" class="lb">{a, c}</text>
  <text x="190" y="80" class="m">110</text><text x="240" y="80" class="lb">{b, c}</text>
  <text x="190" y="98" class="m">111</text><text x="240" y="98" class="lb">{a, b, c}</text>
  <text x="330" y="60" class="sm">n bits ↔ 2ⁿ subsets</text>
  <text x="330" y="78" class="lb" fill="#2d6a4f">loop mask = 0 … 2ⁿ−1</text>
</svg>
:::

```ts
// Subsets / power set (LeetCode 78) by bitmask
function subsets(nums: number[]): number[][] {
  const n = nums.length, out: number[][] = [];
  for (let mask = 0; mask < (1 << n); mask++) {           // each integer = one subset
    const pick: number[] = [];
    for (let i = 0; i < n; i++)
      if (mask & (1 << i)) pick.push(nums[i]);            // bit i set → take item i
    out.push(pick);
  }
  return out;
}

// Enumerate only the sub-masks of a fixed mask (submask DP)
function subMasks(mask: number): number[] {
  const out: number[] = [];
  for (let s = mask; ; s = (s - 1) & mask) { out.push(s); if (s === 0) break; }
  return out;                                             // every subset of mask, incl. 0
}
```

- **Watch out:** `1 << n` overflows past 31 bits in JS, and 2ⁿ itself is the wall — this only works for n ≤ ~20. For subsets *with duplicates* or in a required order, the recursive pick/skip (13-05) is cleaner. `mask & (1 << i)` tests a bit; `mask | (1 << i)` sets it; `mask & (mask - 1)` clears the lowest set bit (11-03)
