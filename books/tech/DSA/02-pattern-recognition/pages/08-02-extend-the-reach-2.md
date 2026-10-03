### Where it appears

| Problem | What each position's "reach" is |
|---|---|
| [Jump Game II](https://leetcode.com/problems/jump-game-ii/) (LeetCode 45) | `i + nums[i]` |
| [Jump Game](https://leetcode.com/problems/jump-game/) (LeetCode 55) | same; just check `far ≥ last` |
| [Minimum Number of Taps to Open to Water a Garden](https://leetcode.com/problems/minimum-number-of-taps-to-open-to-water-a-garden/) (LeetCode 1326) | convert taps to `reach[left] = right` |
| [Partition Labels](https://leetcode.com/problems/partition-labels/) (LeetCode 763) | each letter's last occurrence extends `end` |

:::interview
"Why is this greedy and not BFS?"

It is BFS — on a line. All indices reachable in k jumps form the range `(prevEnd, end]`. Extending `far` inside that range finds the next level's boundary. The greedy choice is implicit: you never pick a specific square to land on, you just track how far the next level reaches. No queue needed.
:::
