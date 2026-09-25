### The failure

- **One window for "exactly".** Shrink while `distinct > K`, then count when `distinct === K`. On `[1, 2, 1, 2, 3]` with K = 2 the true answer is 7. Adding 1 per window gives 4: it misses short subarrays like `[1, 2]` inside a longer valid window. Adding `right − left + 1` gives 11: it also counts `[2]` and `[1]`, which hold only one distinct value. The window is right for *longest*, wrong for *count*
- **Forgetting `k − 1` can be negative.** When K = 0, the second call is `atMost(nums, −1)`. Without the guard, `freq.size > −1` is true even for an empty window, so `left` runs past `right`, reads `undefined`, and the loop never ends

:::interview
"Why not shrink until the window has exactly K distinct and count there?" — Because the valid starts for a fixed right end form a *range*, not a single point. The left end of that range is where `distinct` drops to K; the right end is where it would drop to K − 1. `atMost(K) − atMost(K − 1)` measures that range for every right end at once, in two O(n) passes.
:::
