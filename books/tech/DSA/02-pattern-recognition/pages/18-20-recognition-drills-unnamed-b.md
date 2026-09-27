## Recognition drills after Chapter 18 <span class="lv lv2"></span> - continued

| # | Problem | Question · page | Deciding fact |
|---|---|---|---|
| 1 | [Minimum Limit of Balls in a Bag](https://leetcode.com/problems/minimum-limit-of-balls-in-a-bag/) (LeetCode 1760) | boundary · 09-02 | "minimise the largest"; halving the biggest fails |
| 2 | [Path Sum III](https://leetcode.com/problems/path-sum-iii/) (LeetCode 437) | precompute · 14-02 | "anywhere": prefix sums along the root path |
| 3 | [Path with Maximum Probability](https://leetcode.com/problems/path-with-maximum-probability/) (LeetCode 1514) | frontier · 18-02 | "most reliable": products ≤ 1 only shrink |
| 4 | [The Number of Weak Characters in the Game](https://leetcode.com/problems/the-number-of-weak-characters-in-the-game/) (LeetCode 1996) | dominated · 18-06 | "strictly higher in both" |
| 5 | [Can Make Palindrome from Substring](https://leetcode.com/problems/can-make-palindrome-from-substring/) (LeetCode 1177) | precompute · 03-02 | "many queries": prefix counts per letter |
| 6 | [Split Array Largest Sum](https://leetcode.com/problems/split-array-largest-sum/) (LeetCode 410) | boundary · 09-02 | "as small as possible": guess the cap |
| 7 | [Trapping Rain Water II](https://leetcode.com/problems/trapping-rain-water-ii/) (LeetCode 407) | frontier · 18-02 | "trapped": heap seeded with the border |
| 8 | [Maximum Width Ramp](https://leetcode.com/problems/maximum-width-ramp/) (LeetCode 962) | dominated · 18-06 | "widest": a decreasing prefix of left ends |
| 9 | [Find the City With the Smallest Number of Neighbors at a Threshold Distance](https://leetcode.com/problems/find-the-city-with-the-smallest-number-of-neighbors-at-a-threshold-distance/) (LeetCode 1334) | precompute · Module 05, 03-04 | "every city", n ≤ 100: Floyd–Warshall |
| 10 | [Shortest Path in a Grid with Obstacles Elimination](https://leetcode.com/problems/shortest-path-in-a-grid-with-obstacles-elimination/) (LeetCode 1293) | frontier · 18-02 | "at most k walls": state `(r, c, k left)` |
| 11 | [Magnetic Force Between Two Balls](https://leetcode.com/problems/magnetic-force-between-two-balls/) (LeetCode 1552) | boundary · 09-02 | "smallest gap as large as possible" |
| 12 | [Max Value of Equation](https://leetcode.com/problems/max-value-of-equation/) (LeetCode 1499) | dominated · 10-10 | "within k": deque of `yᵢ − xᵢ` |

### Score yourself

- **10–12:** you ask the structural question before the technique name
- **6–9:** reread 18-01; most misses take a boundary for a heap (rows 1, 6) or a frontier for a DP
- **0–5:** reread 18-02 and 18-06, then retry the rows marked frontier and dominated
