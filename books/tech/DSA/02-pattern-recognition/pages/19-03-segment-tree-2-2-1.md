```ts
// Iterative segment tree: point update, range query. op = any associative merge.
class SegTree {
  private t: number[]; private n: number;
  constructor(a: number[], private op = Math.min, private id = Infinity) {
    this.n = a.length; this.t = new Array(2 * this.n).fill(id);
    for (let i = 0; i < this.n; i++) this.t[this.n + i] = a[i];     // leaves
    for (let i = this.n - 1; i > 0; i--) this.t[i] = op(this.t[2*i], this.t[2*i+1]);
  }
  update(i: number, v: number) {                                   // set a[i] = v
    for (this.t[i += this.n] = v, i >>= 1; i > 0; i >>= 1)
      this.t[i] = this.op(this.t[2*i], this.t[2*i+1]);
  }
  query(l: number, r: number): number {                            // [l, r]
    let res = this.id;
    for (l += this.n, r += this.n + 1; l < r; l >>= 1, r >>= 1) {
      if (l & 1) res = this.op(res, this.t[l++]);
      if (r & 1) res = this.op(res, this.t[--r]);
    }
    return res;
  }
}
```

- **Watch out:** this iterative form does point update + range query only. **Range updates** ("add x to all of `[L, R]`") need lazy tags — a pending value parked on a node and pushed to children only when visited; reach for that only when the problem truly updates ranges, as it roughly doubles the code
### Where it appears
