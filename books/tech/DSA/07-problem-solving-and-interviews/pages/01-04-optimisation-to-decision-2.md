### Canonical Example: Koko Eating Bananas

- **Problem:** Koko has N piles of bananas. She has H hours to eat them all. Find the minimum integer eating speed K (bananas/hour) such that she finishes all bananas within H hours.
- **The Trap:** Trying to mathematically calculate the optimal speed based on averages and maximums. It requires messy edge cases and often fails.
- **The Transformation:**
  - Stop asking "What is the minimum speed?"
  - Start asking: "If Koko eats at exactly `V` bananas per hour, can she finish in `H` hours?"
- **The Execution:**
  - Write a simple `canFinish(speed)` function that iterates through the piles and calculates total hours required at that speed. This is a trivial O(N) boolean function.
  - Binary search the speed from `1` to `max(piles)`.
  - If `canFinish(mid)` is true, record it and try a slower speed (`right = mid - 1`).
  - If false, she needs to eat faster (`left = mid + 1`).
- **The Result:** We solved a complex optimisation problem with a trivial O(N log(text{Max Pile})) search.

### Where it appears

| Problem | Why it belongs here |
|---|---|
| [Koko Eating Bananas](https://leetcode.com/problems/koko-eating-bananas/) (LeetCode 875) | Binary search the eating speed, feasibility check is O(N) |
| [Capacity to Ship Packages Within D Days](https://leetcode.com/problems/capacity-to-ship-packages-within-d-days/) (LeetCode 1011) | Binary search the ship capacity, greedy day-count check |
| [Split Array Largest Sum](https://leetcode.com/problems/split-array-largest-sum/) (LeetCode 410) | Binary search the max subarray sum, greedy split check |
| [Minimum Number of Days to Make m Bouquets](https://leetcode.com/problems/minimum-number-of-days-to-make-m-bouquets/) (LeetCode 1482) | Binary search the day, check if enough adjacent flowers bloomed |
