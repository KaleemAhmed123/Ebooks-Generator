### Where it appears

| Problem | What the pairing optimises |
|---|---|
| [Boats to Save People](https://leetcode.com/problems/boats-to-save-people/) (LeetCode 881) | fewest boats (at most 2 per boat) |
| [Minimize Maximum Pair Sum in Array](https://leetcode.com/problems/minimize-maximum-pair-sum-in-array/) (LeetCode 1877) | pair `a[i]` with `a[n − 1 − i]` |
| [Assign Cookies](https://leetcode.com/problems/assign-cookies/) (LeetCode 455) | smallest cookie that satisfies each child |
| [Maximum Product of Three Numbers](https://leetcode.com/problems/maximum-product-of-three-numbers/) (LeetCode 628) | three largest, or two smallest × largest |

:::interview
"Why does pairing largest with smallest minimise the maximum pair sum?"

If you pair the two largest, their sum is the biggest possible pair — no other pairing can beat it. Pairing the largest with the smallest pulls that maximum down as far as it can go. Every other arrangement either keeps the same maximum or worsens it.
:::
