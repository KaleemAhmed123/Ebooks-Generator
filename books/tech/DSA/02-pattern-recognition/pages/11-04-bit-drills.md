## Recognition drills: Bits 🟢

Hide the right column. Name the identity or the per-column count that does the work.

| Problem | Trick |
|---|---|
| 1. Number of 1 Bits (LeetCode 191) / Count set bits (GFG) | **Peel:** `n &= n − 1` until 0 |
| 2. Counting Bits (LeetCode 338) | **Peel as recurrence:** `bits[i] = bits[i & (i − 1)] + 1` |
| 3. Power of Two (LeetCode 231) | `n > 0 && (n & (n − 1)) === 0` |
| 4. Find position of the only set bit (GFG) | Power-of-two check, then `32 − Math.clz32(n)` (1-based) |
| 5. Single Number (LeetCode 136) | **Cancel:** XOR everything |
| 6. Find the Difference (LeetCode 389) | **Cancel:** XOR both strings' codes |
| 7. Missing Number (LeetCode 268) | **Cancel:** XOR indices and values |
| 8. Find the two non-repeating elements (GFG) / Single Number III (LeetCode 260) | **Cancel, then split** on `x & −x` |
| 9. Single Number II (LeetCode 137) | **Columns:** count mod 3 |
| 10. Bit Difference (GFG): flips to turn A into B | popcount of `A ^ B` |
| 11. Minimum Flips to Make a OR b Equal to c (LeetCode 1318) | **Columns:** per bit, 1 flip if c needs a 1 and both a and b have 0; `a_bit + b_bit` flips if c needs 0 |
| 12. Count total set bits in 1..n (GFG) | **Columns:** full blocks of `2^(b+1)` plus the partial block |
| 13. Total Hamming Distance (LeetCode 477) | **Columns:** `ones · zeros` per bit |
| 14. Copy set bits in a range (GFG) | **Mask:** `((1 << (r − l + 1)) − 1) << (l − 1)`, then `x | (y & mask)` |
| 15. Power Set (GFG) | **Masks** `0 .. 2ⁿ − 1` (09-05) |
| 16. Divide Two Integers (LeetCode 29) | **Doubling:** subtract the largest `divisor << k` that fits, add `1 << k`; clamp the one overflow case |
| 17. Square of a number without `*`, `/`, `pow` (GFG) | **Halving:** `n² = 4·(n/2)²` for even n, plus `4·⌊n/2⌋ + 1` for odd n, via shifts |
| 18. Concatenation of Consecutive Binary Numbers (LeetCode 1680) | **Shift in each number:** `res = ((res << len(i)) + i) mod M`; `len` grows by 1 at every power of two. Use BigInt or split the shift in JS to avoid precision loss |
| 19. Minimum Operations to Form Subsequence With Target Sum (LeetCode 2835) 🔴 | **Columns with carry:** walk target bits low to high, split the nearest larger power when a bit is missing |
| 20. Special Permutations (LeetCode 2741) 🔴 | **Bitmask DP:** state `(used mask, last index)` (Module 06) |
| 21. Smallest Sufficient Team (LeetCode 1125) 🔴 | **Bitmask DP over skills:** `dp[skillMask]` = smallest team |

### Score yourself

- **17–21:** you reach for an identity instead of a loop over 32 positions
- **10–16:** reread 11-02; most misses are per-column counts
- **0–9:** redo 11-01 and 11-03 by hand in binary
