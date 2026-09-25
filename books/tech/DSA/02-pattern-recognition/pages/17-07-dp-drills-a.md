## Recognition drills: DP & Games 🟡

Hide the right column. Say the signature first (17-02), then the transition. Module references point at Module 06.

| Problem | Signature · transition |
|---|---|
| 1. Largest Sum Contiguous Subarray (GFG / LeetCode 53) | **Kadane:** best ending here = max(x, x + best before) (Module 06, 02-05) |
| 2. Smallest sum contiguous subarray (GFG) | **Kadane with `min`** |
| 3. Maximum difference of zeros and ones in a binary string (GFG) | **Kadane** on 0 → +1, 1 → −1 |
| 4. Delete and Earn (LeetCode 740) | **Sum per value, then House Robber** over values (Module 06, 02-02) |
| 5. Maximum sum, no three consecutive (GFG) | **`f(i, run)`** with run < 2 before a pick |
| 6. Friends Pairing (GFG) | **`f(n) = f(n−1) + (n−1) · f(n−2)`**: stay single, or pair with one of n − 1 |
| 7. Count Derangements (GFG) | **`D(n) = (n−1) · (D(n−1) + D(n−2))`** |
| 8. Painting the Fence (GFG) | **Two states:** last two same, last two different; `diff' = (same + diff)(k − 1)`, `same' = diff` |
| 9. Nth Catalan Number (GFG) | **`C(n) = Σ C(i) · C(n−1−i)`**: pick the root, split the rest |
| 10. Binomial Coefficient (GFG) | **Pascal:** `C(n, r) = C(n−1, r−1) + C(n−1, r)` |
| 11. Count Balanced Binary Trees of Height h (GFG) | **`f(h) = f(h−1)² + 2 · f(h−1) · f(h−2)`** |
