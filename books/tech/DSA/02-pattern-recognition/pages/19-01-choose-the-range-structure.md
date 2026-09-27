# Chapter 19 - Range Structures

## Choose the Range Structure <span class="lv lv2"></span>

- **What:** many `[L, R]` queries, maybe with updates. Two questions pick the structure: does the data change between queries, and can the operation be undone (sum, XOR) or overlapped (min, max, gcd)?
- **Spot it:** up to 10⁵ queries on 10⁵ values; "sum / min / count between L and R"; "update index i"; "add x to [L, R]". All updates before any query → 03-07
- **Why:** an undoable operation makes a range the difference of two prefixes; an overlap-safe one lets two blocks cover it. Neither survives updates: use a tree

| Data changes? | Operation | Structure | Per query |
|---|---|---|---|
| no | sum, XOR | prefix array (03-02) | O(1) |
| no | min, max, gcd | sparse table | O(1) |
| point updates | sum, count | Fenwick tree | O(log n) |
| point updates | min, max, mergeable | segment tree | O(log n) |
| range updates | mergeable | segment tree, lazy tags | O(log n) |

```ts
// Fenwick tree (binary indexed tree): point add, prefix sum; 1-indexed
class Fenwick {
  private t: number[];
  constructor(n: number) { this.t = new Array(n + 1).fill(0); }
  add(i: number, x: number) { for (; i < this.t.length; i += i & -i) this.t[i] += x; }
  sum(i: number) { let s = 0; for (; i > 0; i -= i & -i) s += this.t[i]; return s; }
}                                    // range [L, R] = sum(R) − sum(L − 1)
```

- **Watch out:** a segment tree on static data: O(log n) and 40 lines where a prefix array or sparse table gives O(1)
### Where it appears

| Problem | What the range structure queries |
|---|---|
| [Range Sum Query - Mutable](https://leetcode.com/problems/range-sum-query-mutable/) (LeetCode 307) | prefix sums with point updates |
| [Count of Smaller Numbers After Self](https://leetcode.com/problems/count-of-smaller-numbers-after-self/) (LeetCode 315) | BIT over value ranks — count below current |
| [Longest Increasing Subsequence II](https://leetcode.com/problems/longest-increasing-subsequence-ii/) (LeetCode 2407) | segment tree range-max over a value window |

:::interview
"When would you use a BIT over a segment tree?"

A BIT (Binary Indexed Tree / Fenwick Tree) handles prefix operations (sum, max up to i) in half the code and constant factor of a segment tree. Use it when queries are prefix-based and updates are point-based. A segment tree is needed when queries are arbitrary ranges or require lazy propagation (range updates). If the BIT fits, always prefer it — fewer bugs, faster in practice.
:::
