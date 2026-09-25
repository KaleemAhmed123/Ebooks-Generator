# Chapter 2 - Windows & Pointers

## The Locality Family <span class="lv lv1"></span>

- **What it is:** The answer to the problem depends on a small, contiguous chunk of the data
- **Signal:** "Subarray", "Substring", "Consecutive", "Window"
- **Why it works:** If the answer is local, you do not need to scan the entire array every time. You only need to look at elements that are "near" the current element

### The core techniques

| Technique | When to use | What it exploits |
|---|---|---|
| **02-02 Fixed Window** | "Subarray of size k" | Neighbouring windows share k − 1 of k elements |
| **02-03 Variable Window** | "Longest/shortest subarray with property X" | Monotonicity: growing window increases sum/count |
| **02-04 Count by the Right End** | "Count subarrays with product < K" | A valid window vouches for every start inside it |
| **02-05 Exactly K by Subtraction** | "Exactly K distinct / K odd" | `atMost(K) − atMost(K−1)`; "at most" is shrink-safe |
| **02-06 Flip the Target** | "Remove from either end" | What stays is one contiguous middle |
| **02-07 Sort, then Slide** | "Pick m values with the smallest spread" | After sorting, the best subset is contiguous |
| **02-08 Collide from Both Ends** | "Pair in a sorted array" | Each comparison deletes a whole row or column of pairs |
| **02-09 Reader and Writer** | "Remove duplicates in place", "sort 0s, 1s, 2s" | Everything behind the writer is final |
| **02-10 Fix One, Collide Two** | "Unique triplets summing to 0" | A fixed first element leaves a sorted two-sum |
