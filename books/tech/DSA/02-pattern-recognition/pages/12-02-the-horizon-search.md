# The Horizon Search (Multi-Source BFS)

## The Mental Model
Radiating outward from multiple sources simultaneously. Covers tags: `BFS`, `Shortestpath`, and `minDist to 1's Multisource BFS`.

## Algorithm Derivation
**Brute force:** To find the distance to the nearest '1' for every '0' in a grid, run a BFS from every single '0'. $O(N^2 * M^2)$.
**↓**
**Why is it too slow?** We revisit the same cells repeatedly.
**↓**
**Can we reverse the perspective?** Instead of '0's looking for '1's, what if the '1's radiated outward?
**↓**
**Optimized Idea:** Push *all* '1's into the queue at $T=0$. Run a single Multi-Source BFS. The first time a '0' is visited, it is guaranteed to be via the shortest path. $O(N * M)$.

## When to use
*   Rotting Oranges
*   01 Matrix / Nearest 1
