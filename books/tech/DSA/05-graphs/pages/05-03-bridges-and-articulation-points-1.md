## Bridges and Articulation Points <span class="lv lv2"></span>

- In network design (like computer networks or road systems), you care deeply about **Single Points of Failure**.
- **Bridge (Cut-Edge):** An edge whose removal increases the number of disconnected components in the graph. (e.g., The only fiber optic cable connecting North America to Europe).
- **Articulation Point (Cut-Vertex):** A node whose removal increases the number of disconnected components. (e.g., A central router).

### Tarjan's Bridge-Finding Algorithm

To find bridges efficiently in O(V + E) time, we use a specialized DFS that tracks **Discovery Time** and **Lowest Reachable Time**.

1. **`disc[u]`:** The exact step/timestamp when node `u` was first visited during the DFS.
2. **`low[u]`:** The smallest discovery time of any node reachable from `u` (including `u` itself), *using at most one back-edge*.

- **The Core Logic:** We traverse the edge `U -> V`. If `low[v] > disc[u]`, it means `V` (and everything below `V`) has absolutely no alternate back-route to reach `U` or any ancestor of `U`. Therefore, the edge `U -> V` is the *only* way to reach `V`. It is a Bridge.
