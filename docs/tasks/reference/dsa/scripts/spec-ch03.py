LV1 = '<span class="lv lv1"></span>'
LV2 = '<span class="lv lv2"></span>'
# 03-01 (the Prefix Sum intro) is written by hand; its old family files go too
DELETE = ['03-01', '03-02', '03-03', '03-04', '03-05', '03-06', '03-07', '03-09']
PAGES = [
('03-02', '03-02-prefix-sums.md', '## Prefix Sums ' + LV1, [
 '- **What:** store `P[i] = a[0] + … + a[i − 1]`, with `P[0] = 0`. Any range sum is `P[R + 1] − P[L]`',
 '- **Spot it:** "sum of the elements between i and j", many queries on data that never changes, "pivot index", rectangle sums on a grid. Values change between queries → 19-01',
 '- **Why:** addition can be undone. The total up to R contains the total before L, so the difference is exactly the range: O(n) once, then O(1) per query',
], [
 '- **Watch out:** `prefix[R] − prefix[L − 1]` on an n-sized array. At L = 0 it reads `prefix[−1]`, which is `undefined` in JS, and returns `NaN`. Size the array n + 1',
 '- **Also solves:** {LC 304} (add two corners, subtract two) · {LC 724} (right sum = `total − left − a[i]`) · {LC 1310} (XOR undoes itself too)',
], '03-02', '03-02'),

('03-03', '03-03-equal-prefixes.md', '## Equal Prefixes ' + LV1, [
 '- **What:** encode each prefix so that "subarray `(j, i]` has property P" becomes "`code(j) === code(i)`". A map of the codes seen so far answers each index in O(1)',
 '- **Spot it:** "sum equals k" with negatives, "divisible by k", "equal number of 0s and 1s", "every vowel an even number of times". A max or min ("max − min ≤ limit") does not survive subtraction → 10-10',
 '- **Why:** differences of prefixes are subarrays. If P survives subtraction (sums, remainders, parities under XOR), two equal codes bracket a valid subarray. Store the **count** of each code to count, the **first index** to find the longest',
], [
 '- **Watch out:** negative remainders. In JS, `−2 % 5` is `−2`. On `[−2, 5]` with k = 5 the prefixes −2 and 3 bracket `[5]` but land under different keys: 0 instead of 1. Normalise with `((s % k) + k) % k`',
 '- **Also solves:** {LC 560} (code = the sum; look up `sum − k`) · {LC 523} (first index; accept `i − first ≥ 2`) · {LC 525} (0 counts as −1) · {LC 1371} (a 5-bit vowel parity mask)',
 '- **Follow-up (LeetCode 1915):** "at most one letter odd": for each mask `m`, also look up `m ^ (1 << b)` for each of the 10 letters',
], '03-03', '03-03'),

('03-04', '03-04-two-passes-left-and-right.md', '## Two Passes, Left and Right ' + LV1, [
 '- **What:** when the answer at `i` depends on both sides, build the left side in a forward pass and the right side in a backward pass, then combine per index',
 '- **Spot it:** "water trapped above each bar", "product of all the other elements", "beat both neighbours", "increasing, then decreasing". Only the best value on the left is needed → 03-05',
 '- **Why:** the left side of `i` is the left side of `i − 1` plus one item, so each pass is incremental: O(n) in total, not O(n) per index',
], [
 '- **Watch out:** one pass for a two-sided rule. Candy on ratings `[1, 3, 2, 1]` needs `1, 3, 2, 1`; a left pass alone gives `1, 2, 1, 1`',
 '- **Also solves:** {LC 238} · {LC 135} (the right pass takes `max(c[i], c[i + 1] + 1)`) · {LC 2100} (run lengths from each side)',
 '- **Follow-up (O(1) space):** two pointers. Advance the side whose running max is smaller; its water is `itsMax − h`, because the other side already has a bar at least as tall',
], '03-04', '03-04'),

('03-05', '03-05-best-partner-so-far.md', '## Best Partner So Far ' + LV1, [
 '- **What:** for "best pair `i < j`", split the score into `f(i) + g(j)`. Walk `j` left to right and carry the best `f(i)` seen so far',
 '- **Spot it:** "buy on one day, sell on a later day", "maximise `a[i] + a[j] + i − j`", "two numbers that sum to target". Unlimited trades or a cooldown → 17-04',
 '- **Why:** for a fixed `j` the best partner is the largest `f(i)` with `i < j`, and that maximum only grows as `j` moves. One variable replaces the O(n²) pair search',
], [
 '- **Watch out:** offer before reading and `j` pairs with itself. On `[1, 3]` the swapped lines return 6, the 3 counted twice; the answer is 3. LeetCode 121 hides this bug: a same-day sale earns 0, a legal answer',
 '- **Also solves:** {LC 121} (carry the cheapest price) · {LC 1} (an exact partner: map value → index) · {LC 2874} (carry the best `a[i]`, then the best `a[i] − a[j]`)',
 '- **Not separable:** `max j − i` with `a[i] ≤ a[j]` couples `i` and `j`. Build prefix minimums and suffix maximums instead → 03-04',
], '03-05', '03-05'),

('03-06', '03-06-drop-the-baggage.md', '## Drop the Baggage ' + LV1, [
 '- **What:** carry the best subarray that ends *here*. At each element, extend the past or drop it and restart. Kadane\'s algorithm is the sum case',
 '- **Spot it:** "largest product of a contiguous run", "you may delete one element", "largest absolute sum". Elements need not be contiguous ("no two adjacent") → Module 06',
 '- **Why:** a subarray ending at `i` is `[i]` alone or one ending at `i − 1` plus `a[i]`. When one number cannot decide, carry the state that can: the worst value, a "deleted yet?" flag',
], [
 '- **Watch out:** copying sum-Kadane\'s "reset below 0" to products. It throws away `−2`, which later pairs with `−1` to win. Carry the minimum instead',
 '- **Also solves:** {LC 53} · {LC 1186} (a second state: one element deleted) · {LC 1749} (carry the best and the worst)',
 '- **Follow-up (LeetCode 2272):** per letter pair, map `hi → +1`, `lo → −1` and run Kadane. A window must hold at least one `lo`, so carry a "seen `lo`" flag',
], '03-06', '03-06'),

('03-07', '03-07-difference-array.md', '## Difference Array ' + LV1, [
 '- **What:** the inverse of a prefix sum. To add x to `[L, R]`, write `d[L] += x` and `d[R + 1] −= x`. One running sum at the end rebuilds the array',
 '- **Spot it:** "add x to every element from L to R", many updates then one read, "bookings", "pick up and drop off". Reads between updates → 19-01; coordinates up to 10⁹ → 07-06',
 '- **Why:** a running sum carries a change forward until something cancels it. q updates cost O(q) whatever their width; the final read costs O(n)',
], [
 '- **Watch out:** switching off at R, not R + 1. Adding 10 to `[1, 3]` of five zeros gives `[0, 10, 10, 0, 0]`: R never gets it. That is why `d` has a spare slot',
 '- **Also solves:** {LC 1094} (fail once the running sum exceeds capacity) · {LC 2381} (shift mod 26) · {LC 2536} (four corners, then row and column sums)',
], '03-07', '03-07'),

('03-09', '03-09-running-state-drills.md', '## Drills: Prefix & Running State ' + LV1, [
 'The most-asked problems for this chapter. Cover the right column and name the page first.',
 '',
 '| Problem | Page · the deciding fact |',
 '|---|---|',
 '| {LC 560} | 03-03 · negatives allowed: count earlier prefixes equal to `sum − k` |',
 '| {LC 974} | 03-03 · equal remainders; normalise negatives |',
 '| {LC 523} | 03-03 · first index per remainder, length ≥ 2 |',
 '| {LC 304} | 03-02 · static grid: 2-D prefix, inclusion–exclusion |',
 '| {LC 238} | 03-04 · product before × product after, no division |',
 '| {LC 135} | 03-04 · a rule on both neighbours: two passes |',
 '| {LC 1} | 03-05 · map value → index, read before write |',
 '| {LC 121} | 03-05 · carry the cheapest earlier price |',
 '| {LC 53} | 03-06 · extend or restart |',
 '| {LC 152} | 03-06 · a negative swaps the max and the min |',
 '| {LC 1109} | 03-07 · many range adds, one read |',
], [], None, None),
]
