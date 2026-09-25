## Recognition drills: Repeated Extremum 🟢

Hide the right column. Identify the correct Extremum technique (Heap for Top-K, Heap for Merge, Monotonic Stack, Sparse Table) and justify your answer.

| Problem | Extremum Pattern & Justification |
|---|---|
| 1. Find the Kth largest element in a massive stream of numbers. | **Heap for Top-K.** Maintain a Min-Heap of size K. For every new number, if it's larger than the heap top, pop and push. Space is O(K), time is O(N log K). |
| 2. Given K sorted linked lists, merge them into a single sorted list. | **Heap for Merge.** Insert the head of each list into a Min-Heap. Pop the smallest, append it to the result, and push the next node from that same list into the heap. |
| 3. Given an array of building heights, find the area of the largest rectangle that can be formed within the histogram. | **Monotonic Stack (Next Smaller Element).** For every building, we need to know the first shorter building to its left and right to determine its maximum width. A monotonic increasing stack finds this in O(N). |
| 4. Given a static array of prices, answer 10^5 queries of the form "What was the lowest price between day L and day R?" | **Sparse Table.** Static array, idempotent operation (minimum), massive number of queries. O(N log N) build, O(1) query. |
| 5. You have a stream of task execution times. You need to dynamically extract the median time. | **Heap (Two Heaps).** Maintain a Max-Heap for the lower half of the data and a Min-Heap for the upper half. Keep their sizes balanced. The median is either the top of the larger heap, or the average of both tops. |
