### The trap

- **Negative numbers:** Counting Sort and Radix Sort break catastrophically if the input contains negative numbers because you cannot access `counts[-5]`.
- **The fix:** For Counting Sort, find the minimum value in the array, and shift all elements up by that absolute amount before tallying. (e.g., if the min is `-5`, add `5` to everything so `-5` becomes index `0`). For Radix Sort, split the array into negatives and positives, sort them separately (treating negatives carefully), and stitch them back together.

### Where it appears

| Problem | Why it belongs here |
|---|---|
| [Maximum Gap](https://leetcode.com/problems/maximum-gap/) (LeetCode 164) | Radix or bucket sort to achieve O(N) |
| [Top K Frequent Elements](https://leetcode.com/problems/top-k-frequent-elements/) (LeetCode 347) | Bucket sort by frequency for O(N) |
| [Sort Colors](https://leetcode.com/problems/sort-colors/) (LeetCode 75) | Counting sort on a 3-value domain |
| [H-Index](https://leetcode.com/problems/h-index/) (LeetCode 274) | Counting sort on bounded citation counts |
