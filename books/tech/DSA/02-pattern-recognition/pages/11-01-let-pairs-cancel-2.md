### Where it appears

| Problem | What the XOR isolates |
|---|---|
| [Single Number](https://leetcode.com/problems/single-number/) (LeetCode 136) | the one value that appears once |
| [Single Number III](https://leetcode.com/problems/single-number-iii/) (LeetCode 260) | two singles split by their differing bit |
| [Missing Number](https://leetcode.com/problems/missing-number/) (LeetCode 268) | the gap — XOR indices against values |
| [Find the Difference](https://leetcode.com/problems/find-the-difference/) (LeetCode 389) | the extra character — XOR all char codes |

:::interview
"Can you solve Single Number with a hash set instead? Why does the interviewer want XOR?"

A set works — add if absent, remove if present, the survivor is the answer. But it uses O(n) space. XOR does the same job in O(1) space and one pass, which is the real constraint. The interviewer is testing whether you know a constant-space primitive, not just correctness.
:::
