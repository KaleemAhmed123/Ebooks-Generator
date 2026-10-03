### Closest Pair of Points

**The Problem:** Given N points, find the pair with the minimum Euclidean distance. (O(N²) brute force will TLE).

**The Solution:**
1. Sort points by x.
2. Maintain a "Best Distance so far", call it D.
3. Sweep a line from left to right.
4. Maintain a `std::set` (Binary Search Tree) of "Active Points" sorted by y.
5. When processing a new point P, any active point whose x-coordinate is further back than P.x - D is completely useless. Remove them from the set.
6. Now, search the `std::set` for points whose y-coordinate is within [P.y - D, P.y + D]. 
7. Calculate the distance to those specific points. Update D if you find a better one.

Because we strictly limit the search box to D times 2D, geometry proves that at most 6 points can exist in this box at any time! The check takes O(1) time per point.
Total time: O(N log N).
