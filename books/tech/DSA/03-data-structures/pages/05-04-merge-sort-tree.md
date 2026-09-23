## Merge Sort Tree

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

### The 2D Query: Elements > X in [L, R]

If a problem asks: "In the subarray from index $L$ to $R$, how many elements are strictly greater than $X$?"

1. Query the Segment Tree for the range `[L, R]`. This breaks the range down into $O(\log N)$ perfectly fitting nodes.
2. For *each* of those $\log N$ nodes, look at its stored sorted array.
3. Perform a Binary Search (`upper_bound`) on that array to find how many elements are $> X$. This takes $O(\log N)$ time.
4. Sum the results across all the nodes.
5. **Total Time:** $\log N$ nodes $\times \log N$ binary search = $O(\log^2 N)$ per query.

### The Limitation: Static Data Only

- A Merge Sort Tree **cannot be updated efficiently**.
- If you change a single element in the original array, you have to update $\log N$ nodes in the tree.
- However, updating a node means inserting/deleting from a sorted array. That takes $O(K)$ time where $K$ is the array size. For the root node, $K=N$. Therefore, an update takes $O(N)$ time.
- If the array is dynamic (requires point updates), you must abandon the Merge Sort Tree and use a Fenwick Tree of Ordered Sets (a 2D Fenwick), or a Fractional Cascading technique.

:::interview
"Can we optimize the $O(\log^2 N)$ query time to $O(\log N)$?" — Yes, using a technique called **Fractional Cascading**. Instead of just storing the numbers, every number in a node's array stores two pointers: the index of where it would sit in the left child's array, and the right child's array. This means you only binary search once at the root, and then follow the pointers down in O(1) per level. However, this is extremely complex and rarely expected outside of advanced competitive programming.
:::
