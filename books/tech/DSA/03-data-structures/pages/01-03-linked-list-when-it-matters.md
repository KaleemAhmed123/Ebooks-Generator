## Linked List: When it actually matters

- **What it is:** A sequence of nodes where each node contains a value and a pointer to the next node, scattered randomly across memory
- **The Contract:** O(1) insertion/deletion at any known pointer, but O(N) to find any index
- **Why it works:** Because memory is not contiguous, you do not have to shift elements when inserting. You simply rewrite two pointers to splice the new node into the chain

### The theoretical advantage

- In an Array, inserting at index 0 takes O(N) because N elements must physically move
- In a Linked List, inserting at the head takes O(1). You create a new node, point it to the current head, and declare the new node as the head
- This theoretical O(1) splice is why Linked Lists are taught: they solve the array's shifting bottleneck

### The devastating practical reality (Cache Misses)

- In modern computing, Linked Lists are almost never used in high-performance systems
- Because nodes are allocated one by one, they end up scattered across the RAM
- When you traverse an array, the CPU loads 64 bytes of contiguous memory into the ultra-fast L1 cache. Array traversal is screamingly fast
- When you traverse a Linked List, every single `node.next` is a random memory jump. This causes a **Cache Miss**, forcing the CPU to wait hundreds of cycles for the RAM to fetch the next node
- In practice, a Dynamic Array shifting 1,000 elements is often faster than a Linked List traversing 1,000 nodes, purely because of hardware caching

### When to actually use them

You should only reach for a Linked List in an interview (or production) when:
1. **The interviewer explicitly gives you a Linked List problem** (e.g. "Reverse a linked list", "Merge k sorted lists"). These test your pointer manipulation skills, not your architectural judgement
2. **You need strict O(1) worst-case insertions.** Dynamic arrays are O(1) *amortised*, meaning every so often an insertion is O(N). Real-time systems (like audio processing or pace-makers) cannot tolerate an unpredictable O(N) latency spike
3. **You are building an LRU Cache.** An LRU Cache requires O(1) lookups (via Hash Map) AND O(1) splicing (moving a node to the front). A Doubly Linked List is the only structure that can satisfy both simultaneously

```ts
class ListNode {
  val: number;
  next: ListNode | null;
  constructor(val?: number, next?: ListNode | null) {
    this.val = (val===undefined ? 0 : val);
    this.next = (next===undefined ? null : next);
  }
}

// Splicing a new node after 'current' in strict O(1) time
function spliceAfter(current: ListNode, val: number) {
  const newNode = new ListNode(val);
  newNode.next = current.next;
  current.next = newNode;
}
```

:::interview
"If I need to frequently insert elements into the middle of a list, should I use a Linked List?" — Usually no. A Linked List can *insert* in O(1), but you have to *find* the insertion point first, which takes O(N) traversal. A Dynamic Array also takes O(N) to insert (due to shifting). Because array shifting has perfect spatial locality, the Array is almost always faster in practice unless the list is massive and you already hold a pointer to the insertion site.
:::
