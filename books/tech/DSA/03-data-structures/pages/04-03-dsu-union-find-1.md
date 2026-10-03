## Disjoint Set Union (DSU / Union-Find) <span class="lv lv1"></span>

- **What it is:** A forest of trees (represented by an array) used exclusively to group elements into disjoint sets and check if two elements belong to the same set
- **The Contract:** O(1) amortised time (Inverse Ackermann function) to merge two sets (`union`) or find the set representative (`find`)
- **Why it works:** It abandons the idea of storing edges. Instead of traversing a graph to see if A connects to B, DSU instantly resolves both A and B to their "ultimate parent". If the parents match, they are connected

### The Core Structure

DSU uses a single array, `parent`. 
- Initially, every node is its own boss: `parent[i] = i`.
- When we connect node A and node B, we make B's boss report to A's boss.

```ts
class DSU {
  parent: number[];
  
  constructor(n: number) {
    this.parent = Array.from({ length: n }, (_, i) => i);
  }
  
  // Find the ultimate boss of 'x'
  find(x: number): number {
    if (this.parent[x] === x) return x;
    return this.find(this.parent[x]);
  }
  
  // Merge the sets containing 'x' and 'y'
  union(x: number, y: number): boolean {
    const rootX = this.find(x);
    const rootY = this.find(y);
    
    if (rootX === rootY) return false; // Already in the same set
    
    this.parent[rootY] = rootX; // Make rootY report to rootX
    return true; // Successfully merged
  }
}
```
