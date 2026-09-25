### The Precompute Structures

| Technique | Upfront Time | Query Time | Supports Updates? | What it queries |
|---|---|---|---|---|
| **Prefix Sum** | O(N) | O(1) | No | Sums, counts, XORs (invertible operations) |
| **Sparse Table** | O(N log N) | O(1) | No | Min, max, GCD (idempotent operations) |
| **Fenwick Tree** | O(N log N) | O(log N) | Yes (Point) | Invertible operations |
| **Segment Tree** | O(N) | O(log N) | Yes (Range) | Any associative operation |

- The data structure you choose depends entirely on two questions: 
  1. What math operation are you querying? (Is it invertible? Is it idempotent?)
  2. Does the data change? (Do you need updates?)

:::interview
"Why did you choose a Prefix Sum instead of a Segment Tree?"

Both can answer range sum queries, but the data here is static. There are no updates. Segment Tree takes O(N) to build but O(log N) to query, with a high constant factor. Prefix Sum takes O(N) to build and O(1) to query. Since the data never changes, the O(1) query time of Prefix Sum makes it the strictly better choice.
:::
