# Chapter 7 - Order & Intervals

## Sorting & Intervals <span class="lv lv1"></span>

- **What it is:** once items are sorted, position carries meaning: neighbours are closest in value, and one scan settles each item against everything before it. The moves differ in *what* is sorted: interval endpoints, merge-sort halves, or items under a pairwise rule
- **Signal:** the answer depends on relative size, not input position: "overlapping", "merge", "at the same time", "pairs `i < j` with `a[i] > a[j]`", "arrange to form the largest"
- **Mechanism:** one O(n log n) sort turns a question about all O(n²) pairs into one about neighbours, a running maximum, or two sorted halves

### The moves

| Move | When to use | What it exploits |
|---|---|---|
| **07-06** | how many are open at once | overlap changes only at endpoints |
| **07-07** | union, or keep the most | sort key = start or end |
| **07-08** | count pairs `i < j` by value | split pairs see sorted halves |
| **07-09** | arrange by a rule on two items | an exchange proves the order |
| **07-10** | split into independent parts | disjoint halves don't interact |
