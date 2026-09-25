## Balance Two Heaps <span class="lv lv2"></span> - continued

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
