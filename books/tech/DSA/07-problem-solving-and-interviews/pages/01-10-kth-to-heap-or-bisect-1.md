## Transformation: Kth Element to Heap or Bisect <span class="lv lv1"></span>

Finding the maximum element is easy: O(N) scan. Finding the Kth largest element is harder. Sorting takes O(N log N), but we don't care about the order of the other N-1 elements.

### The Signal

- "Find the Kth largest/smallest..."
- "Find the top K frequent..."
- "Find the K closest points..."

### Mapping 1: The Min-Heap Transformation

If we want the Kth **largest**, we transform the problem into maintaining a **Min-Heap** of strictly size K.
- Why Min-Heap for the largest?
- Because the Min-Heap keeps the *smallest of the top K* at the root.
- As we iterate through the array, if we find an element larger than the root, we pop the root (kicking out the smallest) and push the new element.
- The heap acts as an exclusive club. At the end, the root is exactly the Kth largest element.
- Complexity: O(N log K). If K is small, this is nearly O(N).

### Mapping 2: Binary Search on Answer

If the range of values is constrained, or the elements are generated implicitly (e.g., Kth smallest element in a sorted matrix), Heap becomes too slow or uses too much memory.

We transform the problem to Binary Search on Answer.
- **The Question:** "Is the Kth smallest element equal to M?"
- **The Decision Function:** "How many elements in the entire set are strictly less than or equal to M?"
- If `count(M) < K`, then M is too small. `left = M + 1`.
- If `count(M) >= K`, then M is a candidate. `right = M`.
