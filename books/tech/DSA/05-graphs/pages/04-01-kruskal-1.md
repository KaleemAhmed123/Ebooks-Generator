## Kruskal's Algorithm <span class="lv lv1"></span>

- A **Spanning Tree** is a subset of edges in a connected, undirected graph that connects all vertices together without any cycles. It is a tree that "spans" the graph.
- A **Minimum Spanning Tree (MST)** is the spanning tree whose sum of edge weights is as small as possible.
- **The Problem:** Connect all cities with fiber optic cables. Cables cost different amounts. Connect everyone for the lowest total price.

### The Mechanics

Kruskal's Algorithm is a beautiful, purely Greedy algorithm.
1. Take every single edge in the graph and sort them by weight (cheapest to most expensive).
2. Look at the cheapest edge. 
   - Does adding this edge create a cycle? (Are the two cities already connected via some other path?)
   - If NO: Buy the cable. Add it to your MST.
   - If YES: Throw it away.
3. Repeat until you have added exactly V - 1 edges (which guarantees a single connected tree).
