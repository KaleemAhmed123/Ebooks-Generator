## Reverse in Place <span class="lv lv2"></span>

- **What it is:** Reversal with three pointers: `prev`, `cur`, `next`. Save `cur.next`, point `cur` backwards, step both forward. The same four lines reverse a whole list, a sublist, or every group of k
- **Signal:** "reverse the list", "reverse nodes m to n", "reverse in groups of k", "add 1 to a number stored most-significant digit first", "palindrome linked list"
- **Why it works:** A singly linked node knows only its successor. Reversing one link loses the rest of the list unless `next` is saved first; with it saved, each step flips exactly one link and never revisits a node. For a segment, keep a pointer to the node *before* it and the segment's first node, which becomes its tail, to stitch both ends back

:::mint
<svg viewBox="0 0 470 110" role="img" aria-label="Reverse nodes in k group with k equal to 2 on 1, 2, 3, 4, 5. The node before the group is the dummy. Reverse 1 and 2 to get 2, 1. Stitch dummy to 2 and 1 to 3. Move the group-before pointer to 1. Reverse 3 and 4. The last group 5 has fewer than k nodes and stays. Result 2, 1, 4, 3, 5." xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif">
  <style>
    .lb { font: 10px Consolas, monospace; fill: #1a1a1a; }
    .sm { font: 8px Georgia, serif; fill: #6b6b6b; }
    .g1 { fill: #dbe7f5; stroke: #1d4e89; stroke-width: 1.1; }
    .g2 { fill: #e2fcf3; stroke: #2d6a4f; stroke-width: 1.1; }
    .n { fill: #ffffff; stroke: #1a1a1a; stroke-width: 1.1; }
  </style>
  <text x="20" y="22" class="sm">before</text>
  <rect class="g1" x="70" y="10" width="28" height="20"/><text x="84" y="24" class="lb" text-anchor="middle">1</text>
  <rect class="g1" x="102" y="10" width="28" height="20"/><text x="116" y="24" class="lb" text-anchor="middle">2</text>
  <rect class="g2" x="134" y="10" width="28" height="20"/><text x="148" y="24" class="lb" text-anchor="middle">3</text>
  <rect class="g2" x="166" y="10" width="28" height="20"/><text x="180" y="24" class="lb" text-anchor="middle">4</text>
  <rect class="n" x="198" y="10" width="28" height="20"/><text x="212" y="24" class="lb" text-anchor="middle">5</text>
  <text x="20" y="56" class="sm">after</text>
  <rect class="g1" x="70" y="44" width="28" height="20"/><text x="84" y="58" class="lb" text-anchor="middle">2</text>
  <rect class="g1" x="102" y="44" width="28" height="20"/><text x="116" y="58" class="lb" text-anchor="middle">1</text>
  <rect class="g2" x="134" y="44" width="28" height="20"/><text x="148" y="58" class="lb" text-anchor="middle">4</text>
  <rect class="g2" x="166" y="44" width="28" height="20"/><text x="180" y="58" class="lb" text-anchor="middle">3</text>
  <rect class="n" x="198" y="44" width="28" height="20"/><text x="212" y="58" class="lb" text-anchor="middle">5</text>
  <text x="20" y="86" class="lb">per group: groupPrev → [reverse k] → next group</text>
  <text x="20" y="102" class="sm">the old first node becomes the group's tail and the next groupPrev; a short last group stays as is</text>
  <text x="250" y="24" class="sm">k = 2</text>
</svg>
:::

```ts
// Reverse Nodes in k-Group (LeetCode 25)
function reverseKGroup(
  head: ListNode | null, k: number,
): ListNode | null {
  const dummy: ListNode = { val: 0, next: head };
  let groupPrev = dummy;
  while (true) {
    // is there a full group?
    let kth: ListNode | null = groupPrev;
    for (let i = 0; i < k && kth; i++) kth = kth.next;
    if (!kth) break;
    const groupNext = kth.next;
    let prev: ListNode | null = groupNext, cur = groupPrev.next;
    // classic three-pointer flip
    while (cur !== groupNext) {
      const next: ListNode | null = cur!.next;
      cur!.next = prev;
      prev = cur;
      cur = next;
    }
    // becomes the group's tail
    const first = groupPrev.next!;
    groupPrev.next = kth;
    groupPrev = first;
  }
  return dummy.next;
}
```

### Variations

- **Reverse Linked List (LeetCode 206):** the inner loop alone with `prev = null`. Recursive form: reverse the rest, then `head.next.next = head; head.next = null`
- **Reverse Linked List II (LeetCode 92):** one group, positions `left..right`: walk to the node before `left`, then run the same flip for `right − left + 1` nodes
- **Reverse a linked list in groups of given size (GFG):** unlike LeetCode 25, the *last partial group is reversed too*. Read the statement; drop the "full group?" check
- **Add 1 to a number represented as a linked list (GFG):** reverse, add with carry, reverse back; or recurse to the tail and carry on the way out (page 13-02)
- **Rotate List (LeetCode 61):** not a reversal: close the list into a ring, walk `n − k % n` steps, cut there

### The failure

- **Flipping before saving.** `cur.next = prev` first, then `cur = cur.next`, moves `cur` backwards into the part already reversed, and the rest of the list is lost
- **Losing the group boundaries.** After reversing a group, its old first node is the new tail. Forgetting to connect that tail to the next group, or to move `groupPrev` to it, silently drops or cycles nodes

:::interview
"How do you reverse a list in groups of k in O(1) extra space?" — I keep a pointer to the node before the current group. I check that k more nodes exist, reverse exactly those with the three-pointer loop, then stitch: the node before the group now points to its old last node, and its old first node, now the tail, becomes the 'before' pointer for the next group. Every node is flipped once: O(n) time, O(1) space.
:::
