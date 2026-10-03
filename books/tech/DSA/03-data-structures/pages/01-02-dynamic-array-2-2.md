### Where it appears

| Problem | Why it belongs here |
|---|---|
| [Design Dynamic Array](https://leetcode.com/problems/design-dynamic-array-resizable-array/) (LeetCode 2357) | Implement push, pop, resize from scratch |
| [Concatenation of Array](https://leetcode.com/problems/concatenation-of-array/) (LeetCode 1929) | Pre-allocate double-size array and copy |
| [Design HashMap](https://leetcode.com/problems/design-hashmap/) (LeetCode 706) | Dynamic array of buckets with resizing logic |

:::interview
"Why do dynamic arrays double in size instead of growing by a fixed amount?"

If an array grew by a fixed amount (e.g. +100 elements), then inserting N elements would trigger N/100 resizes. The total copy operations would be $100 + 200 + 300 + ... + N$, which is an arithmetic progression summing to O(N²). Doubling the size guarantees a geometric progression, keeping the amortised cost at O(1).
:::
