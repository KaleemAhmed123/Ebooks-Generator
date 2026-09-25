### The Template

```ts
class RangeQuery {
  private prefix: number[];

  constructor(nums: number[]) {
    // We make prefix size N+1 to cleanly handle L=0 without out-of-bounds checks
    this.prefix = new Array(nums.length + 1).fill(0);
    for (let i = 0; i < nums.length; i++) {
      this.prefix[i + 1] = this.prefix[i] + nums[i];
    }
  }

  query(left: number, right: number): number {
    // Because prefix is 1-indexed internally, we query (right + 1) - (left)
    return this.prefix[right + 1] - this.prefix[left];
  }
}
```

### Prefix Hash Map (Subarray Sum equals K)

- If a problem asks "Find the total *number* of continuous subarrays whose sum equals K", you cannot just use a sliding window if there are negative numbers (because adding a number might decrease the sum, breaking monotonicity).
- **The insight:** If the current running sum is X, and we want a subarray that sums to K, we need to chop off a previous prefix that sums to X - K.
- We store every prefix sum we've seen so far in a Hash Map. At index i, we check if `currentSum - K` exists in the map. If it does, we found valid subarrays ending at i.
