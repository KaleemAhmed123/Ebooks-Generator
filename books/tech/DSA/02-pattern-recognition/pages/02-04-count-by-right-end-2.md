### Where it appears

| Problem | Condition that survives shrinking |
|---|---|
| [Subarray Product Less Than K](https://leetcode.com/problems/subarray-product-less-than-k/) (LeetCode 713) | product < k (all values ≥ 1) |
| [Count Subarrays Where Max Element Appears at Least K Times](https://leetcode.com/problems/count-subarrays-where-max-element-appears-at-least-k-times/) (LeetCode 2962) | count of max ≥ k (grow-safe: add `left`) |
| [Number of Substrings Containing All Three Characters](https://leetcode.com/problems/number-of-substrings-containing-all-three-characters/) (LeetCode 1358) | all three present (grow-safe: shrink while valid, add `left`) |
| [Subarrays with K Different Integers](https://leetcode.com/problems/subarrays-with-k-different-integers/) (LeetCode 992) | exactly K → use 02-05 |

:::interview
"What changes when validity survives growing instead of shrinking?"

Shrink while *valid*, not while invalid. Each step, add `left` (every start before `left` keeps the condition), not `right − left + 1`. The loop skeleton is the same, just the words inside and the count formula flip.
:::
