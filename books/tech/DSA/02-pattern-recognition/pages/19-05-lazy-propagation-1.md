## Lazy Propagation 🔴

- A standard Segment Tree can update a single point in O(log N) time
- What if you need to update an entire range `[L, R]`? For example, "add 5 to all elements from index 10 to 20"
- If you update each point individually, it takes O((R-L) × log N) time, which degrades to O(N log N) in the worst case. This is slower than just updating the array.
- To achieve **O(log N) range updates**, we must use **Lazy Propagation**

### The Insight: Procrastination

- If a node completely covers the update range `[L, R]`, updating all its descendant leaves immediately is a waste of time. The queries might never even ask for those individual leaves
- Instead, we **update the current node** to reflect the total change, and **leave a memo (a lazy value)** for its children: *"Hey, when someone eventually visits you, remind them to add 5."*
- We stop traversing downwards. This keeps the update to O(log N)
