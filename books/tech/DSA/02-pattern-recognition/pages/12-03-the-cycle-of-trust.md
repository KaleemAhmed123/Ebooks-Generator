# The Cycle of Trust (Graph Anatomy)

## The Mental Model
Mental models for how nodes relate to each other—who comes first, who is in a loop, and who hates who. Covers `CycleDetection`, `TopologicalSort`, and `Bipartite`.

## Algorithm Derivation
**Brute force:** Try to take courses randomly and see if you get stuck.
**↓**
**Can we exploit structure?** If Course A is a prerequisite for Course B, `A -> B`.
**↓**
**Optimized Idea (Topological Sort):** Keep an array of `in-degrees` (how many prerequisites a course has). Put courses with `0` in-degrees in a queue. As you take them, reduce the in-degrees of their neighbors. 
If you process all courses, you pass! If the queue empties early, there is a **Cycle**.

## Bipartite Graphs
*   "Who hates who" or "Group dividing".
*   If you can color the graph with 2 colors such that no adjacent nodes have the same color, it's bipartite.
