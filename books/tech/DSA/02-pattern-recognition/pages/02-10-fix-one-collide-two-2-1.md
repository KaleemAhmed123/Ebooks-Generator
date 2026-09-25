## Fix One, Collide Two 🟢 - continued

```ts
// 3Sum (LeetCode 15): all unique triplets with sum 0
function threeSum(nums: number[]): number[][] {
  nums.sort((a, b) => a - b);
  const out: number[][] = [];
  for (let i = 0; i < nums.length - 2; i++) {
    // same first value, same triplets
    if (i > 0 && nums[i] === nums[i - 1]) continue;
    let left = i + 1, right = nums.length - 1;
    while (left < right) {
      const sum = nums[i] + nums[left] + nums[right];
      if (sum < 0) left++;
      else if (sum > 0) right--;
      else {
        out.push([nums[i], nums[left], nums[right]]);
        while (left < right && nums[left] === nums[left + 1])
          left++;
        while (left < right && nums[right] === nums[right - 1])
          right--;
        left++; right--;
      }
    }
  }
  return out;
}
```

### Variations

- **Count Triplets with Sum Smaller than X (GFG):** when `sum < X`, every `right' ∈ (left, right]` also works, so add `right − left` and move `left`. Counting jumps a whole block at once, like page 02-04
- **3Sum Closest (LeetCode 16):** same loop, no dedupe; track the sum with the smallest `|sum − target|`
- **Valid Triangle Number (LeetCode 611):** fix the *largest* side `c` from the right; any `a + b > c` makes every `a'` between `a` and `b` work too, so add `right − left`
- **4Sum (LeetCode 18):** fix two with nested loops, collide two. Add the same duplicate skip to the second loop, and compute the sum in a way that cannot overflow in fixed-width languages
