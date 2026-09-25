### Variations

- **Intersection of Two Linked Lists (LeetCode 160) / Y-shaped lists (GFG):** `a = a ? a.next : headB` and `b = b ? b.next : headA` until `a === b`. Both walk `lenA + lenB` at most; they meet at the junction, or both reach `null` together when there is none
- **Program for n-th node from the end (GFG):** the same gap without the dummy; return −1 when the list is shorter than n
- **Sum of last N nodes (GFG):** gap of n, then sum from the follower to the end; or `total − sum of the first (len − N)` in two passes
- **Rotate List (LeetCode 61):** "cut k from the end" is a fixed gap of `k % len` from the tail; close the list into a ring and cut there

### The failure

- **A gap of n instead of n + 1.** With gap n, `slow` lands *on* the node to delete, and a singly linked list cannot unlink a node without its predecessor. Starting both at a dummy with gap `n + 1` puts `slow` one node earlier, and deleting the head (n = length) needs no special case
- **Comparing values for the intersection.** Two lists can hold equal values in unrelated nodes. The junction is a shared *node*: compare references with `===`

:::interview
"How do you find where two linked lists intersect in O(1) space?" — Walk a pointer down each list; when one ends, send it to the head of the other list. Each pointer then covers the unique part of both lists plus the shared tail, the same total distance, so they land on the first shared node at the same time, or on `null` together if there is none.
:::
