## Recognition drills: Search Space, named problems <span class="lv lv1"></span>

Hide the right column. For every binary search, name *what* is being searched (an index, a value, a partition point) and the monotone predicate that makes halving legal.

| Problem | What is searched & the predicate |
|---|---|
| 1. Find a Fixed Point, value equal to index (GFG), distinct sorted | **Index;** `a[i] − i` is non-decreasing, find where it hits 0 |
| 2. Square root of an integer (GFG / LeetCode 69) | **Answer x;** `x · x ≤ n`, last true |
| 3. Find Nth root of M (GFG) | **Answer x;** `xⁿ ≤ M`, stop the product early once it passes M |
| 4. Search in Rotated Sorted Array (LeetCode 33) | **Index;** pick the sorted half at each mid |
| 5. Find Minimum in Rotated Sorted Array (LeetCode 153) | **Index;** compare with `a[hi]` |
| 6. Peak Index in a Mountain Array (LeetCode 852) | **Index;** slope `a[mid] < a[mid+1]` |
| 7. Searching in an array where adjacent elements differ by at most k (GFG) | **Jump, not halve:** from `i`, skip `max(1, ⌊|a[i] − x| / k⌋)`; x cannot be closer |
| 8. Missing number in an arithmetic progression (GFG) | **Index;** `a[i] === a[0] + i·d` is true before the gap, false after |
| 9. Koko Eating Bananas (LeetCode 875) | **Answer speed;** hours needed ≤ h (18-14) |
| 10. Aggressive Cows (SPOJ AGGRCOW) | **Answer gap;** can place c cows with gap ≥ g (18-14) |
| 11. Allocate Minimum Number of Pages (GFG) / Painter's Partition | **Answer max load;** students needed ≤ m |
