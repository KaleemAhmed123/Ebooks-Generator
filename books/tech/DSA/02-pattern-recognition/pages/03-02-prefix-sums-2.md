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

### The failure

- **`prefix[R] − prefix[L − 1]` with an n-sized array.** At L = 0 it reads `prefix[−1]`, which is `undefined` in JS, and the answer becomes `NaN`. Size the array n + 1 as above. Counting subarrays by sum (a prefix *map*) is 03-03
