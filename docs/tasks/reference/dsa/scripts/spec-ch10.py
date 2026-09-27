LV1 = '<span class="lv lv1"></span>'
LV2 = '<span class="lv lv2"></span>'
DELETE = ['10-01', '10-02', '10-03', '10-04', '10-05', '10-07', '10-08', '10-09', '10-10', '10-11', '10-12']
PAGES = [
('10-01', '10-01-stack-and-monotonic-stack.md', '# Chapter 10 - Stacks & Queues\n\n## Stack & Monotonic Stack ' + LV1, [
 '- **What it is:** a stack holds *unfinished business*: nesting (opened must close), cancelling (a newcomer destroys old items) or waiting (items wait for the one that settles them)',
 '- **Signal:** brackets, "remove adjacent", "collide", "next greater", "implement X using Y"',
 '- **Mechanism:** each item is pushed and popped at most once, so `for` + inner `while (pop)` is O(n). Ask: *what does the top mean, and what makes it leave?*',
], [
 '### The moves',
 '',
 '| Move | When to use | What it exploits |',
 '|---|---|---|',
 '| **10-02** | nested brackets with data | the top is the context |',
 '| **10-04** | one bracket kind | a counter is the height |',
 '| **10-03** | newcomer destroys old items | only the top touches it |',
 '| **10-05** | next greater or smaller | the beaten get answers |',
 '| **10-07** | smallest after k deletions | pop while budget lasts |',
 '| **10-08** | sum of every subarray min | each rules `L · R` |', 
 '| **10-09** | largest rectangle of 1s | each row is a histogram |',
 '| **10-10** | max of each window of k | front expires, back is beaten |',
 '| **10-11** | build from simpler parts | add the missing invariant |',
 '',
 '### The skeleton',
 '',
 '```ts',
 'for (let i = 0; i < a.length; i++) {      // st: indices still waiting',
 '  while (st.length && beats(a[i], a[st.at(-1)!])) settle(st.pop()!, i);',
 '  st.push(i);                              // settle: i answers the popped',
 '}',
 '```',
 '',
 '### The trap',
 '',
 '- **`shift()` as a queue.** `Array.prototype.shift()` is O(n) per call; keep a head index instead',
], None, None),

('10-02', '10-02-push-the-context.md', '## Push the Context ' + LV2, [
 '- **What:** each opener starts a smaller problem inside the current one. Push what you were in the middle of (partial result, pending number, sign); on the close, pop and combine',
 '- **Spot it:** `k[encoded]`, parentheses in an expression, "simplify the path", "evaluate", "score of parentheses". Brackets that carry only balance → 10-04',
 '- **Why:** nesting is last-opened, first-closed: stack order. The top is always the context the current bracket returns to',
], [
 '- **Watch out:** read numbers whole. `"10[a]"` read digit by digit pushes a repeat count of 0; accumulate `num = num · 10 + digit`',
 '- **Also solves:** {LC 224} · {LC 227} (push terms; `*` and `/` fold into the top) · {LC 150} · {LC 71}',
], '10-02', '10-02'),

('10-03', '10-03-cancel-against-the-top.md', '## Cancel Against the Top ' + LV1, [
 '- **What:** a new item may destroy the one before it, and destruction cascades. Keep survivors on a stack; the newcomer fights the top in a `while` loop until it dies, wins, or has nothing to fight',
 '- **Spot it:** items that destroy each other on contact, "remove adjacent duplicates", "backspace", "repeat until no more removals". A beaten item gets an *answer* instead → 10-05',
 '- **Why:** only the latest survivor can touch the newcomer. Each item enters and leaves once: O(n)',
], [
 '- **Watch out:** the fight is a `while`, not an `if`. `[10, 2, −5]` must end as `[10]`; one pop leaves `[10, −5]`, still colliding.',
 '- **Also solves:** {LC 1047} · {LC 1209} (push `(char, run length)`)',
], '10-03', '10-03'),

('10-04', '10-04-count-the-balance.md', '## Count the Balance ' + LV1, [
 '- **What:** with one bracket type the stack only holds `(`, so its height is all it knows. Use a counter: `+1` on open, `−1` on close; a close that would go below zero is unmatched',
 '- **Spot it:** "fewest additions to make it valid", "longest valid parentheses". Several kinds, or brackets that carry data → 10-02',
 '- **Why:** the running balance is "opened − closed". Its dips below zero are the unmatched closes; what is left at the end are the unmatched opens',
], [
 '- **Watch out:** a counter for several kinds. `"([)]"` keeps every counter valid and ends at zero, yet it is invalid: only a stack records which kind opened last',
 '- **Also solves:** {LC 1963} (`⌈unmatched / 2⌉`) · {LC 32} (a forward and a backward counter pass) · {LC 1249} · {LC 678} (track the lowest and highest possible balance)',
], '10-04', '10-04'),

('10-05', '10-05-monotonic-stack.md', '## Monotonic Stack ' + LV1, [
 '- **What:** the next greater (or smaller) element for every index in one pass. The stack holds indices still waiting; an arrival that beats the top settles it',
 '- **Spot it:** for each element, the first later or earlier one that is larger or smaller; "days until a warmer day"; "span". Old elements must *expire* (a window) → 10-10',
 '- **Why:** a beaten element has its answer: the newcomer. The unbeaten wait in decreasing order, so a newcomer settles a run from the top and stops at the first it does not beat',
], [
 '```ts',
 '// Daily Temperatures (LeetCode 739)',
 'function dailyTemperatures(t: number[]): number[] {',
 '  const ans = new Array(t.length).fill(0), st: number[] = []; // indices waiting',
 '  for (let i = 0; i < t.length; i++) {',
 '    while (st.length && t[st[st.length - 1]] < t[i]) {',
 '      const j = st.pop()!;',
 '      ans[j] = i - j;                                  // i settles j',
 '    }',
 '    st.push(i);',
 '  }',
 '  return ans;',
 '}',
 '```',
 '',
 '- **Watch out:** match the comparison to the word. Popping on `>=` for "greater" lets equals settle each other: on `[2, 2]` the first 2 gets 2 instead of −1',
 '- **Also solves:** {LC 496} · {LC 901} (*previous* greater: read the top after popping) · {LC 503} (circular → 04-06)',
], '10-05', None),

('10-07', '10-07-pop-while-it-pays.md', '## Pop While It Pays ' + LV2, [
 '- **What:** a monotonic stack with a *budget*. To build the smallest sequence, pop the top while the newcomer is smaller *and* you can still afford to lose the top',
 '- **Spot it:** "remove k digits to make the smallest", "smallest subsequence with each letter once", "most competitive subsequence of length k". Pieces may be reordered → 07-09',
 '- **Why:** the first differing position decides the order. A larger digit before a smaller one is always worth deleting, and deleting early fixes the most significant position',
], [
 '- **Watch out:** the leftover budget and leading zeros. `"12345"`, k = 2 pops nothing: cut the tail, `"123"`. `"10200"`, k = 1 leaves `"0200"`: strip to `"200"`, and return `"0"` for empty',
 '- **Also solves:** {LC 316} (pop only if the top appears again later) · {LC 1673} (pop while enough items remain to reach k)',
], '10-07', '10-07'),

('10-08', '10-08-count-each-elements-reach.md', '## Count Each Element\'s Reach ' + LV2, [
 '- **What:** ask each element *how many subarrays is it the minimum of?* Reaching `L` left and `R` right before a smaller value, it adds `a[i] · L · R`',
 '- **Spot it:** "sum of the minimum (or maximum) of every subarray". *Counting* subarrays whose max is in `[L, R]` → 02-05',
 '- **Why:** a subarray with minimum `a[i]` starts after the previous smaller and ends before the next smaller',
], [
 '- **Watch out:** ties. On `[1, 1]` (answer 3), `≤` on both sides gives 2, `<` on both gives 4: make one side strict',
 '- **Also solves:** {LC 2104}',
], '10-08', '10-08'),

('10-09', '10-09-stack-the-rows.md', '## Stack the Rows ' + LV2, [
 '- **What:** "largest rectangle of 1s" is a histogram asked once per row: `h[c]` = the run of 1s ending at this row in column `c`, and the best rectangle on this row is the largest rectangle under `h`',
 '- **Spot it:** the largest all-1s rectangle in a binary matrix; the largest rectangle under bars. A *square* → a grid DP, `1 + min(up, left, diagonal)`, 17-02',
 '- **Why:** every rectangle has a bottom row and is as tall as its shortest bar. The stack gives each bar its reach to the first shorter bar on each side: O(cols) per row',
], [
 '- **Watch out:** the sentinel. Without the final height 0, bars never popped stay on the stack: `[1, 2, 3]` reports 0 instead of 4',
 '- **Also solves:** {LC 84} (the helper alone)',
], '10-09', '10-09'),

('10-10', '10-10-monotonic-queue-deque.md', '## Monotonic Queue (Deque) ' + LV2, [
 '- **What:** a deque of indices whose values fall from front to back. The back drops every index the newcomer beats; the front drops the index that has left the window. The front is the window max',
 '- **Spot it:** the max or min of every window of k; a DP step that needs "best of the last k"; `max − min` under a limit. Each window\'s median → two heaps, 15-04',
 '- **Why:** an index behind a larger, newer one is never a window max again, so it goes for good. Each index enters and leaves once: O(n)',
], [
 '```ts',
 '// Sliding Window Maximum (LeetCode 239)',
 'function maxSlidingWindow(a: number[], k: number): number[] {',
 '  const dq: number[] = [], out: number[] = [];',
 '  let head = 0;                                   // dq[head..] is the deque',
 '  for (let i = 0; i < a.length; i++) {',
 '    while (dq.length > head && a[dq[dq.length - 1]] <= a[i]) dq.pop(); // beaten',
 '    dq.push(i);',
 '    if (dq[head] <= i - k) head++;                // expired',
 '    if (i >= k - 1) out.push(a[dq[head]]);',
 '  }',
 '  return out;',
 '}',
 '```',
 '',
 '- **Watch out:** store indices, not values. The front must expire when it leaves the window, and a value cannot say where it came from',
 '- **Also solves:** {LC 1438} (one deque for the max, one for the min) · {LC 1696} (the deque holds the best of the last k `dp`) · {LC 862} (increasing deque of prefix sums)',
], '10-10', None),

('10-11', '10-11-build-one-from-another.md', '## Build One from Another ' + LV1, [
 '- **What:** a structure with a new guarantee, built from simpler ones: a queue from two stacks, a stack that knows its minimum, an O(1) LRU cache. Pair each with the invariant it lacks',
 '- **Spot it:** "implement a queue using stacks", "min stack", "LRU cache", "insert, delete and getRandom in O(1)". The median of a stream → two heaps, 15-04',
 '- **Why:** two stacks reverse the order twice, so the oldest surfaces; a map finds, a list orders. O(n) paid once per element is amortised O(1)',
], [
 '- **Watch out:** pour `inbox` into `outbox` only when `outbox` is empty. Pouring back after every pop makes each pop O(n)',
 '- **Also solves:** {LC 155} (push `[value, min so far]`) · {LC 146} (map + linked list) · {LC 380}',
], '10-11', '10-11'),

('10-12', '10-12-stack-and-queue-drills.md', '## Drills: Stacks & Queues ' + LV1, [
 'The most-asked problems for this chapter. Cover the right column and name the page first.',
 '',
 '| Problem | Page · the deciding fact |',
 '|---|---|',
 '| {LC 150} | 10-02 · operands wait; an operator pops two |',
 '| {LC 71} | 10-02 · a name pushes, `..` pops |',
 '| {LC 735} | 10-03 · the newcomer fights while it can |',
 '| {LC 1249} | 10-04 · mark unmatched `)` forward, `(` backward |',
 '| {LC 739} | 10-05 · next warmer: indices wait on the stack |',
 '| {LC 402} | 10-07 · pop larger digits while k lasts |',
 '| {LC 907} | 10-08 · each minimum rules `L · R` subarrays |',
 '| {LC 84} | 10-09 · first shorter bar on each side |',
 '| {LC 239} | 10-10 · front expires, back is beaten |',
 '| {LC 155} | 10-11 · each entry stores the minimum below it |',
 '| {LC 146} | 10-11 · map to nodes of a recency list |',
], [], None, None),
]
