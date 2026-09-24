## Brute force is not lazy

- A candidate who says "let me start with brute force" is not failing the interview. They are establishing a baseline. A candidate who immediately guesses "is this a Segment Tree?" and guesses wrong is failing
- Brute force proves you understand the problem requirements, the rules, and what a valid answer looks like

### What brute force reveals

- **The structure of the output:** Are we returning a number, a subset, an index, or a boolean?
- **The search space:** How many possible answers are there? If there are n² possible subarrays, the brute force checks them all
- **The bottleneck:** By writing the naive solution, you physically type the nested loop that makes it slow. You now know exactly which lines of code need to be replaced by a faster data structure

### The template for starting

1. **State it quickly:** "The brute force approach is to check every possible pair, which takes O(n²) time."
2. **Do not code it (yet):** Unless the interviewer asks, do not spend 15 minutes writing the brute force on the whiteboard. Write it conceptually or describe it
3. **Interrogate it:** "Why is O(n²) too slow? Because for every element, I am scanning the rest of the array to find its complement. I am doing O(n) work just to do a lookup."

### The trap

- **Assuming brute force means writing bad code.** Even a naive approach should handle edge cases correctly (empty arrays, negative numbers). If your brute force is logically flawed, optimising it will just give you a faster wrong answer

:::interview
"Given an array, find two numbers that add up to a target."

The brute force is to check every pair using nested loops, which is O(n²). The inner loop is just searching for `target - current`. We can replace that inner loop search with a hash map lookup, dropping the time to O(n).
:::
