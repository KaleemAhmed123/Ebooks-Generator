### Where it appears

| Problem | Why it belongs here |
|---|---|
| [Subsets](https://leetcode.com/problems/subsets/) (LeetCode 78) | Iterate 0 to 2^n; each bitmask is a subset |
| [Partition to K Equal Sum Subsets](https://leetcode.com/problems/partition-to-k-equal-sum-subsets/) (LeetCode 698) | Bitmask DP tracking which elements are used |
| [Shortest Path Visiting All Nodes](https://leetcode.com/problems/shortest-path-visiting-all-nodes/) (LeetCode 847) | BFS with bitmask state for visited nodes |
| [Can I Win](https://leetcode.com/problems/can-i-win/) (LeetCode 464) | Bitmask memoization for chosen numbers |

:::interview
"Given n people and n tasks with a cost matrix, assign each person exactly one task to minimize total cost."

This is the Assignment Problem. State: `dp[mask]` = minimum cost to assign tasks to the people whose bits are set in `mask`. Transition: for the next unassigned person, try every unassigned task. With n ≤ 20, the state space is 2²⁰ × 20 ≈ 20 million — fast enough. Without the bitmask, brute force is O(n!) which fails at n = 13.
:::
