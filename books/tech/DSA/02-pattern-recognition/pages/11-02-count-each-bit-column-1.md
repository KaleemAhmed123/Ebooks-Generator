## Count Each Bit Column <span class="lv lv2"></span>

- **What it is:** Treat 32-bit numbers as 32 independent columns of 0s and 1s. Many "all pairs" or "all numbers" questions become a count per column, and the columns never interact
- **Signal:** "every element appears three times except one", "sum of Hamming distances over all pairs", "total set bits from 1 to n", "minimum flips so that a OR b equals c"
- **Why it works:** Bitwise operations act on each column separately. If every value but one repeats k times, each column's count of 1s is a multiple of k plus the single value's bit: `count % k` recovers it. For pairs, a column contributes `ones · zeros` differing pairs, whatever the other columns do

:::mint
<svg viewBox="0 0 470 118" role="img" aria-label="Single Number II on 2, 2, 3, 2. Column 0: values 0, 0, 1, 0, count 1, mod 3 is 1. Column 1: values 1, 1, 1, 1, count 4, mod 3 is 1. The single number has bits 11, which is 3." xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif">
  <style>
    .lb { font: 10px Consolas, monospace; fill: #1a1a1a; }
    .sm { font: 8px Georgia, serif; fill: #6b6b6b; }
    .col { fill: #dbe7f5; stroke: #1d4e89; stroke-width: 1; }
  </style>
  <rect class="col" x="96" y="10" width="22" height="78"/><rect class="col" x="120" y="10" width="22" height="78"/>
  <text x="30" y="24" class="lb">2 →   1  0</text>
  <text x="30" y="40" class="lb">2 →   1  0</text>
  <text x="30" y="56" class="lb">3 →   1  1</text>
  <text x="30" y="72" class="lb">2 →   1  0</text>
  <text x="30" y="104" class="lb">count 4  1</text>
  <text x="30" y="116" class="sm">bit 1 ↑  ↑ bit 0</text>
  <text x="200" y="40" class="lb">count % 3 → 1, 1</text>
  <text x="200" y="58" class="lb">single = 11₂ = 3</text>
  <text x="200" y="86" class="sm">each repeated value adds 3 to its columns;</text>
  <text x="200" y="98" class="sm">only the single value's bits survive mod 3</text>
</svg>
:::

```ts
// Single Number II (LeetCode 137)
// every value appears three times except one
function singleNumberII(nums: number[]): number {
  let result = 0;
  for (let b = 0; b < 32; b++) {
    let count = 0;
    for (const x of nums) count += (x >>> b) & 1;   // column b
    if (count % 3) result |= 1 << b;
  }
  // back to signed 32-bit
  return result | 0;
}
```
