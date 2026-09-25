## Fenwick Tree (Binary Indexed Tree) <span class="lv lv3"></span>

- Prefix Sums are O(1) to query but O(N) to update. If you need to update values in a dynamic array and query prefix sums, you need a Fenwick Tree
- It provides **O(log N) point updates** and **O(log N) prefix queries**
- It relies entirely on the fact that every integer can be represented as a sum of powers of 2 (its binary representation)

### The Mechanism: Responsibility

- A Fenwick Tree is just an array of the same size as the input (1-indexed)
- Instead of `tree[i]` storing the sum from `0` to `i` (like a prefix array), `tree[i]` stores the sum of a specific **block** of numbers ending at `i`
- The length of this block is exactly the **value of the least significant set bit** (LSB) of `i`
  - Index 12 (`1100` in binary). LSB is 4 (`0100`). So `tree[12]` stores the sum of the last 4 elements: `arr[9] + arr[10] + arr[11] + arr[12]`
  - Index 10 (`1010` in binary). LSB is 2 (`0010`). So `tree[10]` stores the sum of the last 2 elements: `arr[9] + arr[10]`

### The bitwise step

- To extract the LSB of `i`: `i & (-i)`
- **To Query `prefix(i)`:** You sum `tree[i]`, then chop off the LSB from `i`, and repeat until `i` is 0. This jumps backwards over the precomputed blocks
- **To Update `arr[i]` by `delta`:** You add `delta` to `tree[i]`, then add the LSB to `i`, and repeat until you exceed the array size. This jumps forward, updating every block that contains index `i`
