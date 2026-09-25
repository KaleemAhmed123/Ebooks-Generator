## Precompute worked problems 🟡

### Problem 1: Subarray Sum Equals K

- **Problem:** Given an array of integers and an integer `k`, return the total number of continuous subarrays whose sum equals to `k`
- **Why it is a precompute problem:** We need to check many range sums. The data is static. Sum is an invertible operation. We need Prefix Sums

**Derivation:**
1. **The mathematical translation:** The sum of subarray `[i, j]` is `prefix[j] - prefix[i-1]`. We want `prefix[j] - prefix[i-1] == k`
2. **The algebra:** Rearrange to `prefix[i-1] == prefix[j] - k`
3. **The algorithm:** As we iterate through the array building the prefix sum, we don't need to look back at all previous prefix sums. We just use a Hash Map to precompute and store the *frequencies* of every prefix sum we have seen so far

```ts
function subarraySum(nums: number[], k: number): number {
  let count = 0;
  let currentSum = 0;
  // Map of prefixSum -> frequency. Initialize with 0: 1 for exact matches
  const prefixMap = new Map<number, number>();
  prefixMap.set(0, 1);

  for (const num of nums) {
    currentSum += num;
    
    // Check if the required prefix exists
    const required = currentSum - k;
    if (prefixMap.has(required)) {
      count += prefixMap.get(required)!;
    }
    
    // Add current sum to map
    prefixMap.set(currentSum, (prefixMap.get(currentSum) || 0) + 1);
  }
  
  return count;
}
```

### Problem 2: Range Minimum Query (Static)

- **Problem:** Given a static array, answer Q queries of the form "What is the minimum element between index L and R?"
- **Why it is a precompute problem:** Large Q, static data. Minimum is idempotent. We need a Sparse Table

**Derivation:**
1. **Precompute:** Build a table where `st[i][j]` is the minimum of a block starting at `i` of length 2ʲ
2. **Base case:** `st[i][0] = arr[i]` (length 2⁰ = 1)
3. **Transition:** `st[i][j] = min(st[i][j-1], st[i + 2^(j-1)][j-1])`. Two blocks of length 2ʲ⁻¹ combine to form a block of length 2ʲ

```ts
function buildSparseTable(arr: number[]): number[][] {
  const n = arr.length;
  const k = Math.floor(Math.log2(n)) + 1;
  const st = Array.from({ length: n }, () => new Array(k).fill(0));

  for (let i = 0; i < n; i++) st[i][0] = arr[i];

  for (let j = 1; j < k; j++) {
    for (let i = 0; i + (1 << j) <= n; i++) {
      st[i][j] = Math.min(st[i][j - 1], st[i + (1 << (j - 1))][j - 1]);
    }
  }
  return st;
}

function queryMin(st: number[][], L: number, R: number): number {
  const j = Math.floor(Math.log2(R - L + 1));
  return Math.min(st[L][j], st[R - (1 << j) + 1][j]); // O(1) overlap query
}
```

### The pattern across both

- Neither problem uses complex traversal logic
- Both transform the query into an O(1) lookup against a pre-built structure
- The choice of structure is dictated purely by the math of the operation (Sum = invertible → Prefix Map; Min = idempotent → Sparse Table)
