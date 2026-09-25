## Reverse in Place <span class="lv lv2"></span>

- **What it is:** Reversal with three pointers: `prev`, `cur`, `next`. Save `cur.next`, point `cur` backwards, step both forward. The same four lines reverse a whole list, a sublist, or every group of k
- **Signal:** "reverse the list", "reverse nodes m to n", "reverse in groups of k", "add 1 to a number stored most-significant digit first", "palindrome linked list"
- **Why it works:** A singly linked node knows only its successor. Reversing one link loses the rest of the list unless `next` is saved first; with it saved, each step flips exactly one link and never revisits a node. For a segment, keep a pointer to the node *before* it and the segment's first node, which becomes its tail, to stitch both ends back
