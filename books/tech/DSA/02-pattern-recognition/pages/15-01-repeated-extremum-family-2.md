### Heap vs Sorting

- If a problem asks for the *largest* element, scanning takes O(n)
- If a problem asks for the *Kth largest*, you can sort the array and return `arr[n - k]`. This takes O(n log n)
- If you use a Heap (Priority Queue) of size k, you process each element in O(log k). Total time: O(n log k)
- **The mathematical difference:** If n = 1,000,000 and k = 10, n log n ≈ 20,000,000 operations. n log k ≈ 3,000,000 operations. A heap is nearly an order of magnitude faster for small k
