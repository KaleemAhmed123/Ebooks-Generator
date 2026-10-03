### Implementation

```ts
type Meeting = { start: number, end: number };

function maxMeetings(meetings: Meeting[]): number {
  // Sort strictly by END time
  meetings.sort((a, b) => a.end - b.end);

  let count = 0;
  let currentEndTime = -1;

  for (const meeting of meetings) {
    // If this meeting starts after the last one finished, we can attend it
    if (meeting.start >= currentEndTime) {
      count++;
      currentEndTime = meeting.end; // Update our schedule
    }
  }

  return count;
}
```

- **Time Complexity:** O(N log N) due to the sorting step. The greedy iteration is O(N).

### Where it appears

| Problem | Why it belongs here |
|---|---|
| [Non-overlapping Intervals](https://leetcode.com/problems/non-overlapping-intervals/) (LeetCode 435) | Remove minimum intervals so rest are conflict-free |
| [Minimum Number of Arrows to Burst Balloons](https://leetcode.com/problems/minimum-number-of-arrows-to-burst-balloons/) (LeetCode 452) | Greedy by end time: fewest arrows covering all balloons |
| [Merge Intervals](https://leetcode.com/problems/merge-intervals/) (LeetCode 56) | Sort by start, then merge overlapping intervals |
