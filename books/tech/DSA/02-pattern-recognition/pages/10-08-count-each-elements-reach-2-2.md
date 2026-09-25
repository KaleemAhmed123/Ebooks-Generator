### The failure

- **The same tie rule on both sides.** On `[1, 1]` (true answer 3): stop at a smaller-*or-equal* element on both sides and the subarray `[1, 1]` belongs to nobody, giving 2; stop only at *strictly* smaller elements on both sides and it belongs to both, giving 4. One side strict, the other non-strict, gives every subarray exactly one owner
- **Overflow of `a[i] · left · right`.** Values up to 3 · 10⁴ and n up to 3 · 10⁴ make the product reach about 7 · 10¹² (left · right ≤ n²/4): fine in a JS number, but it overflows 32-bit integers, and in some languages even the running sum needs 64-bit before the `% MOD`

:::interview
"How do you sum the minimum of all subarrays in O(n)?" — I turn it around and count, for each element, how many subarrays it is the minimum of. That is the number of valid starts times the number of valid ends, found from the previous smaller and next smaller elements with two monotonic-stack passes. The only subtle part is ties: strict on one side, non-strict on the other.
:::
