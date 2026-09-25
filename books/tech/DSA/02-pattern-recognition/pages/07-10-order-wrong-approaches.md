## The wrong approach: Order 🟢

- **Naive idea:** Modifying an array while using two pointers on it
- **Why it looks right:** You find an element that needs to be deleted or inserted, so you use `arr.splice()` to fix it in place, then move your pointers
- **Why it breaks:** `splice` is O(n). Calling it inside a loop makes your algorithm O(n²). Furthermore, it shifts all indices, immediately desyncing your pointers. The standard read/write two pointer technique exists specifically to avoid this by overwriting values instead of shifting them
- **The fix:** Never resize an array during a traversal. Use a fast pointer to read, a slow pointer to write, and truncate the array size at the very end

### Recognition drills

You have 20 seconds per problem. Identify which Order pattern applies.

| # | Problem sketch | Your answer |
|---|---|---|
| 1 | Given an array of coordinates, replace each coordinate with its rank (1st smallest, 2nd smallest, etc) | |
| 2 | Find the maximum number of intervals that can be placed on a timeline without overlapping | |
| 3 | You have a stream of user logins and logouts with timestamps. Find the peak concurrent user count | |
| 4 | Find the smallest missing positive integer in an unsorted array | |

:::note
**Answers:** 
1. **Coordinate Compression.** Exactly what it's built for.
2. **Greedy via Sorting.** Sort by end time, pick earliest. (Activity Selection).
3. **Sweep Line.** Convert to +1 and -1 events, sort by time, running sum.
4. **None of the above.** This is a trick. You need O(n) time. Sorting takes O(n log n). This requires a Hash Set or the cyclic sort technique (modifying in place).
:::
