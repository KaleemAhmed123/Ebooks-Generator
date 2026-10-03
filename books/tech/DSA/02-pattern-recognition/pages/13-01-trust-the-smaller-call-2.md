### Where it appears

| Problem | What the smaller call solves |
|---|---|
| [Tower of Hanoi](https://en.wikipedia.org/wiki/Tower_of_Hanoi) | move n−1 disks out of the way, move the big one, repeat |
| [Pow(x, n)](https://leetcode.com/problems/powx-n/) (LeetCode 50) | half the exponent — square the result |
| [K-th Symbol in Grammar](https://leetcode.com/problems/k-th-symbol-in-grammar/) (LeetCode 779) | the parent row determines the child's value |

:::interview
"Pow(x, n) with base case n === 1 never terminates for n = 0. How do you choose the right base case?"

The base must be reachable from every valid input by the recursive step. Halving always reaches 0, never 1 (e.g. `⌊1/2⌋ = 0`). So the base is `n === 0 → return 1`. A good check: simulate the smallest inputs (0, 1, 2) and see which base the recursion actually hits.
:::
