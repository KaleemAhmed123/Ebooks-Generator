## Sort then Scan 🟢

- **What it is:** Sorting the array, then iterating over it once
- **Why it works:** In an unsorted array, elements that are mathematically "close" to each other can be on opposite ends of the array. Finding them requires an O(n²) nested loop. Sorting forces mathematically close elements to become physically adjacent
- **The bottleneck cured:** It turns an O(n²) search into an O(n log n) sort followed by an O(n) scan

### Finding duplicates or closest pairs

- If you want to know if an array contains duplicates, checking every pair is O(n²)
- If you sort the array, all duplicates are grouped together. `[3, 1, 3]` becomes `[1, 3, 3]`. You only need to check if `arr[i] === arr[i-1]`

```ts
function hasDuplicate(arr: number[]): boolean {
  arr.sort((a, b) => a - b);
  for (let i = 1; i < arr.length; i++) {
    if (arr[i] === arr[i - 1]) return true;
  }
  return false;
}
```

### The O(n) alternative

- **Why use sort-then-scan when a Hash Map is O(n)?**
- A Hash Set can find duplicates in O(n) time. But it costs O(n) extra space
- If the interviewer says: "Solve this in O(1) space," the Hash Set is banned. You must use Sort-Then-Scan. The time degrades to O(n log n), but the space drops to O(1) (assuming an in-place sorting algorithm like HeapSort)

### The trap

- **Forgetting that `arr.sort()` in JavaScript is alphabetical.**
- `[10, 2, 1].sort()` results in `[1, 10, 2]`. It converts the numbers to strings and sorts them alphabetically
- You must **always** provide a comparator for numbers: `arr.sort((a, b) => a - b)`

:::interview
"Given an array of points, find the two points that are closest together in 1D space."

The brute force is to calculate the distance between all pairs in O(n²) time. But the closest points must be adjacent if the array is sorted. So I will sort the array in O(n log n) time, then do a single O(n) pass comparing `arr[i]` with `arr[i-1]`.
:::
