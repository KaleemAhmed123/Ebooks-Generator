## The Wrong Approach (Searching)

Searching seems simple, which is why the failure modes are so subtle. Candidates rarely fail to write a binary search. They fail to handle the edge cases of binary search.

### The Infinite Loop Trap

- **Naive idea:** Use `while (left < right)` and set `left = mid` or `right = mid`.
- **Why it looks right:** It works perfectly on arrays with odd lengths, or when the target is exactly in the middle.
- **Why it breaks:** If `left` and `right` are adjacent (e.g., indices 3 and 4), `mid` will calculate to 3 (due to integer truncation). If the logic dictates `left = mid`, then `left` stays 3. The loop spins infinitely.
- **The fix:** Always ensure boundaries shrink aggressively. If your condition is `left <= right`, you must use `left = mid + 1` and `right = mid - 1`. If your problem requires setting `left = mid`, then the `mid` calculation must be biased to the right: `mid = left + Math.floor((right - left + 1) / 2)`.

### The "Find Any vs Find First" Trap

- **Naive idea:** A problem asks to find the first day you can ship a package. You write a standard exact-match binary search, find a valid day, and `return mid`.
- **Why it breaks:** Finding *a* valid day does not mean you found the *first* valid day. If days `[4, 5, 6, 7]` are all valid, your search might randomly land on `6` and return it. The optimal answer was `4`.
- **The fix:** Use the Boundary Finding template. When you find a valid answer, store it, and aggressively search the left half (`right = mid - 1`) to see if an earlier valid answer exists.

### The Unsorted Array Trap

- **Naive idea:** You are given an array. The constraints say O(N log N). You immediately sort the array and binary search for the target.
- **Why it breaks:** The problem asks for the *original index* of the target. By sorting the array in place, you destroyed the original indices.
- **The fix:** If you need original indices, map the array into pairs `[value, originalIndex]` before sorting, or use an auxiliary data structure like a Hash Map.

:::interview
"I noticed you wrote `left + (right - left) / 2`. Why not just `(left + right) / 2`?"

In languages with fixed-size integers (like Java or C++), if `left` and `right` are both near the 32-bit integer limit, adding them together will overflow into negative numbers before the division occurs, throwing an OutOfBounds exception. Subtracting them prevents the overflow. (In TypeScript, all numbers are double-precision floats up to 9 times 10¹⁵, so it's less critical, but it's a defensive habit).
:::
