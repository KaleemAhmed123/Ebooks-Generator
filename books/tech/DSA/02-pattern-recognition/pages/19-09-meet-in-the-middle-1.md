## Meet in the Middle 🔴

- Backtracking (DFS) explores every possible combination. If there are N items, generating all subsets takes O(2ⁿ) time
- O(2ⁿ) is perfectly fine if N ≤ 20. A modern CPU can easily do 2²⁰ ≈ 10⁶ operations
- But what if N = 40? 2⁴⁰ ≈ 10¹², which will Time Limit Exceed (TLE). You cannot use standard DP because the state space is too sparse or the values are too large. You cannot use standard Backtracking because O(2⁴⁰) is too slow
- When you see N ≈ 40 and you need to try combinations, you are looking at the **Meet in the Middle** fingerprint

### The Mechanism: Split and Merge

- Instead of searching N items, you split the items into two halves of size N/2
- You generate all 2^(N/2) combinations for the left half and store them in an array (or hash map)
- You generate all 2^(N/2) combinations for the right half
- You then **merge** the two halves to find the answer

### The Math

- Time to generate left half: O(2^(N/2))
- Time to generate right half: O(2^(N/2))
- Total time before merging: O(2^(N/2))
- For N=40, O(2²⁰) + O(2²⁰) ≈ 2 × 10⁶. This is easily within the time limit. 2⁴⁰ ≈ 10¹² operations would take many minutes; 2·10⁶ take milliseconds
