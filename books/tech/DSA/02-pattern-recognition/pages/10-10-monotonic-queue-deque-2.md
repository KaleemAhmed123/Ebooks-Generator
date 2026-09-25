### The failure

- **Storing values instead of indices.** The front must expire when it leaves the window, and a value cannot tell you where it came from; with duplicates you cannot even tell which copy left

:::interview
"Why not a heap for Sliding Window Maximum?" — A heap works in O(n log n) with lazy deletion. The deque is O(n): each index enters and leaves once, and anything smaller behind a newer value can never be a window maximum again.
:::
