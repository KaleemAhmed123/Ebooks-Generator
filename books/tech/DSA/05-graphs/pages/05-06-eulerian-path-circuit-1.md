## Eulerian Path & Circuit <span class="lv lv3"></span>

- A **Hamiltonian Path** visits every *node* exactly once. (This is NP-Hard—e.g., the Traveling Salesperson Problem).
- An **Eulerian Path** visits every *edge* exactly once. (This is O(E) and trivial to solve, famously originating from the Bridges of Königsberg puzzle).

### The Mathematical Rules

Before even trying to find a path, you can prove if one exists instantly by counting the degrees of the nodes.
*Degree = Number of edges connected to a node.*

**For an Undirected Graph:**
- **Eulerian Circuit (Starts and ends at same node):** Every single node in the graph must have an **even** degree.
- **Eulerian Path (Starts at A, ends at B):** Exactly **two** nodes must have an **odd** degree. (One is the start, one is the end). All other nodes must have an even degree.
- If there are 4 nodes with odd degrees, it is mathematically impossible to draw a path.

**For a Directed Graph:**
- **Eulerian Circuit:** Every node must have `inDegree === outDegree`.
- **Eulerian Path:** Exactly one node has `outDegree - inDegree === 1` (Start). Exactly one node has `inDegree - outDegree === 1` (End). All other nodes have `inDegree === outDegree`.
