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
