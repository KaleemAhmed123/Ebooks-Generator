### Fenwick vs Segment Tree

- Fenwick Tree is significantly shorter to write, uses half the memory, and has a smaller constant factor
- However, **Fenwick Tree only works for invertible operations** (like sum or XOR), because `queryRange(L, R)` relies on `query(R) - query(L-1)`
- If you need range minimums with point updates, Fenwick cannot help you. You must use a Segment Tree

:::interview
"Can a Fenwick Tree handle range updates?"

Yes, but indirectly. If you build a Fenwick Tree over a Difference Array instead of the original array, a range update `[L, R]` by `X` becomes two point updates: `add(L, X)` and `add(R + 1, -X)`. A point query then becomes a prefix sum query on the Fenwick Tree.
:::
