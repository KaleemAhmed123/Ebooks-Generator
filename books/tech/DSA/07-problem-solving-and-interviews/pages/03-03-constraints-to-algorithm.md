## Phase 2: Constraints to Algorithm

You have the constraints. Now you deduce the algorithm. Do this out loud.

### The Deduction Monologue

If the constraint is N ≤ 10⁵:
*"Since N is 100,000, an O(N²) solution will take 10 billion operations and time out. I know I need an O(N) or O(N log N) approach. This means I can either sort the array first, use a Hash Map to do it in one pass, or use a Two Pointer approach."*

If the constraint is N ≤ 20:
*"N is extremely small. This usually indicates that an exponential O(2^N) algorithm is expected. I should be looking at Backtracking to generate all combinations, or Bitmask DP if we need an optimal score."*

### The "Thinking Out Loud" Framework

Never fall silent for more than 30 seconds. If you are stuck, narrate your elimination process:

1. **State the obvious:** *"My first thought was a Sliding Window..."*
2. **Destroy it:** *"...but the array contains negative numbers, so the window sum isn't monotonic. Sliding Window won't work."*
3. **Pivot:** *"Since I need a contiguous subarray sum and there are negatives, I should probably use a Prefix Sum with a Hash Map."*

### Why This Works

Interviewers are not permitted to help you if you are silent. They don't know if you are stuck on a syntax error, or if you are entirely lost.
If you narrate your eliminations, the interviewer can gently nudge you:
- *You:* "...so sliding window won't work."
- *Interviewer:* "Actually, look closely at the problem statement. The absolute values are given."
- *You:* "Ah! Then they are always positive. Sliding window *will* work!"

You just saved the interview. This only happens if you think out loud.
