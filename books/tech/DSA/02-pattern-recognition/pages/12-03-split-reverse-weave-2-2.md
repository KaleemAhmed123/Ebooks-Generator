### Variations

- **Palindrome Linked List (LeetCode 234):** split, reverse the back half, compare node by node until the shorter half ends. Reverse it again if the caller needs the list intact
- **Maximum Twin Sum of a Linked List (LeetCode 2130):** split and reverse; the twin of the i-th front node is the i-th node of the reversed back. Take the max of the sums
- **Sort List (LeetCode 148):** merge sort: split at the middle, sort each half recursively, merge with a dummy head (page 12-01). O(n log n), no array copy
- **Delete the Middle Node of a Linked List (LeetCode 2095):** start `slow = head`, `fast = head.next.next` and loop `while (fast && fast.next)`, so `slow` stops *before* the middle and can unlink it
- **Middle of the Linked List (LeetCode 876):** `while (fast && fast.next)` returns the *second* middle on even lengths; `while (fast.next && fast.next.next)` returns the first. Pick by what the next step needs

### The failure

- **Not cutting the first half.** Without `slow.next = null`, the first half still runs into the reversed back half, and the weave loop builds a cycle
- **Copying into an array.** Pushing every value into an array and using two indices is correct and simple, but it is O(n) extra space; the follow-up "in O(1) space" is exactly what the split-reverse recipe exists for

:::interview
"How do you check a linked-list palindrome in O(1) space?" — Find the middle with slow and fast pointers, reverse the second half in place, and compare the two halves node by node. Restoring the list afterwards is one more reversal. Everything is linear time with a constant number of pointers.
:::
