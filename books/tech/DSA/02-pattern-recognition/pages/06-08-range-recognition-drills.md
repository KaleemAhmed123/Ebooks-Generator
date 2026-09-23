## Recognition drills: Range Interaction

Hide the right column. Identify the correct Range Interaction pattern (Prefix Sum, Difference Array, Fenwick Tree, Segment Tree + Lazy Propagation, etc.) and justify your answer.

| Problem | Range Pattern & Justification |
|---|---|
| 1. Given an array, find the sum of elements between indices L and R. The array never changes. | **Prefix Sum.** Static array, invertible operation (sum). O(1) query time. |
| 2. Given an array, find the minimum element between indices L and R. The array never changes. | **Sparse Table.** Static array, idempotent operation (min). Prefix sum won't work because minimum is not invertible. Segment Tree works but Sparse Table is strictly faster (O(1) query). |
| 3. Given an array, add X to all elements from L to R. After all updates are done, print the final array. | **Difference Array.** All updates are processed offline before any queries. Difference array handles range updates in O(1) and reconstructs the array in O(N) at the very end. |
| 4. You have a stream of user logins and logouts. At any time, you need to query how many users were active in a specific minute. | **Fenwick Tree.** Dynamic data (stream of events), point updates (+1 login, -1 logout), and we need to query counts (invertible operation). Fenwick is simpler and faster than a Segment tree here. |
| 5. You have an array of toggles (0 or 1). Query: count the number of 1s in range [L, R]. Update: flip all toggles in range [L, R]. | **Segment Tree with Lazy Propagation.** Dynamic data, range queries, AND range updates. Since we are updating ranges on the fly and querying concurrently, we must use a Segment Tree with lazy memos (tracking "pending flips"). |
| 6. Given a string, you can update a single character. Query if the substring from L to R is a palindrome. | **Segment Tree (with Rolling Hash).** Point updates, range queries. Palindrome checking can be done by comparing a forward rolling hash and a backward rolling hash. A Segment Tree can maintain these hashes dynamically. |
| 7. Find the XOR sum of a subarray [L, R]. The array is static. | **Prefix Sum (Prefix XOR).** Static data. XOR is its own inverse (`A ^ A = 0`), so `prefix[R] ^ prefix[L-1]` gives the O(1) answer. |
| 8. Given an array of heights, update a single height, and query the maximum height in range [L, R]. | **Segment Tree.** Dynamic data, point updates. Maximum is not invertible, so Fenwick Tree cannot do range queries here. Segment tree handles point update / range max in O(log N). |

### Score yourself
- **7-8 correct:** You clearly understand the boundaries between these structures based on invertibility, idempotence, static vs dynamic, and point vs range updates
- **4-6 correct:** You might be overusing Segment Trees for things that Prefix Sums or Difference Arrays can do faster
- **0-3 correct:** Review the Precompute chapter (09-15) to understand how the operation type determines the data structure
