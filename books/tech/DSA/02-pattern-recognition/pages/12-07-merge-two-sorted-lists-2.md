## Merge Two Sorted Lists - continued

### Where it appears

| Problem | The merge |
|---|---|
| Merge Two Sorted Lists (LeetCode 21) | the base case |
| Merge k Sorted Lists (LeetCode 23) | pairwise merges, or a heap of heads → 15-03 |
| Sort List (LeetCode 148) | split at the middle, merge halves |
| Add Two Numbers (LeetCode 2) | same walk, carry instead of compare |
| Merge Sorted Array (LeetCode 88) | array form, fill from the back |

- **Go deeper:** k-way merge with a heap is 15-03; the linked-list mechanics (reverse, middle, cycle) are 12-02 to 12-06.

:::interview
"Why a dummy head when merging lists?"

The result's first node is not known until you compare the two heads. A dummy node gives `tail` something to point at from the start, so every node — including the first — is appended by the same `tail.next = …; tail = tail.next` step. You return `dummy.next`. It removes an entire class of first-node edge cases.
:::
