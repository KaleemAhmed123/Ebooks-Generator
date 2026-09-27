## Bitmask as a Set

- A **bitmask** is an integer whose binary representation encodes a set. Bit `i` is 1 if element `i` is in the set, 0 otherwise. The integer `13` = `1101` in binary represents the set {0, 2, 3}
- This replaces `Set` or `boolean[]` as a hash key. A single integer is trivially hashable and uses O(1) space. The constraint: the universe must be small (≤ 30 elements for 32-bit integers, ≤ 52 with BigInt)

### Set operations as bit operations

| Set operation | Bitmask equivalent | Example |
|---|---|---|
| Union A ∪ B | `a \| b` | `1010 \| 0110 = 1110` |
| Intersection A ∩ B | `a & b` | `1010 & 0110 = 0010` |
| Difference A \ B | `a & ~b` | `1010 & ~0110 = 1000` |
| Complement of A | `~a & full` | `~1010 & 1111 = 0101` |
| Is B subset of A? | `(b & a) === b` | checks every bit in B is in A |
| Size of set | `popcount(a)` | count the 1-bits |
| Is set empty? | `a === 0` | |

### Popcount (counting set bits)

```ts
function popcount(n: number): number {
  let count = 0;
  while (n !== 0) {
    n &= (n - 1);   // clears the lowest set bit
    count++;
  }
  return count;
}
```

- Each iteration removes exactly one bit. Runs in O(k) where k is the number of set bits — usually faster than O(32)

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

:::interview
"Given n people and n tasks with a cost matrix, assign each person exactly one task to minimize total cost."

This is the Assignment Problem. State: `dp[mask]` = minimum cost to assign tasks to the people whose bits are set in `mask`. Transition: for the next unassigned person, try every unassigned task. With n ≤ 20, the state space is 2²⁰ × 20 ≈ 20 million — fast enough. Without the bitmask, brute force is O(n!) which fails at n = 13.
:::
