### Where it appears

| Problem | What you take now and might regret |
|---|---|
| [Minimum Number of Refueling Stops](https://leetcode.com/problems/minimum-number-of-refueling-stops/) (LeetCode 871) | fuel from passed stations — take the biggest when stuck |
| [Course Schedule III](https://leetcode.com/problems/course-schedule-iii/) (LeetCode 630) | the longest course taken — drop it if a shorter one fits |
| [Furthest Building You Can Reach](https://leetcode.com/problems/furthest-building-you-can-reach/) (LeetCode 1642) | a ladder per climb — trade the smallest for bricks |
| [Maximum Performance of a Team](https://leetcode.com/problems/maximum-performance-of-a-team/) (LeetCode 1383) | the weakest member — drop when team grows past k |

:::interview
"Why is this greedy and not DP? You are making retroactive choices."

The heap makes the optimal swap provably — replacing the worst past choice with the current one never makes the answer worse. There is no branching: at each step, either the current item fits and you take it, or you swap the worst. No overlapping subproblems, no state space to explore. The heap just lets you "undo" the single worst decision efficiently.
:::
