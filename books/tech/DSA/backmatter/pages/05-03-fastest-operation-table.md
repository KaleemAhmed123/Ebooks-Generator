## The Fastest Operation Table

When you know exactly what mathematical operation is bottlenecking your algorithm, look it up here to find the fastest data structure that supports it.

| Operation Needed | Fastest Data Structure | Time Complexity | Notes |
| :--- | :--- | :--- | :--- |
| **Membership Check** (Does X exist?) | Hash Set | O(1) | Worst case O(N) with hash collisions. |
| **Membership Check** (String Prefixes) | Trie | O(L) | L is string length. |
| **Get Min/Max** (Static) | Array / Variable | O(N) | Just scan it once. |
| **Get Min/Max** (Dynamic Insertions) | Min/Max Heap | O(1) peek, O(log N) push/pop | Cannot search for arbitrary elements easily. |
| **Get Min/Max** (Sliding Window) | Monotonic Deque | O(1) amortised | Essential for Sliding Window Maximum. |
| **Range Sum Query** (Static Array) | Prefix Sum Array | O(1) | Must precompute in O(N). |
| **Range Sum Query** (Dynamic Updates) | Fenwick / Segment Tree | O(log N) | Fenwick is faster to type; Segment is more flexible. |
| **Range Min/Max Query** (Static Array) | Sparse Table | O(1) | O(N log N) to build. Cannot be updated. |
| **Range Min/Max Query** (Dynamic Updates) | Segment Tree | O(log N) | The ultimate Swiss Army Knife. |
| **Next Greater Element** | Monotonic Stack | O(1) amortised | Precomputes in O(N). |
| **Find Connected Component** (Static) | DFS / BFS | O(V + E) | |
| **Find Connected Component** (Dynamic Edges) | DSU (Union-Find) | O(alpha(N)) | alpha is Inverse Ackermann (essentially O(1)). |
| **Nearest Neighbor** (1D points) | Sorted Array + Binary Search | O(log N) | |
| **Nearest Neighbor** (2D/3D points) | KD-Tree | O(log N) | Often overkill for interviews; usually just use a Heap if K is small. |
