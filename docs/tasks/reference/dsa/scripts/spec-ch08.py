LV1 = '<span class="lv lv1"></span>'
LV2 = '<span class="lv lv2"></span>'
DELETE = ['08-01', '08-02', '08-03', '08-04', '08-05', '08-06', '08-08', '08-09']
GFG_JOB = '[Job Sequencing Problem](https://www.geeksforgeeks.org/problems/job-sequencing-problem-1587115620/1) (GFG)'
PAGES = [
('08-01', '08-01-greedy.md', '# Chapter 8 - Greedy Moves\n\n## Greedy ' + LV2, [
 '- **What it is:** commit to the best-looking choice now and never revisit it. The loop is easy; knowing *which* choice is safe is the whole problem',
 '- **Signal:** a minimum or maximum over choices made one at a time (jumps, boats, slots, starts), n up to 10⁵ so a DP over pairs is too slow, and one move that looks obviously best',
 '- **Mechanism:** a safe move has a proof that some optimal answer agrees with it: an *exchange* (swap the greedy choice into any optimal answer without loss) or *stays ahead* (after each step greedy is at least as far along)',
], [
 '### The moves',
 '',
 '| Move | When to use | Why it is safe |',
 '|---|---|---|',
 '| **08-02** | fewest jumps to cover a line | stays ahead: the reach is maximal |',
 '| **08-06** | one start completes a circle | a failed stretch fails every start in it |',
 '| **08-03** | unit jobs with deadlines | exchange: early slots are scarce |',
 '| **08-04** | pair everyone, limit per pair | exchange: crossed pairs never help |',
 '| **08-05** | two sides with quotas | one derived key prices each move |',
 '',
 'Sort-by-end greedy is 07-07; heap greedy is 15-05 and 15-06.',
 '',
 '### The trap: find a counter-input before coding',
 '',
 '| Tempting move | Tiny counter-input | What beats it |',
 '|---|---|---|',
 '| largest coin first | `[1, 3, 4]`, amount 6: 4 + 1 + 1 | 3 + 3: DP, 17-02 |',
 '| earliest start first | `[1, 100], [2, 3], [4, 5]`: keeps 1 | earliest end keeps 2 |',
 '| earliest free slot | x (due 2, 100), y (due 1, 50): 100 | latest slot keeps both: 150 |',
], None, None),

('08-02', '08-02-extend-the-reach.md', '## Extend the Reach ' + LV1, [
 '- **What:** for fewest steps to cover a line, track `end` (the edge reached so far) and `far` (the best reach with one more jump). When `i` hits `end`, a jump to `far` is forced',
 '- **Spot it:** fewest jumps, taps or clips to cover 0..n, where each position reaches *anywhere* in a stretch ahead. A jump lands on exactly `i ± a[i]` → BFS over indices, 16-01',
 '- **Why:** it is BFS by levels on a line: all indices reachable in k jumps form one range, and the next level is `(end, far]`. Extending a range involves no choice, so none can be wrong',
], [
 '- **Watch out:** stop before the last index, or a level ending there adds a jump from the destination. Without a reachability promise, `[1, 0, 2]` sticks at `end = far = 1`: return −1 when a forced jump makes no progress',
 '- **Also solves:** {LC 55} (only `far`: fail when `i > far`) · {LC 1326} (turn each tap into `reach[left] = right`, then the same loop) · {LC 763} (extend `end` to each letter\'s last index; cut when `i === end`)',
], '08-02', '08-02'),

('08-03', '08-03-take-the-latest-free-slot.md', '## Take the Latest Free Slot ' + LV2, [
 '- **What:** unit-time jobs with deadlines and profits. Take them from most to least profitable; put each in the *latest* free slot that meets its deadline, or skip it',
 '- **Spot it:** unit-time jobs, one per slot, a deadline and a profit each; maximise the profit. Jobs of different lengths → 15-06',
 '- **Why:** in profit order a job is only skipped for more valuable ones. Placing it as late as allowed keeps early slots free, and only early slots serve tight deadlines',
], [
 '- **Watch out:** the earliest free slot. x (deadline 2, profit 100) takes slot 1 and y (deadline 1, profit 50) is lost: 100 instead of 150',
 '- **Faster:** a union-find over slots, `parent[t]` = the latest free slot ≤ t, makes each lookup nearly O(1)',
 '- **Also solves:** {LC 630} (lengths, not unit time: the regret heap, 15-06)',
], '08-03', '08-03'),

('08-04', '08-04-pair-the-extremes.md', '## Pair the Extremes ' + LV1, [
 '- **What:** sort, then pair from both ends: the largest with the smallest. The ends hold the extreme cases, and those decide the answer',
 '- **Spot it:** everyone paired or grouped, and a pair\'s limit depends on its largest and smallest: "at most two per boat", "minimise the largest pair sum". One pair with a given sum → 02-08',
 '- **Why:** the heaviest needs a partner light enough; the lightest is the best partner anyone can get. If they do not fit, the heaviest rides alone; if they do, pairing them never hurts',
], [
 '- **Watch out:** two pointers without the sort. On `[3, 3, 1, 1]` with limit 3 the unsorted walk uses 4 boats; sorted, the two 1s share one: 3',
 '- **Also solves:** {LC 1877} (pair `a[i]` with `a[n − 1 − i]`) · {LC 455} (sort both; the smallest cookie that satisfies each child) · {LC 628} (three largest, or two smallest × the largest)',
], '08-04', '08-04'),

('08-05', '08-05-price-the-swap.md', '## Price the Swap ' + LV2, [
 '- **What:** every item goes to one of two sides with quotas. Price moving it from B to A, `costA − costB`, and sort by that price',
 '- **Spot it:** each item to exactly one of two sides, each side has a quota, each item costs something on either side: "n per city". The *order* of handling items → 07-09',
 '- **Why:** total = everyone\'s cost at B + the extra for each person sent to A. Only the extra depends on the choice, so send the n smallest extras',
], [
 '- **Watch out:** the cheaper city first, until it fills. On `[40, 30], [80, 40], [80, 40], [40, 40]` that costs 190; sorted by `costA − costB` it costs 160. Use the signed key, not `|costA − costB|`',
 '- **Also solves:** {LC 1665} (sort by `minimum − actual`, largest first)',
], '08-05', '08-05'),

('08-06', '08-06-restart-when-you-go-broke.md', '## Restart When You Go Broke ' + LV1, [
 '- **What:** drive a circular route once. When the running tank goes negative at station `i`, restart at `i + 1` with an empty tank. If the total gain covers the total cost, the last restart is the answer',
 '- **Spot it:** a circle where each stop adds fuel and each leg costs some; find the one start that completes the lap. A line where you choose refuelling stops → 15-06',
 '- **Why:** if start `s` runs dry leaving `i`, every later start in `(s, i]` reaches `i` with less fuel, so all of `[s, i]` fail at once. A total ≥ 0 means some start works',
], [
 '- **Watch out:** skipping the total check. Gas `[2, 3, 4]`, cost `[3, 4, 3]` returns start 2, but the total is −1 and no start completes the lap',
 '- **Same reset elsewhere:** Kadane (03-06) drops a prefix whose sum is negative for this reason',
], '08-06', '08-06'),

('08-08', '08-08-greedy-drills.md', '## Drills: Greedy Moves ' + LV1, [
 'The most-asked problems for this chapter. Cover the right column and name the page first.',
 '',
 '| Problem | Page · the deciding fact |',
 '|---|---|',
 '| {LC 45} | 08-02 · a jump is forced when `i` reaches `end` |',
 '| {LC 1326} | 08-02 · taps become reaches; −1 when stuck |',
 '| {LC 1024} | 08-02 · clips become reaches over `[0, time]` |',
 '| {LC 763} | 08-02 · extend to each letter\'s last index |',
 '| {LC 134} | 08-06 · restart after a negative tank; check the total |',
 '| ' + GFG_JOB + ' | 08-03 · most profitable first, latest free slot |',
 '| {LC 881} | 08-04 · heaviest boards; lightest joins if it fits |',
 '| {LC 455} | 08-04 · sort both, match the smallest that fits |',
 '| {LC 1877} | 08-04 · pair the ends |',
 '| {LC 1029} | 08-05 · sort by `costA − costB` |',
], [], None, None),
]
