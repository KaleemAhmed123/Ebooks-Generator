### Where it appears

| Problem | What the dependencies encode |
|---|---|
| [Course Schedule](https://leetcode.com/problems/course-schedule/) (LeetCode 207) | prerequisites — cycle means impossible |
| [Course Schedule II](https://leetcode.com/problems/course-schedule-ii/) (LeetCode 210) | the valid enrolment order itself |
| [Parallel Courses](https://leetcode.com/problems/parallel-courses/) (LeetCode 1136) | longest chain = minimum semesters |
| [Alien Dictionary](https://www.geeksforgeeks.org/problems/alien-dictionary/1) (GFG) | one edge per first differing letter between adjacent words |

:::interview
"How do you extract edges for the alien dictionary?"

Compare each pair of adjacent words. Find the first position where they differ — that gives one edge: `word1[i] → word2[i]`. Stop at the first difference; later characters tell you nothing about order. Edge case: if `word1` is a prefix of `word2` but longer, the ordering is invalid (no edge, return empty).
:::
