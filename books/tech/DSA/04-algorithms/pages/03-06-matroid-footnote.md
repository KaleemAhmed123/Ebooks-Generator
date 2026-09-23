## A Footnote on Matroids

- Why does the Greedy strategy work perfectly on Minimum Spanning Trees (Kruskal's Algorithm) but fail catastrophically on the Traveling Salesperson Problem? 
- Why does it work perfectly for fractional Knapsack, but fail completely for 0/1 Knapsack?

The mathematical answer is **Matroids**.

A matroid is an abstract mathematical structure that generalizes the concept of linear independence from matrices to arbitrary sets. If a problem's constraints can be mapped to the independent sets of a matroid, then the greedy algorithm is mathematically guaranteed to find the absolute global optimal solution.

If the problem's constraints *do not* form a matroid, the greedy algorithm will almost certainly fail, and you must use Dynamic Programming. 

You will not be asked to prove matroid properties in a software engineering interview. But if you ever wonder *why* certain greedy algorithms are considered "solved science" while others are deemed impossible heuristics, matroids are the invisible architecture beneath them.

*(For the mathematically curious, see "Combinatorial Optimization" by Korte & Vygen).*
