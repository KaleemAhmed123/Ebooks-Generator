### The Unsorted Array Trap

- **Naive idea:** You are given an array. The constraints say O(N log N). You immediately sort the array and binary search for the target.
- **Why it breaks:** The problem asks for the *original index* of the target. By sorting the array in place, you destroyed the original indices.
- **The fix:** If you need original indices, map the array into pairs `[value, originalIndex]` before sorting, or use an auxiliary data structure like a Hash Map.

:::interview
"I noticed you wrote `left + (right - left) / 2`. Why not just `(left + right) / 2`?"

In languages with fixed-size integers (like Java or C++), if `left` and `right` are both near the 32-bit integer limit, adding them together will overflow into negative numbers before the division occurs, throwing an OutOfBounds exception. Subtracting them prevents the overflow. (In TypeScript, all numbers are double-precision floats up to 9 times 10¹⁵, so it's less critical, but it's a defensive habit).
:::
