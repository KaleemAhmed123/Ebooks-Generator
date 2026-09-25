## Recognition drills: Bits <span class="lv lv1"></span> - continued

| Problem | Trick |
|---|---|
| 12. Count total set bits in 1..n (GFG) | **Columns:** full blocks of `2^(b+1)` plus the partial block |
| 13. Total Hamming Distance (LeetCode 477) | **Columns:** `ones · zeros` per bit |
| 14. Copy set bits in a range (GFG) | **Mask:** `((1 << (r − l + 1)) − 1) << (l − 1)`, then `x | (y & mask)` |
| 15. Power Set (GFG) | **Masks** `0 .. 2ⁿ − 1` (09-05) |
| 16. Divide Two Integers (LeetCode 29) | **Doubling:** subtract the largest `divisor << k` that fits, add `1 << k`; clamp the one overflow case |
| 17. Square of a number without `*`, `/`, `pow` (GFG) | **Halving:** `n² = 4·(n/2)²` for even n, plus `4·⌊n/2⌋ + 1` for odd n, via shifts |
| 18. Concatenation of Consecutive Binary Numbers (LeetCode 1680) | **Shift in each number:** `res = ((res << len(i)) + i) mod M`; `len` grows by 1 at every power of two. Use BigInt or split the shift in JS to avoid precision loss |
| 19. Minimum Operations to Form Subsequence With Target Sum (LeetCode 2835) <span class="lv lv3"></span> | **Columns with carry:** walk target bits low to high, split the nearest larger power when a bit is missing |
| 20. Special Permutations (LeetCode 2741) <span class="lv lv3"></span> | **Bitmask DP:** state `(used mask, last index)` (Module 06) |
| 21. Smallest Sufficient Team (LeetCode 1125) <span class="lv lv3"></span> | **Bitmask DP over skills:** `dp[skillMask]` = smallest team |

### Score yourself

- **17–21:** you reach for an identity instead of a loop over 32 positions
- **10–16:** reread 11-02; most misses are per-column counts
- **0–9:** redo 11-01 and 11-03 by hand in binary
