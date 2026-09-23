### The wrong approach: Search Space Reduction

- **Naive idea:** For "Minimise the maximum capacity", trying capacities starting from 1, simulating each one, until one works
- **Why it looks right:** It flawlessly finds the absolute minimum valid capacity
- **Why it breaks:** If the required capacity is 10⁹, you will run the O(N) simulation 10⁹ times. It will Time Limit Exceed. By guessing linearly, you treat the structured (monotonic) answer domain as if it were a random space
- **The fix:** Use Binary Search on the answer domain to find the transition point in O(log R) guesses

### Recognition drills

You have 20 seconds per problem. Identify which Search Space pattern applies.

| # | Problem sketch | Your answer |
|---|---|---|
| 1 | Given an array of sorted arrays, find the Kth smallest element overall | |
| 2 | Find the minimum time required to complete all trips given an array of bus travel times | |
| 3 | You have a sorted array that has been rotated. Find the minimum element | |
| 4 | Find the maximum distance you can place M cows in N stalls such that they don't fight | |

:::note
**Answers:** 
1. **Heap for Merge (Module 4).** You can binary search the answer, but a Min-Heap merging K lists is the standard approach here.
2. **Binary Search on Answer.** The domain of "time" is monotonic. If T works, T+1 works.
3. **Binary Search.** The array is partially monotonic. You can still eliminate half the space by comparing `mid` to `right`.
4. **Binary Search on Answer ("Maximise the minimum").** Binary search the distance D. `isValid(D)` is a greedy O(N) check: place a cow in the first stall, then place the next cow in the first stall that is ≥ D away. If you place all M cows, D is valid.
:::
