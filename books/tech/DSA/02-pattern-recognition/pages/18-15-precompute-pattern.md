## Precompute for Cheap Queries 🟡

- **What it is:** Doing expensive work upfront to generate a queryable data structure, so that later, repeated questions can be answered in O(1) or O(log N) time
- **Why nobody named it:** Textbooks separate Prefix Sums (arrays), Sparse Tables (RMQ), and Segment Trees (trees) into different chapters based on their data structures. But conceptually, they are identical: they are all Precompute patterns

### The trade-off spectrum

- When a problem asks you to answer Q queries over an array of size N, you have two trivial options:
  1. **Do nothing upfront.** Store the array. For each query, scan the array. Upfront cost: O(1). Query cost: O(N). Total: O(Q × N)
  2. **Precompute everything.** Generate the answer for every possible query combination and store it in a matrix. Upfront cost: O(N²). Query cost: O(1). Total: O(N² + Q)

- Both trivial options fail when N = 10⁵ and Q = 10⁵. 
- The Precompute pattern exists in the middle ground: spend O(N) or O(N log N) time upfront to build a structure that allows O(1) or O(log N) queries

### The constraint fingerprint

You should immediately look for a Precompute pattern when:
1. The input data is **static** (it does not change between queries), OR updates are rare compared to queries
2. The number of queries Q is large (e.g. 10⁴ or 10⁵)
3. A naive scan for each query would TLE (Time Limit Exceeded)

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
