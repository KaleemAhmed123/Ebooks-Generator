### The Tree & Priority Decision Tree

Are you dealing with hierarchical data, ranges, or extremes?
- **Do you just need the absolute Min/Max continuously?** $\rightarrow$ `Heap (Priority Queue)`. (O(log N) inserts/pops).
- **Do you need to find the K-th smallest/largest?** $\rightarrow$ `Min-Heap/Max-Heap of size K`.
- **Do you need to prefix-match strings?** $\rightarrow$ `Trie`. (O(L) per string).
- **Do you need to query ranges (Sums) AND update individual elements?** $\rightarrow$ `Fenwick Tree`. (O(log N)).
- **Do you need to query ranges (Min/Max/GCD) AND update elements?** $\rightarrow$ `Segment Tree`. (O(log N)).
- **Do you need to query ranges (Min/Max) BUT the data NEVER changes?** $\rightarrow$ `Sparse Table`. (O(1) query).

### The Graph Decision Tree

Are you traversing connections between entities?
- **Is the graph sparse (fewer edges than $V^2$)?** $\rightarrow$ `Adjacency List`. (O(V+E)).
- **Is the graph a literal 2D grid/matrix?** $\rightarrow$ Do not build an adjacency list. Treat the grid *itself* as the graph and use `[r+1, c]`, `[r-1, c]`, etc.
- **Do edges have costs/weights?** $\rightarrow$ `Weighted Adjacency List + Min-Heap` (Dijkstra).
- **Do edges have direction (prerequisites)?** $\rightarrow$ `Directed Adjacency List + Indegree Array` (Topological Sort).
- **Do you only care about "who is connected to who" (Components)?** $\rightarrow$ `DSU (Union-Find)`. (Amortised O(1)).

---

### The "If you only remember one thing" Rule
**"If a problem asks you to repeatedly find the extreme (min/max), use a Heap. If it asks you to maintain order while elements enter and leave, use an Ordered Set. If it asks for range queries with updates, use a Segment Tree. If it asks for anything else, see if a Hash Map can solve it in O(1)."**
