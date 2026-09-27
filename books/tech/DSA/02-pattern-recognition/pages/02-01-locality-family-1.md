# Chapter 2 - Windows & Pointers

## Windows and Pointers <span class="lv lv1"></span>

- **What it is:** Two indices over one array or string. Both move right and bracket a contiguous window, or they start at opposite ends and close in, or one reads while the other writes
- **Signal:** "subarray", "substring", "consecutive", "window of size k"; "sorted", "pair", "triplet"; "in place, return the new length"
- **Why it works:** Each index moves one way only, so the pair makes at most 2n moves. The proof is always the same shape: no position an index has passed can still hold the answer. Monotonicity guarantees it for windows, sorted order for colliding pointers, "everything behind the writer is final" for reader and writer

### Three patterns, nine pages

| Pattern | Page | Statement cue |
|---|---|---|
| **1 · Sliding Window** | 02-02 Fixed length | "every window of size k" |
| | 02-03 Variable length | "longest / shortest subarray such that…" |
| | 02-04 Count by the right end | "count the subarrays…", shrink-safe |
| | 02-05 Exactly K by subtraction | "exactly K distinct / odd" |
| | 02-06 Flip the target | "remove from either end" |
| | 02-07 Sort, then slide | "choose m values, smallest spread" |
| **2 · Collide** | 02-08 Collide from both ends | "sorted", "pair summing to X" |
| | 02-10 Fix one, collide two | "unique triplets", "count triangles" |
| **3 · Reader and Writer** | 02-09 Reader and writer | "in place, return the new length" |
