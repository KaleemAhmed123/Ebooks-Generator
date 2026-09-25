## Heap for Merge

- **What it is:** Using a priority queue to multi-way merge K different sorted structures
- **When to reach for it:** "Merge K sorted lists", "Kth smallest element in a sorted matrix"
- **Why it works:** If you have 3 sorted arrays, the absolute smallest element *must* be the first element of Array A, B, or C. If you pick the smallest from those three, the *next* smallest must be one of the remaining two, plus the newly exposed element from the array you just picked from

### The visual mechanism

- Arrays: `A = [1, 5]`, `B = [2, 4]`, `C = [3, 6]`
- Initial Heap contains the heads: `[1, 2, 3]`. The smallest is `1` (from A)
- Pop `1`, push the next element from A (`5`). Heap is now `[2, 3, 5]`
- The smallest is `2` (from B). Pop `2`, push `4` from B. Heap: `[3, 4, 5]`

### The Template

```ts
class ListNode {
  val: number;
  next: ListNode | null;
}

function mergeKLists(lists: (ListNode | null)[]): ListNode | null {
  // MinHeap must sort by node.val
  const minHeap = new MinPriorityQueue({ priority: node => node.val });
  
  // 1. Push the head of every list into the heap
  for (const head of lists) {
    if (head !== null) minHeap.enqueue(head);
  }
  
  const dummy = new ListNode(0);
  let current = dummy;
  
  // 2. Extract the minimum, and push its successor
  while (!minHeap.isEmpty()) {
    const node = minHeap.dequeue().element;
    current.next = node;
    current = current.next;
    
    if (node.next !== null) {
      minHeap.enqueue(node.next);
    }
  }
  
  return dummy.next;
}
```

### The Complexity

- Number of lists: K. Total nodes across all lists: N.
- The heap never holds more than K elements. Pushing/popping takes O(log K).
- We do this for all N nodes. Total time: O(N log K).
- Compare this to concatenating all arrays and sorting them: O(N log N). If N is 1 million and K is 10, the heap approach is dramatically faster because it exploits the fact that the individual arrays are *already* sorted

:::interview
"Can we merge K sorted arrays without a heap?"

Yes, using Divide and Conquer. We can merge pairs of arrays iteratively, reducing K to K/2, then K/4, until 1 array remains. The time complexity is identical to the heap approach: O(N log K). However, the heap approach is often simpler to write iteratively and handles continuous streams of data better.
:::
