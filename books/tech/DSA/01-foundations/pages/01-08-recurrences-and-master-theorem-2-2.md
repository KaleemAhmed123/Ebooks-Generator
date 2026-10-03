### The wrong approach

- **Applying it where it doesn't fit.** The Master Theorem *only* applies to divide-and-conquer recurrences. If your algorithm shrinks the input by subtraction instead of division — like T(n) = T(n-1) + n — the theorem does not apply
- That recurrence (common in basic DP or recursive Fibonacci) resolves to O(n²), not by the Master Theorem, but by arithmetic series summation

:::interview
"What is the complexity of an algorithm that recurses three times on inputs of size n/2, and takes O(n) time to merge?"

a=3, b=2, f(n)=n. Watershed is nlog₂ ³ ≈ n¹.⁵⁸. Since n¹.⁵⁸ > n¹, the leaves win. The complexity is O(nlog₂ ³).
:::
