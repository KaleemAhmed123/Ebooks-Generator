## Why patterns are not techniques

- A "technique" is a specific mechanical operation: *Two Pointers*, *Sliding Window*, *Binary Search*
- A "pattern" is the underlying structural reason that technique works: *Locality*, *Order*, *Search Space Reduction*
- Memorising techniques allows you to solve problems you have seen before. Understanding patterns allows you to solve problems you haven't

### The failure of the "LeetCode tags" approach

- Most candidates study by tag: "Today I will do 10 Sliding Window problems."
- The problem: In an interview, the problem does not come with a tag
- If you only know *how* to write a sliding window, you will sit in an interview trying to force a sliding window onto a problem that actually needs a Hash Map, because you cannot see the underlying structure

### The structural approach

- Every problem has a bottleneck (as seen in Module 1)
- The bottleneck demands a specific structural property to fix it
- For example: if the bottleneck is "I need to find the optimal pair, and checking all pairs is O(n²)", you need a structural property that lets you **eliminate candidates without checking them**
- **Order** (sorting) provides that property. Once sorted, Two Pointers is just the technique used to exploit the Order pattern

### The taxonomy of this book

- This module groups algorithms not by their mechanical names, but by the structural property they exploit
- When you read a problem, you don't ask "Is this a Two Pointer problem?"
- You ask: "Does the answer depend on a local contiguous range? Yes? Then this is a **Locality** pattern. What techniques exploit locality? Sliding Window and Monotonic Stack."

:::interview
"I've done 300 problems but I still blank in interviews when I see a new one."

You are memorising the technique (the *how*) instead of the pattern (the *why*). When the problem is disguised, the technique isn't obvious. But the structural bottleneck is always there if you look for it.
:::
