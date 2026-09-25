### Variations

- **Merge k sorted arrays (GFG):** push `[value, arrayIndex, position]` so a pop knows where the successor lives
- **Find K Pairs with Smallest Sums (LeetCode 373):** each row `i` is a sorted source of pairs `(i, 0), (i, 1), …`; seed the first column, push `(i, j + 1)` after popping `(i, j)`
- **Smallest Range Covering Elements from K Lists (LeetCode 632):** keep the current maximum beside the heap; the range is `[top, max]`; stop when any list runs out
- **Kth Smallest Element in a Sorted Matrix (LeetCode 378):** rows are the sources; pop k times. The value search of 09-04 uses less memory

### The failure

- **Pushing every element up front.** Heaping all N values costs O(N log N) time and O(N) memory, which is just sorting. The point is to hold one head per source: O(N log K) time and O(K) heap memory

:::interview
"Can you merge K sorted lists without a heap?" — Yes: merge them in pairs, K → K/2 → … → 1, like the merge step of merge sort. Each round touches all N nodes and there are log K rounds, so it is also O(N log K). The heap version is easier to stream, because it never needs a whole list at once.
:::
