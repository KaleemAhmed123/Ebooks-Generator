## Sweep Line (Advanced Applications) 🔴

We covered basic Sweep Line (breaking intervals into +1 and -1 events) in the Interviews module. In competitive programming, Sweep Line is combined with Data Structures to solve 2D geometry and massive query problems.

### The 2D Area of Union of Rectangles

**The Problem:** Given N ≤ 10⁵ rectangles on a 2D plane, find the total area they cover. Rectangles can overlap.

**The Solution:**
We sweep a vertical line from left to right across the x-axis.
1. Each rectangle is split into two events: 
   - A **Left Edge** at xstart, covering ybottom to ytop. (Add to active set).
   - A **Right Edge** at xend, covering ybottom to ytop. (Remove from active set).
2. Sort all 2N events by x.
3. As we move the sweep line from xprev to xcurr, we calculate the area added: 
   text{Area} = (xcurr - xprev) times (text{Active Y-length})

**The Catch:** How do we maintain the "Active Y-length" as segments are added and removed?
We use a **Segment Tree with Coordinate Compression**.
- Compress all y-coordinates.
- The Segment Tree manages the y-axis. It supports:
  - `add(y1, y2, 1)`: A left edge arrives.
  - `add(y1, y2, -1)`: A right edge arrives.
  - `query()`: Returns the total physical length of the y-axis currently covered by at least one rectangle.

### Closest Pair of Points

**The Problem:** Given N points, find the pair with the minimum Euclidean distance. (O(N²) brute force will TLE).

**The Solution:**
1. Sort points by x.
2. Maintain a "Best Distance so far", let's call it D.
3. Sweep a line from left to right.
4. Maintain a `std::set` (Binary Search Tree) of "Active Points" sorted by y.
5. When processing a new point P, any active point whose x-coordinate is further back than P.x - D is completely useless. Remove them from the set.
6. Now, search the `std::set` for points whose y-coordinate is within [P.y - D, P.y + D]. 
7. Calculate the distance to those specific points. Update D if you find a better one.

Because we strictly limit the search box to D times 2D, geometry proves that at most 6 points can exist in this box at any time! The check takes O(1) time per point.
Total time: O(N log N).
