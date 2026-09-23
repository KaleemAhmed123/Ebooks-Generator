## Offline Queries & Mo's Algorithm 🔴

"Offline Queries" is a foundational CP trick. If a problem gives you Q queries, and you do not need to answer query 2 before receiving query 3, you can read ALL queries first, sort them in a clever way, process them, and then output the answers in the original order.

### Mo's Algorithm (Square Root Decomposition on Trees/Arrays)

**The Problem:** Given an array of N ≤ 10⁵ elements, answer Q ≤ 10⁵ queries of the form "How many distinct elements exist in the range [L, R]?"
There are no updates to the array.

Segment Trees cannot easily merge "number of distinct elements". O(Q times N) brute force will TLE.

**Mo's Algorithm:**
If we know the answer for range [L, R], we can trivially find the answer for [L+1, R], [L-1, R], [L, R+1], and [L, R-1] in O(1) time by just adding/removing one element from a frequency hash map.
Mo's Algorithm sorts the offline queries so that the two pointers L and R move as little as possible between queries.

### The Sorting Block Trick

We divide the array into blocks of size S = √N.
We sort the queries primarily by the **block** that their L pointer falls into. 
If they fall into the same block, we sort them by their R pointer.

```cpp
int S = sqrt(N);

bool cmp(Query a, Query b) {
    if (a.L / S != b.L / S) {
        return a.L / S < b.L / S; // Sort by block of L
    }
    // If in the same block, sort by R. 
    // Optimization: alternate sorting direction for even/odd blocks
    return ((a.L / S) & 1) ? a.R < b.R : a.R > b.R; 
}
```

### Complexity Proof

- The R pointer moves continuously to the right (or left) for all queries sharing the same L-block. Over the whole block, R moves at most N times. There are √N blocks. Total R movement: O(N √N).
- The L pointer only moves within its block. It moves at most √N steps per query. For Q queries, total L movement: O(Q √N).
- Total time complexity: O((N + Q) √N). 

For N = 10⁵, N √N ≈ 3.1 times 10⁷ operations. This easily passes the 1-second time limit in C++.
