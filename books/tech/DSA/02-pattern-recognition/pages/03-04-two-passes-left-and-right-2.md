### Where it appears

| Problem | What each pass computes |
|---|---|
| [Trapping Rain Water](https://leetcode.com/problems/trapping-rain-water/) (LeetCode 42) | leftMax, rightMax; water = min(both) − height |
| [Product of Array Except Self](https://leetcode.com/problems/product-of-array-except-self/) (LeetCode 238) | prefix product, suffix product; multiply at each index |
| [Candy](https://leetcode.com/problems/candy/) (LeetCode 135) | rising run from left, rising run from right; take max |
| [Find Good Days to Rob the Bank](https://leetcode.com/problems/find-good-days-to-rob-the-bank/) (LeetCode 2100) | non-increasing run length from left, from right |

- **Follow-up (O(1) space):** two pointers. Advance the side whose running max is smaller; its water is `itsMax − h`, because the other side already has a bar at least as tall

:::interview
"Can Trapping Rain Water be solved in one pass?"

Yes — two pointers, left and right. Advance whichever side has the smaller running max. That side's water level is decided: the other side already has a bar at least as tall. This replaces both arrays with two variables: O(1) space.
:::
