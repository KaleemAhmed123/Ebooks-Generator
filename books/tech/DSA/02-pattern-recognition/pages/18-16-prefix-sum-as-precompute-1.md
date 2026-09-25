## Prefix Sums as Precompute 🟡

- Prefix Sums are the simplest form of the Precompute pattern. They rely on the mathematical property of **invertibility**

### The mechanism

- You precompute a cumulative array where `prefix[i]` is the sum of all elements from index 0 to `i-1`
- To find the sum of range `[L, R]`, you query `prefix[R+1] - prefix[L]`
- **Why it works:** `prefix[R+1]` contains the sum of everything from 0 to R. `prefix[L]` contains the sum of everything from 0 to L-1. By subtracting the latter from the former, you "chop off" the unwanted prefix, leaving exactly `[L, R]`

### The requirement: Invertibility

- The `-` operator is the inverse of the `+` operator. You can add something, and then reliably "un-add" it later
- Prefix precomputation **only works for invertible operations**:
  - ✅ **Sum:** Inverse is subtraction
  - ✅ **Multiplication:** Inverse is division (if no zeros)
  - ✅ **XOR:** Inverse is XOR (XORing the same number twice cancels it out)
  - ❌ **Minimum:** There is no inverse. If the minimum of a range is 2, and you "chop off" a 2, you have no idea what the new minimum is
  - ❌ **Maximum:** There is no inverse
