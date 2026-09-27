## Backtracking Cost and Pruning

- The state-space tree for subsets has 2ⁿ leaves. For permutations it has n! leaves. Every leaf does O(n) work to copy the result. That gives O(n·2ⁿ) or O(n·n!) total — exponential either way
- This is not a flaw in backtracking. It is the cost of listing every valid answer. No algorithm can enumerate n! permutations faster than O(n·n!) — that many answers exist

### Pruning: cutting branches early

- **Pruning** means skipping an entire subtree when you can prove it will never produce a valid answer. It does not change the worst case, but it slashes the average case dramatically
- Prune by checking the constraint **before** recursing, not after

```ts
function backtrack(index: number, currentSum: number, target: number, nums: number[]): void {
  if (currentSum === target) { results.push([...path]); return; }
  for (let i = index; i < nums.length; i++) {
    // Prune: if adding nums[i] already exceeds target, skip it
    // (works because nums is sorted — all later elements are even larger)
    if (currentSum + nums[i] > target) break;
    path.push(nums[i]);
    backtrack(i + 1, currentSum + nums[i], target, nums);
    path.pop();
  }
}
```

### Common pruning strategies

- **Sort first, break early.** Sort the input. When the current candidate exceeds the bound, `break` — every candidate after it is larger and will also fail
- **Skip duplicates.** If the input has repeated values (e.g. `[1, 1, 2]`), identical siblings in the tree produce duplicate results. After processing `nums[i]`, skip all adjacent equal values: `while (i + 1 < n && nums[i + 1] === nums[i]) i++`
- **Capacity bounds.** In constraint-satisfaction problems (like N-Queens), check row, column, and diagonal conflicts before placing a queen. This prunes most branches at depth 1–3, reducing billions of candidates to thousands

### When to hand off to memoization

- Backtracking explores the full tree. If many branches revisit the **same state** and the answer depends only on the state (not the path), you are doing redundant work
- **The signal:** you see the same `(index, remainingCapacity)` or `(index, currentSum)` pair in multiple branches. Each visit recomputes the same subtree
- **The fix:** add a cache keyed by the state. This converts backtracking into top-down DP (memoization). The tree collapses from exponential branches into a polynomial state space
- **The rule:** if the number of distinct states is polynomial (e.g. n × W for knapsack), memoize. If the state includes the full path or a set of visited nodes, memoization rarely helps — the cache key space is itself exponential

:::interview
"Given n items with weights and values, and capacity W — backtracking or DP?"

Both work. Pure backtracking explores 2ⁿ subsets. But the state is just (index, remainingCapacity), which has only n × W distinct values. Adding a memo table collapses 2ⁿ branches into O(nW) states. Use DP. Backtracking without memoization is correct but exponentially slower here.
:::
