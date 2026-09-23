## Activity Selection (Resource Allocation)

- A direct variation of Interval Scheduling, but instead of maximizing the number of meetings *you* can attend, the problem asks for the minimum number of *meeting rooms* (resources) required to host *all* the meetings.
- **The Problem:** Given N intervals, find the maximum number of overlapping intervals at any single point in time.

### The Line Sweep (Chronological) Approach

- **The Insight:** We don't care about the meetings as distinct objects anymore. We only care about chronological *events*: a meeting starts (requires a room), and a meeting ends (frees a room).
- **The Strategy:**
  1. Extract all start times and end times into a single list of events.
  2. Sort the events chronologically. (If a start and end happen at the exact same time, process the *end* first to free up the room immediately).
  3. Sweep through the timeline, incrementing a counter when a meeting starts, and decrementing it when a meeting ends.
  4. The maximum value the counter ever reaches is the number of rooms required.

### Implementation

```ts
function minMeetingRooms(intervals: number[][]): number {
  const events: { time: number, type: 'start' | 'end' }[] = [];

  for (const [start, end] of intervals) {
    events.push({ time: start, type: 'start' });
    events.push({ time: end, type: 'end' });
  }

  // Sort by time. If times are equal, 'end' comes before 'start' 
  // (We use a trick: assigning 1 to start and -1 to end for easy math)
  events.sort((a, b) => {
    if (a.time !== b.time) return a.time - b.time;
    return a.type === 'end' ? -1 : 1; 
  });

  let currentRooms = 0;
  let maxRooms = 0;

  for (const event of events) {
    if (event.type === 'start') currentRooms++;
    else currentRooms--;
    
    maxRooms = Math.max(maxRooms, currentRooms);
  }

  return maxRooms;
}
```

### The Min-Heap Approach (Alternative)

- You can also solve this by sorting the meetings by **start time**, and maintaining a Min-Heap of the **end times** of currently running meetings.
- When evaluating a new meeting, peek at the heap. If the smallest end time in the heap is ≤ the new meeting's start time, pop it (the room is free). Then push the new meeting's end time.
- The maximum size of the heap is the number of rooms required. 
- *Both approaches are O(N log N). Line Sweep is generally easier to write in JavaScript due to the lack of a built-in Priority Queue.*
