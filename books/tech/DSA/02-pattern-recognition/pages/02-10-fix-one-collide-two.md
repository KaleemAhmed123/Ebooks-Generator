## Fix One, Collide Two <span class="lv lv1"></span>

- **What:** fix the first element with a loop, then collide two pointers (02-08) on the rest. k-Sum costs O(n^(k−1))
- **Spot it:** "all unique triplets summing to 0", "closest sum", "count triangles". The order i < j < k must hold → 03-04 / 03-05
- **Why:** with `a[i]` fixed it is a two-sum on a sorted suffix, and sorting puts duplicates side by side

:::mint
<svg viewBox="0 0 470 92" role="img" aria-label="Sorted array minus 4, minus 1, minus 1, 0, 1, 2. Index i is fixed at minus 1. Left starts after i and right at the end. The sum minus 1 plus minus 1 plus 2 equals 0, a triplet." xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif">
  <style>
    .lb { font: 10px Consolas, monospace; fill: #1a1a1a; }
    .sm { font: 8px Georgia, serif; fill: #6b6b6b; }
    .bx { fill: #ffffff; stroke: #1a1a1a; stroke-width: 1.1; }
    .fx { fill: #dbe7f5; stroke: #1d4e89; stroke-width: 1.2; }
    .hi { fill: #e2fcf3; stroke: #2d6a4f; stroke-width: 1.1; }
    .a { stroke: #1a1a1a; stroke-width: 1; fill: none; }
  </style>
  <defs><marker id="m0210" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="5" markerHeight="5" orient="auto"><path d="M0 0L10 5L0 10z" fill="#1a1a1a"/></marker></defs>
  <rect class="bx" x="20" y="14" width="36" height="24"/><text x="38" y="30" class="lb" text-anchor="middle">−4</text>
  <rect class="fx" x="56" y="14" width="36" height="24"/><text x="74" y="30" class="lb" text-anchor="middle">−1</text>
  <rect class="hi" x="92" y="14" width="36" height="24"/><text x="110" y="30" class="lb" text-anchor="middle">−1</text>
  <rect class="bx" x="128" y="14" width="36" height="24"/><text x="146" y="30" class="lb" text-anchor="middle">0</text>
  <rect class="bx" x="164" y="14" width="36" height="24"/><text x="182" y="30" class="lb" text-anchor="middle">1</text>
  <rect class="hi" x="200" y="14" width="36" height="24"/><text x="218" y="30" class="lb" text-anchor="middle">2</text>
  <text x="74" y="52" class="sm" text-anchor="middle" fill="#1d4e89">i (fixed)</text>
  <text x="110" y="52" class="sm" text-anchor="middle">left →</text>
  <text x="218" y="52" class="sm" text-anchor="middle">← right</text>
  <text x="20" y="78" class="lb">−1 + (−1) + 2 = 0 → record, then skip equal neighbours on both sides</text>
  <text x="260" y="30" class="sm">sum &lt; 0 → left++ (need bigger)</text>
  <text x="260" y="44" class="sm">sum &gt; 0 → right−− (need smaller)</text>
</svg>
:::

```ts
// 3Sum (LeetCode 15): all unique triplets with sum 0
function threeSum(nums: number[]): number[][] {
  nums.sort((a, b) => a - b);
  const out: number[][] = [];
  for (let i = 0; i < nums.length - 2; i++) {
    if (i > 0 && nums[i] === nums[i - 1]) continue;   // same first value
    let left = i + 1, right = nums.length - 1;
    while (left < right) {
      const sum = nums[i] + nums[left] + nums[right];
      if (sum < 0) left++;
      else if (sum > 0) right--;
      else {
        out.push([nums[i], nums[left++], nums[right--]]);
        while (left < right && nums[left] === nums[left - 1]) left++;
      }
    }
  }
  return out;
}
```

- **Watch out:** skip duplicates only *after* recording a match, and compare the fixed value with its *previous* neighbour: `nums[i] === nums[i + 1]` drops `[−1, −1, 2]`

### Where it appears

| Problem | What you fix, what you collide |
|---|---|
| [3Sum](https://leetcode.com/problems/3sum/) (LeetCode 15) | fix `nums[i]`; two-sum the rest to `−nums[i]` |
| [3Sum Closest](https://leetcode.com/problems/3sum-closest/) (LeetCode 16) | same structure; track min distance instead of exact match |
| [Valid Triangle Number](https://leetcode.com/problems/valid-triangle-number/) (LeetCode 611) | fix the largest side; a valid pair adds `right − left` at once |
| [4Sum](https://leetcode.com/problems/4sum/) (LeetCode 18) | fix two values (nested loop); collide the remaining pair |

:::interview
"How do you extend this to 4Sum or k-Sum in general?"

Add one more outer loop: fix two values, then collide two. Each extra fixed value adds an O(n) loop, so k-Sum is O(n^(k−1)). The dedup logic repeats at every fixed level — skip `nums[j] === nums[j − 1]` at each loop, not just the outermost one.
:::
