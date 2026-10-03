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
