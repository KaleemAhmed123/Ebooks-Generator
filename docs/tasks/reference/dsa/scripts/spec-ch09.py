LV1 = '<span class="lv lv1"></span>'
LV2 = '<span class="lv lv2"></span>'
DELETE = ['09-01', '09-02', '09-03', '09-04', '09-08']
PAGES = [
('09-01', '09-01-binary-search.md', '# Chapter 9 - Search Space\n\n## Binary Search ' + LV1, [
 '- **What it is:** the answer lies in a range too large to try point by point, but one probe rules out half of it. The range is the indices of a partly sorted array, or the possible values of the answer itself',
 '- **Signal:** "O(log n)" on data that is not fully sorted; the smallest or largest value that passes a test ("minimum capacity", "maximum distance", "k-th smallest") when testing one candidate is easy',
 '- **Mechanism:** a test that flips exactly once over the range, `F…FT…T` or `T…TF…F`, turns every probe into "the flip is left of here" or "right of here". log(range) probes find it',
], [
 '### The moves',
 '',
 '| Move | What is searched | The test at `mid` |',
 '|---|---|---|',
 '| **09-02** | the answer, a number in a known range | "can it be done with `mid`?" |',
 '| **09-04** | the k-th value of a set too big to list | `count(≤ mid) ≥ k` |',
 '| **09-03** | an index in a rotated or mountain array | which side is sorted, or uphill |',
 '',
 '### The skeleton',
 '',
 '```ts',
 'while (lo < hi) {                       // minimise: the first x that works',
 '  const mid = lo + ((hi - lo) >> 1);',
 '  if (works(mid)) hi = mid; else lo = mid + 1;',
 '}',
 'while (lo < hi) {                       // maximise: the last x that works',
 '  const mid = lo + ((hi - lo + 1) >> 1); // round up, or lo = mid never moves',
 '  if (works(mid)) lo = mid; else hi = mid - 1;',
 '}',
 '```',
 '',
 '### The trap',
 '',
 '- **A test that is not monotone.** If `works(x)` can go true, false, true, halving returns an arbitrary boundary. Prove "x works ⇒ x + 1 works" (or the mirror) first',
], None, None),

('09-02', '09-02-binary-search-on-answer.md', '## Binary Search on the Answer ' + LV1, [
 '- **What:** search the *answer*: guess X, check "can it be done with X?", and halve the range of X by where the check flips',
 '- **Spot it:** "minimise the maximum", "maximise the minimum", "the least capacity / speed / days". Pieces whose costs are *added*, not capped → DP, 17-02',
 '- **Why:** checking one capacity is a greedy O(n) pass, and if C works so does C + 1: O(n log range)',
], [
 '- **Watch out:** starting `lo` at 1. The check gives an oversized package its own day, so `[5, 1]` looks shippable in 3 days at capacity 3. Start at `max(weights)`',
 '- **Also solves:** {LC 875} · {LC 410} · {LC 1552} (maximise the minimum: the last true)',
], '09-02', '09-02'),

('09-03', '09-03-find-the-sorted-half.md', '## Find the Sorted Half ' + LV1, [
 '- **What:** binary search on data that is only *mostly* sorted: rotated, a mountain, one peak. At each `mid` one side is provably sorted or uphill; decide with it, drop the other half',
 '- **Spot it:** O(log n) on an array sorted except for one break, or that rises toward a peak: "rotated at an unknown pivot", "increasing then decreasing", "larger than its neighbours"',
 '- **Why:** a window holds at most one break, so one of `[lo, mid]` and `[mid, hi]` has none, and a sorted side says "is the target in me?" from its two ends. For peaks, uphill guarantees one',
], [
 '- **Watch out:** `a[lo] < a[mid]` instead of `<=`. With two elements left, `lo === mid`, so the code tests the wrong side: `[3, 1]` searching for 1 returns −1',
 '- **Also solves:** {LC 153} (compare with `a[hi]`, not `a[lo]`) · {LC 81} (duplicates: shrink both ends; O(n) worst case) · {LC 162} and {LC 852} (rising at `mid` → a peak is right)',
], '09-03', '09-03'),

('09-04', '09-04-guess-a-value-count-below-it.md', '## Guess a Value, Count Below It ' + LV2, [
 '- **What:** guess a *value* `x` and count the items `≤ x`; the k-th smallest is the smallest `x` whose count reaches k',
 '- **Spot it:** the k-th smallest or median of a set too big to list: a sorted matrix, all pair distances. Small k over sorted lists → 15-03',
 '- **Why:** `count(x)` never falls, so it flips once; the first true is in the set',
], [
 '- **Watch out:** stopping at `count(mid) === k`: on `[[1, 3], [5, 7]]`, k = 2, `count(4) = 2`, yet 4 is absent',
 '- **Also solves:** {LC 719} (count with two pointers)',
], '09-04', '09-04'),

('09-08', '09-08-search-space-drills.md', '## Drills: Search Space ' + LV1, [
 'The most-asked problems for this chapter. Cover the right column and name the page first.',
 '',
 '| Problem | Page · the deciding fact |',
 '|---|---|',
 '| {LC 1011} | 09-02 · least capacity: start at `max(weights)` |',
 '| {LC 875} | 09-02 · least speed; hours = Σ ⌈pile / speed⌉ |',
 '| {LC 1482} | 09-02 · fewest days; count bouquets of adjacent bloomed |',
 '| {LC 2226} | 09-02 · maximise the pile size: the last true |',
 '| {LC 69} | 09-02 · the last x with `x · x ≤ n` |',
 '| {LC 33} | 09-03 · one half is sorted; is the target inside it? |',
 '| {LC 153} | 09-03 · compare `a[mid]` with `a[hi]` |',
 '| {LC 162} | 09-03 · walk uphill |',
 '| {LC 378} | 09-04 · count `≤ x` with a staircase |',
 '| {LC 719} | 09-04 · count pairs `≤ d` with two pointers |',
 '| {LC 668} | 09-04 · count per row: `min(⌊x / i⌋, n)` |',
], [], None, None),
]
