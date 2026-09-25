# Chapter 11 - Bits

## Let Pairs Cancel 🟢

- **What it is:** XOR every value together. Anything that appears an even number of times cancels to 0 (`x ^ x = 0`, `x ^ 0 = x`, order does not matter), so what remains is built only from the values that appear an odd number of times
- **Signal:** "every element appears twice except one", "find the missing number from 0..n", "find the extra character", "two numbers appear once, all others twice", "O(1) extra space"
- **Why it works:** XOR is addition without carry, bit by bit. A bit position ends up 1 exactly when an odd number of inputs have a 1 there. Pairs contribute an even count to every position, so they vanish; the unpaired value's bits are left standing

:::mint
<svg viewBox="0 0 470 118" role="img" aria-label="Single Number III on 1, 2, 1, 3, 2, 5. XOR of everything is 3 xor 5 equals 6, binary 110. Its lowest set bit is 010. Split the numbers by that bit: 2, 3, 2 have it, 1, 1, 5 do not. XOR each group separately: 3 and 5, the two singles." xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif">
  <style>
    .lb { font: 9.5px Consolas, monospace; fill: #1a1a1a; }
    .sm { font: 8px Georgia, serif; fill: #6b6b6b; }
    .g1 { fill: #dbe7f5; stroke: #1d4e89; stroke-width: 1.1; }
    .g2 { fill: #e2fcf3; stroke: #2d6a4f; stroke-width: 1.1; }
  </style>
  <text x="20" y="20" class="lb">1 ^ 2 ^ 1 ^ 3 ^ 2 ^ 5 = 3 ^ 5 = 110₂</text>
  <text x="20" y="38" class="lb">lowest set bit: 110 &amp; −110 = 010₂</text>
  <rect class="g1" x="20" y="50" width="190" height="24"/><text x="115" y="66" class="lb" text-anchor="middle">bit 1 set: 2, 3, 2 → 3</text>
  <rect class="g2" x="220" y="50" width="190" height="24"/><text x="315" y="66" class="lb" text-anchor="middle">bit 1 clear: 1, 1, 5 → 5</text>
  <text x="20" y="96" class="sm">the two singles differ in that bit, so they land in different groups;</text>
  <text x="20" y="108" class="sm">every pair lands together and cancels inside its group</text>
</svg>
:::

```ts
// Single Number III (LeetCode 260)
// two values appear once, every other value twice
function singleNumber(nums: number[]): number[] {
  let both = 0;
  // = a ^ b, nonzero since a ≠ b
  for (const x of nums) both ^= x;
  // lowest bit where a and b differ
  const bit = both & -both;
  let a = 0;
  for (const x of nums) if (x & bit) a ^= x;
  return [a, both ^ a];
}
```

### Variations

- **Single Number (LeetCode 136):** one pass of XOR; the result is the single value
- **Missing Number (LeetCode 268):** XOR every index `0..n` and every value. Present values meet their index and cancel; the missing index is left. A sum formula also works but can overflow in fixed-width languages
- **Find the Difference (LeetCode 389):** XOR the character codes of both strings; the extra character survives
- **Find the two non-repeating elements (GFG):** the canonical problem above
- **Missing and repeating (GFG) with XOR:** XOR of all values and `1..n` equals `missing ^ repeating`; split by its lowest set bit, exactly as above, then check which of the two appears in the array

### The failure

- **XOR when the others appear three times.** Cancellation needs an *even* count. On `[2, 2, 3, 2]` the XOR is `2 ^ 2 ^ 3 ^ 2 = 1`, not the single value 3. Odd repetition counts need per-bit counting mod k (page 11-02)
- **Negative numbers and `>>`.** JS bitwise operators work on 32-bit signed integers: `−8 >> 1` is −4, and `−1 >>> 0` is 4294967295. XOR-cancellation is safe for negatives, but code that shifts to inspect bits must use `>>>` or mask with `& 1`

:::interview
"Why does `x & -x` give the lowest set bit?" — In two's complement, `−x = ~x + 1`. Inverting flips every bit, and adding 1 carries through the trailing 1s of `~x`, which were the trailing 0s of `x`, and stops at x's lowest 1. So `x` and `−x` share only that one 1 bit, and the AND keeps exactly it.
:::
