LV1 = '<span class="lv lv1"></span>'
LV2 = '<span class="lv lv2"></span>'
DELETE = ['19-01', '19-07']
PAGES = [
('19-01', '19-01-choose-the-range-structure.md', '# Chapter 19 - Range Structures\n\n## Choose the Range Structure ' + LV2, [
 '- **What:** many `[L, R]` queries, maybe with updates. Two questions pick the structure: does the data change between queries, and can the operation be undone (sum, XOR) or overlapped (min, max, gcd)?',
 '- **Spot it:** up to 10⁵ queries on 10⁵ values; "sum / min / count between L and R"; "update index i"; "add x to [L, R]". All updates before any query → 03-07',
 '- **Why:** an undoable operation makes a range the difference of two prefixes; an overlap-safe one lets two blocks cover it. Neither survives updates: use a tree',
], [
 '| Data changes? | Operation | Structure | Per query |',
 '|---|---|---|---|',
 '| no | sum, XOR | prefix array (03-02) | O(1) |',
 '| no | min, max, gcd | sparse table | O(1) |',
 '| point updates | sum, count | Fenwick tree | O(log n) |',
 '| point updates | min, max, mergeable | segment tree | O(log n) |',
 '| range updates | mergeable | segment tree, lazy tags | O(log n) |',
 '',
 '```ts',
 '// Fenwick tree (binary indexed tree): point add, prefix sum; 1-indexed',
 'class Fenwick {',
 '  private t: number[];',
 '  constructor(n: number) { this.t = new Array(n + 1).fill(0); }',
 '  add(i: number, x: number) { for (; i < this.t.length; i += i & -i) this.t[i] += x; }',
 '  sum(i: number) { let s = 0; for (; i > 0; i -= i & -i) s += this.t[i]; return s; }',
 '}                                    // range [L, R] = sum(R) − sum(L − 1)',
 '```',
 '',
 '- **Watch out:** a segment tree on static data: O(log n) and 40 lines where a prefix array or sparse table gives O(1)',
 '- **Also solves:** {LC 307} · {LC 315} (over value ranks) · {LC 2407}',
], None, None),

('19-07', '19-07-range-recognition-drills.md', '## Drills: Range Structures ' + LV2, [
 'Decide whether the data changes, then whether the operation can be undone or overlapped.',
 '',
 '| Problem | Page · the deciding fact |',
 '|---|---|',
 '| {LC 303} | 19-01 · static sums: prefix array |',
 '| {LC 307} | 19-01 · point updates, range sums: Fenwick |',
 '| {LC 1310} | 19-01 · static XOR: prefix XOR |',
 '| {LC 1314} | 03-02 · static 2-D sums: 2-D prefix |',
 '| {LC 2381} | 03-07 · all shifts before one read |',
 '| {LC 1649} | 19-01 · count smaller and larger so far: Fenwick |',
 '| {LC 732} | 19-01 · online range adds, global max |',
 '| {LC 2407} | 19-01 · the best chain over a value range |',
 '| {LC 2426} | 19-01 · rewrite as `a[i] − b[i]`, count with a Fenwick |',
 '| {LC 1906} | 19-01 · values ≤ 100: a prefix count per value |',
 '| [Range Minimum Query](https://www.spoj.com/problems/RMQSQ/) (SPOJ RMQSQ) | 19-01 · static minimum: sparse table |',
], [], None, None),
]
