# The Choice Tree (Pick / Non-Pick)

## The Mental Model
The foundational way to think about DP and Backtracking. At every step, you either include the item or you don't. This covers: `pickNonPick`, `BackTracking`, `permutationCase`, and `uniqueRecurrence`.

## Algorithm Derivation
**Brute force:** Generate all $2^N$ combinations.
**↓**
**Why is it too slow?** Exponential time complexity.
**↓**
**What is being repeated?** We often reach the same `(index, current_sum)` state via different paths.
**↓**
**Can we remember it?** Memoize the state `(index, sum)` in a 2D array or HashMap.
**↓**
**Optimized Idea:** Return the cached result instead of traversing the sub-tree again.

## Implementation Template
```typescript
function solve(idx: number, target: number): number {
    if (target === 0) return 1;
    if (idx === n) return 0;
    if (memo[idx][target] !== -1) return memo[idx][target];
    
    // The Choice
    let nonPick = solve(idx + 1, target);
    let pick = 0;
    if (arr[idx] <= target) {
        pick = solve(idx + 1, target - arr[idx]);
    }
    
    return memo[idx][target] = pick + nonPick;
}
```
