### Combination Sum

- **Problem:** Given an array of distinct integers `candidates` and a target, return all unique combinations that sum to target. Each number may be used unlimited times
- **Key difference from subsets:** pass `i` (not `i + 1`) as the start index, allowing the same element to be reused. Pass `i + 1` for 0-1 (each element used at most once)

```ts
function combinationSum(candidates: number[], target: number): number[][] {
  const results: number[][] = [];
  const path: number[] = [];
  candidates.sort((a, b) => a - b);  // sort for pruning

  function backtrack(start: number, remaining: number): void {
    if (remaining === 0) { results.push([...path]); return; }
    for (let i = start; i < candidates.length; i++) {
      if (candidates[i] > remaining) break;  // prune: sorted, so all later are larger
      path.push(candidates[i]);
      backtrack(i, remaining - candidates[i]);  // i, not i+1: reuse allowed
      path.pop();
    }
  }

  backtrack(0, target);
  return results;
}
```

### The trap

- **Generating duplicates.** If the input is `[1, 1, 2]` and you do not skip duplicates, you get `[1, 2]` twice — once using the first `1`, once using the second. Sort the array, then after processing `nums[i]`, skip while the next element equals it
- **Forgetting to copy.** `results.push(path)` pushes a reference. When `path` mutates later, all stored results change. Always `results.push([...path])` or `path.slice()`
