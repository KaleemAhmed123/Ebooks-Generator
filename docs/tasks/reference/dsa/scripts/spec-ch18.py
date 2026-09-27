LV1 = '<span class="lv lv1"></span>'
LV2 = '<span class="lv lv2"></span>'
DELETE = ['18-01', '18-02', '18-06', '18-20']
PAGES = [
('18-01', '18-01-patterns-nobody-named.md', '# Chapter 18 - Patterns Nobody Named\n\n## Four Questions for an Unfamiliar Problem ' + LV2, [
 '- **What it is:** four structures sit under most named techniques. They have no LeetCode tag, so nobody drills them, yet each is a question you can ask of a problem you have never seen',
 '- **Signal:** you have read the statement twice, no chapter title fits, and the brute force is clear but too slow',
 '- **Mechanism:** a named technique is one *answer* to a structural question. Ask the question and the answer follows: BFS, Dijkstra and Swim in Rising Water are one frontier; a monotonic stack and Car Fleet are one domination argument',
], [
 '### The four questions',
 '',
 '| Question | Answer | Page |',
 '|---|---|---|',
 '| can I grow the answer from the best candidate so far? | a frontier: BFS, a heap | **18-02** |',
 '| can I prove some candidates will never win? | throw them out: stack, deque, Pareto front | **18-06** |',
 '| does a yes/no test flip once over the answers? | binary search the boundary | **09-02** |',
 '| can one pass of preprocessing answer every query? | prefixes, tables | **03-02** |',
 '',
 'Hard problems stack two answers: "shortest path skipping up to K edges" is a frontier over the state `(node, skipsUsed)`; "minimise the largest segment sum" is a boundary checked by a greedy scan.',
 '',
 '### The trap',
 '',
 '- **Matching on words, not structure.** "Maximum" does not mean heap and "subarray" does not mean window. Car Fleet mentions neither a stack nor a front, yet it is question 2 from the first line',
], None, None),

('18-02', '18-02-maintain-the-frontier.md', '## Maintain the Frontier ' + LV2, [
 '- **What:** keep the discovered-but-unsettled candidates, the **frontier**; settle the best, add its neighbours. BFS, Dijkstra and best-first are one loop',
 '- **Spot it:** "minimum cost / effort to reach", "the path whose worst step is smallest". Negative costs → Module 05',
 '- **Why:** keys only grow along a path, so the smallest key in the frontier cannot improve: popping settles it',
], [
 '- **Watch out:** settle on *pop*, not push. With summed costs, A→T 5, A→B 1, B→T 1 pushes T at 5 before B reaches it at 2',
], '18-02', '18-02'),

('18-06', '18-06-dominated-candidate-elimination.md', '## Throw Out the Dominated ' + LV2, [
 '- **What:** a candidate is **dominated** when another is at least as good in every way that can ever matter. It can never win, so delete it the moment you can prove it; read the answer off the survivors',
 '- **Spot it:** "catches up, then moves at the slower speed", "blocks the view behind it", "another item is larger in both scores", "fits inside". A score split as `f(i) + g(j)` → 03-05',
 '- **Why:** deletion is permanent, so each candidate is inserted once and removed at most once: O(n) after sorting. Monotonic stacks and deques are this move with different proofs',
], [
 '- **Watch out:** equal arrival joins the fleet. Target 10, positions `[0, 5]`, speeds `[2, 1]`: both arrive at hour 5, so 1 fleet. Testing `time > slowest` gets it right; `>=` reports 2',
 '- **Also solves:** {LC 1996} (attack descending, defense ascending on ties) · {LC 354} (width up, height down on ties, then LIS) · {LC 962}',
], '18-06', '18-06'),

('18-20', '18-20-recognition-drills-unnamed.md', '## Drills: Patterns Nobody Named ' + LV2, [
 'Answer one of the four questions (frontier, dominated, boundary, precompute) before naming a technique.',
 '',
 '| Problem | Question · page · the deciding fact |',
 '|---|---|',
 '| {LC 743} | frontier · 18-02 · summed times: Dijkstra |',
 '| {LC 1631} | frontier · 18-02 · the key is the largest step |',
 '| {LC 1514} | frontier · 18-02 · products shrink: take the largest first |',
 '| {LC 1293} | frontier · 18-02 · state `(r, c, eliminations left)` |',
 '| {LC 407} | frontier · 18-02 · flood from the border, lowest wall first |',
 '| {LC 853} | dominated · 18-06 · a slower car ahead absorbs the rest |',
 '| {LC 1996} | dominated · 18-06 · sort one score, run the max of the other |',
 '| {LC 354} | dominated · 18-06 · keep the smallest tail per length |',
 '| {LC 962} | dominated · 18-06 · a decreasing stack of candidate starts |',
 '| {LC 410} | boundary · 09-02 · guess the largest sum, check greedily |',
 '| {LC 1552} | boundary · 09-02 · guess the gap: the last true |',
], [], None, None),
]
