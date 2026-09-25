### The failure

- **A segment tree on static data.** It works, but costs O(log n) per query and 40+ lines of code where a prefix array or sparse table answers in O(1). Check for updates before reaching for a tree

:::interview
"How do you pick a range structure?" — I ask whether the data changes and whether the operation is undoable. Static and undoable: prefix sums. Static min/max: sparse table. Point updates with sums: Fenwick. Anything mergeable with updates: a segment tree, with lazy tags when updates cover ranges.
:::

### This chapter

- **19-07 Drills:** range questions and the rare tricks, reduced to one structure each
- **19-10 Thread back to the parent:** Morris traversal, the O(1)-space tree walk interviewers ask as a follow-up
