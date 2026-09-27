# Chapter 7 - Order & Intervals

## The Order Family <span class="lv lv1"></span>

- **What it is:** Once items are sorted, position carries meaning: neighbours are closest in value, and one scan can settle each item against everything before it. The patterns of this chapter differ in *what* gets sorted: interval endpoints, the halves of a merge sort, or items under a pairwise rule
- **Signal:** the answer depends on relative size, not on input position: "overlapping", "merge", "at the same time", "pairs `i < j` with `a[i] > a[j]`", "arrange to form the largest"
- **Why it works:** A sort costs O(n log n) once, affordable up to n ≈ 10⁶ (Module 01, 01-03). After it, a question about all O(n²) pairs becomes a question about neighbours, a running maximum or two sorted halves

| Pattern | Page | What it does | Canonical problem |
|---|---|---|---|
| **15 · Intervals** | **07-06 Sweep Line** | +1 at each start, −1 at each end; the running count is the overlap | Minimum Platforms (GFG) |
| | **07-07 Sort by Start or End** | start order to merge, end order to keep the most | Merge Intervals (LeetCode 56) |
| **16 · Count While You Merge** | **07-08** | count the cross pairs of two sorted halves during the merge | Count Inversions (GFG) |
| **17 · Let Pairs Decide the Order** | **07-09** | a comparator on two items, proved by an exchange | Largest Number (LeetCode 179) |

Sorted data also drives two pointers (02-08, 02-10), binary search (Module 04, 01-02 to 01-04) and coordinate compression (Module 08, 05-01).

### The trap

- **Not every order problem sorts.** Insert Interval (LeetCode 57) arrives sorted and runs in O(n). Positions bounded by a small range use a difference array and no sort (03-07)
- **A JS sort is not free in memory.** V8 (Node, Chrome) sorts with TimSort, whose merge buffer grows to n/2 elements, so "sort instead of a hash set to save space" is not O(1) extra space in JS
- **Default `sort()` compares strings.** `[10, 2, 1].sort()` is `[1, 10, 2]`; pass `(a, b) => a - b` (Module 04, 02-05)
