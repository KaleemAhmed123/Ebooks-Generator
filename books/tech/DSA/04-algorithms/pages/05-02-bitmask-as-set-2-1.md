### Enumerating all subsets of a bitmask

Given a bitmask `mask`, iterate over every subset of it (every combination of its set bits):

```ts
// Iterate all non-empty subsets of mask
for (let sub = mask; sub > 0; sub = (sub - 1) & mask) {
  // sub is a subset of mask
}
// Don't forget the empty set (sub = 0) if needed
```

- **How it works:** `sub - 1` flips the lowest set bit and sets all lower bits. `& mask` forces those bits back onto the positions that belong to `mask`. This skips every integer that is not a subset
- **Complexity:** If `mask` has k set bits, this visits exactly 2ᵏ subsets — no wasted iterations

### When to use bitmasks

- **n ≤ 20:** Use a bitmask as the DP state (bitmask DP). The state space is 2²⁰ ≈ 10⁶ — fits in memory and time
- **n ≤ 15:** Enumerate all subsets of all masks. The total work is 3ⁿ (each element is in the outer mask, the inner subset, or neither). 3¹⁵ ≈ 14 million — tight but feasible
- **n > 30:** Bitmasks hit the 32-bit wall. Use BigInt or switch to a `Set`-based approach

### The trap

- **Forgetting that `1 << i` is signed 32-bit in JS.** For i = 31, the result is negative. For bitmask DP with n = 20, this is fine (bits 0–19). For n > 30, use `1n << BigInt(i)` with BigInt throughout
