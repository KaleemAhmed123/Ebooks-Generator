## The wrong approach: Locality 🟢

- **Naive idea:** For sliding window, beginners often try to maintain the sum by calling a `sum()` function on `arr.slice(left, right + 1)` inside the loop
- **Why it looks right:** The logic is flawlessly correct. It passes the first 5 test cases on LeetCode
- **Why it breaks:** The `slice` and `sum` operations take O(k) time. If you do this n times, your total time is O(n × k). If k = n/2, you have written an O(n²) algorithm disguised as a sliding window. It will TLE
- **The trap:** Abstraction hides complexity. Writing `sum(window)` feels like an O(1) thought, but it is an O(k) machine execution
- **The fix:** You must maintain a running variable (`currentSum`) and mathematically update it with `+ arr[right] - arr[left-1]`. The state must transition, not rebuild

### Recognition drills

You have 20 seconds per problem. Do not solve. Identify which Locality pattern applies.

| # | Problem sketch | Your answer |
|---|---|---|
| 1 | Given an array of daily temperatures, return an array with the number of days you have to wait for a warmer temperature | |
| 2 | Find the length of the longest subarray containing at most two distinct characters | |
| 3 | Move all zeroes to the end of an array while maintaining the relative order of the non-zero elements | |
| 4 | Find the maximum average of any contiguous subarray of length K | |

:::note
**Answers:** 
1. **Monotonic Stack.** "Next greater element" implies finding a future value that breaks a current trend.
2. **Sliding Window (Variable).** Looking for a "longest subarray" with a condition.
3. **Two Pointers (Read/Write).** In-place modification. Fast pointer finds non-zeroes, slow pointer writes them.
4. **Sliding Window (Fixed).** The range size K is constant.
:::
