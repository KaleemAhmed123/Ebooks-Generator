## Can we remember it?

- When the bottleneck is re-computing the same answer or re-finding the same value, the transformation is to spend space to remember it
- This is the core mechanism behind both Dynamic Programming and Hash Maps

### The Hash Map transformation

- **The bottleneck:** "I am at element X, and I need to know if Y exists somewhere else in the data."
- **Brute force:** A nested loop scans the array looking for Y. Time: O(n) per lookup.
- **Transformation:** Build a Hash Set or Hash Map. The lookup drops to O(1). Total time drops from O(n²) to O(n).

```ts
// Before: O(n) lookup per element → O(n²) total
for (let i = 0; i < arr.length; i++)
  for (let j = i + 1; j < arr.length; j++)
    if (arr[i] + arr[j] === target) return [i, j];

// After: O(1) lookup per element → O(n) total
const seen = new Map<number, number>();
for (let i = 0; i < arr.length; i++) {
  const complement = target - arr[i];
  if (seen.has(complement)) return [seen.get(complement)!, i];
  seen.set(arr[i], i);
}
```

- *Classic problems:* Two Sum, Longest Consecutive Sequence, Subarray Sum Equals K.

### The Dynamic Programming transformation

- **The bottleneck:** "I am trying to solve a problem for a specific state, but I already solved this exact state on a different branch."
- **Brute force:** Plain recursion. Time: Exponential O(2ⁿ).
- **Transformation:** Create an array or map where `cache[state] = answer`. Before computing, check the cache. After computing, write to the cache. Time drops to O(number of unique states).
- *Classic problems:* Fibonacci, Knapsack, Word Break.

### The space cost

- Remembering things costs memory. You are trading O(1) space for O(n) space (or O(n²) space for 2D DP)
- Always check the constraints. If n = 10⁵, an O(n) hash map is perfectly fine (a few megabytes). An O(n²) cache table is 40 gigabytes. You cannot afford to remember everything in 2D

### The trap

- **Hashing the wrong thing.** In the "Subarray Sum Equals K" problem, beginners try to hash the subarrays themselves. There are O(n²) subarrays. The correct approach is to hash the *prefix sums*. You must figure out the exact minimal state to remember

:::interview
"Your recursive solution is too slow. How would you speed it up?" — I would check if the function is being called with the same arguments more than once. If it is, I would add a cache — an array or hash map keyed by the arguments. Before computing, check the cache. After computing, store the result. This is memoisation, and it converts exponential-time recursion into polynomial-time DP.
:::
