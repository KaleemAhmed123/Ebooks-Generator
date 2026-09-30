### Where it appears

| Problem | Why it belongs here |
|---|---|
| [Next Greater Element I](https://leetcode.com/problems/next-greater-element-i/) (LeetCode 496) | Monotonic stack pushes and pops each element once — O(n), not O(n²) |
| [Daily Temperatures](https://leetcode.com/problems/daily-temperatures/) (LeetCode 739) | Stack inner loop is bounded by total pushes across all iterations |
| [Trapping Rain Water](https://leetcode.com/problems/trapping-rain-water/) (LeetCode 42) | Two-pointer or stack solution processes each bar exactly once |
| [Longest Substring Without Repeating Characters](https://leetcode.com/problems/longest-substring-without-repeating-characters/) (LeetCode 3) | Inner while loop moves left pointer monotonically — total moves bounded by n |

:::interview
"Isn't this sliding window algorithm O(n²) because there's a while loop inside the for loop?"

No. The inner while loop only advances the `left` pointer. Since `left` starts at 0 and ends at `n`, it increments at most n times across the entire lifespan of the algorithm. The total work is strictly O(n).
:::
