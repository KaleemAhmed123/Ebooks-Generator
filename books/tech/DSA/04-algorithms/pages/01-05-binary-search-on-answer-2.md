### The Core Template

```ts
function minCapacity(arr: number[], limit: number): number {
  let left = 1; // Absolute minimum possible answer
  let right = 1000000000; // Absolute maximum possible answer
  let best = right;

  while (left <= right) {
    const mid = left + Math.floor((right - left) / 2);
    
    // isValid takes O(N) time to simulate the process with capacity `mid`
    if (isValid(arr, limit, mid)) {
      best = mid;      // Feasible, but can we do it with less?
      right = mid - 1; // Squeeze left
    } else {
      left = mid + 1;  // Not feasible, we need more capacity
    }
  }
  return best;
}
```

### The trap

- **Overthinking the bounds:** Candidates waste 10 minutes trying to perfectly calculate the exact `right` bound. 
- **The fix:** It's binary search. The difference between 10⁹ and 10¹⁴ is just 15 extra iterations. If you aren't sure, set `right` to an outrageously large number (like `Number.MAX_SAFE_INTEGER`). Let the O(log N) math do the heavy lifting.

### Where it appears

| Problem | Why it belongs here |
|---|---|
| [Koko Eating Bananas](https://leetcode.com/problems/koko-eating-bananas/) (LeetCode 875) | Minimum eating speed: binary search on speed, feasibility check |
| [Capacity To Ship Packages Within D Days](https://leetcode.com/problems/capacity-to-ship-packages-within-d-days/) (LeetCode 1011) | Minimum capacity: FFFTTT on the capacity range |
| [Split Array Largest Sum](https://leetcode.com/problems/split-array-largest-sum/) (LeetCode 410) | Minimize the maximum subarray sum |
| [Magnetic Force Between Two Balls](https://leetcode.com/problems/magnetic-force-between-two-balls/) (LeetCode 1552) | Maximize minimum distance: search on the gap |
