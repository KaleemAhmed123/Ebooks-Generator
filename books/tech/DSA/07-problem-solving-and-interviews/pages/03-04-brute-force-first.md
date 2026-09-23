## Phase 3: Brute Force First

There is a toxic myth in the interview prep community that proposing a brute-force solution makes you look junior. This is completely false. Proposing the brute-force solution is mandatory.

### The Value of Brute Force

1. **It secures a baseline.** If you run out of time on the optimal solution, the interviewer can at least write down "Candidate understood the problem and proposed a working O(N²) solution." If you only try for the O(N) solution and fail, you get a zero.
2. **It reveals the optimal structure.** The optimal solution is almost always the brute-force solution with the redundant work removed.
3. **It clarifies the rules.** Explaining the brute force confirms you fully understand what a "valid" answer actually is.

### How to pitch it

Do not write code for the brute force unless the interviewer specifically asks for it. Just state it in English in 30 seconds.

*"Before we optimize, the brute force approach would be to check every single possible subarray. We could use two nested loops to define the start and end indices, calculate the sum of each subarray, and keep the maximum. That would take O(N²) time and O(1) space. Obviously, with N = 10⁵, that's too slow, but it's a starting point."*

### The Transition to Optimal

Once you state the brute force, explicitly ask yourself what is being repeated.

*"In that O(N²) approach, when we move the end index from `j` to `j+1`, we are recalculating the entire sum from `i` to `j`. That's redundant. We just need to add the new element to the previous sum. If we maintain a running prefix sum..."*

You are literally deriving the optimal algorithm in real-time. This is exactly what the interviewer wants to see.
