## Fenwick Tree (Binary Indexed Tree)

- Prefix Sums are O(1) to query but O(N) to update. If you need to update values in a dynamic array and query prefix sums, you need a Fenwick Tree
- It provides **O(log N) point updates** and **O(log N) prefix queries**
- It relies entirely on the fact that every integer can be represented as a sum of powers of 2 (its binary representation)

### The Mechanism: Responsibility

- A Fenwick Tree is just an array of the same size as the input (1-indexed)
- Instead of `tree[i]` storing the sum from `0` to `i` (like a prefix array), `tree[i]` stores the sum of a specific **block** of numbers ending at `i`
- The length of this block is exactly the **value of the least significant set bit** (LSB) of `i`
  - Index 12 (`1100` in binary). LSB is 4 (`0100`). So `tree[12]` stores the sum of the last 4 elements: `arr[9] + arr[10] + arr[11] + arr[12]`
  - Index 10 (`1010` in binary). LSB is 2 (`0010`). So `tree[10]` stores the sum of the last 2 elements: `arr[9] + arr[10]`

### The bitwise magic

- To extract the LSB of `i`: `i & (-i)`
- **To Query `prefix(i)`:** You sum `tree[i]`, then chop off the LSB from `i`, and repeat until `i` is 0. This jumps backwards over the precomputed blocks
- **To Update `arr[i]` by `delta`:** You add `delta` to `tree[i]`, then add the LSB to `i`, and repeat until you exceed the array size. This jumps forward, updating every block that contains index `i`

### The Template

```ts
class FenwickTree {
  private tree: number[];

  constructor(size: number) {
    this.tree = new Array(size + 1).fill(0); // 1-indexed
  }

  // Adds delta to element at index i
  add(i: number, delta: number): void {
    while (i < this.tree.length) {
      this.tree[i] += delta;
      i += i & (-i); // Jump forward to next responsible block
    }
  }

  // Returns sum from 1 to i
  query(i: number): number {
    let sum = 0;
    while (i > 0) {
      sum += this.tree[i];
      i -= i & (-i); // Jump backward to previous block
    }
    return sum;
  }

  // Returns sum from L to R
  queryRange(L: number, R: number): number {
    return this.query(R) - this.query(L - 1);
  }
}
```

### Fenwick vs Segment Tree

- Fenwick Tree is significantly shorter to write, uses half the memory, and has a smaller constant factor
- However, **Fenwick Tree only works for invertible operations** (like sum or XOR), because `queryRange(L, R)` relies on `query(R) - query(L-1)`
- If you need range minimums with point updates, Fenwick cannot help you. You must use a Segment Tree

:::interview
"Can a Fenwick Tree handle range updates?"

Yes, but indirectly. If you build a Fenwick Tree over a Difference Array instead of the original array, a range update `[L, R]` by `X` becomes two point updates: `add(L, X)` and `add(R + 1, -X)`. A point query then becomes a prefix sum query on the Fenwick Tree.
:::
