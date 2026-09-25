## Coordinate Compression <span class="lv lv1"></span>

- **What it is:** Mapping a sparse set of large values to a dense set of small integers while preserving their relative order
- **When to reach for it:** You need to use values as array indices (e.g., for a Fenwick tree or frequency array), but the values go up to 10⁹ while there are only 10⁵ of them
- **Why it works:** Many algorithms only care about the *relative ranking* of elements (A < B), not their absolute values (10 < 10⁹). Compression preserves the rank while shrinking the memory footprint

### The visual mechanism

- Original values: `[10, 999999999, 10, 55]`
- Sorted unique: `[10, 55, 999999999]`
- Ranks: `10` → `0`, `55` → `1`, `999999999` → `2`
- Compressed array: `[0, 2, 0, 1]`

### The Template

```ts
function compressCoordinates(arr: number[]): number[] {
  // 1. Get unique sorted values
  const uniqueSorted = Array.from(new Set(arr)).sort((a, b) => a - b);
  
  // 2. Map original values to their index (rank) in the sorted array
  // Binary search takes O(log U) per element, total O(n log U)
  const compressed = arr.map(val => {
    // Implement lowerBound() as defined previously
    return lowerBound(uniqueSorted, val); 
  });
  
  return compressed;
}
```

*Note: In JS/TS, a Map object can also be used for O(1) lookups instead of binary search, trading a bit of memory for speed.*

### The trap

- **Allocating massive arrays.** If a problem says constraints are N ≤ 10⁵ but the values A_i ≤ 10⁹, a beginner might try `let counts = new Array(10**9)`. This will instantly crash with an Out of Memory error. You must compress the 10⁵ values into the range `0...100,000` first. Coordinate compression is the canonical bridge between Order patterns and Range Interaction patterns (like Segment Trees)
