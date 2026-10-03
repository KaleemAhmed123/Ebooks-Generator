## Merge Sort Tree <span class="lv lv3"></span>

- **What it is:** A Segment Tree where every node stores a completely sorted array of all elements in its range
- **The Contract:** O(N log N) space and time to build. O(log³ N) or O(log² N) time to answer "How many numbers in range [L, R] are strictly greater than X?"
- **Why it matters:** It combines the static range logic of a Segment Tree with the binary search capabilities of a sorted array. It solves 2D queries without needing Fenwick Trees or complex persistence

### The Build Phase

- The leaf nodes store arrays of size 1.
- To build the parent node, you take the sorted array from the left child, and the sorted array from the right child, and merge them in O(K) time using the standard Merge Sort `merge()` function.
- The root node will contain the entire array, completely sorted.
- Since every element is duplicated exactly once at every level of the tree, and there are $\log_2 N$ levels, the total space is exactly $O(N \log N)$.

```ts
let tree: number[][]; // Array of Arrays
let arr: number[];

function buildMergeSortTree(node: number, start: number, end: number) {
  if (start === end) {
    tree[node] = [arr[start]];
    return;
  }
  
  const mid = Math.floor((start + end) / 2);
  buildMergeSortTree(2 * node, start, mid);
  buildMergeSortTree(2 * node + 1, mid + 1, end);
  
  // O(K) merge of two sorted arrays
  tree[node] = mergeSortedArrays(tree[2 * node], tree[2 * node + 1]);
}
```
