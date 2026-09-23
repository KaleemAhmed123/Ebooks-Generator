## Can we preprocess?

- Sometimes the data in its raw form does not allow remembering or eliminating
- Preprocessing means transforming the entire dataset into a new shape *before* you begin the main algorithm
- It spends upfront time (usually O(n) or O(n log n)) to make subsequent operations extremely cheap

### Sorting as preprocessing

- **The bottleneck:** "I need to find the closest pair of points, or check for duplicates, or run a binary search."
- **Transformation:** Spend O(n log n) to sort the array. Now duplicates are adjacent, closest pairs are adjacent, and you can eliminate halves
- **The math:** If you have to do m binary searches, sorting first takes O(n log n + m log n). If m is large, this easily beats m times O(n) linear scans

### Prefix sums as preprocessing

- **The bottleneck:** "I need to find the sum of a subarray from index L to R, and I need to do this Q times."
- **Brute force:** A loop from L to R takes O(n) per query. Total time: O(Q × n)
- **Transformation:** Create an array where `prefix[i]` is the sum of all elements up to `i`. This takes O(n) time. Now, the sum from L to R is just `prefix[R] - prefix[L-1]`.
- **The math:** The query time drops to O(1). Total time: O(n + Q). If n = 10⁵ and Q = 10⁵, this drops operations from 10¹⁰ to 2 × 10⁵

### Hash Maps as preprocessing

- You can loop over the array once to build a frequency map or an index map. This is an O(n) time and O(n) space preprocess
- Once built, you can answer "does this array contain X?" in O(1) instead of O(n)

### The trap

- **Preprocessing when the data changes.** Prefix sums are brilliant for static arrays. If the problem asks you to *update* elements between queries, updating the prefix array takes O(n), ruining the benefit. (That is the exact constraint fingerprint that tells you to use a Fenwick or Segment Tree)

:::interview
"You have an array and 100,000 range-sum queries. How do you handle this efficiently?" — I would preprocess the array into a prefix sum array in O(n). Then each query becomes a single subtraction: sum(L, R) = prefix[R] − prefix[L−1]. Total time drops from O(n × Q) to O(n + Q).
:::
