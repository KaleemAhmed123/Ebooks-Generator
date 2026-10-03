### Where it appears

| Problem | Why it belongs here |
|---|---|
| [Find the City With the Smallest Number of Neighbors at a Threshold Distance](https://leetcode.com/problems/find-the-city-with-the-smallest-number-of-neighbors-at-a-threshold-distance/) (LeetCode 1334) | All-pairs shortest path then count reachable cities |
| [Course Schedule IV](https://leetcode.com/problems/course-schedule-iv/) (LeetCode 1462) | Floyd-Warshall-style transitive closure on prerequisites |
| [Evaluate Division](https://leetcode.com/problems/evaluate-division/) (LeetCode 399) | All-pairs path product via Floyd-Warshall on equation graph |

### The trap

- **Loop Order:** The most common mistake is writing the loops as `for i`, `for j`, `for k`. The `k` loop (the intermediate node) **must** be the outermost loop. If it isn't, the DP state fails to build correctly because it hasn't established the base paths before trying to combine them.
