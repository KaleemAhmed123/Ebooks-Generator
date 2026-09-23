## Monotonic Stack as Extremum

- We covered the Monotonic Stack under the **Locality** family, because it processes local contiguous regions
- It is *also* a member of the **Repeated Extremum** family, because it tracks a running extremum (the next greater or next smaller element)
- This dual-identity is common. The technique exploits locality to find an extremum

### When to use a Heap vs a Monotonic Stack

- A **Heap** finds the *global* extremum of the data it holds. It does not care about the original order of the elements. Once an element is in the heap, its original array index is usually irrelevant
- A **Monotonic Stack** finds a *local, order-dependent* extremum. It strictly enforces the original chronological or spatial order of the elements

| Property | Min/Max Heap | Monotonic Stack |
|---|---|---|
| **Structure** | Binary Tree (Implicit Array) | Stack (Array) |
| **Order tracking** | Ignores original order | Strictly preserves original order |
| **Time per element** | O(log k) | O(1) amortised |
| **Typical question** | "What is the 3rd largest number overall?" | "What is the next larger number to the right of me?" |

### The trap

- **Using a heap when order matters.** If the problem asks "find the largest element in every sliding window of size k", you *can* use a Heap. You push `(value, index)`, and if the max element's index is outside the window, you pop it. But this takes O(n log n) time. Since the sliding window enforces strict contiguous locality, you should use a **Monotonic Queue (Deque)** to solve it in O(n) time

:::interview
"Can we solve 'Sliding Window Maximum' with a Priority Queue?" — Yes, we can push `[value, index]` into a Max-Heap. When looking for the max of the current window, we check the root. If its index is outside the window bounds, we pop it and check the next one. This takes O(n log n). However, because we only care about the *local* window, a Monotonic Deque can solve this optimally in O(n) time by permanently discarding dominated elements.
:::
