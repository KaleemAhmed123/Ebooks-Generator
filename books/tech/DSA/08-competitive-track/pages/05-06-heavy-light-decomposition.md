## Heavy-Light Decomposition (HLD) 🔴

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

### The Flattening (Euler Tour magic)

We run a DFS to flatten the tree into an array, but we specifically visit the Heavy Child *first*.
Because we visit the Heavy Child first, **all nodes in the same Heavy Chain are assigned contiguous indices in the flattened array!**

Since a Heavy Chain is contiguous in the array, we can query or update an entire segment of a Heavy Chain in O(log N) using our Segment Tree.

### Querying a Path (U to V)

To query the path from U to V, we break the path down into Heavy Chain segments.
1. Find the "Chain Head" of U and the "Chain Head" of V.
2. Whichever head is deeper in the tree, we jump up. 
3. We query the Segment Tree for the contiguous array chunk from the current node up to its Chain Head. This takes O(log N).
4. We then take the Light Edge up to the parent of the Chain Head, landing on a new Heavy Chain.
5. We repeat this until U and V are on the same Heavy Chain.
6. Finally, we query the segment between U and V on their shared chain.

### Complexity Proof

A path from any node to the root will change Heavy Chains exactly when it crosses a Light Edge.
How many Light Edges can a path cross?
By definition, a Light Edge moves to a subtree that is less than half the size of the parent's subtree. The size halves every time. Therefore, a path can cross at most log₂ N Light Edges.

We do O(log N) Segment Tree work for each of the O(log N) chains on the path.
Total time complexity per query: O(log² N).
