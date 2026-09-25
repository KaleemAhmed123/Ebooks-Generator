### The Template

```ts
// ListNode: 12-01 · Heap: the binary heap on 15-04
function mergeKLists(lists: (ListNode | null)[]): ListNode | null {
  // MinHeap must sort by node.val
  const minHeap = new Heap<ListNode>((x, y) => x.val < y.val);
  
  // 1. Push the head of every list into the heap
  for (const head of lists) {
    if (head !== null) minHeap.push(head);
  }
  
  const dummy: ListNode = { val: 0, next: null };
  let current = dummy;
  
  // 2. Extract the minimum, and push its successor
  while (minHeap.size() > 0) {
    const node = minHeap.pop()!;
    current.next = node;
    current = current.next;
    
    if (node.next !== null) {
      minHeap.push(node.next);
    }
  }
  
  return dummy.next;
}
```
