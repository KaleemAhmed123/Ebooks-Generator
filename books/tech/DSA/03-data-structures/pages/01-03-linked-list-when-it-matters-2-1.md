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
