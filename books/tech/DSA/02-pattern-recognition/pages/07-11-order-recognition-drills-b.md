## Recognition drills: Order and Ranking <span class="lv lv1"></span> - continued

| Problem | Order Pattern & Justification |
|---|---|
| 6. Given an array, find two numbers that sum to exactly K. | **Sort then Scan (Two Pointers) or Hash Map.** If the array is already sorted, use a left and right pointer. If not sorted, a Hash Map is O(N). Sorting first would take O(N log N). |
| 7. Given an array of meeting time intervals, determine if a person could attend all meetings. | **Sort then Scan.** Sort by start time. Scan the array. If any meeting starts before the previous meeting ends, return false. |
| 8. Find the total length of coverage given a set of overlapping 1D line segments. | **Sweep Line (or Sort then Merge).** Sort segments by start time. Maintain a `currentStart` and `currentEnd`. If the next segment overlaps, extend `currentEnd`. If it doesn't, add `currentEnd - currentStart` to the total and reset the markers. |

### Score yourself
- **7-8 correct:** You can reliably identify when sorting destroys sequence but reveals structure (adjacency, hierarchy)
- **4-6 correct:** You might be confusing Sweep Line with basic Two Pointers. Remember: Sweep Line processes *events*, Two Pointers process *elements*
- **0-3 correct:** Review the Order Family introduction (07-01)
