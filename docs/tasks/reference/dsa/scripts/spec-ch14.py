LV1 = '<span class="lv lv1"></span>'
LV2 = '<span class="lv lv2"></span>'
LV3 = '<span class="lv lv3"></span>'
GFG_TOP = '[Top View of Binary Tree](https://www.geeksforgeeks.org/problems/top-view-of-binary-tree/1) (GFG)'
GFG_BOTTOM = '[Bottom View of Binary Tree](https://www.geeksforgeeks.org/problems/bottom-view-of-binary-tree/1) (GFG)'
SPLIT = {'14-01': '### The skeleton'}
DELETE = ['14-01', '14-02', '14-03', '14-04', '14-05', '14-06', '14-07', '14-08', '14-09', '14-10', '14-11', '14-12']
PAGES = [
('14-01', '14-01-trees.md', '# Chapter 14 - Trees\n\n## Tree DFS & BFS ' + LV1, [
 '- **What it is:** one question decides almost every binary-tree problem: does the answer at a node need information from **above** (ancestors), **below** (subtrees), **beside** (its level) or **anywhere** (other nodes)? The answer picks the traversal and the signature',
 '- **Signal:** "root-to-leaf path", "valid range" (above); "height", "diameter", "balanced" (below); "right side view", "zig-zag", "width" (beside); "nodes at distance k", "burn the tree" (anywhere)',
 '- **Mechanism:** a call sees only what its caller passes in and what its children return. Anything else needs a structure built for it: a queue for a level, a parent map to walk up',
], [
 '### The moves',
 '',
 '| Move | Information flows | Typical ask |',
 '|---|---|---|',
 '| **14-02** | down, as parameters | good nodes, path sums, valid range |',
 '| **14-03** | up, as return values | diameter, balanced, max path sum |',
 '| **14-04** | across one level | side views, zig-zag, width |',
 '| **14-05** | across columns | vertical order, top and bottom view |',
 '| **14-06** | every direction | distance k, burn the tree |',
 '| **14-07** | from both sides to one node | lowest common ancestor |',
 '| **14-08** | in sorted order (a BST) | k-th smallest, BST iterator |',
 '| **14-09** | from two traversal orders | rebuild, serialise |',
 '| **14-10** | in order, no stack | O(1)-space walk |',
 '',
 '### The skeleton',
 '',
 '```ts',
 'function dfs(node: TreeNode | null, fromAbove: number): number {',
 '  if (!node) return 0;                          // what an empty subtree reports',
 '  const down = step(fromAbove, node.val);       // carry it down (14-02)',
 '  const l = dfs(node.left, down), r = dfs(node.right, down);',
 '  best = Math.max(best, bend(l, r, node));      // record the answer (14-03)',
 '  return extend(l, r, node);                    // what the parent can extend',
 '}',
 '```',
 '',
 '### The trap',
 '',
 '- **Globals for information that should flow.** A global "current depth" bumped on the way down and not restored on the way up gives answers that depend on visiting order. Pass what flows down, return what flows up; keep a global only for the one best answer',
], None, None),

('14-02', '14-02-carry-it-down.md', '## Carry It Down ' + LV1, [
 '- **What:** when a node\'s answer depends on its ancestors, summarise the path in a few parameters (the max so far, the running sum, the allowed range) and call the children with an updated copy',
 '- **Spot it:** "good nodes", "root-to-leaf path with sum", "valid BST range". A path that may bend at a node → 14-03',
 '- **Why:** a node\'s ancestors are exactly the calls above it. Parameters give each call its own copy of the path, so nothing needs undoing',
], [
 '- **Watch out:** a leaf has *no* children. Checking `remaining === 0` at a `null` child counts a path that stops half-way: root 1 with only a right child 2, target 1, must be false',
 '- **Also solves:** {LC 112} · {LC 129} (carry `num · 10 + val`) · {LC 1026} · {LC 437} (a prefix-sum map on the path, 03-03; undo on return)',
], '14-02', '14-02'),

('14-03', '14-03-return-one-record-another.md', '## Return One, Record Another ' + LV2, [
 '- **What:** the value a node *returns* is often not the answer. The diameter through a node needs both heights, but a parent can extend only one. Return the height; **record** `left + right` outside',
 '- **Spot it:** "diameter", "longest path between any two nodes", "height-balanced", "distribute coins", "max path sum". Every path starts at the root → 14-02',
 '- **Why:** every path bends at exactly one highest node, made of one downward path into each side. Recording "bend here" at every node, in post-order, sees each path once',
], [
 '- **Watch out:** return the extendable part, not the answer. Returning `1 + l + r` lets a parent extend a path that already bends, which is not a path',
 '- **Also solves:** {LC 110} (return −1 once unbalanced) · {LC 979} (return `coins − nodes`; record its absolute value) · {LC 124} (drop negative sides)',
], '14-03', '14-03'),

('14-04', '14-04-walk-level-by-level.md', '## Walk Level by Level ' + LV1, [
 '- **What:** BFS with a snapshot: read `size = queue.length`, then pop exactly `size` nodes. Anything asked per level (the rightmost, the average, the width) happens in that inner loop',
 '- **Spot it:** "right side view", "zig-zag level order", "maximum width", "average of each level", "is the tree complete". Seen from above or "vertical" → 14-05',
 '- **Why:** the queue holds the next level behind the current one, left to right. The snapshot is the boundary, so the inner loop sees exactly one level',
], [
 '- **Watch out:** "right view" is not "keep going right". For `[1, 2, 3, 4]` (4 under 2) the right-child walk gives `1, 3`; the view is `1, 3, 4`',
 '- **Also solves:** {LC 103} · {LC 662} (heap indices; subtract the level\'s first before doubling) · {LC 958} (after the first `null`, no real node)',
], '14-04', '14-04'),

('14-05', '14-05-give-every-node-a-coordinate.md', '## Give Every Node a Coordinate ' + LV2, [
 '- **What:** root at `(row 0, col 0)`; a left child is `(row + 1, col − 1)`, a right child `(row + 1, col + 1)`. Views and vertical orders become grouping and sorting by those numbers',
 '- **Spot it:** "vertical order traversal", "top view", "bottom view", "diagonal traversal". Seen from the left or right → 14-04',
 '- **Why:** a view from above projects each node onto its column; the row says who is in front. With `(col, row)` on every node, the shape no longer matters',
], [
 '- **Watch out:** DFS for the top view reaches a deep left node in column 1 before the shallow right child. Use BFS, or keep the smallest row',
 '- **Also solves:** ' + GFG_TOP + ' (first per column) · ' + GFG_BOTTOM + ' (overwrite per column)',
], '14-05', '14-05'),

('14-06', '14-06-turn-the-tree-into-a-graph.md', '## Turn the Tree into a Graph ' + LV2, [
 '- **What:** for a question that spreads from any node in *every* direction, record parents in one pass, then BFS over left, right and parent',
 '- **Spot it:** "all nodes at distance k from a target", "time to burn the tree from a node", "infection spreads". Only the distance between two nodes → 14-07',
 '- **Why:** with parent links a tree is an undirected graph, and BFS from the target visits nodes by distance: level k is "distance k"',
], [
 '- **Watch out:** no visited set. The walk goes up to the parent and straight back down, so levels repeat and "burn it all" never ends',
 '- **Also solves:** {LC 2385} · [Burning Tree](https://www.geeksforgeeks.org/problems/burning-tree/1) (GFG)',
], '14-06', '14-06'),

('14-07', '14-07-find-the-split-point.md', '## Find the Split Point ' + LV2, [
 '- **What:** the lowest common ancestor (LCA) is the deepest node with both targets below it. Each call reports "found p or q here?"; the first node to hear *yes* from both sides is the answer',
 '- **Spot it:** "lowest common ancestor", "distance between two nodes", "directions from one node to another". One node spreading to everything within k → 14-06',
 '- **Why:** a subtree with neither target returns `null`. Above the LCA, one side returns `null` and the found node passes up unchanged; at the LCA both sides answer for the first time',
], [
 '- **Watch out:** the template assumes both nodes exist. With only `p` present it returns `p`. If one may be missing, count the targets found',
 '- **Also solves:** {LC 235} (a BST: both smaller, go left; both larger, go right) · {LC 2096} (root paths as `L`/`R`; drop the common prefix) · {LC 1123}',
], '14-07', '14-07'),

('14-08', '14-08-read-the-bst-in-order.md', '## Read the BST in Order ' + LV1, [
 '- **What:** an in-order walk of a BST yields sorted values. Make it an *iterator* with an explicit stack (push the left spine, pop, push the right child\'s left spine) and pause whenever you like',
 '- **Spot it:** "k-th smallest in a BST", "BST iterator", "two-sum in a BST", "recover a BST with two nodes swapped". Not a BST, so in-order is not sorted → a heap, 15-01',
 '- **Why:** left subtree < root < right subtree, so left-root-right is ascending. The stack holds one left spine, O(height); each node is pushed and popped once',
], [
 '- **Watch out:** Recover BST with swapped *neighbours* has one drop, not two: `1, 3, 2, 4`. Take the first node of the first drop and the second node of the last',
 '- **Also solves:** {LC 173} · {LC 653} (one iterator up, one down, then collide, 02-08) · {LC 530} (neighbours in order)',
], '14-08', '14-08'),

('14-09', '14-09-rebuild-from-traversals.md', '## Rebuild from Traversals ' + LV2, [
 '- **What:** pre-order says *which* node is the root (first); in-order says *which nodes lie on each side*. Take the next pre-order value as the root, split the in-order range at it, recurse',
 '- **Spot it:** "construct a tree from preorder and inorder", "BST from preorder", "serialize and deserialize", "balanced BST from a sorted array"',
 '- **Why:** the root\'s offset inside its in-order range is the size of its left subtree, which tells the recursion where to split',
], [
 '- **Watch out:** `indexOf` inside the recursion is O(n) per node, O(n²) in total. Build the value → index map once',
 '- **Also solves:** {LC 106} (read post-order from the back; build right first) · {LC 1008} (carry an upper bound) · {LC 297} (pre-order with null markers)',
], '14-09', '14-09'),

('14-10', '14-10-thread-back-to-the-parent.md', '## Thread Back to the Parent ' + LV3, [
 '- **What:** Morris traversal: in-order in O(1) extra space. Before going left from `cur`, point the null right pointer of `cur`\'s in-order predecessor back at `cur`. The thread replaces the stack',
 '- **Spot it:** "O(1) extra space" or "without a stack" on a tree walk. The recursion stack does not count → 14-08',
 '- **Why:** the predecessor\'s right pointer is always null, so the slot is free. Returning to `cur` through the thread proves its left side is done: cut it, go right',
], [
 '- **Watch out:** returning mid-walk leaves threads in place, and the tree has cycles. Finish the walk, or cut the threads first',
 '- **Also solves:** {LC 144} (emit when the thread is *laid*) · {LC 99} (the drop rule of 14-08 inside this walk) · {LC 114}',
], '14-10', '14-10'),

('14-11', '14-11-tree-drills.md', '## Drills: Trees ' + LV1, [
 'The most-asked problems for this chapter. Cover the right column and name the page first.',
 '',
 '| Problem | Page · the deciding fact |',
 '|---|---|',
 '| {LC 98} | 14-02 · carry the allowed range down |',
 '| {LC 543} | 14-03 · return the height, record `left + right` |',
 '| {LC 124} | 14-03 · the same split, dropping negative sides |',
 '| {LC 102} | 14-04 · snapshot the queue size per level |',
 '| {LC 199} | 14-04 · the last node of each level |',
 '| {LC 863} | 14-06 · parent map, then BFS k levels |',
 '| {LC 236} | 14-07 · both sides answer: this is the split |',
 '| {LC 230} | 14-08 · in-order stack, stop after k pops |',
 '| {LC 105} | 14-09 · pre-order root, in-order split |',
 '| {LC 297} | 14-09 · pre-order with null markers |',
 '| {LC 99} | 14-08 · the first and last in-order drops |',
], [], None, None),
]
