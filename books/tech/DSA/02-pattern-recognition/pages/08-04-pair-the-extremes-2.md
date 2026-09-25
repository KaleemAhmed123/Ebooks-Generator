### Variations

- **Maximum Product of Three Numbers (LeetCode 628):** after sorting, only two candidates can win: the three largest, or the two smallest (both negative) times the largest. First X and last Y, with X + Y = 3
- **Minimize Maximum Pair Sum in Array (LeetCode 1877):** pair `a[i]` with `a[n − 1 − i]`; the answer is the largest of those sums
- **Assign Mice to Holes (GFG):** here the extremes pair with the *same* extremes: sort both lists and match in order; the answer is the largest `|mouse − hole|`. Crossing assignments never lower the maximum
- **Assign Cookies (LeetCode 455):** sort both; give each child, smallest greed first, the smallest cookie that satisfies them
- **Shop in Candy Store (GFG):** buy the cheapest, take the k most expensive free, repeat from both ends. For the maximum spend, mirror it: buy the most expensive, take the k cheapest free

### The failure

- **Two pointers without the sort.** The ends of an unsorted array are not the extremes. On `[3, 3, 1, 1]` with limit 3, the unsorted walk pairs nothing and uses 4 boats; sorted, the two 1s share a boat and the answer is 3
- **Forgetting negatives in products.** For three numbers, "the three largest" misses `[−10, −10, 1, 3, 2]`, where `−10 · −10 · 3 = 300` beats `1 · 2 · 3 = 6`

:::interview
"Why is the heaviest person paired with the lightest and not the next heaviest?" — The heaviest person needs a boat no matter what. The lightest person is the only candidate guaranteed not to be a worse partner than any other. If even the lightest does not fit, the heaviest goes alone; if it fits, any solution that pairs them differently can swap partners without violating the limit. So two pointers from both ends are optimal after an O(n log n) sort.
:::
