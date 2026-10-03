## Activity Selection (Resource Allocation) <span class="lv lv1"></span>

- A direct variation of Interval Scheduling, but instead of maximizing the number of meetings *you* can attend, the problem asks for the minimum number of *meeting rooms* (resources) required to host *all* the meetings.
- **The Problem:** Given N intervals, find the maximum number of overlapping intervals at any single point in time.

### The Line Sweep (Chronological) Approach

- **The Insight:** We don't care about the meetings as distinct objects anymore. We only care about chronological *events*: a meeting starts (requires a room), and a meeting ends (frees a room).
- **The Strategy:**
  1. Extract all start times and end times into a single list of events.
  2. Sort the events chronologically. (If a start and end happen at the exact same time, process the *end* first to free up the room immediately).
  3. Sweep through the timeline, incrementing a counter when a meeting starts, and decrementing it when a meeting ends.
  4. The maximum value the counter ever reaches is the number of rooms required.
