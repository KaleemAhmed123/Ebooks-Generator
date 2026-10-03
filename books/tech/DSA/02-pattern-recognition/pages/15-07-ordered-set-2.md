```ts
// JS/TS has no ordered set. Treat OrderedSet as a balanced BST with sizes
// (C++ std::set/multiset, Java TreeMap, or a paste-in order-statistic tree).
// Contains Duplicate III (LeetCode 220): value within t, indices within k
function containsNearbyAlmostDuplicate(nums: number[], k: number, t: number): boolean {
  const win = new OrderedSet<number>();          // holds the last k values, sorted
  for (let i = 0; i < nums.length; i++) {
    const c = win.ceil(nums[i] - t);             // smallest value ≥ nums[i] − t
    if (c !== undefined && c <= nums[i] + t) return true;
    win.add(nums[i]);
    if (i >= k) win.remove(nums[i - k]);          // keep the window exactly k wide
  }
  return false;
}
```

- **Watch out:** need **multiset** semantics when duplicates matter (a sliding window can hold two equal values); a plain set silently drops the second. For pure *counting* below a value with no neighbour query, a Fenwick over ranks (83) is smaller and faster than a tree
### Where it appears

| Problem | What the ordered set answers |
|---|---|
| [Contains Duplicate III](https://leetcode.com/problems/contains-duplicate-iii/) (LeetCode 220) | ceil of `x − t` inside a k-wide window |
| [Sliding Window Median](https://leetcode.com/problems/sliding-window-median/) (LeetCode 480) | the middle by rank, with delete-arbitrary |
| [Count of Range Sum](https://leetcode.com/problems/count-of-range-sum/) (LeetCode 327) | how many prefix sums fall in `[lo, hi]` |

:::interview
"Why reach for an ordered set instead of two heaps for a running median?"

Two heaps (15-04) win when the only query is the median and values just arrive. The moment you must **delete an arbitrary value** — a sliding window dropping its oldest element — a heap can only lazily mark it, and the balance counter gets fiddly. An ordered set deletes by value in O(log n) directly and still reads the median by rank, so the window stays exact with no bookkeeping. The cost is a heavier constant and, in JS, a class you must supply.
:::
