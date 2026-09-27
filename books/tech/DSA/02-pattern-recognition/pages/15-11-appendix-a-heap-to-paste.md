## Appendix: A Heap to Paste <span class="lv lv1"></span>

- **What:** JS and TS ship no priority queue. Every heap page uses this class. `before(a, b)` is true when `a` should leave first: `(x, y) => x < y` is a min-heap, `(x, y) => x > y` a max-heap
- **Why:** an array-backed complete binary tree with sift-up and sift-down. `push` and `pop` are O(log n); `peek` and `size` are O(1)

```ts
// Binary heap; before(a, b) is true when a comes out first
class Heap<T> {
  private a: T[] = [];
  private before: (x: T, y: T) => boolean;
  constructor(before: (x: T, y: T) => boolean) {
    this.before = before;
  }
  size() { return this.a.length; }
  peek(): T | undefined { return this.a[0]; }
  push(x: T) {
    const a = this.a; a.push(x);
    for (let i = a.length - 1; i > 0; ) {           // sift up
      const p = (i - 1) >> 1;
      if (!this.before(a[i], a[p])) break;
      [a[i], a[p]] = [a[p], a[i]]; i = p;
    }
  }
  pop(): T | undefined {
    const a = this.a, top = a[0], last = a.pop()!;
    if (a.length) {
      a[0] = last;
      for (let i = 0; ; ) {                         // sift down
        const l = 2 * i + 1, r = l + 1; let m = i;
        if (l < a.length && this.before(a[l], a[m])) m = l;
        if (r < a.length && this.before(a[r], a[m])) m = r;
        if (m === i) break;
        [a[i], a[m]] = [a[m], a[i]]; i = m;
      }
    }
    return top;
  }
}
```

- **Ties are not stable.** Equal keys leave in no fixed order. When a tie rule is given (Huffman on GFG uses insertion order), add a sequence number to the key
