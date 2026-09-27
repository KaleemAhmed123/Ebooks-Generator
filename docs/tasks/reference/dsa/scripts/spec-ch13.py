LV1 = '<span class="lv lv1"></span>'
LV2 = '<span class="lv lv2"></span>'
SPLIT = {'13-01': '### The skeleton'}
DELETE = ['13-01', '13-02', '13-03', '13-04', '13-05', '13-06', '13-07', '13-08', '13-09', '13-10', '13-11']
PAGES = [
('13-01', '13-01-0-recursion-and-backtracking.md', '# Chapter 13 - Recursion & Backtracking\n\n## Recursion & Backtracking ' + LV1, [
 '- **What it is:** a recursive function is three statements: a hypothesis (what `f(n)` does), a base case, and an induction step that trusts a smaller call. Backtracking is recursion over choices: choose, recurse, undo',
 '- **Signal:** "all subsets / combinations / permutations", "every path", "split into valid pieces", "place n queens", n ≤ 20',
 '- **Mechanism:** the start index of the next call encodes the rules: `i + 1` uses each item once, `i` lets it repeat, `0` lets an earlier item follow a later one, so order counts',
], [
 '### The moves',
 '',
 '| Move | When to use | What it exploits |',
 '|---|---|---|',
 '| **13-01** | a smaller copy of itself | induction replaces tracing |',
 '| **13-02** | forward or reverse order | before or after the call |',
 '| **13-05** | all subsets, distinct items | one take-or-leave per item |',
 '| **13-06** | duplicates in, none out | skip equal siblings |',
 '| **13-07** | reuse allowed, or order counts | start at `i`, or at `0` |',
 '| **13-08** | all arrangements | fill slot k from the unused |',
 '| **13-09** | split into valid pieces | fix the first piece |',
 '| **13-04** | paths through grid cells | mark, move, unmark |',
 '| **13-10** | a rule links the choices | O(1) checks, exact undo |',
 '',
 '### The skeleton',
 '',
 '```ts',
 'function go(start: number) {',
 '  out.push([...cur]);                             // a copy, never cur itself',
 '  for (let i = start; i < a.length; i++) {',
 '    if (i > start && a[i] === a[i - 1]) continue; // equal sibling (sorted)',
 '    cur.push(a[i]);                               // choose',
 '    go(i + 1);                                    // i: reuse · 0: order counts',
 '    cur.pop();                                    // undo',
 '  }',
 '}',
 '```',
 '',
 '### The trap',
 '',
 '- **Listing when only a count or a best value is asked.** The states `(index, remaining)` repeat: memoise them, it is DP (17-01)',
], None, None),

('13-01', '13-01-trust-the-smaller-call.md', '## Trust the Smaller Call ' + LV1, [
 '- **What:** write the hypothesis ("`f(n)` does exactly this"), answer the smallest input directly, and finish `f(n)` assuming the smaller call works. Never trace it',
 '- **Spot it:** "solve it recursively", Tower of Hanoi, reverse or sort a stack with only push and pop, xⁿ in O(log n). The same smaller calls repeat, and a count is asked → 17-01',
 '- **Why:** it is induction. A right base case plus a step that is right whenever its smaller calls are right makes every call right',
], [
 '- **Watch out:** a base case the calls can skip. `pow(x, n)` with base `n === 1` never ends for n = 0. Every chain of calls must reach the base',
 '- **Also solves:** {LC 50} (`h = pow(x, ⌊n/2⌋)`; return `h · h`, times x if n is odd) · {LC 779}',
], '13-01', '13-01'),

('13-02', '13-02-work-before-or-after-the-call.md', '## Work Before or After the Call ' + LV1, [
 '- **What:** a line before the recursive call runs on the way *down*, in forward order; a line after it runs on the way *up*, in reverse, with the smaller call\'s answer in hand',
 '- **Spot it:** a number stored most-significant digit first with the carry starting at the tail; "process a list from its end"; pre-, in- or post-order anything. 10⁵ nodes deep → a loop, 12-02',
 '- **Why:** the call stack keeps each frame\'s locals until the deeper call returns, so where a line sits decides the order it runs in, with no extra structure',
], [
 '- **Watch out:** a local change does not survive the way up. A deeper call that must tell its caller something (a carry, a count) returns it',
 '- **Also solves:** {LC 2816} (carry from the tail) · tree traversals: post-order is where a node sees its children\'s answers (14-01)',
], '13-02', '13-02'),

('13-04', '13-04-walk-the-grid.md', '## Walk the Grid ' + LV2, [
 '- **What:** from `(r, c)`, check the cell is usable, mark it, try each move, unmark it. Problems differ only in the moves, in what "usable" means, and in counting, collecting or optimising',
 '- **Spot it:** every path through open cells, no cell reused; a word traced through adjacent cells; the longest route. The *shortest* path → BFS, 18-02',
 '- **Why:** a path is a sequence of moves, so the search is a tree of moves. The mark forbids revisits on *this* path only; unmarking frees the cell for other paths',
], [
 '- **Watch out:** forgetting to unmark. Every cell an earlier branch touched stays blocked, and "all paths" silently returns only some',
 '- **Also solves:** {LC 79} (mark by writing `\'#\'`, restore after) · {LC 1219} · {LC 62} (right and down only: no mark needed; memoise, 17-01)',
], '13-04', '13-04'),

('13-05', '13-05-pick-or-skip.md', '## Pick or Skip ' + LV1, [
 '- **What:** for "all subsets", walk the items by index and make one decision per item: take it or leave it. n levels, 2ⁿ leaves, each a different subset',
 '- **Spot it:** "all subsets", "all subsequences", "power set", n ≤ 20. Equal values and no repeated output → 13-06; order matters → 13-08',
 '- **Why:** a subset is one yes/no per item, and the tree lists every sequence of answers once',
], [
 '- **Watch out:** `out.push(cur)` stores one shared array 2ⁿ times, and all end up empty. Push a copy',
 '- **Also solves:** {LC 784} · {LC 1239} (keep exploring *skip* even when pick is allowed) · {LC 494} (a count: memoise `(i, remaining)`, 17-01)',
], '13-05', '13-05'),

('13-06', '13-06-loop-and-skip-equal-siblings.md', '## Loop and Skip Equal Siblings ' + LV2, [
 '- **What:** duplicates in, none out. Sort, loop over the candidates for the next slot from `start`, and skip a candidate equal to the one before it *at the same level*',
 '- **Spot it:** the input has equal values; "the solution set must not contain duplicate combinations"; each number used once. Reuse allowed → 13-07',
 '- **Why:** equal siblings start identical subtrees, so only the first runs. A *child* may repeat its parent\'s value: that is how `[1, 1, 6]` is built. `i > start` tells the two apart',
], [
 '- **Watch out:** `i > 0` instead of `i > start` also skips legitimate children: `[1, 1, 2, 5, 6, 7, 10]` with target 8 loses `[1, 1, 6]`',
 '- **Also solves:** {LC 90} (record every node, not only leaves) · {LC 216}',
], '13-06', '13-06'),

('13-07', '13-07-stay-to-reuse-restart-to-revisit.md', '## Stay to Reuse, Restart to Revisit ' + LV2, [
 '- **What:** the next call\'s start index sets the rules. `go(i + 1)`: each item once. `go(i)`: reuse, order ignored. `go(0)`: earlier items may follow later ones, so orders count',
 '- **Spot it:** "may be chosen an unlimited number of times" (stay), "different sequences count as different" (restart), coin combinations vs sequences. Order matters, each item once → 13-08',
 '- **Why:** combinations are counted once by forcing non-decreasing index order; the start index enforces it, and restarting at 0 lifts it',
], [
 '- **Watch out:** 518 and 377 take the same input. Coins `[1, 2]`, amount 3: 2 combinations, 3 sequences',
 '- **Also solves:** {LC 518} (stay, memoise `(i, amount)`) · {LC 377} (restart, memoise the target) · {LC 1575}',
], '13-07', '13-07'),

('13-08', '13-08-fill-the-slots.md', '## Fill the Slots ' + LV2, [
 '- **What:** fill positions one at a time: slot k tries every unused item, recurses into k + 1, then gives the item back. With duplicates, skip an item equal to its left twin *unless that twin is in use*',
 '- **Spot it:** "all (unique) permutations", "all arrangements", slot k draws from its own pool (keypad letters), every valid bracket string. Order does not matter → 13-05',
 '- **Why:** "use equal values left to right" lets exactly one ordering of identical items through',
], [
 '- **Watch out:** the swap method plus "skip if equal to the previous" emits 32 permutations of `"abbcc"`; only 30 are distinct. Swaps unsort the suffix',
 '- **Also solves:** {LC 46} · {LC 17} (a pool per slot, no `used[]`) · {LC 22} (`(` while `open < n`, `)` while `close < open`)',
], '13-08', '13-08'),

('13-09', '13-09-try-every-cut.md', '## Try Every Cut ' + LV2, [
 '- **What:** decide the *first* piece: try every end `j` for a piece starting at `start`, keep it if valid, recurse from `j + 1`. A variant cuts an expression at every operator',
 '- **Spot it:** "palindrome partitioning", "restore IP addresses", "add parentheses every way". A count or the fewest cuts → 17-05',
 '- **Why:** fixing the first piece leaves the same problem on a shorter suffix; a bad prefix kills its subtree',
], [
 '- **Watch out:** re-checking palindromes from scratch at every `(start, end)`. Precompute `pal[i][j]` once in O(n²)',
 '- **Also solves:** {LC 93} (4 pieces, ≤ 255, no leading zero) · {LC 140} · {LC 241}',
], '13-09', '13-09'),

('13-10', '13-10-place-check-undo.md', '## Place, Check, Undo ' + LV2, [
 '- **What:** per decision point, try each option: **check** in O(1), **place**, recurse, **undo**',
 '- **Spot it:** no two queens share a line; Sudoku; k groups of equal sum. Only a running total → 13-06',
 '- **Why:** a conflict found early kills a whole subtree, and sets of used columns and diagonals make each check O(1)',
], [
 '- **Watch out:** undo all four sets you updated. One forgotten `delete` leaves a phantom queen',
 '- **Also solves:** {LC 37} (fewest options first) · {LC 698} (sort descending)',
], '13-10', '13-10'),

('13-11', '13-11-recursion-drills.md', '## Drills: Recursion & Backtracking ' + LV1, [
 'The most-asked problems for this chapter. Cover the right column and name the page first.',
 '',
 '| Problem | Page · the deciding fact |',
 '|---|---|',
 '| {LC 50} | 13-01 · halve n, square the result |',
 '| {LC 78} | 13-05 · take or leave each item |',
 '| {LC 90} | 13-06 · sort, skip equal siblings |',
 '| {LC 39} | 13-07 · reuse: `go(i)` |',
 '| {LC 40} | 13-06 · each once, no duplicate combinations |',
 '| {LC 46} | 13-08 · fill each slot from the unused |',
 '| {LC 17} | 13-08 · each slot has its own pool |',
 '| {LC 22} | 13-08 · never build an invalid prefix |',
 '| {LC 131} | 13-09 · the first piece must be a palindrome |',
 '| {LC 79} | 13-04 · mark, four moves, unmark |',
 '| {LC 51} | 13-10 · column and diagonal sets |',
], [], None, None),
]
