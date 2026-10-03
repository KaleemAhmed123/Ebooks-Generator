## Persistent Data Structures <span class="lv lv3"></span>

**The Problem:** You have an array. You perform Q updates. At query 100, the problem asks: "What was the sum of range [L, R] at the exact moment after query 14?"
You need to time-travel to a previous state of the array. 

If you copy the entire array after every update, you will run out of memory (MLE) and time (TLE). You need a data structure that remembers its history without copying everything.

### The Concept of Persistence

A Persistent Data Structure preserves the previous version of itself when modified.
Consider a Linked List: `A -> B -> C -> D`.
If we want to change `B` to `X`, we don't modify the original list. 
We create a new node `X`, point it to `C` (which already exists), and create a new head `A'`, which points to `X`.
Version 1 head is `A`. Version 2 head is `A'`. Both coexist in memory, sharing nodes `C` and `D`.

### The Persistent Segment Tree

A standard Segment Tree has 2N nodes. When we update an element, we traverse from the root to the leaf, updating exactly log₂ N nodes.
In a Persistent Segment Tree, instead of modifying those log₂ N nodes, we **create new copies of them**.

1. Create a new Leaf node with the updated value.
2. Create a new Parent node that points to the new Leaf and the *old* other child.
3. Continue up to the root, creating a new Root node.

We now have a new Root node representing Version 2 of the array. It shares all unmodified branches with the Version 1 Root!
Memory used per update: O(log N). Time per update: O(log N).
