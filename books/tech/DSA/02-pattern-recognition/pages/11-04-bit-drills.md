## Recognition drills: Bits <span class="lv lv1"></span>

Hide the right column. Name the identity or the per-column count that does the work.

| Problem | Trick |
|---|---|
| 1. Number of 1 Bits (LeetCode 191) / Count set bits (GFG) | **Peel:** `n &= n − 1` until 0 |
| 2. Counting Bits (LeetCode 338) | **Peel as recurrence:** `bits[i] = bits[i & (i − 1)] + 1` |
| 3. Power of Two (LeetCode 231) | `n > 0 && (n & (n − 1)) === 0` |
| 4. Find position of the only set bit (GFG) | Power-of-two check, then `32 − Math.clz32(n)` (1-based) |
| 5. Single Number (LeetCode 136) | **Cancel:** XOR everything |
| 6. Missing Number (LeetCode 268) | **Cancel:** XOR indices and values |
| 7. Find the two non-repeating elements (GFG) / Single Number III (LeetCode 260) | **Cancel, then split** on `x & −x` |
| 8. Single Number II (LeetCode 137) | **Columns:** count mod 3 |
| 9. Minimum Flips to Make a OR b Equal to c (LeetCode 1318) | **Columns:** per bit, 1 flip if c needs a 1 and both a and b have 0; `a_bit + b_bit` flips if c needs 0 |
| 10. Count total set bits in 1..n (GFG) | **Columns:** full blocks of `2^(b+1)` plus the partial block |
| 11. Total Hamming Distance (LeetCode 477) | **Columns:** `ones · zeros` per bit |
| 12. Power Set (GFG) | **Masks** `0 .. 2ⁿ − 1` (Module 06, 05-01) |
| 13. Concatenation of Consecutive Binary Numbers (LeetCode 1680) | **Shift in each number:** `res = ((res << len(i)) + i) mod M`; `len` grows by 1 at every power of two. Use BigInt or split the shift in JS to avoid precision loss |

### Score yourself

- **11–13:** you reach for an identity instead of a loop over 32 positions
- **7–10:** reread 11-02; most misses are per-column counts
- **0–6:** redo 11-01 and 11-03 by hand in binary
