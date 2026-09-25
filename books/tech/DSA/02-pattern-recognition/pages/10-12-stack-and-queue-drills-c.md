## Recognition drills: Stacks & Queues <span class="lv lv1"></span> - continued

| Problem | Pattern & what the top means |
|---|---|
| 26. Reverse First K elements of Queue (GFG) | **Stack reverses k,** then rotate the other `n − k` to the back |
| 27. Sliding Window Maximum (LeetCode 239) | **Monotonic deque;** the front expires by index |
| 28. First negative integer in every window of size k (GFG) | **Queue of negative indices;** drop expired ones from the front |
| 29. Rotting Oranges / Distance of nearest cell having 1 | **Queue as BFS frontier,** all sources at time 0 (Module 05, 02-04) |
| 30. Implement N stacks in an array (GFG) <span class="lv lv3"></span> | **Free list:** `next[]` links each slot to the one below it or to the next free slot |

### Score yourself

- **25–30:** you can say what the top means before writing a push
- **16–24:** reread 10-01's three reasons: nesting, cancellation, waiting
- **0–15:** redo 10-05 and 10-08 by hand on paper, then this table
