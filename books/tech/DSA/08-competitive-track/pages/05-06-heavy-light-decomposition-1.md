## Heavy-Light Decomposition (HLD) <span class="lv lv3"></span>

**The Problem:** Given a tree with weights on the nodes, answer Q dynamic queries of two types:
1. Update the weight of node U.
2. Find the maximum weight on the simple path between node U and node V.

If this was a flat array, we would just use a Segment Tree in O(log N). But a tree is not flat. 
HLD is a technique that flattens a tree into a set of contiguous arrays, allowing us to use a standard Segment Tree over the paths!

### The Decomposition Strategy

We split the edges of the tree into two types: **Heavy Edges** and **Light Edges**.
- For every node, look at its children. 
- The edge connecting to the child with the largest subtree is the **Heavy Edge**.
- The edges connecting to all other children are **Light Edges**.

If we traverse the tree using only Heavy Edges, we form **Heavy Chains**. 
Every node belongs to exactly one Heavy Chain (a leaf might be a chain of length 1).

### The Flattening (Euler Tour)

We run a DFS to flatten the tree into an array, but we specifically visit the Heavy Child *first*.
Because we visit the Heavy Child first, **all nodes in the same Heavy Chain are assigned contiguous indices in the flattened array!**

Since a Heavy Chain is contiguous in the array, we can query or update an entire segment of a Heavy Chain in O(log N) using our Segment Tree.
