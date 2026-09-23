## DSU on Tree (Sack) 🔴

**The Problem:** Given a rooted tree where each node has a color. Answer Q offline queries of the form: "How many distinct colors are in the subtree of node U?"

This looks like Mo's Algorithm, but on a tree. We could flatten the tree into an array using Euler Tour and run Mo's Algorithm in O(N √N). 
But **DSU on Tree** (also known as "Small to Large Merging" on trees) solves this in exactly O(N log N) time.

### The Naive DFS (O(N²))

To answer the query for node U, we could run a DFS on its subtree, add all colors to a `Set`, get the size, and then clear the `Set`. 
If we do this for every node, a skewed tree (a straight line) will take O(N²) time because we repeatedly process the same nodes.

### The "Small to Large" Insight

When we finish processing the children of U, we don't actually need to clear the `Set` of the **largest child** (the Heavy Child). We can just reuse it!

1. For a node U, identify its "Heavy Child" (the child with the largest subtree size).
2. Run DFS on all "Light Children". After calculating their answers, **clear their data** from the global frequency array.
3. Run DFS on the "Heavy Child". After calculating its answer, **keep its data** in the global frequency array.
4. Now, iterate through the Light Children of U one more time, adding their colors into the global frequency array (which already contains the massive Heavy Child's data).
5. Record the answer for U.

### Why is this O(N log N)?

Every time a node's data is cleared, it must have been part of a Light Child. 
By definition, a Light Child's subtree size is at most half the size of its parent's subtree. 
Therefore, a node can only be part of a Light Child at most log₂ N times on the path up to the root.
Since each node is added/cleared at most log N times, the total time for all operations across the entire tree is strictly bounded by O(N log N).

### Implementation Structure

```cpp
void dfs(int u, int p, bool keep) {
    // 1. Process all light children, clearing their data
    for (int v : adj[u]) {
        if (v != p && v != heavy[u]) {
            dfs(v, u, false);
        }
    }
    
    // 2. Process heavy child, keeping its data
    if (heavy[u] != -1) {
        dfs(heavy[u], u, true);
    }
    
    // 3. Add u's data and light children's data into the global array
    add(u, p, 1); 
    
    // 4. Record answer for u
    ans[u] = countDistinct;
    
    // 5. If this was a light child call, clear everything
    if (!keep) {
        add(u, p, -1);
    }
}
```
