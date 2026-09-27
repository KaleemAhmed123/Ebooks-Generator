## Recognition drills after Chapter 16 <span class="lv lv2"></span> - continued

| # | Problem | Page | Deciding fact |
|---|---|---|---|
| 1 | [Most Stones Removed with Same Row or Column](https://leetcode.com/problems/most-stones-removed-with-same-row-or-column/) (LeetCode 947) | 16-02 | "shares its row or column": answer = stones − components |
| 2 | [Array Nesting](https://leetcode.com/problems/array-nesting/) (LeetCode 565) | 04-02 | "a permutation of 0 to n − 1": disjoint cycles; walk each once, marking in place, O(1) space |
| 3 | [Parallel Courses III](https://leetcode.com/problems/parallel-courses-iii/) (LeetCode 2050) | 16-04 | "any number at once": critical path in Kahn order |
| 4 | [Number of Closed Islands](https://leetcode.com/problems/number-of-closed-islands/) (LeetCode 1254) | 16-03 | "touch no edge": flood from the border, count what is left |
| 5 | [Similar String Groups](https://leetcode.com/problems/similar-string-groups/) (LeetCode 839) | 16-02 | "swapping two letters": similarity is the hidden edge; union every similar pair |
| 6 | [Find Eventual Safe States](https://leetcode.com/problems/find-eventual-safe-states/) (LeetCode 802) | 16-04 | "every walk ends": reverse the edges, run Kahn from the sinks |
| 7 | [Jump Game](https://leetcode.com/problems/jump-game/) (LeetCode 55) | 08-02 | "longest jump allowed": reachable indices form one range; extend it, no graph |
| 8 | [Redundant Connection](https://leetcode.com/problems/redundant-connection/) (LeetCode 684) | 16-01 | "one extra edge": union–find; the edge inside one set closes the cycle |
| 9 | [Pacific Atlantic Water Flow](https://leetcode.com/problems/pacific-atlantic-water-flow/) (LeetCode 417) | 16-03 | "drain to both": one uphill flood from each ocean's border, then intersect |
| 10 | [Alien Dictionary](https://www.geeksforgeeks.org/problems/alien-dictionary/1) (GFG) | 16-04 | "unknown alphabet": edge from the first differing letter, then topological order |
| 11 | [Smallest String With Swaps](https://leetcode.com/problems/smallest-string-with-swaps/) (LeetCode 1202) | 16-02 | swaps are transitive; sort letters per component |
| 12 | [Course Schedule IV](https://leetcode.com/problems/course-schedule-iv/) (LeetCode 1462) | 16-04 | "10⁴ queries": precompute reachability along the order |

### Score yourself

- **10–12:** you name the edge before the algorithm
- **6–9:** reread 16-02 and 16-04; most misses are the wrong edge, not the wrong algorithm
- **0–5:** reread 16-01 and Module 05's recognition page, then retry rows 1, 5 and 11
