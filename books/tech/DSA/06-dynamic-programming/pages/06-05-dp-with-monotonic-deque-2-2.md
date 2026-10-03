### The trap

- **Using `deque.shift()` in JS.** Array `.shift()` is O(n) because it reindexes every element. For competitive programming, implement a deque with a circular buffer or use two-pointer indices into a pre-allocated array. For interviews, mention the caveat but use `.shift()` for clarity — interviewers care about the algorithm, not the JS array internals
- **Forgetting to evict stale front entries before reading.** If the window has moved past `deque[0]`, you read an out-of-bounds state. Always evict first, then read

### Where it appears

| Problem | Why it belongs here |
|---|---|
| [Jump Game VI](https://leetcode.com/problems/jump-game-vi/) (LeetCode 1696) | Max score with bounded jumps — sliding window max |
| [Constrained Subsequence Sum](https://leetcode.com/problems/constrained-subsequence-sum/) (LeetCode 1425) | Max subsequence sum with gap constraint k |
| [Sliding Window Maximum](https://leetcode.com/problems/sliding-window-maximum/) (LeetCode 239) | The pure monotonic deque template |
| [Shortest Subarray with Sum at Least K](https://leetcode.com/problems/shortest-subarray-with-sum-at-least-k/) (LeetCode 862) | Deque on prefix sums for minimum-length subarray |

:::interview
"How does the deque make this O(n)?"

Each index enters the deque once and leaves at most once — either evicted from the back (dominated) or from the front (out of window). Total operations across all iterations: 2n pushes and pops. Each transition reads the front in O(1). Amortised O(1) per transition, O(n) total.
:::
