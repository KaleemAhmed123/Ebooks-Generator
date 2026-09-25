### Variations

- **Next Greater Element III (LeetCode 556):** the same steps on the digits of an integer. Return −1 when there is no dip or when the result exceeds 2³¹ − 1
- **Last permutation wraps around:** with no dip (`[3, 2, 1]`), `i` ends at −1, step 2 is skipped, and the full reversal returns the smallest arrangement `[1, 2, 3]`, which is what LeetCode 31 asks for
- **Previous Permutation With One Swap (LeetCode 1053):** mirror image: find the first `a[i] > a[i+1]` scanning from the right, swap with the largest smaller value to its right, and do *not* reverse, because only one swap is allowed. On equal candidates take the leftmost
- **Permutation Sequence (LeetCode 60):** calling next permutation k times is O(n · k). Jump straight there by writing k − 1 in the factorial number system

### The failure

- **Strict comparisons with duplicates.** Step 1 needs `>=` and step 2 needs `<=`. With `>` in step 1, `[2, 2]` treats the equal pair as a dip, finds no larger value, and walks `j` off the front of the array. With `<` in step 2, `[2, 3, 2]` swaps the dip 2 with the *equal* 2 and returns `[2, 2, 3]`, a smaller arrangement; the answer is `[3, 2, 2]`
- **Sorting the suffix.** Correct but O(n log n). The suffix is already in descending order, so reversing it is enough and keeps the whole algorithm O(n)

:::interview
"Why reverse instead of sort after the swap?" — Before the swap the suffix was non-increasing. I swapped `a[i]` with the rightmost value greater than it, so the value that moved into the suffix fits in the same position without breaking the order. The suffix is still non-increasing, and reversing a non-increasing run sorts it in O(n).
:::
