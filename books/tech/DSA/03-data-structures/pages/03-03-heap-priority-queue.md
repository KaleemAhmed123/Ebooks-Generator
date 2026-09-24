## Heaps & Priority Queues

- **What it is:** A Complete Binary Tree where every parent is smaller than its children (Min-Heap) or larger than its children (Max-Heap)
- **The Contract:** O(1) time to find the extreme (min/max), O(log N) to insert or remove it
- **Why it works:** It only maintains *partial* order. Unlike a BST which perfectly sorts everything, a Heap only guarantees that the top element is the extreme. The rest of the tree is chaotic. This relaxed requirement makes operations extremely fast

### Array Representation

- Even though we visualize a Heap as a tree, it is implemented under the hood as a flat Array.
- Because a Heap is a *complete* binary tree (all levels filled left to right), there are no gaps. We can use math to find parents and children:
  - Parent: `Math.floor((i - 1) / 2)`
  - Left Child: `2i + 1`
  - Right Child: `2i + 2`
- This makes Heaps highly cache-efficient compared to pointer-based trees.

### Heapify: The O(N) Magic

- If you have an unsorted array of N elements and you push them into a Heap one by one, it takes **O(N log N)** time.
- However, if you already have the full array, you can build a valid Heap in **O(N)** time using the `heapify` algorithm.
- `heapify` works bottom-up, pushing heavy elements down. Because the bottom levels have the most elements but the shortest distance to travel (0 or 1 step), the math converges to O(N).
- Always use `heapify(arr)` instead of `n` pushes when initializing a Priority Queue.

### When to use a Heap

1. **Top-K Problems:** "Find the Kth largest element". Maintain a Min-Heap of size K. If a new element is larger than the root, pop the root and push the new element. Time: O(N log K). Space: O(K).
2. **Merging Sorted Data:** "Merge K sorted linked lists". A Heap efficiently manages the K "current smallest" candidates. Time: O(N log K).
3. **Dynamic Median:** Maintain a Max-Heap for the bottom half of numbers, and a Min-Heap for the top half. The median is always at the root of one (or both) heaps.

### The Removal Trap

- A Heap only guarantees O(log N) removal for the **root** element.
- If you need to remove an arbitrary element from the middle of the Heap, you must first *find* it. Because a Heap is not perfectly sorted, finding an element takes O(N).
- **The fix:** If you need to frequently remove non-root elements, you must either:
  1. Use a **Lazy Deletion** strategy (keep a Hash Map of deleted elements, and only `pop()` them when they eventually reach the root).
  2. Use a different structure, like an Ordered Set (TreeSet in Java), which supports O(log N) search and removal.

:::interview
"Why use a Heap for Top-K instead of sorting the array?"

Sorting the array takes O(N log N). If N is 10 million, that's slow. If K is 5, a Heap approach takes O(N log K), which is roughly O(N). Furthermore, if the data is a continuous infinite stream, sorting is impossible. A size-K Heap processes streams perfectly.
:::
