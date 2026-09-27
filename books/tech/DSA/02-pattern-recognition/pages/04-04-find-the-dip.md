## Find the Dip <span class="lv lv2"></span>

- **What:** for the next larger arrangement, change as far right as possible. Find the first dip `a[i] < a[i + 1]` from the right, swap `a[i]` with the smallest larger value to its right, reverse the suffix
- **Spot it:** "next permutation", "next greater number with the same digits", "lexicographically next". The first larger value to the right of *each* position → 10-05
- **Why:** a falling suffix is already its own largest arrangement, so the change must happen at the dip. After the swap the suffix still falls, so reversing sorts it in O(n)

:::mint
<svg viewBox="0 0 470 116" role="img" aria-label="Next permutation of 1 3 5 4 2. From the right the suffix 5 4 2 is falling. The dip is 3. The smallest value to its right that is larger than 3 is 4. Swap them to get 1 4 5 3 2, then reverse the suffix to get 1 4 2 3 5." xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif">
  <style>
    .lb { font: 10px Consolas, monospace; fill: #1a1a1a; }
    .sm { font: 8px Georgia, serif; fill: #6b6b6b; }
    .bx { fill: #ffffff; stroke: #1a1a1a; stroke-width: 1.1; }
    .dip { fill: #ffedf1; stroke: #ef476e; stroke-width: 1.2; }
    .suf { fill: #dbe7f5; stroke: #1d4e89; stroke-width: 1.1; }
    .hi { fill: #e2fcf3; stroke: #2d6a4f; stroke-width: 1.1; }
  </style>
  <text x="14" y="26" class="sm">1. find dip</text>
  <rect class="bx" x="100" y="12" width="30" height="22"/><text x="115" y="27" class="lb" text-anchor="middle">1</text>
  <rect class="dip" x="130" y="12" width="30" height="22"/><text x="145" y="27" class="lb" text-anchor="middle">3</text>
  <rect class="suf" x="160" y="12" width="30" height="22"/><text x="175" y="27" class="lb" text-anchor="middle">5</text>
  <rect class="suf" x="190" y="12" width="30" height="22"/><text x="205" y="27" class="lb" text-anchor="middle">4</text>
  <rect class="suf" x="220" y="12" width="30" height="22"/><text x="235" y="27" class="lb" text-anchor="middle">2</text>
  <text x="270" y="27" class="sm">suffix 5 4 2 only falls</text>
  <text x="14" y="62" class="sm">2. swap</text>
  <rect class="bx" x="100" y="48" width="30" height="22"/><text x="115" y="63" class="lb" text-anchor="middle">1</text>
  <rect class="hi" x="130" y="48" width="30" height="22"/><text x="145" y="63" class="lb" text-anchor="middle">4</text>
  <rect class="suf" x="160" y="48" width="30" height="22"/><text x="175" y="63" class="lb" text-anchor="middle">5</text>
  <rect class="dip" x="190" y="48" width="30" height="22"/><text x="205" y="63" class="lb" text-anchor="middle">3</text>
  <rect class="suf" x="220" y="48" width="30" height="22"/><text x="235" y="63" class="lb" text-anchor="middle">2</text>
  <text x="270" y="63" class="sm">3 ↔ smallest larger on the right (4)</text>
  <text x="14" y="98" class="sm">3. reverse suffix</text>
  <rect class="bx" x="100" y="84" width="30" height="22"/><text x="115" y="99" class="lb" text-anchor="middle">1</text>
  <rect class="hi" x="130" y="84" width="30" height="22"/><text x="145" y="99" class="lb" text-anchor="middle">4</text>
  <rect class="hi" x="160" y="84" width="30" height="22"/><text x="175" y="99" class="lb" text-anchor="middle">2</text>
  <rect class="hi" x="190" y="84" width="30" height="22"/><text x="205" y="99" class="lb" text-anchor="middle">3</text>
  <rect class="hi" x="220" y="84" width="30" height="22"/><text x="235" y="99" class="lb" text-anchor="middle">5</text>
  <text x="270" y="99" class="sm">suffix still falls → reversing sorts it</text>
</svg>
:::

```ts
// Next Permutation (LeetCode 31), in place
function nextPermutation(a: number[]): void {
  let i = a.length - 2;
  while (i >= 0 && a[i] >= a[i + 1]) i--;           // 1. the dip
  if (i >= 0) {
    let j = a.length - 1;
    // 2. rightmost value > a[i]
    while (a[j] <= a[i]) j--;
    //    (smallest such, since suffix falls)
    [a[i], a[j]] = [a[j], a[i]];
  }
  for (let l = i + 1, r = a.length - 1; l < r; l++, r--) {
    // 3. ascending suffix
    [a[l], a[r]] = [a[r], a[l]];
  }
}
```

- **Watch out:** duplicates need `>=` in step 1 and `<=` in step 2. With `<` in step 2, `[2, 3, 2]` swaps the dip with the equal 2 and returns `[2, 2, 3]`; the answer is `[3, 2, 2]`
### Where it appears

| Problem | What you permute |
|---|---|
| [Next Permutation](https://leetcode.com/problems/next-permutation/) (LeetCode 31) | the array itself |
| [Next Greater Element III](https://leetcode.com/problems/next-greater-element-iii/) (LeetCode 556) | digits of a number; −1 if result > 2³¹ − 1 |
| [Previous Permutation With One Swap](https://leetcode.com/problems/previous-permutation-with-one-swap/) (LeetCode 1053) | mirror image: find *rise* from right, no reverse |
| [Permutation Sequence](https://leetcode.com/problems/permutation-sequence/) (LeetCode 60) | jump to k-th directly via factorial number system |

:::interview
"Why does reversing the suffix sort it?"

After the swap, the suffix is still in descending order — the swap only exchanged one pair of values while preserving the descending property. Reversing a descending sequence makes it ascending, which is the same as sorting it — but in O(n) instead of O(n log n).
:::
