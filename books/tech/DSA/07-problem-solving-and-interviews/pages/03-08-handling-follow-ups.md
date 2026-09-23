## Phase 7: Handling Follow-ups

You finished the code, the dry run was flawless, and you have 8 minutes left.
The interviewer asks a follow-up. This is where they decide between a "Hire" and a "Strong Hire."

### The System Design Follow-up

Often, the follow-up asks how your algorithm behaves at scale.

**"What if the array is 500GB and doesn't fit in memory?"**
- They want to hear about **External Sorting** (chunking the file, sorting chunks in memory, writing to disk, and doing an N-way merge).
- If it's a frequency count, they want to hear about MapReduce or distributed hash tables.

**"What if this function is called 10,000 times a second?"**
- They are looking for caching/memoization. "We can put a Redis cache in front of this. If the input array hasn't changed, we return the cached result."
- They might be looking for preprocessing. "Instead of calculating it per request, we can precompute the Prefix Sum array once when the server starts."

### The Algorithmic Follow-up

**"Can you do it in O(1) space?"**
- If you used a Hash Map to find duplicates, they want you to sort the array first (which takes O(N log N) time, but O(1) space).
- If you used a 2D DP table, they want State Reduction (Rolling Arrays).

**"Can you handle dynamic updates? What if elements are added while we query?"**
- If your solution relied on sorting or Prefix Sums (which are static), dynamic updates break them.
- You must suggest a dynamic structure: a Segment Tree or a Fenwick Tree.

### The Strategy

You rarely have to code the follow-up. It is usually a verbal discussion. 
Demonstrate that you understand the trade-offs: "If we optimize for space by sorting, we degrade our time complexity from O(N) to O(N log N). In a real system, I would check our telemetry to see if memory or CPU is the actual bottleneck before making that trade."
