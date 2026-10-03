### Where it appears

| Problem | What the running count tracks |
|---|---|
| [Divide Intervals Into Minimum Number of Groups](https://leetcode.com/problems/divide-intervals-into-minimum-number-of-groups/) (LeetCode 2406) | peak overlap = groups needed |
| [Minimum Platforms](https://www.geeksforgeeks.org/problems/minimum-platforms-1587115620/1) (GFG) | trains at the station simultaneously |
| [Number of Flowers in Full Bloom](https://leetcode.com/problems/number-of-flowers-in-full-bloom/) (LeetCode 2251) | flowers open; per-person count via binary search |
| [The Skyline Problem](https://leetcode.com/problems/the-skyline-problem/) (LeetCode 218) | events carry heights; a max-heap of the open ones |

:::interview
"What changes when intervals are closed vs half-open?"

Closed intervals `[1, 3]` and `[3, 5]` share the point 3, so they overlap. Put the `−1` event at `e + 1`, not `e`. Half-open intervals `[1, 3)` and `[3, 5)` do not share 3 — put the `−1` at `e`, with ties processing ends before starts. Getting the convention wrong shifts the peak count by 1.
:::
