## Prefix Sums 🟢

- **What it is:** An array where the value at index i is the sum of all elements from index 0 to i in the original array
- **When to reach for it:** You need to rapidly query the sum of elements between any two indices L and R
- **Why it works:** `Sum[L, R]` is mathematically identical to `Sum[0, R] - Sum[0, L-1]`. By precomputing all `Sum[0, i]`, any arbitrary range query becomes a single O(1) subtraction

### The visual mechanism

- Original: `[3, 1, 4, 1, 5]`
- Prefix: `[3, 4, 8, 9, 14]`
- Query sum of `[1, 3]` (values `1, 4, 1`, sum is `6`).
- Using Prefix: `Prefix[3] - Prefix[0]` = `9 - 3` = `6`.

:::mint
<svg viewBox="0 0 470 120" role="img" aria-label="Prefix sum calculation. The sum of range L to R is found by taking the prefix sum at R and subtracting the prefix sum just before L." xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif">
  <style>
    .lb { font: 9.5px Consolas, monospace; fill: #1a1a1a; }
    .sm { font: 8px Georgia, serif; fill: #6b6b6b; }
    .hi { fill: #e2fcf3; stroke: #2d6a4f; stroke-width: 1.1; }
    .bx { fill: #ffffff; stroke: #1a1a1a; stroke-width: 1.1; }
  </style>

  <!-- Array Indices -->
  <text x="55" y="25" class="sm">0</text><text x="95" y="25" class="sm">1</text>
  <text x="135" y="25" class="sm">2</text><text x="175" y="25" class="sm">3</text>
  <text x="215" y="25" class="sm">4</text>

  <!-- Prefix Array -->
  <text x="10" y="45" class="sm">Prefix</text>
  <rect class="hi" x="40" y="30" width="30" height="20" rx="2" />
  <rect class="bx" x="80" y="30" width="30" height="20" rx="2" />
  <rect class="bx" x="120" y="30" width="30" height="20" rx="2" />
  <rect class="hi" x="160" y="30" width="30" height="20" rx="2" />
  <rect class="bx" x="200" y="30" width="30" height="20" rx="2" />
  
  <text x="55" y="44" class="lb" text-anchor="middle">3</text>
  <text x="95" y="44" class="lb" text-anchor="middle">4</text>
  <text x="135" y="44" class="lb" text-anchor="middle">8</text>
  <text x="175" y="44" class="lb" text-anchor="middle">9</text>
  <text x="215" y="44" class="lb" text-anchor="middle">14</text>

  <!-- Explanation -->
  <text x="40" y="75" class="lb">Query [1, 3] = Prefix[3] - Prefix[0]</text>
  <text x="120" y="95" class="lb">= 9 - 3</text>
  <text x="120" y="115" class="lb" fill="#2d6a4f">= 6</text>
</svg>
:::

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

### The trap

- **Forgetting the empty prefix.** When building a Prefix Hash Map, you MUST initialise the map with `{ 0: 1 }`. This represents the "empty" prefix before the array starts. If a subarray starting at index 0 sums perfectly to K, `currentSum - K` will equal 0. If `0` is not in the map, you will fail to count it.

:::interview
"What is the space complexity of a Prefix Hash Map?"

It is O(N) because in the worst case (all positive numbers), every prefix sum is unique and must be stored in the map. This is the trade-off for reducing the O(N²) time complexity of checking all subarrays down to O(N).
:::
