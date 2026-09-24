## The Wrong Approach (Sorting)

Sorting is so ubiquitous that it’s often taken for granted. In an interview, sorting is rarely the *entire* solution—it's usually the preprocessing step that enables the actual solution. This leads to candidates making strategic errors rather than implementation errors.

### The Over-Sorting Trap

- **Naive idea:** A problem asks for the top 3 highest scores in a massive dataset. The candidate sorts the entire dataset O(N log N) and slices the last 3 elements.
- **Why it breaks:** If N = 10⁷, sorting the entire array is an enormous waste of CPU cycles just to find 3 items. 
- **The fix:** If K is very small, use a Min-Heap of size K. As you stream through the N elements, push them into the heap. If the heap exceeds K, pop the minimum. The complexity drops to O(N log K). If K is relatively large but you don't need the top K to be sorted among themselves, use Quickselect O(N).

### The Default Sort Trap

- **Naive idea:** In JavaScript, the candidate writes `arr.sort()` to sort an array of integers.
- **Why it breaks:** The JS engine coerces everything to strings before sorting. `[2, 10, 21, 3]` becomes `[10, 2, 21, 3]`. The candidate spends 20 minutes debugging their binary search, completely unaware their array is unsorted.
- **The fix:** Always, without exception, provide a comparator for numbers: `arr.sort((a, b) => a - b)`.

### The Object Mutation Trap

- **Naive idea:** You need to sort an array of objects based on a property, but you also need to retain the original order for a later step. You call `arr.sort(...)`.
- **Why it breaks:** `Array.prototype.sort()` mutates the original array in place. You have permanently destroyed the original order.
- **The fix:** In modern JavaScript, use `arr.toSorted(...)` which returns a new array, or manually clone it first via `[...arr].sort(...)`.

:::interview
"Can you explain why we wouldn't use Quick Sort here?"

If the problem involves sorting objects with multiple identical keys (like sorting a list of users by age), Quick Sort is unstable. Users with the same age will have their original relative order completely scrambled. We must use a stable sort like Merge Sort or Timsort (which is what modern JS engines use under the hood).
:::
