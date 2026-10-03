### Where it appears

| Problem | What "best so far" tracks |
|---|---|
| [Best Time to Buy and Sell Stock](https://leetcode.com/problems/best-time-to-buy-and-sell-stock/) (LeetCode 121) | the cheapest price seen so far |
| [Best Sightseeing Pair](https://leetcode.com/problems/best-sightseeing-pair/) (LeetCode 1014) | best `values[i] + i` seen so far |
| [Two Sum](https://leetcode.com/problems/two-sum/) (LeetCode 1) | an exact partner: map value → index |
| [Maximum Value of an Ordered Triplet II](https://leetcode.com/problems/maximum-value-of-an-ordered-triplet-ii/) (LeetCode 2874) | carry best `a[i]`, then best `a[i] − a[j]` |

- **Not separable:** `max j − i` with `a[i] ≤ a[j]` couples `i` and `j`. Build prefix minimums and suffix maximums instead → 03-04

:::interview
"In Best Time to Buy and Sell Stock, why not sort and take the largest gap?"

Sorting destroys the time axis. You must buy *before* you sell — `i < j` matters. Sorting would let you "buy" a future low price and "sell" a past high one. The one-pass scan respects order: it only considers selling at today's price against the cheapest price that already happened.
:::
