## Recognition drills: Bits <span class="lv lv1"></span>

Hide the right column. Name the identity or the per-column count that does the work.

| Problem | Trick |
|---|---|
| 1. [Number of 1 Bits](https://leetcode.com/problems/number-of-1-bits/) (LeetCode 191) / [Count Set Bits](https://www.geeksforgeeks.org/problems/set-bits0143/1) (GFG) | **Peel:** `n &= n − 1` until 0 |
| 2. [Counting Bits](https://leetcode.com/problems/counting-bits/) (LeetCode 338) | **Peel as recurrence:** `bits[i] = bits[i & (i − 1)] + 1` |
| 3. [Power of Two](https://leetcode.com/problems/power-of-two/) (LeetCode 231) | `n > 0 && (n & (n − 1)) === 0` |
| 4. [Position of Only Set Bit](https://www.geeksforgeeks.org/problems/find-position-of-set-bit3706/1) (GFG) | Power-of-two check, then `32 − Math.clz32(n)` (1-based) |
| 5. [Single Number](https://leetcode.com/problems/single-number/) (LeetCode 136) | **Cancel:** XOR everything |
| 6. [Missing Number](https://leetcode.com/problems/missing-number/) (LeetCode 268) | **Cancel:** XOR indices and values |
| 7. [Single Number III](https://leetcode.com/problems/single-number-iii/) (LeetCode 260) | **Cancel, then split** on `x & −x` |
| 8. [Single Number II](https://leetcode.com/problems/single-number-ii/) (LeetCode 137) | **Columns:** count mod 3 |
| 9. [Total Hamming Distance](https://leetcode.com/problems/total-hamming-distance/) (LeetCode 477) | **Columns:** `ones · zeros` per bit |

### Score yourself

- **8–9:** you reach for an identity instead of a loop over 32 positions
- **5–7:** reread 11-02; most misses are per-column counts
- **0–4:** redo 11-01 and 11-03 by hand in binary
