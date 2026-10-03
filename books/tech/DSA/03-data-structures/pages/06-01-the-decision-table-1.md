## The Decision Table <span class="lv lv1"></span>

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
