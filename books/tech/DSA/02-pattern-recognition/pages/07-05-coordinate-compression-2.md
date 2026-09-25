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
