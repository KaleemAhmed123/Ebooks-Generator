## Recognition drills: Range Interaction 🔴 - continued

| Problem | Range Pattern & Justification |
|---|---|
| 6. Given a string, you can update a single character. Query if the substring from L to R is a palindrome. | **Segment Tree (with Rolling Hash).** Point updates, range queries. Palindrome checking can be done by comparing a forward rolling hash and a backward rolling hash. A Segment Tree can maintain these hashes dynamically. |
| 7. Find the XOR sum of a subarray [L, R]. The array is static. | **Prefix Sum (Prefix XOR).** Static data. XOR is its own inverse (`A ^ A = 0`), so `prefix[R] ^ prefix[L-1]` gives the O(1) answer. |
| 8. Given an array of heights, update a single height, and query the maximum height in range [L, R]. | **Segment Tree.** Dynamic data, point updates. Maximum is not invertible, so Fenwick Tree cannot do range queries here. Segment tree handles point update / range max in O(log N). |

### Score yourself
- **7-8 correct:** You clearly understand the boundaries between these structures based on invertibility, idempotence, static vs dynamic, and point vs range updates
- **4-6 correct:** You might be overusing Segment Trees for things that Prefix Sums or Difference Arrays can do faster
- **0-3 correct:** Review the Precompute page (18-15) to understand how the operation type determines the data structure
