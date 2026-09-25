## Recognition drills: Windows & Pointers <span class="lv lv1"></span>

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
| 8. Longest Subarray of 1's After Deleting One Element (LeetCode 1493) | **Variable window,** at most one zero inside; answer is length − 1 |
| 9. Longest Repeating Character Replacement (LeetCode 424) | **Variable window.** Valid while `length − maxFreq ≤ k` |
| 10. Number of Substrings Containing All Three Characters (LeetCode 1358) | **Count, grow-safe.** Shrink while all three present, then add `left` |
| 11. Minimum Window Substring (LeetCode 76) | **Variable window, shortest.** Shrink while every needed count is met |
| 12. Frequency of the Most Frequent Element (LeetCode 1838) | **Sort, then slide.** Cost `a[r] · len − sum ≤ k` |
| 13. Chocolate Distribution Problem (GFG) | **Sort, then slide,** fixed size m: `min(a[i+m−1] − a[i])` |
| 14. 3Sum (LeetCode 15) | **Fix one, collide two,** with in-place duplicate skips |
| 15. Remove Duplicates from Sorted Array (LeetCode 26) | **Read/write pointers.** Copying beats swapping here |

### Score yourself

- **12–15:** you decide from monotonicity, not from the word "subarray"
- **8–11:** you recognise windows but mix up "longest", "count" and "exactly". Reread 02-04 and 02-05
- **0–7:** reread 02-03 first; everything in this chapter is a variation of its two states
