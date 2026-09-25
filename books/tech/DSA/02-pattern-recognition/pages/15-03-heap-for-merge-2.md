### The Complexity

- Number of lists: K. Total nodes across all lists: N.
- The heap never holds more than K elements. Pushing/popping takes O(log K).
- We do this for all N nodes. Total time: O(N log K).
- Concatenating and sorting would cost O(N log N); the heap uses the fact that each list is already sorted

:::interview
"Can we merge K sorted arrays without a heap?"

Yes, using Divide and Conquer. We can merge pairs of arrays iteratively, reducing K to K/2, then K/4, until 1 array remains. The time complexity is identical to the heap approach: O(N log K). However, the heap approach is often simpler to write iteratively and handles continuous streams of data better.
:::
