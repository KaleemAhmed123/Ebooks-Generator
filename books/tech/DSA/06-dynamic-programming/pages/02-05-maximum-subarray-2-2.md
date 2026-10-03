### Where it appears

| Problem | Why it belongs here |
|---|---|
| [Maximum Subarray](https://leetcode.com/problems/maximum-subarray/) (LeetCode 53) | The original Kadane's problem |
| [Maximum Sum Circular Subarray](https://leetcode.com/problems/maximum-sum-circular-subarray/) (LeetCode 918) | Kadane's with wrap-around handled via total minus min-subarray |
| [Maximum Product Subarray](https://leetcode.com/problems/maximum-product-subarray/) (LeetCode 152) | Track both max and min running products |
| [Maximum Subarray Sum with One Deletion](https://leetcode.com/problems/maximum-subarray-sum-with-one-deletion/) (LeetCode 1186) | Expand state to dp[i][canDelete] |

### Why does this matter?

Kadane's algorithm is beautiful, but if you only memorize the O(1) variable trick, you will fail if the interviewer asks a follow-up like "Find the maximum subarray sum if you are allowed to delete exactly one element." 
If you understand the underlying `dp[i]` state, you can easily expand it to 2D: `dp[i][canDelete]` and solve the follow-up. Always master the DP logic before memorizing the space-optimized trick.
