## Fenwick Tree (Binary Indexed Tree) <span class="lv lv2"></span>

- **What it is:** A specialized array-based tree that computes prefix sums and allows point updates
- **The Contract:** O(log N) for a point update, O(log N) for a prefix sum query
- **Why it works:** It uses the binary representation of indices to break down an array into cascading, non-overlapping ranges (intervals)

*Note: For the deep pedagogical breakdown of Fenwick Trees as a pattern, refer to Module 02 (Pattern Recognition), Chapter 10. This page serves as the structural reference.*

### The LSB (Least Significant Bit) Engine

The Fenwick Tree relies entirely on isolating the lowest set bit of an index. In two's complement binary arithmetic, this is elegantly extracted via `i & (-i)`.

- `12` in binary is `1100`.
- `-12` in binary is `0100` (invert bits and add 1).
- `12 & -12` is `0100`, which is `4`.
- The LSB dictates the "responsibility" (the length of the range) of that index. Index 12 is responsible for `4` elements: itself and the 3 preceding elements.
