### The trap

- **Using a hash map when an array will do.** Hash maps have massive constant factor overhead. If your keys are just integers from 0 to 1000, use a simple array. It is technically the same Big-O space, but it runs 10x faster and uses 10x less memory
- **Forgetting that sorting mutates.** Using a sort to achieve O(1) space means you are destroying the original order of the input. If the caller needs that order preserved, you have to clone the array first — which costs O(n) space anyway

:::interview
"We need this to be faster than O(n²)."

To reduce the time, we need to avoid the inner loop's repeated scans. I can trade O(n) space to build a Hash Map of the elements on the first pass, bringing the total time down to O(n).
:::
