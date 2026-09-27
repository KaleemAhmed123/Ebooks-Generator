LV1 = '<span class="lv lv1"></span>'
LV2 = '<span class="lv lv2"></span>'
DELETE = ['02-01', '02-02', '02-03', '02-04', '02-05', '02-06', '02-07', '02-08', '02-09', '02-10', '02-11', '02-12']
PAGES = [
('02-01', '02-01-windows-and-pointers.md', '# Chapter 2 - Windows & Pointers\n\n## Windows and Pointers ' + LV1, [
 '- **What:** two indices over one array or string, each moving one way only: a window (both move right), a collision (they close in from the ends), or a reader and a writer',
 '- **Why:** an index never comes back, so the pair makes at most 2n moves. The proof is always the same: no position an index has passed can still hold the answer',
 '- **Patterns:** **1 · Sliding Window** 02-02 → 02-07 · **2 · Collide** 02-08, 02-10 · **3 · Reader and Writer** 02-09',
 '',
 '### Window, count, or prefix map?',
 '',
 'Four questions, in this order, settle any "subarray with property P" statement.',
], ['- **Watch out:** "subset" is not "subarray". A subsequence summing to K is knapsack DP (Module 06), not a window; a subset scored only by its values is a window after sorting (02-07)'], '02-11', None),

('02-02', '02-02-sliding-window-fixed.md', '## Sliding Window (Fixed Length) ' + LV1, [
 '- **What:** one running summary of k consecutive items. Each step one item leaves on the left and one enters on the right',
 '- **Spot it:** "every window of size k", "k consecutive days", "a permutation of p inside s". A max or min per window cannot be undone → 10-10',
 '- **Why:** neighbouring windows share k − 1 items. A summary that can subtract (a sum, a count, a letter map) never re-reads them: O(n), not O(n · k)',
], [
 '- **Watch out:** start `best` from the first window, not 0. On `[−1, −2]` with k = 1, `best = 0` returns 0; the answer is −1',
 '- **Also solves:** {LC 1456} · {LC 438} · {LC 2090}',
], '02-02', '02-02'),

('02-03', '02-03-sliding-window-variable.md', '## Sliding Window (Variable Length) ' + LV1, [
 '- **What:** `right` takes in the next item; `left` shrinks the window until the condition holds again. The best window seen is the answer',
 '- **Spot it:** "longest / shortest subarray such that…", "at most k distinct", "no repeating characters", values ≥ 0. Negatives can lower a sum → 03-03 (sum = K) or 10-10 (sum ≥ K)',
 '- **Why:** the condition is monotone in the window, so `left` never moves back. Each index enters once and leaves once: O(n)',
], [
 '- **Watch out:** where the record goes. *Longest:* shrink while invalid, then record. *Shortest:* record inside the loop, while still valid, before `left++`',
 '- **Also solves:** {LC 3} · {LC 904} · {LC 424} · {LC 1004} · {LC 76}',
 '- **Follow-up (LeetCode 76):** test validity in O(1) with one counter, `missing`, of letters of t still needed; the window is valid when it hits 0',
], '02-03', '02-03'),

('02-04', '02-04-count-by-right-end.md', '## Count by the Right End ' + LV1, [
 '- **What:** count *every* valid subarray. When `right` settles, add the `right − left + 1` subarrays that end there',
 '- **Spot it:** "count the subarrays such that…" with a condition that survives shrinking: product < K, at most K distinct. Sum = K with negatives → 03-03',
 '- **Why:** if `[left, right]` is valid and shrinking keeps it valid, every start inside it is valid. Each subarray is counted once, at its own right end',
], [
 '- **Watch out:** the `k ≤ 1` guard. With k = 0 the loop pops past `right` and the count goes negative',
 '- **Grow-safe instead:** in {LC 1358} validity survives *growing*. Shrink while all three letters are present, then add `left`',
], '02-04', '02-04'),

('02-05', '02-05-exactly-k-by-subtraction.md', '## Exactly K by Subtraction ' + LV2, [
 '- **What:** count "exactly K" as `atMost(K) − atMost(K − 1)`',
 '- **Spot it:** "exactly K distinct", "exactly K odd numbers", "sum equals goal" on a 0/1 array, asked as a count. Sum = K with negatives → 03-03',
 '- **Why:** "exactly K" is not shrink-safe, "at most K" is (02-04). Every subarray with at most K has exactly K or at most K − 1, so the difference is exactly K',
], [
 '- **Watch out:** guard `k < 0`. With K = 0 the second call is `atMost(−1)`: `freq.size > −1` holds even for an empty window and the loop never ends',
 '- **Also solves:** {LC 930} · {LC 1248} (map each number to `n % 2`) · {LC 795} (maximum ≤ R minus maximum ≤ L − 1)',
], '02-05', '02-05'),

('02-06', '02-06-flip-the-target.md', '## Flip the Target ' + LV2, [
 '- **What:** when items leave from both ends, solve for the contiguous middle that stays',
 '- **Spot it:** "remove from either end", "take k cards from the ends". Two players taking turns → 17-06',
 '- **Why:** every removal sequence leaves one middle. "Sum taken = x" becomes "sum kept = total − x", and a middle is a window',
], [
 '- **Watch out:** greedy on the ends. On `[3, 5, 1, 4]` with x = 9, "take the larger end" takes 4, 3, 1 and is stuck; the answer takes 3, 5, 1',
 '- **Also solves:** {LC 1423} (keep a fixed window of n − k) · {LC 918} (total − worst Kadane; if every value is negative, return the best)',
], '02-06', '02-06'),

('02-07', '02-07-sort-then-slide.md', '## Sort, then Slide ' + LV2, [
 '- **What:** when only the chosen *values* matter, sort first. The best subset is then a contiguous run',
 '- **Spot it:** "choose m values with the smallest max − min", "at most k increments in total, maximise the frequency". Fixed positions ("subarray", "in order") → 02-03',
 '- **Why:** any value between a subset\'s min and max joins it without widening the range, so some best subset is contiguous once sorted',
], [
 '- **Watch out:** the cost `nums[right] · len − sum` assumes `nums[right]` is the window max. Unsorted, `[4, 1, 2]` "raises" the 4 *down* to 2',
 '- **Also solves:** [Chocolate Distribution Problem](https://www.geeksforgeeks.org/problems/chocolate-distribution-problem3825/1) (GFG) · {LC 1984} · {LC 2779}',
], '02-07', '02-07'),

('02-08', '02-08-collide-from-both-ends.md', '## Two Pointers: Collide from Both Ends ' + LV1, [
 '- **What:** on sorted data, one index at each end; every comparison moves one of them inward',
 '- **Spot it:** "sorted", "pair summing to X", "palindrome", "most water". Unsorted, original indices wanted → 03-05',
 '- **Why:** a sum too small means `a[i]` fails with every partner left, so its whole row goes; too big, the column goes. n − 1 moves clear n(n − 1)/2 pairs',
], [
 '- **Watch out:** `left < right`, not `<=`. On `[3, 5]` with target 6, `<=` returns the 3 twice',
 '- **Also solves:** {LC 11} (move the shorter wall: it caps every pair it could still form) · {LC 125} · {LC 977}',
], '02-08', '02-08'),

('02-09', '02-09-reader-and-writer.md', '## Two Pointers: Reader and Writer ' + LV1, [
 '- **What:** the reader visits every item; the writer marks where the next kept item goes. Three regions (0, 1, 2) add a pointer from the back: the Dutch national flag',
 '- **Spot it:** "in place", "O(1) extra space", "return the new length", "sort 0s, 1s and 2s". Read-only array, find the repeat → 12-04',
 '- **Why:** everything behind the writer is final, and the writer never passes the reader, so nothing unread is overwritten',
], [
 '- **Watch out:** after swapping with `high`, do not advance `mid`: the value pulled in is unread. `[2, 1, 2]` stays unsorted',
 '- **Also solves:** {LC 26} (compare with `nums[w − 1]`) · {LC 80} (with `nums[w − 2]`) · {LC 283}',
], '02-09', '02-09'),

('02-10', '02-10-fix-one-collide-two.md', '## Fix One, Collide Two ' + LV1, [
 '- **What:** fix the first element with a loop, then collide two pointers (02-08) on the rest. k-Sum costs O(n^(k−1))',
 '- **Spot it:** "all unique triplets summing to 0", "closest sum", "count triangles". The order i < j < k must hold → 03-04 / 03-05',
 '- **Why:** with `a[i]` fixed it is a two-sum on a sorted suffix, and sorting puts duplicates side by side',
], [
 '- **Watch out:** skip duplicates only *after* recording a match, and compare the fixed value with its *previous* neighbour: `nums[i] === nums[i + 1]` drops `[−1, −1, 2]`',
 '- **Also solves:** {LC 16} · {LC 611} (fix the largest side; a match adds `right − left`) · {LC 18}',
], '02-10', '02-10'),

('02-12', '02-12-windows-drills.md', '## Drills: Windows & Pointers ' + LV1, [
 'The most-asked problems for this chapter. Cover the right column and name the page first.',
 '',
 '| Problem | Page · the deciding fact |',
 '|---|---|',
 '| {LC 3} | 02-03 · longest; shrink while a repeat is inside |',
 '| {LC 76} | 02-03 · shortest; record while every needed count is met |',
 '| {LC 424} | 02-03 · valid while `length − maxCount ≤ k` |',
 '| {LC 209} | 02-03 · positives: shrink while `sum ≥ target` |',
 '| {LC 438} | 02-02 · fixed length = length of p, letter counts |',
 '| {LC 713} | 02-04 · a count: add `right − left + 1` |',
 '| {LC 992} | 02-05 · exactly K = `atMost(K) − atMost(K − 1)` |',
 '| {LC 1423} | 02-06 · keep a window of `n − k` |',
 '| {LC 11} | 02-08 · move the shorter wall |',
 '| {LC 15} | 02-10 · fix one, collide two, skip duplicates |',
 '| {LC 75} | 02-09 · three zones, one pass |',
], [], None, None),
]
