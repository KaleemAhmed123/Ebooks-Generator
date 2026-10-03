### Where it appears

| Problem | What X represents |
|---|---|
| [Capacity To Ship Packages Within D Days](https://leetcode.com/problems/capacity-to-ship-packages-within-d-days/) (LeetCode 1011) | ship capacity |
| [Koko Eating Bananas](https://leetcode.com/problems/koko-eating-bananas/) (LeetCode 875) | eating speed |
| [Split Array Largest Sum](https://leetcode.com/problems/split-array-largest-sum/) (LeetCode 410) | maximum allowed subarray sum |
| [Magnetic Force Between Two Balls](https://leetcode.com/problems/magnetic-force-between-two-balls/) (LeetCode 1552) | minimum gap (maximise: the last true) |

:::interview
"How do you know the answer is monotonic?"

If capacity C lets you ship in D days, then C + 1 does too — more room per day can only help. This monotonicity means `canDo(X)` flips from false to true exactly once, which is the structure binary search needs. If increasing X could make a feasible answer infeasible, binary search does not apply.
:::
