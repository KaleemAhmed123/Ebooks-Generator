### The key invariant

- After elimination, the surviving candidates form a structure with a useful property:
  - In monotonic stack: a strictly decreasing (or increasing) sequence
  - In convex hull: a convex envelope
  - In skyline: a Pareto-optimal front
- This compressed structure allows O(1) or O(log n) lookups instead of O(n) scans

### Two dimensions: Pareto pruning

- With two scores, sort by the first and sweep while tracking the best second score seen: a point that does not beat it is dominated. The survivors form the **Pareto frontier**, and a 2-D domination check becomes a 1-D running maximum. Checking every pair instead is O(n²)
