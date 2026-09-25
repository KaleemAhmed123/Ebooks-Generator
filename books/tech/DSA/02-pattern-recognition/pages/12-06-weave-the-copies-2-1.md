## Weave the Copies <span class="lv lv2"></span> - continued

```ts
// Copy List with Random Pointer (LeetCode 138), O(1) extra space
type RNode = {
  val: number; next: RNode | null; random: RNode | null;
};
function copyRandomList(head: RNode | null): RNode | null {
  // 1. weave copies in
  for (let x = head; x; x = x.next!.next)
    x.next = { val: x.val, next: x.next, random: null };
  // 2. copies' randoms
  for (let x = head; x; x = x.next!.next)
    x.next!.random = x.random ? x.random.next : null;
  const dummy: RNode = { val: 0, next: null, random: null };
  let tail = dummy;
  for (let x = head; x; x = x.next) {              // 3. unweave
    const copy = x.next!;
    // restore original
    x.next = copy.next;
    tail.next = copy; tail = copy;
  }
  return dummy.next;
}
```

### Variations

- **Hash-map version:** pass 1 builds `Map<old, new>`, pass 2 sets `copy.next = map.get(x.next)` and `copy.random = map.get(x.random)`. O(n) space, simpler to get right under pressure
- **Clone Graph (LeetCode 133):** the map version on a graph; DFS or BFS, creating each clone the first time it is seen (drill in 16-09)
- **Flattening a Linked List (GFG):** each node has a sorted `bottom` list; merge the lists pairwise from the right with the merge from page 12-01
- **Flatten a Multilevel Doubly Linked List (LeetCode 430):** when a node has a child, splice the child list between it and its `next`, fixing `prev` pointers both ways
