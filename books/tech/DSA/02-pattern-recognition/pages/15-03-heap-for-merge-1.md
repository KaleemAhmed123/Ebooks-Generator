## Heap for Merge <span class="lv lv1"></span>

- **What it is:** Using a priority queue to multi-way merge K different sorted structures
- **When to reach for it:** "Merge K sorted lists", "Kth smallest element in a sorted matrix"
- **Why it works:** If you have 3 sorted arrays, the absolute smallest element *must* be the first element of Array A, B, or C. If you pick the smallest from those three, the *next* smallest must be one of the remaining two, plus the newly exposed element from the array you just picked from

### The Template

```ts
// ListNode: 12-01 · Heap: the binary heap on 15-11
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
