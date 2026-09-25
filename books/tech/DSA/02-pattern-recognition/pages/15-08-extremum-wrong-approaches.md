### The wrong approach: Repeated Extremum

- **Naive idea:** For "Top K elements", beginners sort the entire array and return the last K elements
- **Why it looks right:** It solves the problem flawlessly and handles duplicates correctly (if using a stable sort)
- **Why it breaks:** Sorting takes O(n log n). If you only need the Top 3 elements out of 10 million, you did 200 million operations to perfectly sort the bottom 9,999,997 elements that you immediately throw away
- **The fix:** A Heap (Priority Queue) of size K takes O(n log k). It maintains a partial, rolling sort of only the elements that matter

### Recognition drills

You have 20 seconds per problem. Identify which Repeated Extremum pattern applies.

| # | Problem sketch | Your answer |
|---|---|---|
| 1 | Given a stream of integers, find the median value at any point | |
| 2 | Find the area of the largest rectangle that can be formed in a histogram | |
| 3 | You have a static array of heights. Answer 100,000 queries about the minimum height between index L and R | |
| 4 | You have an array of server loads. Update the load at index i, and query the maximum load between index L and R | |

:::note
**Answers:** 
1. **Two Heaps (Max-Heap for lower half, Min-Heap for upper half).** Classic streaming extremum.
2. **Monotonic Stack.** You need the "next smaller element" to determine where a rectangle's width terminates.
3. **Sparse Table.** Range extremum on static data. O(1) queries beat O(log n) Segment Tree.
4. **Segment Tree.** Range extremum WITH updates. Sparse table cannot update.
:::
