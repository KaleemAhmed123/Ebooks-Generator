LV1 = '<span class="lv lv1"></span>'
LV2 = '<span class="lv lv2"></span>'
GFG_ROPES = '[Min Cost to Connect Ropes](https://www.geeksforgeeks.org/problems/minimum-cost-of-ropes-1587115620/1) (GFG)'
GFG_HUFF = '[Huffman Encoding](https://www.geeksforgeeks.org/problems/huffman-encoding3345/1) (GFG)'
DELETE = ['15-01', '15-03', '15-04', '15-05', '15-06', '15-10', '15-11']
PAGES = [
('15-01', '15-01-heaps-and-top-k.md', '# Chapter 15 - Heaps & Ordered Sets\n\n## Heap & Top-K ' + LV1, [
 '- **What it is:** the best element (largest, smallest, cheapest) is needed again and again while the set changes: items arrive, leave or are combined',
 '- **Signal:** "k largest", "k-th smallest so far", "merge k sorted", "median after each insertion", "combine the two cheapest", "take the largest and put something back". The next larger per element → 10-05; a window\'s max → 10-10',
 '- **Mechanism:** a rescan costs O(n) per query. A heap keeps one end of the set ready: O(1) to read, O(log n) to change. JS has no heap: paste the class on 15-11',
], [
 '### The moves',
 '',
 '| Move | What sits on top | Typical ask |',
 '|---|---|---|',
 '| **15-03** | the smallest head of k sources | merge k sorted lists |',
 '| **15-04** | the two middle elements | median of a stream |',
 '| **15-05** | the two items to combine next | min cost to connect ropes |',
 '| **15-06** | the worst choice accepted so far | fewest refuelling stops |',
 '',
 '### The skeleton: k largest',
 '',
 '```ts',
 'const h = new Heap<number>((x, y) => x < y);    // a MIN-heap for the k largest',
 'for (const x of nums) {',
 '  h.push(x);',
 '  if (h.size() > k) h.pop();                     // drop the smallest survivor',
 '}',
 'return h.peek();                                 // the k-th largest',
 '```',
 '',
 '### The trap',
 '',
 '- **Stale entries.** A heap cannot update an element in place. Push the improved entry and, on every pop, skip one that no longer matches the current state',
 '- **k most frequent:** a count never exceeds n, so buckets indexed by count give O(n), no heap',
], None, None),

('15-03', '15-03-heap-for-merge.md', '## Merge from Every Head ' + LV1, [
 '- **What:** k sorted sources, one merged order. Put each source\'s *head* in a min-heap; pop the smallest, output it, push the next element from its source',
 '- **Spot it:** "merge k sorted lists", "k-th smallest across k sorted lists", "smallest range covering one from each list", "k pairs with smallest sums". One sorted matrix, little memory → 09-04',
 '- **Why:** the next output is the smallest head, because everything behind a head is at least as large. One candidate per source: O(N log k)',
], [
 '- **Watch out:** pushing every element up front is just sorting: O(N log N) time, O(N) memory. Hold one head per source',
 '- **Also solves:** {LC 373} (row i is a source of pairs) · {LC 632} (keep the max beside the heap; the range is `[top, max]`)',
], '15-03', '15-03'),

('15-04', '15-04-balance-two-heaps.md', '## Balance Two Heaps ' + LV2, [
 '- **What:** the smaller half in a **max-heap**, the larger half in a **min-heap**, sizes equal or the max-heap one larger. The two tops are the middle of the data',
 '- **Spot it:** "median of a data stream", "running median", "median of every window". A window\'s max or min only → 10-10',
 '- **Why:** the median depends only on the boundary between the halves, not on the order inside them, and each heap exposes one side of that boundary',
], [
 '- **Watch out:** rebalance after every insert. Routing alone keeps the halves ordered but unequal: after 1, 2, 3 the tops give 1.5, not 2',
 '- **Also solves:** {LC 480} (lazy deletion: mark outgoing values, discard at the top) · {LC 502} (two heaps with different keys)',
], '15-04', '15-04'),

('15-05', '15-05-merge-the-two-smallest.md', '## Merge the Two Smallest ' + LV2, [
 '- **What:** when items combine two at a time and each combination costs their sum, always combine the two *cheapest*, then push the result back',
 '- **Spot it:** "combine two at a time, each costs the sum, minimise the total", "Huffman codes". A fixed rule to simulate ("smash the two heaviest") uses a heap too. Only *adjacent* piles merge → 17-05',
 '- **Why:** a merged result is paid again in every later merge, so each item costs its size times its depth in the merge tree. The smallest belong deepest',
], [
 '- **Watch out:** merging in sorted order once. `[2, 2, 3, 3]` left to right costs 21; the heap merges 2 + 2, 3 + 3, 4 + 6: 20',
 '- **Also solves:** ' + GFG_HUFF + ' (build the tree; ties by insertion order) · {LC 1046} (a max-heap) · {LC 2208}',
], '15-05', '15-05'),

('15-06', '15-06-take-now-regret-later.md', '## Take Now, Regret Later ' + LV2, [
 '- **What:** a greedy that may change its mind. Accept every option you pass and push it on a heap; when a constraint breaks, undo the *worst* accepted choice, the heap\'s top',
 '- **Spot it:** "fewest refuelling stops", "most courses before their deadlines", "furthest building with bricks and ladders". Jobs with fixed start and end times → 17-03',
 '- **Why:** the right choice is known only later, but it can be made *retroactively*: when you run dry, you wanted the best station already passed, and the heap holds exactly those',
], [
 '- **Watch out:** committing early. "Refuel at the first station" or "whenever fuel is low" cannot know a bigger station is coming; only the heap at the moment you are stuck does',
 '- **Also solves:** {LC 630} (drop the longest course taken) · {LC 1642} (a ladder per climb; pay the smallest with bricks) · {LC 1383}',
], '15-06', '15-06'),

('15-10', '15-10-heap-drills.md', '## Drills: Heaps ' + LV1, [
 'The most-asked problems for this chapter. Cover the right column and name the page first.',
 '',
 '| Problem | Page · the deciding fact |',
 '|---|---|',
 '| {LC 215} | 15-01 · a size-k min-heap |',
 '| {LC 347} | 15-01 · buckets by count, or a size-k heap |',
 '| {LC 703} | 15-01 · the size-k min-heap, kept between calls |',
 '| {LC 23} | 15-03 · one head per list |',
 '| {LC 373} | 15-03 · each row is a sorted source |',
 '| {LC 295} | 15-04 · two heaps, rebalanced |',
 '| {LC 480} | 15-04 · two heaps with lazy deletion |',
 '| ' + GFG_ROPES + ' | 15-05 · merge the two cheapest |',
 '| {LC 1046} | 15-05 · simulate with a max-heap |',
 '| {LC 871} | 15-06 · refuel from the best station passed |',
 '| {LC 630} | 15-06 · drop the longest course taken |',
], [], None, None),

('15-11', '15-11-appendix-a-heap-to-paste.md', '## Appendix: A Heap to Paste ' + LV1, [
 '- **What:** JS and TS ship no priority queue. Every heap page uses this class. `before(a, b)` is true when `a` should leave first: `(x, y) => x < y` is a min-heap, `(x, y) => x > y` a max-heap',
 '- **Why:** an array-backed complete binary tree with sift-up and sift-down. `push` and `pop` are O(log n); `peek` and `size` are O(1)',
], [
 '- **Ties are not stable.** Equal keys leave in no fixed order. When a tie rule is given (Huffman on GFG uses insertion order), add a sequence number to the key',
], None, '15-11'),
]
