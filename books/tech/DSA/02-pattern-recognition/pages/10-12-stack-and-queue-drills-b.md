## Recognition drills after Chapter 10 <span class="lv lv1"></span> - continued

| # | Problem | Page | Deciding fact |
|---|---|---|---|
| 1 | [Maximum Subarray Min-Product](https://leetcode.com/problems/maximum-subarray-min-product/) (LeetCode 1856) | 10-08 | "each subarray is scored by its **minimum**": reach of each minimum, plus prefix sums for the sum |
| 2 | [Exclusive Time of Functions](https://leetcode.com/problems/exclusive-time-of-functions/) (LeetCode 636) | 10-02 | calls **nest**: push the caller, pause its clock, resume it on the matching end |
| 3 | [Find Peak Element](https://leetcode.com/problems/find-peak-element/) (LeetCode 162) | 09-03 | "**any** peak" in **O(log n)**: move toward the higher neighbour, no stack |
| 4 | [Sliding Window Maximum](https://leetcode.com/problems/sliding-window-maximum/) (LeetCode 239) | 10-10 | fixed length **k**: the front **expires** by index |
| 5 | [Removing Stars From a String](https://leetcode.com/problems/removing-stars-from-a-string/) (LeetCode 2390) | 10-03 | each `*` **destroys** the nearest survivor to its left |
| 6 | [Online Stock Span](https://leetcode.com/problems/online-stock-span/) (LeetCode 901) | 10-05 | **previous** greater: pop smaller-or-equal prices, the span reaches back to the new top |
| 7 | [Count Number of Nice Subarrays](https://leetcode.com/problems/count-number-of-nice-subarrays/) (LeetCode 1248) | 02-05 | **exactly** k: at most k minus at most k − 1 |
| 8 | [Min Stack](https://leetcode.com/problems/min-stack/) (LeetCode 155) | 10-11 | each entry stores the **min below it** |
| 9 | [Valid Parenthesis String](https://leetcode.com/problems/valid-parenthesis-string/) (LeetCode 678) | 10-04 | **one** bracket kind: a counter range `[lo, hi]` of possible open brackets |
| 10 | [Remove K Digits](https://leetcode.com/problems/remove-k-digits/) (LeetCode 402) | 10-07 | deletions only, **budget** k |
| 11 | [Constrained Subsequence Sum](https://leetcode.com/problems/constrained-subsequence-sum/) (LeetCode 1425) | 10-10 | `dp[i]` needs the best of the **last k** dp values |
| 12 | [Asteroid Collision](https://leetcode.com/problems/asteroid-collision/) (LeetCode 735) | 10-03 | a newcomer **fights** the top until one side stops |
| 13 | [Sum of Subarray Minimums](https://leetcode.com/problems/sum-of-subarray-minimums/) (LeetCode 907) | 10-08 | a **sum over all** subarrays of a minimum: count each element's reach |

### Score yourself

- **11–13:** you can say what the top of the stack means before writing a push
- **7–10:** reread 10-01's three reasons: nesting, cancellation, waiting
- **0–6:** trace 10-05 and 10-10 by hand on paper, then retry
