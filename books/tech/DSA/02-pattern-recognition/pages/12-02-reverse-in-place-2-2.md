### Variations

- **Reverse Linked List (LeetCode 206):** the inner loop alone with `prev = null`. Recursive form: reverse the rest, then `head.next.next = head; head.next = null`
- **Reverse Linked List II (LeetCode 92):** one group, positions `left..right`: walk to the node before `left`, then run the same flip for `right − left + 1` nodes
- **Reverse a linked list in groups of given size (GFG):** unlike LeetCode 25, the *last partial group is reversed too*. Read the statement; drop the "full group?" check
- **Add 1 to a number represented as a linked list (GFG):** reverse, add with carry, reverse back; or recurse to the tail and carry on the way out (page 13-02)
- **Rotate List (LeetCode 61):** not a reversal: close the list into a ring, walk `n − k % n` steps, cut there

### The failure

- **Flipping before saving.** `cur.next = prev` first, then `cur = cur.next`, moves `cur` backwards into the part already reversed, and the rest of the list is lost
- **Losing the group boundaries.** After reversing a group, its old first node is the new tail. Forgetting to connect that tail to the next group, or to move `groupPrev` to it, silently drops or cycles nodes

:::interview
"How do you reverse a list in groups of k in O(1) extra space?" — I keep a pointer to the node before the current group. I check that k more nodes exist, reverse exactly those with the three-pointer loop, then stitch: the node before the group now points to its old last node, and its old first node, now the tail, becomes the 'before' pointer for the next group. Every node is flipped once: O(n) time, O(1) space.
:::
