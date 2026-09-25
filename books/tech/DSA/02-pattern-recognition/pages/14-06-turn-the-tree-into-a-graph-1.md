## Turn the Tree into a Graph 🟡

- **What it is:** When the question starts at an arbitrary node and spreads in *every* direction (down to children and up to the parent), a tree's one-way `left`/`right` pointers are not enough. Record every node's parent in one pass, then run a plain BFS over three neighbours: left, right, parent
- **Signal:** "all nodes at distance k from a target node", "minimum time to burn the tree from a given node", "amount of time for the infection to spread", "k-th ancestor", "left, right and up"
- **Why it works:** A tree with parent pointers is just an undirected graph with n − 1 edges. BFS from the target visits nodes in order of distance, level by level, so "distance k" is BFS level k and "time to burn everything" is the number of the last level. A `visited` set stops the walk from bouncing back and forth along an edge
