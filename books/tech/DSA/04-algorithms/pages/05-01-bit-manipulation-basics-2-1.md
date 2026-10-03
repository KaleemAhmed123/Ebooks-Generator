### Essential bit tricks

```ts
// Check if the ith bit is set
(n & (1 << i)) !== 0

// Set the ith bit
n | (1 << i)

// Clear the ith bit
n & ~(1 << i)

// Toggle the ith bit
n ^ (1 << i)

// Check if n is a power of two (exactly one bit set)
n > 0 && (n & (n - 1)) === 0

// Clear the lowest set bit
n & (n - 1)

// Isolate the lowest set bit
n & (-n)
```

### The trap

- **Shifting by 31 or more in JS.** `1 << 31` is negative. `1 << 32` wraps to `1`. If you need bit 31 or beyond, use `1n << BigInt(i)` or unsigned right shift `>>>` which treats the result as unsigned
