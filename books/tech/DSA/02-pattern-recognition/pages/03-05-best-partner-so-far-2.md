### Variations

- **Best Time to Buy and Sell Stock (LeetCode 121):** `f(i) = −price[i]`, `g(j) = price[j]`. Keep the cheapest price so far; the running minimum *is* the best partner
- **Maximum Difference Between Increasing Elements (LeetCode 2016):** the same, but only strictly increasing pairs count; return −1 when none exists
- **Two Sum (LeetCode 1):** the "best" partner is an exact one. The summary becomes a map value → index, and `j` asks for `target − nums[j]`
- **Count pairs with given sum (GFG):** map value → count; add `count[target − a[j]]`, then increment `count[a[j]]`. Duplicates are handled by the order of those two lines
- **Maximum Index (GFG), `max j − i` with `a[i] ≤ a[j]`:** the score is not separable into a best-so-far, because the constraint couples `i` and `j`. Build prefix minimums and suffix maximums (page 03-04), then walk both with two pointers

### The failure

- **Offering before reading.** Swap the two lines in the loop and `j` pairs with itself. In Maximum Difference Between Increasing Elements, `[5, 4, 3]` then returns 0 (buy and sell the same day) instead of −1. In Two Sum it returns `[j, j]` whenever `target = 2 · nums[j]`. LeetCode 121 happens to survive the bug, because 0 is a legal answer there, which is why it goes unnoticed
- **Trying it on a coupled score.** `max (j − i)` with `a[i] ≤ a[j]` looks like a pair problem, but the best `i` for one `j` is not the best for another. A single best-so-far variable gives wrong answers; recognise the coupling and switch to two passes

:::interview
"Can you do better than checking all pairs?" — I first try to split the score into a term in `i` and a term in `j`. For sightseeing, `values[i] + i` plus `values[j] − j`. Then for each `j` the best `i` is just the maximum of the first term so far, which I carry in one variable: O(n) time, O(1) space.
:::
