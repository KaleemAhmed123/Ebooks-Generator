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

### Variations

- **Total Hamming Distance (LeetCode 477):** for each column, `ones · (n − ones)` pairs differ there. Sum over 32 columns: O(32 · n) instead of O(n²) pairs
- **Minimum Flips to Make a OR b Equal to c (LeetCode 1318):** column by column: if c's bit is 1 and both a and b are 0, one flip; if c's bit is 0, flip every 1 in a and b
- **Bit Difference (GFG):** bits to flip to turn A into B = number of 1s in `A ^ B`
- **Count total set bits in all numbers from 1 to n (GFG):** column b repeats a block of `2^b` zeros then `2^b` ones. Full blocks give `⌊(n+1) / 2^(b+1)⌋ · 2^b` ones, the partial block adds `max(0, (n+1) mod 2^(b+1) − 2^b)`
- **Constant-space state machine:** 137 also has a two-variable solution (`ones`, `twos`) that counts mod 3 in every column at once. It is the same idea, compressed

### The failure

- **Losing the sign.** A negative single value has bit 31 set. Build the answer with bitwise `|=`, which stays in signed 32-bit; accumulate with `result += 2 ** b` instead and `[−2, −2, 1, 1, −3, 1, −3, −3, −4, −2]` returns 4294967292 instead of −4
- **Using `>>` to read a column.** `(x >> 31) & 1` happens to work, but `x >> b` on negative numbers fills with 1s from the left, which matters as soon as you compare or count shifted values themselves. `>>>` is the unambiguous choice

:::interview
"How do you find the one number that appears once when the rest appear three times, in O(1) space?" — Count the 1s in each of the 32 bit positions. Values that appear three times add a multiple of 3 to every position they touch, so `count % 3` is exactly the single number's bit. 32 passes of O(n), constant memory, and it generalises to any repeat count k.
:::
