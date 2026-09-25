## Recognition drills: Windows & Pointers 🟢 - continued

| Problem | Pattern & the deciding fact |
|---|---|
| 12. Number of Substrings Containing All Three Characters (LeetCode 1358) | **Count, grow-safe.** Shrink while all three present, then add `left` |
| 13. Longest Semi-Repetitive Substring (LeetCode 2730) | **Variable window.** At most one adjacent equal pair inside |
| 14. Minimum Window Substring (LeetCode 76) | **Variable window, shortest.** Shrink while every needed count is met |
| 15. Frequency of the Most Frequent Element (LeetCode 1838) | **Sort, then slide.** Cost `a[r] · len − sum ≤ k` |
| 16. Chocolate Distribution Problem (GFG) | **Sort, then slide,** fixed size m: `min(a[i+m−1] − a[i])` |
| 17. Minimum swaps required to bring all elements ≤ K together (GFG) | **Fixed window** of size `count(≤ K)`; minimise the "bad" elements inside |
| 18. 3Sum (LeetCode 15) | **Fix one, collide two,** with in-place duplicate skips |
| 19. Count Triplets with Sum Smaller than X (GFG) | **Fix one, collide two;** a hit adds `right − left` at once |
| 20. Sort Colors (LeetCode 75) | **Three pointers** (Dutch flag, 02-09). One pass, `mid` stays put after a swap with `high` |
| 21. Remove Duplicates from Sorted Array (LeetCode 26) | **Read/write pointers.** Copying beats swapping here |
| 22. Substring with Largest Variance (LeetCode 2272) 🟡 | **Trap: not a window.** Variance is not monotone in length. Run Kadane (03-06) for every ordered pair of letters |

### Score yourself

- **19–22:** you decide from monotonicity, not from the word "subarray"
- **13–18:** you recognise windows but mix up "longest", "count" and "exactly". Reread 02-04 and 02-05
- **0–12:** reread 02-03 first; everything in this chapter is a variation of its two states
