## Exactly K by Subtraction <span class="lv lv2"></span> - continued

```ts
// Subarrays with K Different Integers (LeetCode 992)
function subarraysWithKDistinct(nums: number[], k: number): number {
  return atMost(nums, k) - atMost(nums, k - 1);
}
function atMost(nums: number[], k: number): number {
  // atMost(−1) is empty, not a loop
  if (k < 0) return 0;
  const freq = new Map<number, number>();
  let left = 0, count = 0;
  for (let right = 0; right < nums.length; right++) {
    freq.set(nums[right], (freq.get(nums[right]) ?? 0) + 1);
    // too many distinct: shrink
    while (freq.size > k) {
      const v = nums[left++];
      const c = freq.get(v)! - 1;
      c === 0 ? freq.delete(v) : freq.set(v, c);
    }
    // count by the right end
    count += right - left + 1;
  }
  return count;
}
```

### Variations

- **Binary Subarrays With Sum (LeetCode 930):** on a 0/1 array the window sum is the count of ones. `atMost(goal) − atMost(goal − 1)`, with `atMost(−1) = 0`
- **Count Number of Nice Subarrays (LeetCode 1248):** map each number to `n % 2`. "Exactly K odd numbers" becomes the binary problem above
- **Same answer, other route:** a prefix-count map (page 03-03) also solves both, in one pass. The subtraction trick wins when the condition is "distinct values", which a prefix sum cannot express
