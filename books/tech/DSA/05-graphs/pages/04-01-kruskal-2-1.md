### Disjoint Set Union (DSU)

The only tricky part of Kruskal's is answering the question: *"Does this edge create a cycle?"* 
Running a DFS every time to check for connectivity is O(V), which makes the overall algorithm O(E times V). That's too slow.
Instead, we use a **Union-Find** (Disjoint Set Union) data structure. It can answer "Are these two nodes connected?" in practically O(1) time.

```ts
class UnionFind {
  parent: number[];
  constructor(n: number) {
    this.parent = Array.from({ length: n }, (_, i) => i);
  }

  find(i: number): number {
    if (this.parent[i] === i) return i;
    // Path compression: point directly to the absolute root
    return this.parent[i] = this.find(this.parent[i]); 
  }

  union(i: number, j: number): boolean {
    const rootI = this.find(i);
    const rootJ = this.find(j);
    if (rootI !== rootJ) {
      this.parent[rootI] = rootJ;
      return true; // Union successful, edge added
    }
    return false; // They were already connected, cycle detected!
  }
}
```
