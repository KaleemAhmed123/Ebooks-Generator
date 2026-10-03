### Canonical Example: Kth Smallest in a Sorted Matrix

- **Problem:** Given an N times N matrix where each row and column is sorted, find the Kth smallest element.
- **The Transformation:**
  - Range of values: `left = matrix[0][0]`, `right = matrix[n-1][n-1]`.
  - Binary search a value `mid`.
  - Count elements ≤ mid in O(N) time by starting at bottom-left and tracing a staircase up to top-right.
- **The Result:** O(N log(max - min)) time, requiring O(1) extra space, instantly beating the O(N² log K) Heap approach.

### Where it appears

| Problem | Why it belongs here |
|---|---|
| [Kth Largest Element in an Array](https://leetcode.com/problems/kth-largest-element-in-an-array/) (LeetCode 215) | Min-heap of size K, or quickselect for O(N) average |
| [Top K Frequent Elements](https://leetcode.com/problems/top-k-frequent-elements/) (LeetCode 347) | Count frequencies, then min-heap of size K on frequency |
| [Kth Smallest Element in a Sorted Matrix](https://leetcode.com/problems/kth-smallest-element-in-a-sorted-matrix/) (LeetCode 378) | Binary search on value range with staircase count |
| [K Closest Points to Origin](https://leetcode.com/problems/k-closest-points-to-origin/) (LeetCode 973) | Max-heap of size K on distance, or quickselect |
