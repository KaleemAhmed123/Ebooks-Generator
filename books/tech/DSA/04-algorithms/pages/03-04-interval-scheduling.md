## Interval Scheduling

- This is the absolute classic Greedy problem. If you understand this, you understand 80% of greedy interview questions.
- **The Problem:** You are given N meetings, each with a `start` time and an `end` time. You can only attend one meeting at a time. What is the maximum number of meetings you can attend?

### The Wrong Greedy Choices

1. **Shortest Duration First:** "Pick the shortest meetings so I can fit more in."
   - *Counter-example:* Meeting A [1, 10], Meeting B [9, 11], Meeting C [10, 20]. B is the shortest (2 hours), but picking it blocks both A and C. You get 1 meeting instead of 2.
2. **Earliest Start Time First:** "Pick the meeting that starts first so I have more time left."
   - *Counter-example:* Meeting A starts at 8 AM and ends at 8 PM. It blocks the entire day.

### The Correct Greedy Choice

- **Earliest End Time First:** "Pick the meeting that finishes the earliest."
- **Why it works (Stays Ahead):** By finishing as early as possible, you maximize the remaining free time available for future meetings. The meeting that ends first leaves the largest possible chunk of the day open.

:::mint
<svg viewBox="0 0 470 140" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Interval Scheduling by End Time">
  <!-- Timeline -->
  <line x1="20" y1="120" x2="450" y2="120" stroke="#12121a" stroke-width="2" />
  
  <!-- Earliest end time (chosen) -->
  <rect x="30" y="40" width="100" height="20" fill="#e2fcf3" stroke="#1d4e89" stroke-width="2" />
  <text x="35" y="55" class="s" fill="#1d4e89">Ends first -> PICK</text>
  
  <!-- Earliest start time (rejected) -->
  <rect x="20" y="70" width="300" height="20" fill="#f4f4f4" stroke="#ef476e" stroke-width="2" />
  <text x="35" y="85" class="s" fill="#ef476e">Starts first, but ruins the whole day</text>
  
  <!-- Next valid meeting -->
  <rect x="150" y="40" width="100" height="20" fill="#e2fcf3" stroke="#1d4e89" stroke-width="2" />
  <text x="155" y="55" class="s" fill="#1d4e89">Next valid</text>
  
  <!-- Blocked meeting -->
  <rect x="110" y="10" width="50" height="20" fill="#f4f4f4" stroke="#12121a" stroke-width="1" />
  <text x="115" y="25" class="s">Blocked</text>
</svg>
:::

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
