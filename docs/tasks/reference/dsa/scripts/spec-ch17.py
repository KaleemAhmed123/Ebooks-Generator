LV1 = '<span class="lv lv1"></span>'
LV2 = '<span class="lv lv2"></span>'
LV3 = '<span class="lv lv3"></span>'
GFG_MCM = '[Matrix Chain Multiplication](https://www.geeksforgeeks.org/problems/matrix-chain-multiplication0303/1) (GFG)'
DELETE = ['17-01', '17-02', '17-03', '17-04', '17-05', '17-06', '17-07', '17-08']
PAGES = [
('17-01', '17-01-dynamic-programming.md', '# Chapter 17 - DP & Games\n\n## Dynamic Programming ' + LV1, [
 '- **What it is:** a choice at each step, an optimum or a count to report, and a brute-force recursion whose calls repeat the same arguments. Cache the calls and it is DP (Module 06 builds the method)',
 '- **Signal:** "maximum / minimum / number of ways", and a choice whose effect reaches later steps',
 '- **Mechanism:** the recursion\'s arguments are the state, each solved once; the table is only the memo',
], [
 '### The moves',
 '',
 '| Move | Signature | Typical ask |',
 '|---|---|---|',
 '| **17-02** | name the shape first | which DP is this? |',
 '| **17-03** | `f(i)`, a pick jumps ahead | weighted intervals |',
 '| **17-04** | `f(i, holding, k)` | stocks with rules |',
 '| **17-05** | `f(i, j)`, loop the split | cut, merge, burst |',
 '| **17-06** | `f(i, j)` = the mover\'s lead | two perfect players |',
 '',
 '### The skeleton: memoised recursion',
 '',
 '```ts',
 'function f(i: number, cap: number): number {             // the arguments ARE the state',
 '  if (i === n) return 0;                                 // base case',
 '  const key = i + "," + cap; if (memo.has(key)) return memo.get(key)!; // seen',
 '  let best = f(i + 1, cap);                              // skip',
 '  if (w[i] <= cap) best = Math.max(best, v[i] + f(i + 1, cap - w[i])); // take',
 '  memo.set(key, best); return best;',
 '}',
 '```',
 '',
 '### The trap: greedy, regret, or DP?',
 '',
 '- Intervals worth 1: earliest end (07-07). Durations and deadlines: drop the longest (15-06). Fixed times, different profits: a cheap job blocks two rich ones: DP (17-03)',
], None, None),

('17-02', '17-02-name-the-dp-shape.md', '## Name the DP Shape ' + LV1, [
 '- **What:** every DP is named by the arguments of its recursion. Write the signature before any transition: `f(i)`, `f(i, cap)`, `f(i, j)` over two strings or one range, `f(i, holding)`, `f(mask)`',
 '- **Spot it:** "maximum / minimum / number of ways" plus a choice at each step, and repeated calls. The limit on n narrows the signature',
 '- **Why:** the arguments are exactly what the future needs to know about the past, so problems with one signature share one loop; only the transition changes',
], [
 '| Common tag | Signature | Read |',
 '|---|---|---|',
 '| no two adjacent | `f(i)`: take and jump to i + 2, or skip | Module 06 |',
 '| grid paths | `f(r, c)`: moves right or down only | Module 06 |',
 '| knapsack 0/1, 0/N | `f(i, cap)`: 0/1 moves on after a pick; 0/N stays | Module 06 |',
 '| weighted intervals | `f(i)`; a pick jumps by binary search | 17-03 |',
 '| stocks | `f(i, holding, k)` | 17-04 |',
 '| two strings | `f(i, j)`, one index per string | Module 06 |',
 '| LIS | `f(i)` = the best chain ending at i | Module 06 |',
 '| cut, merge, burst | `f(i, j)`, loop the split k | 17-05 |',
 '| two-player games | `f(i, j)` = the lead of the player to move | 17-06 |',
 '',
 '- **Watch out:** choosing the table before the signature. An `n × n` table for a problem that needs only `f(i, cap)` wastes memory and hides the transition',
], '17-02', None),

('17-03', '17-03-pick-then-jump.md', '## Pick, Then Jump ' + LV2, [
 '- **What:** pick or skip over items sorted by start. Skip moves to `k + 1`; pick **jumps** to the first item starting after this one ends (binary search)',
 '- **Spot it:** weighted intervals, "non-overlapping", "maximum profit", n up to 10⁵. All worth the same → 07-07',
 '- **Why:** sorted by start, the items compatible with a pick form a suffix, so one index is the state: `dp[k]` = the best using items k … n − 1',
], [
 '- **Watch out:** the boundary. In 1235 a job may start as the last ends: search start `≥ end`; `>` scores `[1,2]:50, [2,3]:50` as 50, not 100',
 '- **Also solves:** {LC 1751} · {LC 2054} (inclusive ends: `> end`)',
], '17-03', '17-03'),

('17-04', '17-04-track-what-you-hold.md', '## Track What You Hold ' + LV2, [
 '- **What:** a state-machine DP. The state is what you carry (a share or nothing, and trades used); each day every state stays or moves along one edge: buy, sell',
 '- **Spot it:** buy and sell, "at most k transactions", "cooldown", "transaction fee". Exactly one buy and one later sell → 03-05',
 '- **Why:** the past matters only through the current status, so two numbers per trade count (best cash holding, best cash free) summarise every history',
], [
 '- **Watch out:** summing every rise when k is limited. `[1, 2, 1, 2, 1, 2]` sums to 3; with k = 2 the answer is 2',
 '- **Also solves:** {LC 122} (unlimited: sum every rise) · {LC 123} (k = 2) · {LC 309} (a third state, "just sold") · {LC 714} (the fee on the sell edge)',
], '17-04', '17-04'),

('17-05', '17-05-try-every-split.md', '## Try Every Split ' + LV3, [
 '- **What:** partition DP. The state is a range `(i, j)`. Choose the operation that splits it into two independent parts, try every position k, and pay a cost of `i`, `k` and `j` only',
 '- **Spot it:** "minimum cost to cut / merge / multiply / burst", "place brackets", n ≤ 100–500 so O(n³) fits. *Any* two piles may merge → a heap, 15-05',
 '- **Why:** with the split fixed, the two sides are independent subproblems. Ask which operation makes them independent: the **first** cut, or the **last** balloon to burst',
], [
 '- **Watch out:** loop order. Filling `dp[i][j]` with `i` ascending reads `dp[k][j]` before it exists: LeetCode 1547\'s first example returns 7 instead of 16. Loop by range length',
 '- **Also solves:** {LC 312} (k is the last balloon: its neighbours are `i` and `j`) · {LC 1039} · ' + GFG_MCM,
], '17-05', '17-05'),

('17-06', '17-06-assume-the-opponent-is-perfect.md', '## Assume the Opponent Is Perfect ' + LV2, [
 '- **What:** minimax DP for two-player, zero-sum games. Store one number per position: the **lead of the player to move**. A move is worth its gain minus the opponent\'s best lead from what is left',
 '- **Spot it:** "two players take turns", "both play optimally", "can player 1 win". The other player follows a fixed rule → simulate it',
 '- **Why:** in a zero-sum game the opponent\'s best play is your worst case, so one function serves both sides: `lead = gain − lead(next)`',
], [
 '- **Watch out:** modelling the opponent as greedy. On `[1, 5, 233, 7]` "take the larger end" gives player 1 only 12; taking 1 first forces the opponent to open 233, and player 1 wins',
 '- **Also solves:** {LC 877} (always true) · {LC 1140} (add M to the state) · {LC 464} (a bitmask of used numbers) · {LC 292} (`n % 4 !== 0`)',
], '17-06', '17-06'),

('17-07', '17-07-dp-drills.md', '## Drills: DP & Games ' + LV2, [
 'The most-asked problems for this chapter. Cover the right column and name the page first.',
 '',
 '| Problem | Page · the deciding fact |',
 '|---|---|',
 '| {LC 198} | 17-02 · `f(i)`: take and jump two, or skip |',
 '| {LC 322} | 17-02 · `f(amount)`, coins reused |',
 '| {LC 300} | 17-02 · the best chain ending at each i |',
 '| {LC 1143} | 17-02 · `f(i, j)` over two strings |',
 '| {LC 72} | 17-02 · `f(i, j)`: insert, delete, replace |',
 '| {LC 1235} | 17-03 · sort by start; a pick jumps |',
 '| {LC 123} | 17-04 · two trades: four states |',
 '| {LC 309} | 17-04 · a "just sold" state |',
 '| {LC 312} | 17-05 · the last balloon splits the range |',
 '| {LC 1547} | 17-05 · the first cut splits the stick |',
 '| {LC 486} | 17-06 · the lead of the player to move |',
], [], None, None),
]
