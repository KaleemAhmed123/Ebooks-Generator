## Drills: Patterns Nobody Named <span class="lv lv2"></span>

Answer one of the four questions (frontier, dominated, boundary, precompute) before naming a technique.

| Problem | Question · page · the deciding fact |
|---|---|
| [Network Delay Time](https://leetcode.com/problems/network-delay-time/) (LeetCode 743) | frontier · 18-02 · summed times: Dijkstra |
| [Path With Minimum Effort](https://leetcode.com/problems/path-with-minimum-effort/) (LeetCode 1631) | frontier · 18-02 · the key is the largest step |
| [Path with Maximum Probability](https://leetcode.com/problems/path-with-maximum-probability/) (LeetCode 1514) | frontier · 18-02 · products shrink: take the largest first |
| [Shortest Path in a Grid with Obstacles Elimination](https://leetcode.com/problems/shortest-path-in-a-grid-with-obstacles-elimination/) (LeetCode 1293) | frontier · 18-02 · state `(r, c, eliminations left)` |
| [Trapping Rain Water II](https://leetcode.com/problems/trapping-rain-water-ii/) (LeetCode 407) | frontier · 18-02 · flood from the border, lowest wall first |
| [Car Fleet](https://leetcode.com/problems/car-fleet/) (LeetCode 853) | dominated · 18-06 · a slower car ahead absorbs the rest |
| [The Number of Weak Characters in the Game](https://leetcode.com/problems/the-number-of-weak-characters-in-the-game/) (LeetCode 1996) | dominated · 18-06 · sort one score, run the max of the other |
| [Russian Doll Envelopes](https://leetcode.com/problems/russian-doll-envelopes/) (LeetCode 354) | dominated · 18-06 · keep the smallest tail per length |
| [Maximum Width Ramp](https://leetcode.com/problems/maximum-width-ramp/) (LeetCode 962) | dominated · 18-06 · a decreasing stack of candidate starts |
| [Split Array Largest Sum](https://leetcode.com/problems/split-array-largest-sum/) (LeetCode 410) | boundary · 09-02 · guess the largest sum, check greedily |
| [Magnetic Force Between Two Balls](https://leetcode.com/problems/magnetic-force-between-two-balls/) (LeetCode 1552) | boundary · 09-02 · guess the gap: the last true |
