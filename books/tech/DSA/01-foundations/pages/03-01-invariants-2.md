### The three checkpoints

1. **Initialisation:** Before the loop starts, is the invariant true? For binary search: `lo=0, hi=n-1` — the entire array is included. If target exists, it is in `arr[0..n-1]`. ✓
2. **Maintenance:** If the invariant is true before an iteration, is it true after? If `arr[mid] < target`, target cannot be at `mid` or to its left. Setting `lo = mid+1` excludes only elements that cannot be the target. Invariant preserved. ✓
3. **Termination:** When the loop ends, does the invariant give us the answer? If `lo > hi`, the window is empty — target does not exist. If `arr[mid] === target`, we found it. ✓

### Why this matters in interviews

- When your binary search has an off-by-one error, the invariant tells you exactly which line is wrong
- If you write `lo = mid` instead of `lo = mid + 1`, the invariant breaks: you are including `mid` in the next iteration even though you already checked it. The loop can get stuck

:::interview
"How do you know your binary search is correct?"

I maintain the invariant that the target, if it exists, is always within `arr[lo..hi]`. Each branch of the if-statement only excludes elements that provably cannot be the target. When the window becomes empty, the target does not exist.
:::
