## Bit Manipulation Basics <span class="lv lv1"></span>

- Computers store integers in binary. **Bit manipulation** operates directly on those binary digits using bitwise operators, bypassing arithmetic entirely. It is fast (single CPU instruction) and constant space
- **Two's complement** is how negative integers are stored. For a 32-bit integer, flip every bit of the positive value, then add 1. The result: `−1` is `11111111111111111111111111111111` (all ones). The top bit (bit 31) is the sign bit — 1 means negative

### The six operators

| Operator | Symbol | What it does | Example (4-bit) |
|---|---|---|---|
| AND | `a & b` | 1 only where both bits are 1 | `1100 & 1010 = 1000` |
| OR | `a \| b` | 1 where either bit is 1 | `1100 \| 1010 = 1110` |
| XOR | `a ^ b` | 1 where bits differ | `1100 ^ 1010 = 0110` |
| NOT | `~a` | Flip every bit | `~1100 = 0011` (plus sign bit) |
| Left shift | `a << k` | Shift bits left by k, fill with 0 | `0011 << 1 = 0110` (multiply by 2ᵏ) |
| Right shift | `a >> k` | Shift bits right by k (sign-extending) | `1100 >> 1 = 1110` (preserves sign) |

### JavaScript's 32-bit trap

- JavaScript stores all numbers as 64-bit floats. But bitwise operators **silently convert** the operand to a **signed 32-bit integer**, perform the operation, then convert back. This means:
  - `(1 << 31)` produces `−2147483648` (the sign bit is set), not `2147483648`
  - `(1 << 32)` produces `1` (the shift wraps around mod 32)
  - Numbers above 2³¹ − 1 lose their upper bits silently
- **BigInt** avoids this. `1n << 32n` works correctly. But BigInt cannot be mixed with regular numbers — `1n + 2` throws a TypeError. Use BigInt when bit widths exceed 31
