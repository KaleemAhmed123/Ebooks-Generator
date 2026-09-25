## Recognition drills: Order & Intervals, named problems 🟢 - continued

| Problem | Sort key & scan |
|---|---|
| 12. Interval List Intersections (LeetCode 986) | **Two sorted lists:** overlap `[max start, min end]`, advance the earlier end |
| 13. Count Inversions (GFG) | **Count while you merge:** `mid − i` per right-side win |
| 14. Reverse Pairs (LeetCode 493) | **Count while you merge,** separate `2·a[j]` pass |
| 15. Count of Smaller Numbers After Self (LeetCode 315) | **Count while you merge** on indices |
| 16. Largest Number (LeetCode 179) | **Pairwise rule:** `b + a` vs `a + b` |
| 17. Sort by set bit count (GFG) | **Derived key** + stable sort |
| 18. Queue Reconstruction by Height (LeetCode 406) | **Height desc, k asc,** insert at k |
| 19. Least Number of Unique Integers after K Removals (LeetCode 1481) | **Frequency ascending:** remove the rarest values first |
| 20. Sort Array by Increasing Frequency (LeetCode 1636) | **Derived key:** frequency asc, then value desc |
| 21. Find K Closest Elements (LeetCode 658) | **Binary search the window start** in `[0, n − k]`, compare `x − a[m]` with `a[m + k] − x` |
| 22. Merge two sorted arrays without extra space (GFG) 🟡 | **Gap method (shell-sort step)** `gap = ⌈gap/2⌉`, compare across both arrays; or swap the tails and sort each |

### Score yourself

- **19–22:** you can name the key before you think about the story
- **12–18:** reread 07-07; "start or end" decides most interval questions
- **0–11:** reread 07-01 and 07-03 before redoing the table
