## Longest Increasing Subsequence (LIS) <span class="lv lv1"></span>

LIS is a massive leap in complexity. In Climbing Stairs and House Robber, `dp[i]` only looked back at `dp[i-1]` and `dp[i-2]`. In LIS, `dp[i]` must look back at **every single state that came before it**.

- **The Setup:** Given an integer array, return the length of the longest strictly increasing subsequence.
- **Example:** `[10, 9, 2, 5, 3, 7, 101, 18]` -> `[2, 3, 7, 101]` -> Length: 4.
- **The State:** `dp[i]` = the length of the longest increasing subsequence that *strictly ends with the element at index i*.

### The Transition

To find the longest subsequence ending at `nums[i]`, we need to find some previous element `nums[j]` that we can legally append `nums[i]` to.
- It is legal to append `nums[i]` to `nums[j]` if and only if `nums[j] < nums[i]` (strictly increasing).
- If it is legal, the new sequence length is `dp[j] + 1`.
- We want to maximize this length, so we check *every single* `j` from `0` to `i-1`.

`dp[i] = max(dp[i], dp[j] + 1) for all j < i where nums[j] < nums[i]`
