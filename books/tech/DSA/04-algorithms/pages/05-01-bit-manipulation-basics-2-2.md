### Where it appears

| Problem | Why it belongs here |
|---|---|
| [Single Number](https://leetcode.com/problems/single-number/) (LeetCode 136) | XOR all elements; duplicates cancel |
| [Number of 1 Bits](https://leetcode.com/problems/number-of-1-bits/) (LeetCode 191) | Count set bits using n & (n-1) trick |
| [Power of Two](https://leetcode.com/problems/power-of-two/) (LeetCode 231) | Check n & (n-1) === 0 |
| [Reverse Bits](https://leetcode.com/problems/reverse-bits/) (LeetCode 190) | Bit-by-bit extraction and placement |

:::interview
"Find the single number in an array where every other element appears twice."

XOR everything. `a ^ a = 0` and `a ^ 0 = a`. Duplicates cancel to zero, the single number survives. O(n) time, O(1) space — no hash set needed.
:::
