## Recognition drills after Chapter 11 <span class="lv lv1"></span> - continued

| # | Problem | Page | Deciding fact |
|---|---|---|---|
| 1 | [Hamming Distance](https://leetcode.com/problems/hamming-distance/) (LeetCode 461) | 11-03 | differing bits are the 1s of `x ^ y`: **count** them, one peel per set bit |
| 2 | [Single Number II](https://leetcode.com/problems/single-number-ii/) (LeetCode 137) | 11-02 | the others appear **three** times: count each column mod 3 |
| 3 | [Valid Parentheses](https://leetcode.com/problems/valid-parentheses/) (LeetCode 20) | 10-04 | **three** bracket kinds: a counter cannot tell `(]` from `()`, so keep the stack |
| 4 | [Decode XORed Array](https://leetcode.com/problems/decode-xored-array/) (LeetCode 1720) | 11-01 | `x ^ x = 0`: XOR the known **neighbour** back out |
| 5 | [Counting Bits](https://leetcode.com/problems/counting-bits/) (LeetCode 338) | 11-03 | **every** i up to n: `bits[i] = bits[i & (i − 1)] + 1` |
| 6 | [Find Pivot Index](https://leetcode.com/problems/find-pivot-index/) (LeetCode 724) | 03-02 | left **sum** against right sum: one running prefix total |
| 7 | [Bitwise AND of Numbers Range](https://leetcode.com/problems/bitwise-and-of-numbers-range/) (LeetCode 201) | 11-03 | the AND keeps only the **common prefix**: peel `right`'s lowest bit while it exceeds `left` |
| 8 | [Single Number III](https://leetcode.com/problems/single-number-iii/) (LeetCode 260) | 11-01 | **two** singles: XOR all, then split on the lowest set bit |
| 9 | [Set Mismatch](https://leetcode.com/problems/set-mismatch/) (LeetCode 645) | 11-01 | XOR of values and `1..n` is **missing ^ duplicate**; split on its lowest bit (04-02 if the array may change) |
| 10 | [Reverse Bits](https://leetcode.com/problems/reverse-bits/) (LeetCode 190) | 11-03 | move **one bit** at a time from the bottom of n to the bottom of the result |
| 11 | [Find The Original Array of Prefix Xor](https://leetcode.com/problems/find-the-original-array-of-prefix-xor/) (LeetCode 2433) | 11-01 | `a[i] = p[i] ^ p[i − 1]`: the shared **prefix cancels** |
| 12 | [Total Hamming Distance](https://leetcode.com/problems/total-hamming-distance/) (LeetCode 477) | 11-02 | **every pair**: `ones · zeros` per column |

### Score yourself

- **10–12:** you reach for an identity instead of a loop over 32 positions
- **6–9:** reread 11-00; most misses are "cancel, or count columns?"
- **0–5:** redo 11-01 and 11-03 by hand in binary, then retry
