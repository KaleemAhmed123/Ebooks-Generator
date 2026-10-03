### The true Queue (Linked List)

- To achieve true O(1) enqueue and dequeue, a Queue must be implemented as a Linked List with both a `head` and `tail` pointer
- Enqueue: Create node, `tail.next = node`, update `tail`
- Dequeue: Read `head.val`, `head = head.next`
- Because we only interact with the absolute ends, we never traverse, keeping everything O(1)

```ts
// A true O(1) Queue
class Node {
  constructor(public val: number, public next: Node | null = null) {}
}

class Queue {
  private head: Node | null = null;
  private tail: Node | null = null;

  enqueue(val: number) {
    const node = new Node(val);
    if (!this.tail) {
      this.head = this.tail = node;
    } else {
      this.tail.next = node;
      this.tail = node;
    }
  }

  dequeue(): number | null {
    if (!this.head) return null;
    const val = this.head.val;
    this.head = this.head.next;
    if (!this.head) this.tail = null; // Queue became empty
    return val;
  }
}
```
