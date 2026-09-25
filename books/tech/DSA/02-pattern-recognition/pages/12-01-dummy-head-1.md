# Chapter 12 - Linked Lists

## The Linked List Family: Start with a Dummy Head <span class="lv lv1"></span>

- **What it is:** Linked-list problems are pointer surgery. Six moves cover almost all of them: a **dummy head** (this page), **reverse in place** (12-02), **split, reverse, weave** (12-03), **meet inside the loop** (12-04) **keep a fixed gap** (12-05) and **weave the copies** (12-06). A dummy head is a throwaway node placed before the real head, so the first real node is never a special case
- **Signal:** "merge", "partition around x", "remove all nodes with value v", "delete duplicates", "segregate odd and even", any operation that might change or delete the head
- **Why it works:** Every node except the head has a predecessor, and most edits are "change the predecessor's `next`". A dummy gives the head a predecessor too, so one loop handles every position, and the answer is always `dummy.next`
