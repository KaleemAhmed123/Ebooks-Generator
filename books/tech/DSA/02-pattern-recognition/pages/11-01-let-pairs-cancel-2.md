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
