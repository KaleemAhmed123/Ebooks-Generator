### Where it appears

| Problem | What peeling the bit does |
|---|---|
| [Number of 1 Bits](https://leetcode.com/problems/number-of-1-bits/) (LeetCode 191) | Kernighan loop: one step per set bit |
| [Power of Two](https://leetcode.com/problems/power-of-two/) (LeetCode 231) | `n & (n−1) === 0` means exactly one bit set |
| [Counting Bits](https://leetcode.com/problems/counting-bits/) (LeetCode 338) | `bits[i] = bits[i & (i−1)] + 1` — O(n) DP |
| [Reverse Bits](https://leetcode.com/problems/reverse-bits/) (LeetCode 190) | read lowest, shift into result, peel |
| [Sum of Two Integers](https://leetcode.com/problems/sum-of-two-integers/) (LeetCode 371) | `a ^ b` sums without carry; `(a & b) << 1` is the carry |

:::interview
"Why does `n & (n − 1) === 0` give the wrong answer in JavaScript without extra parentheses?"

Operator precedence: `===` binds tighter than `&`. The expression parses as `n & ((n − 1) === 0)`, which coerces the boolean to 0 or 1 before the AND. You need `(n & (n − 1)) === 0`. This is a common JavaScript trap — most other languages give `&` higher precedence than `==`.
:::
