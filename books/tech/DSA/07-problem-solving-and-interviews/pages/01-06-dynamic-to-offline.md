## Transformation: Dynamic Queries to Offline Queries 🔴

This is a CP-tier transformation that occasionally appears in elite interviews.

### The Signal

- You are given an array and a list of `Q` queries.
- Each query asks a question about a specific range `[L, R]` or state.
- The problem allows you to return an array of answers for all queries. (There is no requirement to answer Query 1 before seeing Query 2).

### The Mapping

Standard data structures (like Segment Trees) process queries **online**—they answer them one by one in the exact order they were given.
If we process queries **offline**, we transform the problem:
1. We read all queries into a list.
2. We **sort** the queries based on a specific property (like their right endpoint `R`).
3. We scan the array once, answering queries as we pass their sorted endpoints.

### Canonical Example: Number of Distinct Elements in Range

- **Problem:** Given an array of N integers and Q queries `[L, R]`, return the number of distinct integers in the subarray from L to R.
- **Online Trap:** A standard Segment Tree cannot easily store "distinct count" because the union of two distinct sets is not simply the sum of their counts.
- **The Offline Transformation:**
  - Save all queries with their original index: `{L, R, originalIndex}`.
  - Sort the queries by their right endpoint `R` ascending.
  - Maintain a single Fenwick Tree (Binary Indexed Tree) that stores a `1` at the most recent occurrence of each number we have seen so far, and `0` everywhere else.
- **The Execution:**
  - Iterate `i` through the array from left to right.
  - If we see `arr[i]`, update the Fenwick Tree: add `1` at `i`, and if we saw `arr[i]` before at index `lastOcc`, subtract `1` at `lastOcc`.
  - While the current query's `R == i`: the answer for this query is simply `fenwickTree.query(L, R)`.
  - Save the answer using the query's `originalIndex`.
- **The Result:** We avoid complex 2D data structures entirely, solving the problem in O((N+Q) log N) time.
