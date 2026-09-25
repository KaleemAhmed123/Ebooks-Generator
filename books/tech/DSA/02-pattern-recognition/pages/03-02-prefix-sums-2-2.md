### The trap

- **Forgetting the empty prefix.** When building a Prefix Hash Map, you MUST initialise the map with `{ 0: 1 }`. This represents the "empty" prefix before the array starts. If a subarray starting at index 0 sums perfectly to K, `currentSum - K` will equal 0. If `0` is not in the map, you will fail to count it.

:::interview
"What is the space complexity of a Prefix Hash Map?"

It is O(N) because in the worst case (all positive numbers), every prefix sum is unique and must be stored in the map. This is the trade-off for reducing the O(N²) time complexity of checking all subarrays down to O(N).
:::
