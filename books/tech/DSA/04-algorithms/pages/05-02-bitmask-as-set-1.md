## Bitmask as a Set <span class="lv lv2"></span>

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
