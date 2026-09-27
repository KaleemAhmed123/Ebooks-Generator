LV1 = '<span class="lv lv1"></span>'
LV2 = '<span class="lv lv2"></span>'
SPLIT = {'12-01': '### The skeleton', '12-02': '```ts'}
DELETE = ['12-01', '12-02', '12-03', '12-04', '12-05', '12-06', '12-07']
PAGES = [
('12-01', '12-01-linked-list-pointers.md', '# Chapter 12 - Linked Lists\n\n## Linked List Pointers ' + LV1, [
 '- **What it is:** pointer surgery. Six moves cover almost every problem; the base move is the **dummy head**, a throwaway node before the real head, so the first node is never a special case',
 '- **Signal:** "merge", "partition around x", "remove the nodes with value v", "reverse", "cycle", "n-th from the end", "deep copy"',
 '- **Mechanism:** most edits are "rewire the predecessor\'s `next`". A dummy gives the head a predecessor too, so one loop handles every position and the answer is `dummy.next`',
 '### The moves',
 '',
 '| Move | Trigger in the statement | Pointer to protect |',
 '|---|---|---|',
 '| **12-02** | reverse, nodes m to n, groups of k | `next`, saved before the flip |',
 '| **12-03** | the front meets the back, palindrome | the cut, `slow.next = null` |',
 '| **12-04** | where the cycle begins | the meeting node |',
 '| **12-05** | n-th from the end, where lists join | the node *before* the target |',
 '| **12-06** | deep copy with a random pointer | `x.next`, until the unweave |',
 '',
 '### The skeleton: a dummy head',
], [
 '- **Also solves:** {LC 86} (two dummies, joined) · {LC 2} (carry; one more node if a carry is left) · {LC 203}',
 '',
 '### The trap',
 '',
 '- **An unterminated list.** After a partition the last node may still point into the other list: a cycle. Set the final tail\'s `next` to `null`',
], None, '12-01'),

('12-02', '12-02-reverse-in-place.md', '## Reverse in Place ' + LV1, [
 '- **What:** three pointers, `prev`, `cur`, `next`. Save `cur.next`, point `cur` back, step both forward. The same lines reverse a list, a sublist, or every group of k',
 '- **Spot it:** "reverse the list", "reverse nodes m to n", "in groups of k", "swap every two nodes". The front paired with the back → 12-03',
 '- **Why:** a node knows only its successor, so saving `next` first is what keeps the rest reachable. For a segment, hold the node *before* it; its first node becomes its tail',
], [
 '- **Watch out:** after a group, its old first node is the new tail. Forget to link it to the next group, or to move `groupPrev` to it, and nodes vanish or cycle',
 '- **Also solves:** {LC 206} · {LC 92} (walk to the node before `left`, flip `right − left + 1`) · {LC 24} (k = 2)',
], '12-02', '12-02'),

('12-03', '12-03-split-reverse-weave.md', '## Split, Reverse, Weave ' + LV2, [
 '- **What:** find the middle (slow/fast), reverse the back half (12-02), walk both halves together',
 '- **Spot it:** "reorder L0 → Ln → L1 …", "palindrome list". One node from the end → 12-05',
 '- **Why:** a list only walks forward; reversing the back half makes "i-th from the end" a forward walk',
], [
 '- **Watch out:** skip `slow.next = null` and the first half runs into the reversed one: a cycle',
 '- **Also solves:** {LC 234} · {LC 2130}',
], '12-03', '12-03'),

('12-04', '12-04-meet-inside-the-loop.md', '## Meet Inside the Loop ' + LV2, [
 '- **What:** Floyd\'s cycle method, phase 2. After slow (1 step) and fast (2 steps) meet, restart one pointer at the head and step both by 1: they meet at the cycle\'s entrance',
 '- **Spot it:** "where the cycle begins", "find the duplicate in 1..n without modifying the array, O(1) space", "happy number". The array may be modified → 04-02',
 '- **Why:** with a tail of `a` and a meeting `b` into a cycle of `c`, `2(a + b) = a + b + k·c`, so `a = k·c − b`: `a` steps from the meeting point land on the entrance, as do `a` from the head',
], [
 '- **Watch out:** restart *one* pointer. Restart both at the head and they are equal before the first step: phase 2 returns the head, whatever the entrance',
 '- **Also solves:** {LC 287} (`i → nums[i]` is a list; start at index 0) · {LC 202} (slow/fast on the digit-square sequence)',
], '12-04', '12-04'),

('12-05', '12-05-keep-a-fixed-gap.md', '## Keep a Fixed Gap ' + LV1, [
 '- **What:** two pointers at the *same* speed, a fixed distance apart. When the leader falls off, the follower is that distance from the end',
 '- **Spot it:** "remove the n-th node from the end", "where two lists intersect", one pass. The *middle* (a distance that grows) → 12-03',
 '- **Why:** the gap never changes. For lists `x + c` and `y + c` sharing a tail, a pointer that switches to the other head at its end meets the other after `x + y + c` steps',
], [
 '- **Watch out:** a gap of n lands *on* the node to delete, and it cannot unlink itself. Start both at a dummy with gap `n + 1`',
 '- **Also solves:** {LC 160} (`a = a ? a.next : headB` until `a === b`) · {LC 61} (cut `k % len` from the end) · {LC 1721}',
], '12-05', '12-05'),

('12-06', '12-06-weave-the-copies.md', '## Weave the Copies ' + LV2, [
 '- **What:** a deep copy needs "old node → its copy". A map gives it in O(n) space; weaving each copy right after its original gives it in O(1): the copy of `x` is `x.next`',
 '- **Spot it:** a deep copy of a list whose nodes carry a second pointer to any node or null. Nodes with neighbour lists (a graph) → the map version, 16-01',
 '- **Why:** a pointer to an uncopied node cannot be set in one pass. Three passes remove the dependency: copy all, set each `random` to `x.random.next`, unweave',
], [
 '- **Watch out:** restore the original. Skip `x.next = copy.next` and the caller\'s list stays woven with copies',
 '- **Map version:** `Map<old, new>` in pass 1, then `copy.next = map.get(x.next)`, `copy.random = map.get(x.random)`: simpler under pressure',
], '12-06', '12-06'),

('12-07', '12-07-linked-list-drills.md', '## Drills: Linked Lists ' + LV1, [
 'The most-asked problems for this chapter. Cover the right column and name the page first.',
 '',
 '| Problem | Page · the deciding fact |',
 '|---|---|',
 '| {LC 21} | 12-01 · append the smaller head behind a dummy |',
 '| {LC 2} | 12-01 · build behind a dummy, carry to the end |',
 '| {LC 206} | 12-02 · save `next`, flip, step |',
 '| {LC 25} | 12-02 · check k nodes, flip, stitch both ends |',
 '| {LC 143} | 12-03 · split, reverse the back, weave |',
 '| {LC 234} | 12-03 · split, reverse, compare |',
 '| {LC 142} | 12-04 · meet, restart one pointer at the head |',
 '| {LC 287} | 12-04 · values point to indices: a cycle |',
 '| {LC 19} | 12-05 · gap `n + 1` from a dummy |',
 '| {LC 160} | 12-05 · switch heads at the end |',
 '| {LC 138} | 12-06 · weave, set `random`, unweave |',
], [], None, None),
]
