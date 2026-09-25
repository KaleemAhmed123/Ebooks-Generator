## Recognition drills: Repeated Extremum <span class="lv lv1"></span> - continued

| Problem | Extremum Pattern & Justification |
|---|---|
| 6. Find the "next greater element" for every element in an array. | **Monotonic Stack.** The canonical monotonic stack problem. Maintain a decreasing stack. When a larger element arrives, it pops smaller elements and serves as their "next greater". |
| 7. Given an array of strings, return the K most frequent words. | **Heap for Top-K (with Hash Map).** First, count frequencies using a Hash Map. Then, maintain a Min-Heap of size K based on frequency (and lexicographical order for ties). |
| 8. Connect N ropes with minimum cost. The cost to connect two ropes is their sum. | **Heap (Greedy).** Always connect the two shortest available ropes. Put all ropes in a Min-Heap. Pop two, add them, add the cost to total, and push the new rope back into the heap. Repeat until one rope remains. |

### Score yourself
- **7-8 correct:** You clearly understand the boundary between dynamic extremums (Heap) and structural extremums (Monotonic Stack)
- **4-6 correct:** You might be trying to use Heaps for "next greater" problems, which works but is O(N log N) instead of O(N)
- **0-3 correct:** Review the Extremum Family introduction (15-01) and the monotonic stack (10-05) to separate global ordering (heaps) from sequence ordering (stacks)
