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
