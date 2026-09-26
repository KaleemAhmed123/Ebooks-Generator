## Recognition drills: Windows & Pointers <span class="lv lv1"></span>

Hide the right column. For each problem, name the pattern and the one fact that decides it: what is shrink-safe, what is counted, what is fixed.
## Recognition drills: Windows & Pointers <span class="lv lv1"></span> - continued

| Problem | Pattern & the deciding fact |
|---|---|
| 1. [Subarray Product Less Than K](https://leetcode.com/problems/subarray-product-less-than-k/) (LeetCode 713) | **Count by the right end.** Product < K survives shrinking on positives; add `right − left + 1` |
| 2. [Longest Substring Without Repeating Characters](https://leetcode.com/problems/longest-substring-without-repeating-characters/) (LeetCode 3) | **Variable window, longest.** Shrink only while a character repeats |
| 3. [Fruit Into Baskets](https://leetcode.com/problems/fruit-into-baskets/) (LeetCode 904) | **Variable window, longest,** at most 2 distinct. The story hides "at most K distinct" |
| 4. [Subarrays with K Different Integers](https://leetcode.com/problems/subarrays-with-k-different-integers/) (LeetCode 992) | **Exactly K by subtraction.** "Exactly K distinct" is not shrink-safe; two `atMost` passes are |
| 5. [Binary Subarrays With Sum](https://leetcode.com/problems/binary-subarrays-with-sum/) (LeetCode 930) | **Exactly K by subtraction** on a 0/1 array, or a prefix-count map (03-03) |
| 6. [Minimum Operations to Reduce X to Zero](https://leetcode.com/problems/minimum-operations-to-reduce-x-to-zero/) (LeetCode 1658) | **Flip the target.** Longest middle with sum `total − x` |
| 7. [Maximum Points You Can Obtain from Cards](https://leetcode.com/problems/maximum-points-you-can-obtain-from-cards/) (LeetCode 1423) | **Flip the target, fixed size.** Minimise the kept window of `n − k` |
| 8. [Longest Subarray of 1's After Deleting One Element](https://leetcode.com/problems/longest-subarray-of-1s-after-deleting-one-element/) (LeetCode 1493) | **Variable window,** at most one zero inside; answer is length − 1 |
| 9. [Longest Repeating Character Replacement](https://leetcode.com/problems/longest-repeating-character-replacement/) (LeetCode 424) | **Variable window.** Valid while `length − maxFreq ≤ k` |
| 10. [Number of Substrings Containing All Three Characters](https://leetcode.com/problems/number-of-substrings-containing-all-three-characters/) (LeetCode 1358) | **Count, grow-safe.** Shrink while all three present, then add `left` |
| 11. [Minimum Window Substring](https://leetcode.com/problems/minimum-window-substring/) (LeetCode 76) | **Variable window, shortest.** Shrink while every needed count is met |
