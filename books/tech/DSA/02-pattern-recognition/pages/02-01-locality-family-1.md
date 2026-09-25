# Chapter 2 - Windows & Pointers

## The Locality Family 🟢

- **What it is:** The answer to the problem depends on a small, contiguous chunk of the data
- **The signal:** "Subarray", "Substring", "Consecutive", "Next greater element", "Window"
- **The mechanism:** If the answer is local, you do not need to scan the entire array every time. You only need to look at elements that are "near" the current element

### The core techniques

| Technique | When to use | What it exploits |
|---|---|---|
| **Sliding Window (Fixed)** | "Subarray of size k" | Sum of window i overlaps 99% with window i-1 |
| **Sliding Window (Variable)** | "Longest/shortest subarray with property X" | Monotonicity: growing window increases sum/count |
| **Count by the Right End** | "Count subarrays with product < K" | A valid window vouches for every start inside it |
| **Exactly K by Subtraction** | "Exactly K distinct / K odd" | `atMost(K) − atMost(K−1)`; "at most" is shrink-safe |
| **Flip the Target** | "Remove from either end" | What stays is one contiguous middle |
| **Sort, then Slide** | "Pick m values with the smallest spread" | After sorting, the best subset is contiguous |
| **Two Pointers (Same direction)** | "Remove duplicates in place" | One pointer writes, one pointer explores |
| **Fix One, Collide Two** | "Unique triplets summing to 0" | A fixed first element leaves a sorted two-sum |
