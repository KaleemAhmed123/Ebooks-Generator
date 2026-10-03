### Canonical Example: Redundant Connection

- **Problem:** A tree has N nodes and N-1 edges. One extra edge is added, creating a cycle. Find that extra edge.
- **The Trap:** Running DFS cycle detection. It works, but it's annoying to write and harder to track exactly which edge caused the cycle.
- **The Transformation:**
  - Start with an empty DSU.
  - Process edges one by one.
  - For each edge `[u, v]`, if `find(u) === find(v)`, you just found the edge that created the cycle! Return it immediately.
  - Otherwise, `union(u, v)`.

DSU is the ultimate tool for processing dynamic connectivity. If a problem involves merging groups, immediately transform it to DSU.

### Where it appears

| Problem | Why it belongs here |
|---|---|
| [Number of Provinces](https://leetcode.com/problems/number-of-provinces/) (LeetCode 547) | Union connected cities, count remaining disjoint sets |
| [Redundant Connection](https://leetcode.com/problems/redundant-connection/) (LeetCode 684) | Union edges sequentially; the one that creates a cycle is the answer |
| [Accounts Merge](https://leetcode.com/problems/accounts-merge/) (LeetCode 721) | Union accounts sharing an email, merge groups at the end |
| [Longest Consecutive Sequence](https://leetcode.com/problems/longest-consecutive-sequence/) (LeetCode 128) | Union consecutive values, track largest component size |
