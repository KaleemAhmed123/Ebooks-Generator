### Complexity Proof

- The R pointer moves continuously to the right (or left) for all queries sharing the same L-block. Over the whole block, R moves at most N times. There are √N blocks. Total R movement: O(N √N).
- The L pointer only moves within its block. It moves at most √N steps per query. For Q queries, total L movement: O(Q √N).
- Total time complexity: O((N + Q) √N). 

For N = 10⁵, N √N ≈ 3.1 times 10⁷ operations. This easily passes the 1-second time limit in C++.
