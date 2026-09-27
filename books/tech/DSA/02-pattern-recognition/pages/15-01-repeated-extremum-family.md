# Chapter 15 - Heaps & Ordered Sets

## The Repeated Extremum Family <span class="lv lv1"></span>

- **What it is:** The best element (largest, smallest, cheapest) is needed again and again while the set changes: items arrive, leave, or are combined
- **Signal:** "k largest", "k-th smallest so far", "merge k sorted", "median after each insertion", "combine the two cheapest", "repeatedly take the largest and put something back"
- **Not this page if:** each element wants the next larger one after it → 10-05; a window slides by one and wants its maximum → 10-10. Both expire items by position
- **Why it works:** A rescan costs O(n) per query. A heap keeps one end of the set ready: O(1) to read, O(log n) to change. An ordered set keeps every element's neighbours ready, also O(log n)

### The patterns in this chapter

| Pattern | Page | What sits on top | Canonical problem |
|---|---|---|---|
| **42 · Merge from Every Head** | 15-03 | the smallest head of k sorted sources | Merge k Sorted Lists (LeetCode 23) |
| **43 · Balance Two Heaps** | 15-04 | the two middle elements | Find Median from Data Stream (LeetCode 295) |
| **44 · Merge the Two Cheapest** | 15-05 | the two items to combine next | Min Cost to Connect Ropes (GFG) |
| **45 · Take Now, Regret Later** | 15-06 | the worst choice accepted so far | Minimum Number of Refueling Stops (LeetCode 871) |

### Neighbouring tools

| Question | Tool | Read |
|---|---|---|
| k largest of n, fixed data | size-k min-heap, O(n log k); quickselect, O(n) average | Module 07, 01-10 |
| k most frequent | buckets indexed by count, O(n): a count never exceeds n | 15-10 |
| the heap class and its traps | 30 lines to paste | 15-11 |
| nearest value above or below x, with inserts | ordered set | Module 03, 05-01 |
