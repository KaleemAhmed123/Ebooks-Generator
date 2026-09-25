## Recognition drills: Windows & Pointers 🟢

Hide the right column. For each problem, name the pattern and the one fact that decides it: what is shrink-safe, what is counted, what is fixed.

| Problem | Pattern & the deciding fact |
|---|---|
| 1. Subarray Product Less Than K (LeetCode 713) | **Count by the right end.** Product < K survives shrinking on positives; add `right − left + 1` |
| 2. Longest Substring Without Repeating Characters (LeetCode 3) | **Variable window, longest.** Shrink only while a character repeats |
| 3. Fruit Into Baskets (LeetCode 904) | **Variable window, longest,** at most 2 distinct. The story hides "at most K distinct" |
| 4. Subarrays with K Different Integers (LeetCode 992) | **Exactly K by subtraction.** "Exactly K distinct" is not shrink-safe; two `atMost` passes are |
| 5. Binary Subarrays With Sum (LeetCode 930) | **Exactly K by subtraction** on a 0/1 array, or a prefix-count map (03-03) |
| 6. Minimum Operations to Reduce X to Zero (LeetCode 1658) | **Flip the target.** Longest middle with sum `total − x` |
| 7. Maximum Points You Can Obtain from Cards (LeetCode 1423) | **Flip the target, fixed size.** Minimise the kept window of `n − k` |
| 8. K Radius Subarray Averages (LeetCode 2090) | **Fixed window** of size `2k + 1`; positions with fewer than k neighbours on a side get −1 |
| 9. Longest Subarray of 1's After Deleting One Element (LeetCode 1493) | **Variable window,** at most one zero inside; answer is length − 1 |
| 10. Longest Repeating Character Replacement (LeetCode 424) | **Variable window.** Valid while `length − maxFreq ≤ k` |
| 11. Maximize the Confusion of an Exam (LeetCode 2024) | **Same as 10** with two letters: longest window where the minority count ≤ k |
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
