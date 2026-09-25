## Precompute worked problems <span class="lv lv2"></span>

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
