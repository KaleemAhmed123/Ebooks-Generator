### The failure

- **A segment tree on static data.** It works, but costs O(log n) per query and 40+ lines of code where a prefix array or sparse table answers in O(1). Check for updates before reaching for a tree

:::interview
"How do you pick a range structure?" — I ask whether the data changes and whether the operation is undoable. Static and undoable: prefix sums. Static min/max: sparse table. Point updates with sums: Fenwick. Anything mergeable with updates: a segment tree, with lazy tags when updates cover ranges.
:::

### This chapter

- **Pattern 54 · Choose the Range Structure** is this page; the structures themselves are built in Module 03
- **19-07 Drills:** 11 disguised range questions, each reduced to one structure
