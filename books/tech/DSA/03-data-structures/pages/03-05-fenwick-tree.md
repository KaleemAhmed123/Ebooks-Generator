## Fenwick Tree (Binary Indexed Tree)

- **What it is:** A specialized array-based tree that computes prefix sums and allows point updates
- **The Contract:** O(log N) for a point update, O(log N) for a prefix sum query
- **Why it works:** It uses the binary representation of indices to break down an array into cascading, non-overlapping ranges (intervals)

*Note: For the deep pedagogical breakdown of Fenwick Trees as a pattern, refer to Module 02 (Pattern Recognition), Chapter 10. This page serves as the structural reference.*

### The LSB (Least Significant Bit) Engine

The magic of the Fenwick Tree relies entirely on isolating the lowest set bit of an index. In two's complement binary arithmetic, this is elegantly extracted via `i & (-i)`.

- `12` in binary is `1100`.
- `-12` in binary is `0100` (invert bits and add 1).
- `12 & -12` is `0100`, which is `4`.
- The LSB dictates the "responsibility" (the length of the range) of that index. Index 12 is responsible for `4` elements: itself and the 3 preceding elements.

### The Implementation

```ts
class FenwickTree {
  private tree: number[];

  // 1-indexed implementation
  constructor(size: number) {
    this.tree = new Array(size + 1).fill(0);
  }

  // Add 'delta' to index 'i'
  update(i: number, delta: number) {
    while (i < this.tree.length) {
      this.tree[i] += delta;
      i += i & (-i); // Move UP the tree to update ancestors
    }
  }

  // Sum from index 1 to 'i'
  query(i: number): number {
    let sum = 0;
    while (i > 0) {
      sum += this.tree[i];
      i -= i & (-i); // Move DOWN the tree, chaining intervals
    }
    return sum;
  }
}
```

### Range Query derivation

- A Fenwick tree natively only supports **Prefix Sums** (from index 1 to i).
- To get the sum of a specific range `[L, R]`, you use the Prefix Sum difference property:
- `RangeSum(L, R) = PrefixSum(R) - PrefixSum(L - 1)`
- Thus, querying a range requires two O(log N) calls to the tree.

:::interview
"If I need to update a range of elements (e.g. add 5 to indices L through R) and query a single point, can I use a Fenwick Tree?" — Yes. You use a Difference Array logic. You call `update(L, 5)` and `update(R + 1, -5)`. Then, to find the value at point `X`, you simply query the prefix sum up to `X`. The tree is now storing the *deltas*, not the absolute values.
:::
