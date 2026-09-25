### The Merger

- Generating the halves is easy. The real algorithmic challenge of Meet in the Middle is the merge step
- **If you need exact matches:** (e.g. "Find a subset that sums to exactly K")
  - Generate left half sums, put them in a Hash Set
  - Generate right half sums. For each sum `S`, check if `K - S` exists in the left Hash Set. Merge time: O(2^(N/2))
- **If you need closest matches:** (e.g. "Find a subset sum as close to K as possible without exceeding it")
  - Generate left half sums, sort them
  - Generate right half sums. For each sum `S`, Binary Search the left array for the largest value ≤ K - S. Merge time: O(2^(N/2) log 2^(N/2)) = O(N · 2^(N/2))

```ts
// Skeleton for "Closest Subset Sum <= K" with N=40
function meetInTheMiddle(arr: number[], K: number): number {
  const left = arr.slice(0, arr.length / 2);
  const right = arr.slice(arr.length / 2);
  
  const leftSums = generateAllSubsetSums(left);   // Size 2^20
  const rightSums = generateAllSubsetSums(right); // Size 2^20
  
  leftSums.sort((a, b) => a - b);
  
  let best = 0;
  for (const rSum of rightSums) {
    if (rSum > K) continue;
    // Binary search leftSums for largest value <= K - rSum
    const lSum = binarySearchLargestValid(leftSums, K - rSum);
    best = Math.max(best, lSum + rSum);
  }
  
  return best;
}
```

:::interview
"Why can't I just use Dynamic Programming for a Subset Sum problem with N=40?"

If the target sum K is small (e.g. K = 10,000), use DP, running in O(N × K). But if K is 10^9, DP requires an array of size 10^9, which will memory limit exceed. Meet in the Middle does not depend on K for its complexity; it only depends on N.
:::
