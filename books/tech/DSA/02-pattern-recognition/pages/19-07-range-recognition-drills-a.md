## Recognition drills: Range Interaction <span class="lv lv3"></span>

Hide the right column. Identify the correct Range Interaction pattern (Prefix Sum, Difference Array, Fenwick Tree, Segment Tree + Lazy Propagation, etc.) and justify your answer.

| Problem | Range Pattern & Justification |
|---|---|
| 1. Given an array, find the sum of elements between indices L and R. The array never changes. | **Prefix Sum.** Static array, invertible operation (sum). O(1) query time. |
| 2. Given an array, find the minimum element between indices L and R. The array never changes. | **Sparse Table.** Static array, idempotent operation (min). Prefix sum won't work because minimum is not invertible. Segment Tree works but Sparse Table is strictly faster (O(1) query). |
| 3. Given an array, add X to all elements from L to R. After all updates are done, print the final array. | **Difference Array.** All updates are processed offline before any queries. Difference array handles range updates in O(1) and reconstructs the array in O(N) at the very end. |
| 4. You have a stream of user logins and logouts. At any time, you need to query how many users were active in a specific minute. | **Fenwick Tree.** Dynamic data (stream of events), point updates (+1 login, -1 logout), and we need to query counts (invertible operation). Fenwick is simpler and faster than a Segment tree here. |
| 5. You have an array of toggles (0 or 1). Query: count the number of 1s in range [L, R]. Update: flip all toggles in range [L, R]. | **Segment Tree with Lazy Propagation.** Dynamic data, range queries, AND range updates. Since we are updating ranges on the fly and querying concurrently, we must use a Segment Tree with lazy memos (tracking "pending flips"). |
