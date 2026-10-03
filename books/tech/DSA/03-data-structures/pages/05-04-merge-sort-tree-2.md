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

### Where it appears

| Problem | Why it belongs here |
|---|---|
| [Count of Smaller Numbers After Self](https://leetcode.com/problems/count-of-smaller-numbers-after-self/) (LeetCode 315) | Merge sort tree counts elements < X in a range |
| [Reverse Pairs](https://leetcode.com/problems/reverse-pairs/) (LeetCode 493) | Range count query for values > 2*X |
| [Count of Range Sum](https://leetcode.com/problems/count-of-range-sum/) (LeetCode 327) | Binary search on sorted node arrays for range bounds |

:::interview
"Can we optimize the $O(\log^2 N)$ query time to $O(\log N)$?"

Yes, using a technique called **Fractional Cascading**. Instead of just storing the numbers, every number in a node's array stores two pointers: the index of where it would sit in the left child's array, and the right child's array. This means you only binary search once at the root, and then follow the pointers down in O(1) per level. However, this is extremely complex and rarely expected outside of advanced competitive programming.
:::
