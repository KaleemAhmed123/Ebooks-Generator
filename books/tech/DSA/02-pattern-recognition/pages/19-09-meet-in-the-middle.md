## Meet in the Middle

- Backtracking (DFS) explores every possible combination. If there are $N$ items, generating all subsets takes $O(2^N)$ time
- $O(2^N)$ is perfectly fine if $N \le 20$. A modern CPU can easily do $2^{20} \approx 10^6$ operations
- But what if $N = 40$? $2^{40} \approx 10^{12}$, which will Time Limit Exceed (TLE). You cannot use standard DP because the state space is too sparse or the values are too large. You cannot use standard Backtracking because $O(2^{40})$ is too slow
- When you see $N \approx 40$ and you need to try combinations, you are looking at the **Meet in the Middle** fingerprint

### The Mechanism: Split and Merge

- Instead of searching $N$ items, you split the items into two halves of size $N/2$
- You generate all $2^{N/2}$ combinations for the left half and store them in an array (or hash map)
- You generate all $2^{N/2}$ combinations for the right half
- You then **merge** the two halves to find the answer

### The Math

- Time to generate left half: $O(2^{N/2})$
- Time to generate right half: $O(2^{N/2})$
- Total time before merging: $O(2^{N/2})$
- For $N=40$, $O(2^{20}) + O(2^{20}) \approx 2 \times 10^6$. This is easily within the time limit. You just turned a 1-year computation into a 5-millisecond computation

### The Merger

- Generating the halves is easy. The real algorithmic challenge of Meet in the Middle is the merge step
- **If you need exact matches:** (e.g. "Find a subset that sums to exactly K")
  - Generate left half sums, put them in a Hash Set
  - Generate right half sums. For each sum `S`, check if `K - S` exists in the left Hash Set. Merge time: $O(2^{N/2})$
- **If you need closest matches:** (e.g. "Find a subset sum as close to K as possible without exceeding it")
  - Generate left half sums, sort them
  - Generate right half sums. For each sum `S`, Binary Search the left array for the largest value $\le K - S$. Merge time: $O(2^{N/2} \log 2^{N/2}) = O(N \cdot 2^{N/2})$

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

If the target sum K is small (e.g. K = 10,000), you absolutely should use DP, running in O(N × K). But if K is 10^9, DP requires an array of size 10^9, which will memory limit exceed. Meet in the Middle does not depend on K for its complexity; it only depends on N.
:::
