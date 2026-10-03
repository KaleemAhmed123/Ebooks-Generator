### The JavaScript Array Hack

If you are stuck in an interview using JS/Python without an Ordered Set, the accepted fallback is to use an Array and binary search for the insertion/deletion index, followed by array shifting (`splice`). 

```ts
// O(log N) to find index + O(N) to splice = O(N) total per insertion.
// In an interview, explain to the interviewer that you are simulating 
// an Ordered Set (which would be O(log N)) using an array.
function insertSorted(arr: number[], val: number) {
  let low = 0, high = arr.length;
  while (low < high) {
    const mid = Math.floor((low + high) / 2);
    if (arr[mid] < val) low = mid + 1;
    else high = mid;
  }
  arr.splice(low, 0, val); // The O(N) bottleneck
}
```

### Where it appears

| Problem | Why it belongs here |
|---|---|
| [Sliding Window Median](https://leetcode.com/problems/sliding-window-median/) (LeetCode 480) | Ordered set for O(log K) insert/delete in window |
| [My Calendar I](https://leetcode.com/problems/my-calendar-i/) (LeetCode 729) | Lower-bound query to detect interval overlap |
| [Contains Duplicate III](https://leetcode.com/problems/contains-duplicate-iii/) (LeetCode 220) | Ordered set checks value-range within a window |

:::interview
"In a system design interview, if I need an Ordered Set, what database matches this?"

Redis `Sorted Sets` (ZSET). It uses a Skip List under the hood to provide exactly these guarantees: O(log N) insertions, deletions, and range queries based on a score.
:::
