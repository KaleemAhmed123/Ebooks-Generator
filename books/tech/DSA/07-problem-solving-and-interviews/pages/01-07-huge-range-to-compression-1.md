## Transformation: Huge Range to Coordinate Compression <span class="lv lv2"></span>

When a problem involves points or intervals on a massive 1D or 2D grid, you often need to use a frequency array or a 2D matrix. But what if the coordinates go up to 10⁹?

### The Signal

- Constraints say: N ≤ 10⁵, but coordinates X, Y ≤ 10⁹.
- You need to run an algorithm that scales with the coordinate values (like Sweep Line, prefix sums on a grid, or a Segment Tree).
- An array of size 10⁹ will cause a Memory Limit Exceeded.

### The Mapping

We transform the massive sparse coordinate space into a small, dense coordinate space.

If the input intervals are `[10, 1000]`, `[500, 1000000]`, `[10, 500]`:
1. Collect all unique coordinates: `[10, 500, 1000, 1000000]`.
2. Sort them.
3. Map them to dense indices: 
   - `10 -> 0`
   - `500 -> 1`
   - `1000 -> 2`
   - `1000000 -> 3`

### The Execution

- Replace all coordinates in the original problem with their dense mapped indices.
- Run your algorithm (e.g., Difference Array) on an array of size 4 instead of size 1,000,000.
- If you need to return actual coordinates at the end, map the dense index back to the original value using the sorted unique array.
