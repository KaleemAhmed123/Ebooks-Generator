## Recognition drills: Windows & Pointers <span class="lv lv1"></span> - continued

| Problem | Pattern & the deciding fact |
|---|---|
| 12. Frequency of the Most Frequent Element (LeetCode 1838) | **Sort, then slide.** Cost `a[r] · len − sum ≤ k` |
| 13. Chocolate Distribution Problem (GFG) | **Sort, then slide,** fixed size m: `min(a[i+m−1] − a[i])` |
| 14. 3Sum (LeetCode 15) | **Fix one, collide two,** with in-place duplicate skips |
| 15. Remove Duplicates from Sorted Array (LeetCode 26) | **Read/write pointers.** Copying beats swapping here |

### Score yourself

- **12–15:** you decide from monotonicity, not from the word "subarray"
- **8–11:** you recognise windows but mix up "longest", "count" and "exactly". Reread 02-04 and 02-05
- **0–7:** reread 02-03 first; everything in this chapter is a variation of its two states
