## Reverse to Rotate <span class="lv lv1"></span>

- **What it is:** A rotation is three reversals. Reverse the whole array, then reverse each of the two parts. No buffer, each element moves twice
- **Signal:** "rotate the array right by k in place", "reverse the order of words", "rotate the string", "cyclically shift"
- **Why it works:** Write the array as `A B`, where `B` is the last k elements. Rotating right by k gives `B A`. Reversing the whole array gives `Bᴿ Aᴿ` (reversal flips the order of the blocks *and* the inside of each). Reversing each block again undoes the inside flip: `B A`

:::mint
<svg viewBox="0 0 470 110" role="img" aria-label="Rotate 1 2 3 4 5 6 7 right by 3. Reverse all gives 7 6 5 4 3 2 1. Reverse the first 3 gives 5 6 7. Reverse the last 4 gives 1 2 3 4. Result 5 6 7 1 2 3 4." xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif">
  <style>
    .lb { font: 10px Consolas, monospace; fill: #1a1a1a; }
    .sm { font: 8px Georgia, serif; fill: #6b6b6b; }
    .A { fill: #ffffff; stroke: #1a1a1a; stroke-width: 1.1; }
    .B { fill: #dbe7f5; stroke: #1d4e89; stroke-width: 1.1; }
  </style>
  <text x="14" y="25" class="sm">A B</text>
  <rect class="A" x="80" y="12" width="104" height="20"/><text x="132" y="26" class="lb" text-anchor="middle">1 2 3 4</text>
  <rect class="B" x="184" y="12" width="78" height="20"/><text x="223" y="26" class="lb" text-anchor="middle">5 6 7</text>
  <text x="14" y="55" class="sm">reverse all</text>
  <rect class="B" x="80" y="42" width="78" height="20"/><text x="119" y="56" class="lb" text-anchor="middle">7 6 5</text>
  <rect class="A" x="158" y="42" width="104" height="20"/><text x="210" y="56" class="lb" text-anchor="middle">4 3 2 1</text>
  <text x="14" y="85" class="sm">reverse each</text>
  <rect class="B" x="80" y="72" width="78" height="20"/><text x="119" y="86" class="lb" text-anchor="middle">5 6 7</text>
  <rect class="A" x="158" y="72" width="104" height="20"/><text x="210" y="86" class="lb" text-anchor="middle">1 2 3 4</text>
  <text x="290" y="26" class="lb">(A B)ᴿ = Bᴿ Aᴿ</text>
  <text x="290" y="56" class="lb">(Bᴿ)ᴿ = B, (Aᴿ)ᴿ = A</text>
  <text x="290" y="86" class="lb" fill="#1d4e89">B A  = rotated by k = 3</text>
</svg>
:::

```ts
// Rotate Array (LeetCode 189): rotate right by k, in place
function rotate(nums: number[], k: number): void {
  const n = nums.length;
  k %= n;                                   // k may exceed n
  reverse(nums, 0, n - 1);
  reverse(nums, 0, k - 1);
  reverse(nums, k, n - 1);
}

function reverse(a: number[], i: number, j: number): void {
  while (i < j) { [a[i], a[j]] = [a[j], a[i]]; i++; j--; }
}
```

### Variations

- **Reverse Words in a String (LeetCode 151):** the same identity on words. Reverse the whole string, then reverse each word; in a mutable char array this runs in O(1) extra space
- **Rotate left by k:** reverse the first k, reverse the rest, reverse all. Or rotate right by `n − k`
- **Cyclically rotate an array by one (GFG):** save the last element, shift, write it at index 0. The reversal trick is overkill for k = 1 but gives the same result
- **Rotate Image (LeetCode 48):** a 2-D rotation is also two reflections: transpose, then reverse each row. Page 05-02 draws it

### The failure

- **Forgetting `k %= n`.** With k = 10 on 7 elements, `reverse(nums, 0, 9)` swaps with `undefined` slots past the end and grows the array. Rotation by n is the identity, so reduce k first
- **Rotating one step k times.** Each single-step shift is O(n), so k steps cost O(n · k). With n = k = 10⁵ that is 10¹⁰ moves
- **Using an extra array and calling it in-place.** `nums = [...nums.slice(-k), ...nums.slice(0, -k)]` rebinds a local variable; the caller's array is unchanged. It is also O(n) extra space

:::interview
"Can you rotate in O(1) space without the reversal trick?" — Yes, with cycle-following: move each element to `(i + k) % n`, carrying the displaced one onward; there are `gcd(n, k)` independent cycles. It is correct but easy to get wrong under pressure. The three reversals give the same O(n) time, O(1) space with three calls to one tiny helper.
:::
