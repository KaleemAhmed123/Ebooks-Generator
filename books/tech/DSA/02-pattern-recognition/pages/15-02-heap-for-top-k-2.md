### The Template

```ts
// Heap: the binary heap on 15-04 (JavaScript has none built in)
function findKthLargest(nums: number[], k: number): number {
  const minHeap = new Heap<number>((x, y) => x < y);

  for (const num of nums) {
    minHeap.push(num);

    // If heap exceeds size k, pop the smallest element
    if (minHeap.size() > k) {
      minHeap.pop();
    }
  }

  // The root of the min-heap is the Kth largest overall
  return minHeap.peek()!;
}
```
