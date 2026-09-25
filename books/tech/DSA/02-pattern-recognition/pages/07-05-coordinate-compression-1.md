## Coordinate Compression 🟢

- **What it is:** Mapping a sparse set of large values to a dense set of small integers while preserving their relative order
- **When to reach for it:** You need to use values as array indices (e.g., for a Fenwick tree or frequency array), but the values go up to 10⁹ while there are only 10⁵ of them
- **Why it works:** Many algorithms only care about the *relative ranking* of elements (A < B), not their absolute values (10 < 10⁹). Compression preserves the rank while shrinking the memory footprint

### The visual mechanism

- Original values: `[10, 999999999, 10, 55]`
- Sorted unique: `[10, 55, 999999999]`
- Ranks: `10` → `0`, `55` → `1`, `999999999` → `2`
- Compressed array: `[0, 2, 0, 1]`
