### When to hand off to memoization

- Backtracking explores the full tree. If many branches revisit the **same state** and the answer depends only on the state (not the path), you are doing redundant work
- **The signal:** you see the same `(index, remainingCapacity)` or `(index, currentSum)` pair in multiple branches. Each visit recomputes the same subtree
- **The fix:** add a cache keyed by the state. This converts backtracking into top-down DP (memoization). The tree collapses from exponential branches into a polynomial state space
- **The rule:** if the number of distinct states is polynomial (e.g. n × W for knapsack), memoize. If the state includes the full path or a set of visited nodes, memoization rarely helps — the cache key space is itself exponential

### Where it appears

| Problem | Why it belongs here |
|---|---|
| [Combination Sum II](https://leetcode.com/problems/combination-sum-ii/) (LeetCode 40) | Sort-and-skip to avoid duplicate combinations |
| [Subsets II](https://leetcode.com/problems/subsets-ii/) (LeetCode 90) | Skip duplicate elements after sorting |
| [Palindrome Partitioning](https://leetcode.com/problems/palindrome-partitioning/) (LeetCode 131) | Prune non-palindrome prefixes early |
| [Word Search](https://leetcode.com/problems/word-search/) (LeetCode 79) | Prune paths where the character does not match |

:::interview
"Given n items with weights and values, and capacity W — backtracking or DP?"

Both work. Pure backtracking explores 2ⁿ subsets. But the state is just (index, remainingCapacity), which has only n × W distinct values. Adding a memo table collapses 2ⁿ branches into O(nW) states. Use DP. Backtracking without memoization is correct but exponentially slower here.
:::
