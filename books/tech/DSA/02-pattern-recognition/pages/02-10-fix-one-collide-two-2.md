### Where it appears

| Problem | What you fix, what you collide |
|---|---|
| [3Sum](https://leetcode.com/problems/3sum/) (LeetCode 15) | fix `nums[i]`; two-sum the rest to `−nums[i]` |
| [3Sum Closest](https://leetcode.com/problems/3sum-closest/) (LeetCode 16) | same structure; track min distance instead of exact match |
| [Valid Triangle Number](https://leetcode.com/problems/valid-triangle-number/) (LeetCode 611) | fix the largest side; a valid pair adds `right − left` at once |
| [4Sum](https://leetcode.com/problems/4sum/) (LeetCode 18) | fix two values (nested loop); collide the remaining pair |

:::interview
"How do you extend this to 4Sum or k-Sum in general?"

Add one more outer loop: fix two values, then collide two. Each extra fixed value adds an O(n) loop, so k-Sum is O(n^(k−1)). The dedup logic repeats at every fixed level — skip `nums[j] === nums[j − 1]` at each loop, not just the outermost one.
:::
