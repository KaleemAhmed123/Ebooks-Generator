## The constraint table <span class="lv lv1"></span>

- This table maps every common constraint pattern to its candidate algorithms. Use it as a starting point — not a decision tree, but a shortlist generator

| Constraint | Complexity ceiling | Candidate approaches |
|---|---|---|
| n ≤ 10–12 | O(n! · n) | Permutation brute force, backtracking |
| n ≤ 20 | O(2ⁿ · n) | Bitmask DP, subset enumeration |
| n ≤ 40 | O(2ⁿ/²) | Meet-in-the-middle |
| n ≤ 100 | O(n⁴) | Four nested loops, small matrix DP |
| n ≤ 500 | O(n³) | Floyd-Warshall, interval DP, 3D DP |
| n ≤ 5,000 | O(n²) | Simple DP, pairwise comparison, LIS quadratic |
| n ≤ 10⁵ | O(n log n) | Sorting, segment tree, binary search, merge sort tree |
| n ≤ 10⁶ | O(n) or O(n log n) | Two pointers, sliding window, prefix sum, monotonic stack |
| n ≤ 10⁷ | O(n) | Linear scan, sieve, counting sort |
| n ≤ 10⁸ | O(n) tight | Single pass, mathematical formula |
| n ≤ 10¹⁸ | O(log n) or O(√n) | Binary search, matrix exponentiation, digit DP, baby-giant |
