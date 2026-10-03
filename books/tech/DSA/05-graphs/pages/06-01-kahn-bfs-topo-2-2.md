### Where it appears

| Problem | Why it belongs here |
|---|---|
| [Course Schedule](https://leetcode.com/problems/course-schedule/) (LeetCode 207) | Kahn's BFS detects if a valid course ordering exists |
| [Course Schedule II](https://leetcode.com/problems/course-schedule-ii/) (LeetCode 210) | Return the actual topological order of courses |
| [Alien Dictionary](https://leetcode.com/problems/alien-dictionary/) (LeetCode 269) | Build a digraph from word orderings, topo-sort the alphabet |
| [Parallel Courses](https://leetcode.com/problems/parallel-courses/) (LeetCode 1136) | Kahn's BFS layer count gives minimum semesters |

### The trap

- **Assuming only one valid order:** Topological sort is rarely unique. If Task A and Task B both have 0 dependencies, either could go first. Kahn's algorithm will output whatever order the queue processes them in.
- **The fix:** If a problem asks for the "lexicographically smallest" valid order (e.g., "Always do Task A before Task B if both are available"), simply replace the standard array `Queue` with a **Min-Priority Queue**.
