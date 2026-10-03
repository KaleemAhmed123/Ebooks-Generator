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
