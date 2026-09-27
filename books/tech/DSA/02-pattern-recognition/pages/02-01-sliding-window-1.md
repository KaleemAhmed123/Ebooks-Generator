# Chapter 2 - Windows & Pointers

## Sliding Window <span class="lv lv1"></span>

- **What it is:** a contiguous range `[left, right]` that moves across the input. Each item enters once on the right and leaves once on the left, and a small summary of the range (a sum, a count map) is updated, never recomputed
- **Signal:** "subarray", "substring", "consecutive", "window of size k", "longest / shortest … such that", "count the subarrays …"
- **Mechanism:** the condition is monotone in the window: shrinking a valid window keeps it valid (or growing does). So `left` never moves back, and the whole scan is O(n)

### The moves

| Move | When to use | What it exploits |
|---|---|---|
| **02-02** | "every window of size k" | neighbours share k − 1 items |
| **02-03** | "longest / shortest such that" | validity is monotone in the window |
| **02-04** | "count the subarrays such that" | one window stands for `right − left + 1` answers |
| **02-05** | "exactly K distinct / odd" | exactly = atMost(K) − atMost(K − 1) |
| **02-06** | "remove from either end" | what stays is one middle window |
| **02-07** | "choose values by their spread" | sorted, the best subset is contiguous |

### The skeleton

```ts
let left = 0;
for (let right = 0; right < a.length; right++) {
  add(a[right]);                        // enter on the right
  while (!valid()) remove(a[left++]);   // leave on the left
  record(left, right);                  // longest / count here
}
```
