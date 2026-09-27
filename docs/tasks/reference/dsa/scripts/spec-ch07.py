LV1 = '<span class="lv lv1"></span>'
LV2 = '<span class="lv lv2"></span>'
DELETE = ['07-01', '07-06', '07-07', '07-08', '07-09', '07-12']
GFG_PLAT = '[Minimum Platforms](https://www.geeksforgeeks.org/problems/minimum-platforms-1587115620/1) (GFG)'
GFG_INV = '[Count Inversions](https://www.geeksforgeeks.org/problems/inversion-of-array-1587115620/1) (GFG)'
PAGES = [
('07-01', '07-01-sorting-and-intervals.md', '# Chapter 7 - Order & Intervals\n\n## Sorting & Intervals ' + LV1, [
 '- **What it is:** once items are sorted, position carries meaning: neighbours are closest in value, and one scan settles each item against everything before it. The moves differ in *what* is sorted: interval endpoints, merge-sort halves, or items under a pairwise rule',
 '- **Signal:** the answer depends on relative size, not input position: "overlapping", "merge", "at the same time", "pairs `i < j` with `a[i] > a[j]`", "arrange to form the largest"',
 '- **Mechanism:** one O(n log n) sort turns a question about all O(n²) pairs into one about neighbours, a running maximum, or two sorted halves',
], [
 '### The moves',
 '',
 '| Move | When to use | What it exploits |',
 '|---|---|---|',
 '| **07-06** | how many are open at once | overlap changes only at endpoints |',
 '| **07-07** | union, or keep the most | sort key = start or end |',
 '| **07-08** | count pairs `i < j` by value | split pairs see sorted halves |',
 '| **07-09** | arrange by a rule on two items | an exchange proves the order |',
 '',
 '### The skeleton: pick the key',
 '',
 '```ts',
 'iv.sort((a, b) => a[0] - b[0]);                // union, cover, merge → by start',
 'iv.sort((a, b) => a[1] - b[1]);                // keep the most, fewest arrows → by end',
 'ev.sort((a, b) => a[0] - b[0] || a[1] - b[1]); // how many open at once → events',
 '```',
 '',
 '### The trap',
 '',
 '- **Default `sort()` compares strings.** `[10, 2, 1].sort()` is `[1, 10, 2]`; pass `(a, b) => a - b`',
 '- **Not every order problem sorts.** Insert Interval arrives sorted and runs in O(n); positions in a small range use a difference array (03-07)',
], None, None),

('07-06', '07-06-sweep-line.md', '## Sweep Line ' + LV1, [
 '- **What:** each interval becomes two events, `+1` at its start and `−1` at its end. Sort the events, walk them with a running count: the count is how many intervals are open',
 '- **Spot it:** *how many* are open at one moment: "at the same time", "fewest rooms / platforms / groups", "busiest moment". *Which* stretches are covered → 07-07',
 '- **Why:** overlap changes only at an endpoint, so 2n sorted events describe every moment: O(n log n) instead of comparing all pairs',
], [
 '```ts',
 '// Divide Intervals Into Minimum Number of Groups (LeetCode 2406)',
 'function minGroups(intervals: number[][]): number {',
 '  const ev: number[][] = [];',
 '  for (const [s, e] of intervals) ev.push([s, 1], [e + 1, -1]); // closed: off after e',
 '  ev.sort((a, b) => a[0] - b[0] || a[1] - b[1]);                 // tie: −1 first',
 '  let open = 0, best = 0;',
 '  for (const [, d] of ev) best = Math.max(best, (open += d));',
 '  return best;',
 '}',
 '```',
 '',
 '- **Watch out:** the tie rule. Whether `[1, 3]` and `[3, 5]` overlap depends on the statement. Closed intervals switch off at `e + 1`; half-open ones at `e`, with ends before starts at equal times. Get it wrong and the peak is one off',
 '- **Also solves:** ' + GFG_PLAT + ' · {LC 2251} (sort starts and ends apart; count with binary search) · {LC 218} (events carry heights; a max-heap of the open ones)',
], '07-06', None),

('07-07', '07-07-sort-by-start-or-end.md', '## Sort by Start to Merge, by End to Keep ' + LV1, [
 '- **What:** the question decides the key. **Merge / cover / union** sorts by *start*. **Keep the most / remove the fewest / fewest points to stab** sorts by *end*',
 '- **Spot it:** intervals plus *which* stretches: merge, insert, intersect, remove the fewest so none overlap, stab all with fewest arrows. How many open at one moment → 07-06',
 '- **Why:** by start, an interval can only touch the group still open, so one running `end` decides merge or close. By end, the interval that finishes first leaves the most room: the exchange argument of activity selection',
], [
 '- **Watch out:** sorting by start for "remove the fewest". `[1, 100], [2, 3], [4, 5]` keeps 1 interval by start and 2 by end. And when merging, compare with the last *merged* interval, not the previous input',
 '- **Also solves:** {LC 57} (already sorted: O(n), no sort) · {LC 435} (removals = n − kept, by end) · {LC 452} (touching balloons share an arrow: test `start > arrow`) · {LC 986} (two pointers: overlap is `[max starts, min ends]`)',
], '07-07', '07-07'),

('07-08', '07-08-count-while-you-merge.md', '## Count While You Merge ' + LV2, [
 '- **What:** merge sort with a counter on the merge step. Every pair `i < j` is split once, into a left and a right half, and both halves are sorted at that moment',
 '- **Spot it:** count pairs `i < j` whose *values* meet an inequality: `a[i] > a[j]`, `a[i] > 2·a[j]`. Symmetric (`a[i] + a[j] ≤ t`) → 02-08',
 '- **Why:** split pairs depend only on values, so sorting each half loses nothing, and the cross count becomes a two-pointer walk: O(n log n)',
], [
 '- **Watch out:** for `a[i] > 2·a[j]`, count in a *separate* pass before merging; placing by that test breaks the sort and every count above it',
 '- **Also solves:** {LC 493} · {LC 315} (sort indices, not values)',
], '07-08', '07-08'),

('07-09', '07-09-let-pairs-decide-the-order.md', '## Let Pairs Decide the Order ' + LV2, [
 '- **What:** when no single key sorts correctly, order by asking about *two* items: "should `a` come before `b`?". A consistent pairwise rule plus one comparator sort gives the optimal line',
 '- **Spot it:** "form the largest number", "each person knows how many taller ones stand in front", "order to minimise the total cost". The statement *gives* the before/after pairs → 16-04',
 '- **Why:** an exchange argument. If swapping neighbours `a b → b a` never helps when `a` should lead, any line can be bubble-swapped into comparator order without getting worse',
], [
 '- **Watch out:** a comparator must return a number. `(a, b) => a + b < b + a` returns `true`/`false`, which becomes 1/0, never negative, and the order is undefined',
 '- **Also solves:** {LC 406} (tallest first, then insert at index `k`) · {LC 1356} · {LC 791} · collapse the pair rule into one key when you can: {LC 1029} → 08-05',
], '07-09', '07-09'),

('07-12', '07-12-order-and-interval-drills.md', '## Drills: Order & Intervals ' + LV1, [
 'The most-asked problems for this chapter. Cover the right column and name the page first.',
 '',
 '| Problem | Page · the deciding fact |',
 '|---|---|',
 '| {LC 56} | 07-07 · union: sort by start, compare with the last merged |',
 '| {LC 57} | 07-07 · already sorted: three phases, O(n) |',
 '| {LC 435} | 07-07 · keep the most: sort by end |',
 '| {LC 452} | 07-07 · stab all: sort by end, `start > arrow` |',
 '| {LC 986} | 07-07 · two sorted lists: advance the earlier end |',
 '| {LC 2406} | 07-06 · the peak of open intervals |',
 '| ' + GFG_PLAT + ' | 07-06 · trains at the station at once |',
 '| {LC 493} | 07-08 · count `a[i] > 2·a[j]` before each merge |',
 '| {LC 315} | 07-08 · sort indices, count as you merge |',
 '| {LC 179} | 07-09 · `a + b` against `b + a` |',
 '| {LC 406} | 07-09 · tallest first, insert at `k` |',
], [], None, None),
]
