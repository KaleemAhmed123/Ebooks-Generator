### The failure

- **Flipping before saving.** `cur.next = prev` first, then `cur = cur.next`, moves `cur` backwards into the part already reversed, and the rest of the list is lost
- **Losing the group boundaries.** After reversing a group, its old first node is the new tail. Forgetting to connect that tail to the next group, or to move `groupPrev` to it, silently drops or cycles nodes

:::interview
"How do you reverse a list in groups of k in O(1) extra space?" — I keep a pointer to the node before the current group. I check that k more nodes exist, reverse exactly those with the three-pointer loop, then stitch: the node before the group now points to its old last node, and its old first node, now the tail, becomes the 'before' pointer for the next group. Every node is flipped once: O(n) time, O(1) space.
:::
