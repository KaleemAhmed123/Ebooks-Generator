# Chapter 12 - Linked Lists

## Linked List Pointers <span class="lv lv1"></span>

- **What it is:** pointer surgery. Six moves cover almost every problem; the base move is the **dummy head**, a throwaway node before the real head, so the first node is never a special case
- **Signal:** "merge", "partition around x", "remove the nodes with value v", "reverse", "cycle", "n-th from the end", "deep copy"
- **Mechanism:** most edits are "rewire the predecessor's `next`". A dummy gives the head a predecessor too, so one loop handles every position and the answer is `dummy.next`
### The moves

| Move | Trigger in the statement | Pointer to protect |
|---|---|---|
| **12-02** | reverse, nodes m to n, groups of k | `next`, saved before the flip |
| **12-03** | the front meets the back, palindrome | the cut, `slow.next = null` |
| **12-04** | where the cycle begins | the meeting node |
| **12-05** | n-th from the end, where lists join | the node *before* the target |
| **12-06** | deep copy with a random pointer | `x.next`, until the unweave |
