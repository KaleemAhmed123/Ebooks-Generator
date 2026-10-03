### The trap

- **Assuming `.indexOf()` is O(1):** A classic beginner mistake in JavaScript/TypeScript is calling `arr.indexOf(target)` inside a `for` loop. `indexOf` is just a hidden Linear Search. Putting it inside an O(N) loop creates a silent O(N²) bottleneck.
- **The fix:** If you need to repeatedly check for existence, convert the array to a `Set` first.

:::interview
"Why not just sort it first so we can binary search?"

Sorting takes O(N log N). If we only need to perform exactly *one* query, doing a simple O(N) linear search is strictly faster than sorting. We only sort if we are doing *multiple* queries.
:::
