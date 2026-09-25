### The trap

- **Forgetting that `arr.sort()` in JavaScript is alphabetical.**
- `[10, 2, 1].sort()` results in `[1, 10, 2]`. It converts the numbers to strings and sorts them alphabetically
- You must **always** provide a comparator for numbers: `arr.sort((a, b) => a - b)`

:::interview
"Given an array of points, find the two points that are closest together in 1D space."

The brute force is to calculate the distance between all pairs in O(n²) time. But the closest points must be adjacent if the array is sorted. So I will sort the array in O(n log n) time, then do a single O(n) pass comparing `arr[i]` with `arr[i-1]`.
:::
