### The Min-Heap Approach (Alternative)

- You can also solve this by sorting the meetings by **start time**, and maintaining a Min-Heap of the **end times** of currently running meetings.
- When evaluating a new meeting, peek at the heap. If the smallest end time in the heap is ≤ the new meeting's start time, pop it (the room is free). Then push the new meeting's end time.
- The maximum size of the heap is the number of rooms required. 
- *Both approaches are O(N log N). Line Sweep is generally easier to write in JavaScript due to the lack of a built-in Priority Queue.*

### Where it appears

| Problem | Why it belongs here |
|---|---|
| [Car Pooling](https://leetcode.com/problems/car-pooling/) (LeetCode 1094) | Line sweep on passenger counts at each stop |
| [Corporate Flight Bookings](https://leetcode.com/problems/corporate-flight-bookings/) (LeetCode 1109) | Sweep line with difference array |
| [My Calendar I](https://leetcode.com/problems/my-calendar-i/) (LeetCode 729) | Detect overlap before booking a resource |
