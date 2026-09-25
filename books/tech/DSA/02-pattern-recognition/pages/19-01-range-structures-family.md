# Chapter 19 - Range Structures & Rare Tricks

## Choose the Range Structure <span class="lv lv3"></span>

- **What it is:** Many queries over subranges `[L, R]`, sometimes mixed with updates. Two questions pick the structure: **does the data change between queries**, and **can the operation be undone** (sum, XOR) or **safely overlapped** (min, max, gcd)?
- **Signal:** Q up to 10⁵ queries on n up to 10⁵ values; "sum / min / count between L and R"; "add x to every element in [L, R]"; "update index i"
- **Why it works:** An undoable operation turns any range into the difference of two prefixes. An overlap-safe operation lets two precomputed power-of-two blocks cover a range with no double counting. Only when neither shortcut survives an update do you need a tree of merged blocks

| Data changes? | Operation | Structure | Per query | Read |
|---|---|---|---|---|
| No | sum, XOR | Prefix array | O(1) | 03-02 |
| No, updates batched before reads | range add | Difference array | O(1) + one pass | 03-07 |
| No | min, max, gcd | Sparse table | O(1) | Module 03, 03-07 |
| Point updates | sum, count | Fenwick tree | O(log n) | Module 03, 03-05 |
| Point updates | min, max, anything mergeable | Segment tree | O(log n) | Module 03, 03-06 |
| Range updates + range queries | any mergeable | Segment tree, lazy tags | O(log n) | Module 03, 03-06 |

### The failure

- **A segment tree on static data.** It works, but costs O(log n) per query and 40+ lines of code where a prefix array or sparse table answers in O(1). Check for updates before reaching for a tree

:::interview
"How do you pick a range structure?" — I ask whether the data changes and whether the operation is undoable. Static and undoable: prefix sums. Static min/max: sparse table. Point updates with sums: Fenwick. Anything mergeable with updates: a segment tree, with lazy tags when updates cover ranges.
:::

### This chapter

- **19-07 Drills:** range questions and the rare tricks, reduced to one structure each
- **19-10 Thread back to the parent:** Morris traversal, the O(1)-space tree walk interviewers ask as a follow-up
