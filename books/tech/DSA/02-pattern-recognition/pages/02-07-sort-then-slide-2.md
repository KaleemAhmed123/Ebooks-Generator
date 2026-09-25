### Variations

- **Chocolate Distribution Problem (GFG):** give m students one packet each, minimise the gap between the largest and smallest packet. Sort; answer = `min(a[i + m − 1] − a[i])` over every window of size m
- **Minimum Difference Between Highest and Lowest of K Scores (LeetCode 1984):** the same problem with a different story
- **Maximum Beauty of an Array After Applying Operation (LeetCode 2779):** each value may move by ±k. Two values can meet if they differ by at most 2k. Sort, then find the longest window with `a[right] − a[left] ≤ 2k`

### The failure

- **Sliding on the unsorted array.** The cost formula assumes `nums[right]` is the window maximum. Unsorted, it is not: on `[4, 1, 2]` the full window costs `2 · 3 − 7 = −1`, which "raises" the 4 *down* to 2. Increments cannot do that. Sorting is what makes the formula true
- **Raising to the wrong target.** Raising a window to its largest value is optimal; raising to anything bigger only costs more. So the target is always `nums[right]`, never a value outside the array
- **Overflow in other languages.** `nums[right] * len` reaches 10⁵ · 10⁵ = 10¹⁰. Safe in a JS number, but it overflows a 32-bit `int` in C++ or Java; use `long`

:::interview
"Why is sorting allowed when the problem says 'array'?" — Because the answer only depends on which values are chosen, not where they sit. Once position is irrelevant, I am free to reorder, and in sorted order the cheapest set to equalise, or the tightest set of m values, is always contiguous, so a window scans every candidate in O(n) after the O(n log n) sort.
:::
