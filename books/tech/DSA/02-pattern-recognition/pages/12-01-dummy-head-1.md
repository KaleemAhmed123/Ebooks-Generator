# Chapter 12 - Linked Lists

## The Linked List Family: Start with a Dummy Head <span class="lv lv1"></span>

- **What it is:** Linked-list problems are pointer surgery, and six moves cover almost all of them (table below). The first is the **dummy head**: a throwaway node placed before the real head, so the first real node is never a special case
- **Signal:** "merge", "partition around x", "remove all nodes with value v", "delete duplicates", "segregate odd and even", any operation that might change or delete the head
- **Why it works:** Every node except the head has a predecessor, and most edits are "change the predecessor's `next`". A dummy gives the head a predecessor too, so one loop handles every position, and the answer is always `dummy.next`

### The six moves, by pattern

| Pattern | Move | Trigger in the statement | Pointer to protect |
|---|---|---|---|
| (base move) | **12-01 Dummy head** | the head may change or vanish: merge, partition, delete | `dummy`: the answer is `dummy.next` |
| 29 · List Reversal | **12-02 Reverse in place** | "reverse", "nodes m to n", "in groups of k", "swap every two nodes" | `next`, saved before the flip |
| | **12-03 Split, reverse, weave** | front paired with back: "L0 → Ln → L1 …", palindrome, twin sum | the cut, `slow.next = null` |
| 30 · Pointer Distance | **12-04 Meet inside the loop** | "where the cycle begins", "duplicate in 1..n without changing the array" | the meeting node; restart only one pointer |
| | **12-05 Keep a fixed gap** | "n-th from the end", "where two lists join" | the node *before* the target: gap n + 1 |
| 31 · Weave the Copies | **12-06 Weave the copies** | "deep copy", "random pointer" | `x.next`, the copy, until the unweave |
