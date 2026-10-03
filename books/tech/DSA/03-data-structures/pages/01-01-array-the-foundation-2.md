### The wrong approach: unshifting

- **Naive idea:** Need a queue? Just use an array and call `shift()` / `unshift()` in JavaScript, or `pop(0)` in Python
- **Why it breaks:** It hides the complexity. You think you wrote O(1) code, but the interpreter runs O(N) code. A loop that `shift()`s N elements takes O(N²) time
- **The fix:** If you need to add/remove from both ends, you cannot use a basic array. You need a **Deque** (Double-ended queue) or two pointers traversing the array

### Where it appears

| Problem | Why it belongs here |
|---|---|
| [Remove Duplicates from Sorted Array](https://leetcode.com/problems/remove-duplicates-from-sorted-array/) (LeetCode 26) | In-place shifting in a contiguous array |
| [Move Zeroes](https://leetcode.com/problems/move-zeroes/) (LeetCode 283) | Shifting non-zero elements forward, classic array compaction |
| [Rotate Array](https://leetcode.com/problems/rotate-array/) (LeetCode 189) | Cyclic shifting inside contiguous memory |
| [Merge Sorted Array](https://leetcode.com/problems/merge-sorted-array/) (LeetCode 88) | Writing backwards to avoid the shift bottleneck |

:::interview
"Why do arrays have a fixed size in C/Java?"

Because memory is shared. If you allocate an array of size 5, the memory directly after it might be given to another variable. If you try to add a 6th element, it would overwrite that other variable. To grow an array, you must find a completely new, larger block of free memory.
:::
