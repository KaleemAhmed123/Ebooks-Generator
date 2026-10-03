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
