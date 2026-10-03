### Where it appears

| Problem | What the two heaps partition |
|---|---|
| [Find Median from Data Stream](https://leetcode.com/problems/find-median-from-data-stream/) (LeetCode 295) | lower half (max-heap) and upper half (min-heap) |
| [Sliding Window Median](https://leetcode.com/problems/sliding-window-median/) (LeetCode 480) | same split — lazy deletion for outgoing values |
| [IPO](https://leetcode.com/problems/ipo/) (LeetCode 502) | affordable projects (min-heap on cost) and best profit (max-heap) |

:::interview
"Sliding Window Median removes elements from the middle of a heap. How does lazy deletion work?"

You don't actually remove from the heap — you mark the value as "gone" in a hash map. When the heap's top is marked, pop it silently. This keeps removal O(1) and cleanup amortised. The tricky part: maintain a balance counter (`lo.size − hi.size`) that counts *live* elements, not heap size, so rebalancing stays correct.
:::
