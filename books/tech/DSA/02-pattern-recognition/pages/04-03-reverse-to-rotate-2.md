### The failure

- **Forgetting `k %= n`.** With k = 10 on 7 elements, `reverse(nums, 0, 9)` swaps with `undefined` slots past the end and grows the array. Rotation by n is the identity, so reduce k first
- **Rotating one step k times.** Each single-step shift is O(n), so k steps cost O(n · k). With n = k = 10⁵ that is 10¹⁰ moves
- **Using an extra array and calling it in-place.** `nums = [...nums.slice(-k), ...nums.slice(0, -k)]` rebinds a local variable; the caller's array is unchanged. It is also O(n) extra space

:::interview
"Can you rotate in O(1) space without the reversal trick?" — Yes, with cycle-following: move each element to `(i + k) % n`, carrying the displaced one onward; there are `gcd(n, k)` independent cycles. It is correct but easy to get wrong under pressure. The three reversals give the same O(n) time, O(1) space with three calls to one tiny helper.
:::
