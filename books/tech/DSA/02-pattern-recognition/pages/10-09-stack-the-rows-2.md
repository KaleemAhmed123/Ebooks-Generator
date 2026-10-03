### Where it appears

| Problem | What the histogram represents |
|---|---|
| [Maximal Rectangle](https://leetcode.com/problems/maximal-rectangle/) (LeetCode 85) | column heights of consecutive 1s per row |
| [Largest Rectangle in Histogram](https://leetcode.com/problems/largest-rectangle-in-histogram/) (LeetCode 84) | the helper alone — bar widths are 1 |

:::interview
"Why append a zero-height sentinel instead of flushing the stack after the loop?"

The sentinel triggers the same `while` branch that already handles shorter arrivals — every bar still on the stack gets popped and measured with one extra iteration, zero extra code paths. A separate flush loop duplicates the width calculation and is easy to get wrong (the `left` boundary after the last pop differs from the mid-loop case).
:::
