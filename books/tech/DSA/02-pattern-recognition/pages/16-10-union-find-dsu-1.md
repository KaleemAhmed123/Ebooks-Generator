## Union–Find <span class="lv lv1"></span>

- **What:** a **disjoint-set union** (DSU) tracks which items sit in the same group under merges. `find(x)` returns x's group leader; `union(a, b)` merges two groups. Both run in near-O(1)
- **Spot it:** edges arrive one at a time and you need "same group?", "how many groups?", "does adding this edge join two groups or close a cycle?"
- **Why:** each group is a tree pointing at its root. **Path compression** flattens the tree on every `find`; **union by size** hangs the smaller tree under the larger. Together they give O(α(n)) per call — α, the inverse Ackermann, is ≤ 4 for any real n

:::mint
<svg viewBox="0 0 470 130" role="img" aria-label="Union by size then a find with path compression. Left: group A is a chain 1 to 2 to 4 rooted at 1; group B is node 3 rooted at 3. union(4,3) hangs the smaller root 3 under the larger root 1. Right: find(4) walks 4 to 1 and re-points 4 straight at root 1, flattening the tree." xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif">
  <style>
    .lb { font: 9.5px Consolas, monospace; fill: #1a1a1a; }
    .sm { font: 8px Georgia, serif; fill: #6b6b6b; }
    .r { fill: #e2fcf3; stroke: #2d6a4f; stroke-width: 1.4; }
    .nd { fill: #ffffff; stroke: #1a1a1a; stroke-width: 1.1; }
    .p { stroke: #1a1a1a; stroke-width: 1.1; }
    .np { stroke: #1d4e89; stroke-width: 1.8; stroke-dasharray: 4 2; }
  </style>
  <defs>
    <marker id="u1610" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto"><path d="M0 0L10 5L0 10z" fill="#1a1a1a"/></marker>
    <marker id="ub1610" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto"><path d="M0 0L10 5L0 10z" fill="#1d4e89"/></marker>
  </defs>
  <text x="70" y="14" class="sm" text-anchor="middle">union by size</text>
  <line class="p" x1="42" y1="40" x2="30" y2="66" marker-end="url(#u1610)"/>
  <line class="p" x1="30" y1="82" x2="30" y2="66" stroke="none"/>
  <line class="p" x1="30" y1="98" x2="30" y2="80" marker-end="url(#u1610)"/>
  <line class="p" x1="58" y1="40" x2="88" y2="60" marker-end="url(#u1610)"/>
  <circle class="r" cx="50" cy="30" r="13"/><text x="50" y="34" class="lb" text-anchor="middle">1</text>
  <circle class="nd" cx="28" cy="74" r="12"/><text x="28" y="78" class="lb" text-anchor="middle">2</text>
  <circle class="nd" cx="28" cy="106" r="12"/><text x="28" y="110" class="lb" text-anchor="middle">4</text>
  <circle class="nd" cx="98" cy="66" r="12"/><text x="98" y="70" class="lb" text-anchor="middle">3</text>
  <text x="118" y="60" class="sm" fill="#1d4e89">smaller root 3 → under 1</text>
  <text x="300" y="14" class="sm" text-anchor="middle">find(4): compress</text>
  <line class="np" x1="300" y1="98" x2="286" y2="44" marker-end="url(#ub1610)"/>
  <line class="p" x1="286" y1="42" x2="300" y2="66" stroke="none"/>
  <circle class="r" cx="280" cy="30" r="13"/><text x="280" y="34" class="lb" text-anchor="middle">1</text>
  <circle class="nd" cx="300" cy="106" r="12"/><text x="300" y="110" class="lb" text-anchor="middle">4</text>
  <text x="322" y="72" class="sm" fill="#1d4e89">4 re-points straight at root 1</text>
  <text x="322" y="100" class="sm">next find(4) is one hop</text>
</svg>
:::

```ts
// Disjoint-set union with path compression + union by size
class DSU {
  parent: number[]; size: number[]; count: number;     // count = number of groups
  constructor(n: number) {
    this.parent = Array.from({ length: n }, (_, i) => i);
    this.size = new Array(n).fill(1); this.count = n;
  }
  find(x: number): number {
    while (this.parent[x] !== x) {
      this.parent[x] = this.parent[this.parent[x]];    // halve the path
      x = this.parent[x];
    }
    return x;
  }
  union(a: number, b: number): boolean {               // false if already joined
    let ra = this.find(a), rb = this.find(b);
    if (ra === rb) return false;
    if (this.size[ra] < this.size[rb]) [ra, rb] = [rb, ra];
    this.parent[rb] = ra; this.size[ra] += this.size[rb];
    this.count--; return true;
  }
}
```

- **Watch out:** DSU only answers *undirected* "same group" — it merges both ways, so it cannot model one-way reachability. It also does not support deletion; splitting a group is not a DSU operation. `union` returning `false` is the cycle signal (16-08) for undirected graphs
