## Enumerate Subsets with Bits - continued

### Where it appears

| Problem | What the mask enumerates |
|---|---|
| Subsets (LeetCode 78) | every subset once |
| Maximum Length of a Concatenated String with Unique Characters (LeetCode 1239) | which strings are chosen |
| Partition to K Equal Sum Subsets (LeetCode 698) | placed numbers → bitmask DP 17-13 |
| Matchsticks to Square (LeetCode 473) | used sticks |
| Beautiful Arrangement (LeetCode 526) | placed positions |

- **Go deeper:** using the mask as a DP state is 17-13; splitting n into two halves of masks is meet-in-the-middle (Module 06).

:::interview
"Generate all subsets — recursion or bitmask?"

For distinct elements and small n, the bitmask loop is the tightest: integer `mask` is the subset, bit `i` its membership, 2ⁿ iterations with no call stack. Recursion (pick/skip) is clearer when elements repeat, when order matters, or when you prune early — the bitmask visits all 2ⁿ regardless.
:::
