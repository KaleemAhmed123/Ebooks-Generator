### The preprocessing cost

- Almost all techniques in this family require you to sort the input first. Sorting takes O(n log n) time
- This means if the constraint is n ≤ 10⁵, you can afford the sort. If the constraint is n ≤ 10⁷, sorting will Time Limit Exceed (TLE). At 10⁷, you must find an O(n) solution (like a Hash Map or Counting Sort)
- **The golden rule of Order:** If the problem requires an O(n²) search, but you can sort the array and then use Two Pointers or Binary Search to solve it in O(n), the total time drops from O(n²) to O(n log n). Sort-then-scan is one of the most common interview optimisations
