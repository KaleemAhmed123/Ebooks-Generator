### The techniques in this chapter

| Page | Trick | Canonical problem |
|---|---|---|
| **04-02 Send Each Value Home** | index = value − 1; swap until settled | First Missing Positive (LeetCode 41) |
| **04-03 Reverse to Rotate** | three reversals = one rotation | Rotate Array (LeetCode 189) |
| **04-04 Find the Dip** | scan right-to-left for the first descent | Next Permutation (LeetCode 31) |
| **04-05 Vote and Cancel** | pairs of different values cancel | Majority Element (LeetCode 169) |
| **04-06 Wrap Around** | index `i % n` over `2n` steps | Minimum Swaps to Group All 1's Together II (LeetCode 2134) |

Earlier pages already cover two in-place classics: read/write pointers (02-08) and the three-way Dutch flag partition (02-09).

### The trap

- **Destroying the input the caller still needs.** In-place tricks overwrite values or signs. In an interview, say so and ask whether mutation is allowed. If it is not, and space must still be O(1), look for a different invariant, such as treating the array as a linked list (Find the Duplicate Number, Chapter 12)
