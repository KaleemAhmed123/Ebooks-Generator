## The Decision Table

Memorising implementations is useless if you pick the wrong structure during an interview. Your goal is to map the **Core Bottleneck** of the problem to the **Contract** of a Data Structure.

### The Linear Decision Tree

Are you processing elements in a linear sequence?
- **Do you only need the most recent unresolved item?** $\rightarrow$ `Stack`. (e.g., Parentheses, DFS).
- **Do you only need the oldest pending item?** $\rightarrow$ `Queue`. (e.g., BFS, task scheduling).
- **Do you need the maximum/minimum in a sliding window?** $\rightarrow$ `Monotonic Queue`.
- **Do you need to eliminate elements that are "smaller than current"?** $\rightarrow$ `Monotonic Stack`. (e.g., Next Greater Element).
- **Do you need O(1) splices (insert/delete) in the middle?** $\rightarrow$ `Doubly Linked List`. (Only if you already have the node pointer, like in LRU Cache).

### The Frequency & Sets Decision Tree

Are you counting, grouping, or checking for existence?
- **Are the keys bounded integers (e.g., 26 lowercase letters, 1 to 1000)?** $\rightarrow$ `Frequency Array`. (Strict O(1), no collisions).
- **Are the keys unbounded, sparse, or strings?** $\rightarrow$ `Hash Map / Hash Set`. (Amortised O(1)).
- **Do you need to group complex states (like matrices or subtrees)?** $\rightarrow$ `Hash Map with Custom Serialized String Keys`.
- **Do you need the keys to stay perfectly sorted?** $\rightarrow$ `Ordered Set / TreeMap / Treap`. (O(log N)).

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
