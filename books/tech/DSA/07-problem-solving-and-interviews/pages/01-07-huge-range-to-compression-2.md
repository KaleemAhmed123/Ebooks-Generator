### Canonical Example: 2D Prefix Sum on Sparse Grid

- **Problem:** You have N = 10⁴ points on a 10⁹ times 10⁹ grid. You receive Q queries asking for the sum of points in a rectangle.
- **The Trap:** Creating a `10^9 x 10^9` 2D array is impossible.
- **The Transformation:**
  - Compress all X coordinates to 0 dots 10⁴.
  - Compress all Y coordinates to 0 dots 10⁴.
  - Create a 10⁴ times 10⁴ 2D array.
  - Map points into this dense grid.
  - Map queries into this dense grid (using binary search to find the closest mapped coordinate if the query asks for an unmapped value).
  - Run standard 2D Prefix Sums.

### Where it appears

| Problem | Why it belongs here |
|---|---|
| [My Calendar II](https://leetcode.com/problems/my-calendar-ii/) (LeetCode 731) | Compress booking endpoints, sweep line on dense indices |
| [The Skyline Problem](https://leetcode.com/problems/the-skyline-problem/) (LeetCode 218) | Compress x-coordinates of building edges before sweep |
| [Meeting Rooms II](https://leetcode.com/problems/meeting-rooms-ii/) (LeetCode 253) | Compress start/end times, difference array on dense range |
