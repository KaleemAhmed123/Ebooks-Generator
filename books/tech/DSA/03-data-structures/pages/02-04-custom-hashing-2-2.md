### Where it appears

| Problem | Why it belongs here |
|---|---|
| [Find Duplicate Subtrees](https://leetcode.com/problems/find-duplicate-subtrees/) (LeetCode 652) | Serialize subtrees as custom hash keys |
| [Shortest Path in a Grid with Obstacles Elimination](https://leetcode.com/problems/shortest-path-in-a-grid-with-obstacles-elimination/) (LeetCode 1293) | BFS state is (row, col, remaining) serialized as key |
| [Sliding Puzzle](https://leetcode.com/problems/sliding-puzzle/) (LeetCode 773) | Board state serialized as string for visited set |

:::interview
"Isn't string concatenation slow?"

Yes. In the subtree example, the strings get progressively larger, so string copying takes O(N). The overall time complexity becomes O(N²). For most interviews, this is the expected answer. In competitive programming, you would use a Rolling Hash (Polynomial Hash) to compute the subtree signature as an integer in O(1) time, bringing the total time back to O(N).
:::
