### The Algorithm

1. Compute the in-degree of all nodes (how many prerequisites they have)
2. Put all nodes with 0 in-degree into a queue. Set their `completionTime = duration`
3. Process the queue (Kahn's Algorithm):
   - Pop a node U
   - For each dependent node V:
     - Update its completion time: `completionTime[V] = max(completionTime[V], completionTime[U] + duration[V])`
     - Decrement the in-degree of V. If it reaches 0, push it to the queue
4. The answer is the `max(completionTime)` across all nodes
