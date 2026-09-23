## Counting, Radix, and Bucket Sort

- The O(N log N) barrier applies specifically to **Comparison Sorts** (where algorithms learn about the array by comparing `a < b`).
- If you know something specific about the *data itself*, you can break the O(N log N) barrier and sort the array in O(N) time.

### Counting Sort 🟢

- **The requirement:** The array consists of integers within a very small, known range (e.g., ages 0 to 120).
- **The mechanism:** Create an array `counts` of size 121. Iterate through the input, and if you see an age of 24, increment `counts[24]`. Then iterate through `counts` to reconstruct the sorted array.
- **Complexity:** O(N + K) time and space, where K is the range of values. If K is 10⁹, this will instantly Crash/Memory Limit Exceed.

### Radix Sort 🟡

- **The requirement:** The array consists of numbers with a fixed maximum number of digits (e.g., 32-bit integers).
- **The mechanism:** Run a stable Counting Sort on the least significant digit (the 1s place). Then run it again on the 10s place. Then the 100s. After sorting by the most significant digit, the entire array is sorted.
- **Complexity:** O(W · N) where W is the number of digits. Since 32-bit integers have at most 10 decimal digits, it functions as O(N).

### Bucket Sort 🟡

- **The requirement:** The array consists of numbers uniformly distributed across a range (e.g., floating-point numbers between 0.0 and 1.0).
- **The mechanism:** Create N "buckets" (linked lists or dynamic arrays) covering equal sub-ranges. Place each number into its designated bucket. Sort each individual bucket using Insertion Sort. Concatenate the buckets.
- **Complexity:** O(N) average time if the distribution is perfectly uniform. Worst case O(N²) if all numbers clump into a single bucket.

### The trap

- **Negative numbers:** Counting Sort and Radix Sort break catastrophically if the input contains negative numbers because you cannot access `counts[-5]`.
- **The fix:** For Counting Sort, find the minimum value in the array, and shift all elements up by that absolute amount before tallying. (e.g., if the min is `-5`, add `5` to everything so `-5` becomes index `0`). For Radix Sort, split the array into negatives and positives, sort them separately (treating negatives carefully), and stitch them back together.
