# Divide, Conquer & Merge

## The Mental Model
Breaking an array down to a single element and building it back up. Covers `merge`, `partition`, and `divideAndConquer`.

## Algorithm Derivation
**Brute force:** Sorting or counting inversions by comparing every pair $O(N^2)$.
**↓**
**Why is it too slow?** We re-evaluate elements that are already sorted relative to each other.
**↓**
**Can we exploit structure?** If two halves are already sorted, merging them takes only $O(N)$.
**↓**
**Optimized Idea:** Split until size 1. Merge sorted halves. While merging, count cross-inversions. $O(N \log N)$.

## Canonical Usages
*   **Merge Sort**
*   **Count Inversions:** `if (left[i] > right[j]) inversions += (mid - i + 1)`
*   **Reverse Pairs**
