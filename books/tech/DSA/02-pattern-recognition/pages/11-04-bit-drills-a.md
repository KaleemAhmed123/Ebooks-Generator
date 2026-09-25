## Recognition drills: Bits <span class="lv lv1"></span>

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
