### Variations

- **Number of 1 Bits (LeetCode 191) / Count set bits (GFG):** `popcount` above; `>>> 0` makes negative inputs count their 32-bit two's-complement pattern
- **Power of Two (LeetCode 231):** `n > 0 && (n & (n − 1)) === 0`. Power of four adds a mask check: the single bit must sit at an even position, `(n & 0x55555555) !== 0`
- **Find position of the only set bit (GFG):** reject 0 and non-powers of two, then GFG counts from 1 at the lowest bit, so the position is `32 − Math.clz32(n)` or count shifts
- **Enumerate every submask of `mask` 🔴:** `for (let s = mask; s; s = (s − 1) & mask)` visits all non-empty submasks in decreasing order, then add the empty set. Over all masks this is O(3ⁿ), the core loop of subset DP
- **Power Set (GFG):** masks `0 .. 2ⁿ − 1`; bit j of the mask says whether item j is in the subset (page 09-05 lists the mask operations)

### The failure

- **`n & (n − 1) === 0` without parentheses.** In JS and C-family languages `===` binds tighter than `&`, so this parses as `n & ((n − 1) === 0)`. That is 0 for every `n` except 1, so the check rejects 2, 4, 8… and accepts only 1
- **Forgetting `n > 0`.** `(0 & −1) === 0` passes the power-of-two test; so does −2³¹, in JS as well as in fixed-width languages

:::interview
"How do you count set bits faster than checking all 32 positions?" — Repeatedly clear the lowest set bit with `n &= n − 1` and count the steps. The loop runs once per 1 bit, so sparse numbers finish in a few steps. For every number up to n, reuse the answer for `i & (i − 1)`, which is smaller than `i`: `bits[i] = bits[i & (i − 1)] + 1`, O(n) total.
:::
