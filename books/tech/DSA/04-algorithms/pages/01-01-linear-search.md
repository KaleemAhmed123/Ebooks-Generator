## Linear Search

- The absolute simplest algorithm: start at the beginning, check every element until you find the target or reach the end.
- Time complexity is exactly O(N) because, in the worst case, you must inspect every single element.
- It requires zero preprocessing. The data does not need to be sorted.

:::mint
<svg viewBox="0 0 470 140" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Linear search scanning an array">
  <!-- Array boxes -->
  <rect x="20" y="40" width="40" height="40" class="b" />
  <rect x="60" y="40" width="40" height="40" class="b" />
  <rect x="100" y="40" width="40" height="40" class="b" />
  <rect x="140" y="40" width="40" height="40" class="b" />
  <rect x="180" y="40" width="40" height="40" class="b" />
  
  <text x="35" y="65" class="l">4</text>
  <text x="75" y="65" class="l">9</text>
  <text x="115" y="65" class="l">1</text>
  <text x="155" y="65" class="l">7</text>
  <text x="195" y="65" class="l">2</text>
  
  <!-- Search indicator -->
  <path d="M40 100 L40 90" class="a" marker-end="url(#arrow)" />
  <text x="25" y="115" class="s">Target: 7</text>
  <text x="25" y="125" class="s">Scan L to R</text>
  
  <path d="M225 60 L245 60" class="a" marker-end="url(#arrow)" />
  <text x="255" y="65" class="l">O(N)</text>
</svg>
:::

- We use Linear Search when constraints are very small (e.g., N ≤ 10⁵ if searching once) or when the input array is completely unsorted and we cannot afford the O(N log N) penalty to sort it first.
- If we need to search the same unsorted array Q times, Linear Search becomes O(Q · N). In this scenario, it is mathematically cheaper to sort the array once O(N log N) and then perform Binary Search O(Q log N), giving a total of O(N log N + Q log N).

### Implementation

```ts
// The most basic linear scan
function linearSearch(arr: number[], target: number): number {
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] === target) return i;
  }
  return -1; // Not found
}
```

### The trap

- **Assuming `.indexOf()` is O(1):** A classic beginner mistake in JavaScript/TypeScript is calling `arr.indexOf(target)` inside a `for` loop. `indexOf` is just a hidden Linear Search. Putting it inside an O(N) loop creates a silent O(N²) bottleneck.
- **The fix:** If you need to repeatedly check for existence, convert the array to a `Set` first.

:::interview
"Why not just sort it first so we can binary search?"

Sorting takes O(N log N). If we only need to perform exactly *one* query, doing a simple O(N) linear search is strictly faster than sorting. We only sort if we are doing *multiple* queries.
:::
