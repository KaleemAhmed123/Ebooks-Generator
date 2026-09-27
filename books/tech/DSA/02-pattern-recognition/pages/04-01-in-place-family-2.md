### Four patterns, five pages

| Pattern | Page | Trick | Canonical problem |
|---|---|---|---|
| **6 · Send Each Value Home** | 04-02 | index = value − 1; swap until settled | First Missing Positive (LeetCode 41) |
| **7 · Rearrange by Reversal** | 04-03 Reverse to rotate | three reversals = one rotation | Rotate Array (LeetCode 189) |
| | 04-04 Find the dip | first descent from the right, swap, reverse | Next Permutation (LeetCode 31) |
| **8 · Vote and Cancel** | 04-05 | pairs of different values cancel | Majority Element (LeetCode 169) |
| **9 · Wrap Around** | 04-06 | index `i % n` over the doubled view | Minimum Swaps to Group All 1's Together II (LeetCode 2134) |

Earlier pages already cover two in-place classics: read/write pointers and the three-way Dutch flag partition (02-09).

### The trap

- **Destroying the input the caller still needs.** In-place tricks overwrite values or signs. In an interview, say so and ask whether mutation is allowed. If it is not, and space must still be O(1), look for a different invariant, such as treating the array as a linked list (Find the Duplicate Number, Chapter 12)
