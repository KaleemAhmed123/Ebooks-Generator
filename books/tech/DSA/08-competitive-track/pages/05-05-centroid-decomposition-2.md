### The Centroid Tree

If you keep track of which Centroid spawned which sub-Centroids, you build a new tree called the **Centroid Tree**.
- The height of the Centroid Tree is strictly O(log N).
- The distance between any two nodes U and V in the original tree can be found by looking at their Lowest Common Ancestor (LCA) in the Centroid Tree.

This makes the Centroid Tree perfect for answering dynamic queries like: "Update the color of node U, and query the distance to the nearest red node."
You just walk up the Centroid Tree from U (which takes log N steps) and update/query the state at each Centroid ancestor.
