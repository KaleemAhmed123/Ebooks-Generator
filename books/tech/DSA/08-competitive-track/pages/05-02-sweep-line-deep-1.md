## Sweep Line (Advanced Applications) <span class="lv lv3"></span>

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
