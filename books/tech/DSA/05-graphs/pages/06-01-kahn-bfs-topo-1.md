## Topological Sort (Kahn's BFS) <span class="lv lv1"></span>

- **The Problem:** You have a list of tasks and a list of dependencies ("Task A must be completed before Task B"). Find a valid order to complete all tasks.
- This is a **Topological Sort**. It only works on a **DAG (Directed Acyclic Graph)**. If there is a cycle (A depends on B, B depends on A), it is impossible to resolve, and no valid topological order exists.
- **Kahn's Algorithm** is the BFS approach to Topological Sort. It is the most intuitive way to solve dependency problems and naturally detects cycles.

### The In-Degree Concept

- **In-Degree:** The number of incoming edges a node has (how many prerequisites it has).
- If a node has an In-Degree of `0`, it means it has absolutely no prerequisites. It can be processed immediately.

### The Mechanics

1. Calculate the In-Degree of every node.
2. Push all nodes with an In-Degree of `0` into a Queue.
3. While the Queue is not empty:
   - Pop a node. Add it to the final sorted array.
   - For every neighbor of that node: decrement the neighbor's In-Degree by `1` (because we just fulfilled one of its prerequisites).
   - If the neighbor's In-Degree reaches `0`, push it into the Queue.
4. **The Cycle Check:** If the final sorted array has exactly V nodes, you successfully sorted the graph. If it has fewer than V nodes, the graph contains a cycle and topological sorting is impossible.
