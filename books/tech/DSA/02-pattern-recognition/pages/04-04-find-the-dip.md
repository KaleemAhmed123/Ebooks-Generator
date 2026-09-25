## Find the Dip 🟡

- **What it is:** To get the next larger arrangement, change the array as far to the *right* as possible. Scan from the right for the first dip `a[i] < a[i+1]`, swap `a[i]` with the smallest larger value to its right, then reverse the suffix
- **Signal:** "next permutation", "next greater number with the same digits", "smallest arrangement larger than this one", "lexicographically next"
- **Why it works:** A suffix that only falls (read left to right) is already its own largest arrangement; nothing can be gained by reordering it. So the change must happen at the dip just before it. Bumping `a[i]` by the smallest possible amount, then making the suffix as small as possible (ascending), gives the very next arrangement. The suffix is descending, so "sort ascending" is just "reverse"

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

### Variations

- **Next Greater Element III (LeetCode 556):** the same steps on the digits of an integer. Return −1 when there is no dip or when the result exceeds 2³¹ − 1
- **Last permutation wraps around:** with no dip (`[3, 2, 1]`), `i` ends at −1, step 2 is skipped, and the full reversal returns the smallest arrangement `[1, 2, 3]`, which is what LeetCode 31 asks for
- **Previous Permutation With One Swap (LeetCode 1053):** mirror image: find the first *rise* from the right, swap with the largest smaller value to its right, and do *not* reverse, because only one swap is allowed. On equal candidates take the leftmost
- **Permutation Sequence (LeetCode 60):** calling next permutation k times is O(n · k). Jump straight there by writing k − 1 in the factorial number system

### The failure

- **Strict comparisons with duplicates.** Step 1 needs `>=` and step 2 needs `<=`. With `>` in step 1, `[2, 2]` treats the equal pair as a dip, finds no larger value, and walks `j` off the front of the array. With `<` in step 2, `[2, 3, 2]` swaps the dip 2 with the *equal* 2 and returns `[2, 2, 3]`, a smaller arrangement; the answer is `[3, 2, 2]`
- **Sorting the suffix.** Correct but O(n log n). The suffix is already in descending order, so reversing it is enough and keeps the whole algorithm O(n)

:::interview
"Why reverse instead of sort after the swap?" — Before the swap the suffix was non-increasing. I swapped `a[i]` with the rightmost value greater than it, so the value that moved into the suffix fits in the same position without breaking the order. The suffix is still non-increasing, and reversing a non-increasing run sorts it in O(n).
:::
