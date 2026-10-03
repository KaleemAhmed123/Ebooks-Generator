### The trap

- **Zero-indexed vs One-indexed Math:** The children of node `i` in a 0-indexed array are `2*i + 1` and `2*i + 2`. In a 1-indexed array, they are `2*i` and `2*i + 1`. Mixing these up during an interview guarantees an out-of-bounds error.
- **The fix:** Always explicitly write out `const left = 2 * i + 1` instead of doing the math inline. It makes debugging trivial.

### Where it appears

| Problem | Why it belongs here |
|---|---|
| [Sort an Array](https://leetcode.com/problems/sort-an-array/) (LeetCode 912) | Heap sort as one valid O(N log N) approach |
| [Kth Largest Element in an Array](https://leetcode.com/problems/kth-largest-element-in-an-array/) (LeetCode 215) | Build a heap to extract the kth element |
| [Last Stone Weight](https://leetcode.com/problems/last-stone-weight/) (LeetCode 1046) | Max-heap to always grab the two heaviest |
