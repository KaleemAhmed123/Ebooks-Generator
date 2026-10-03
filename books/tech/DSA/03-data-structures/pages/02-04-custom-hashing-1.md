## Custom Hashing <span class="lv lv2"></span>

- **What it is:** Creating a unique string or integer representation for a complex object so it can be used as a key in a Hash Map/Set
- **When to reach for it:** "Group identical trees", "Find duplicate submatrices", "Memoize a game state with 5 variables"
- **Why it works:** Standard Hash Maps compare objects by *reference*, not by *value*. If you create two identical arrays `[1, 2]`, the Hash Map sees them as two entirely different keys. You must manually serialize them into a string signature

### The Serialization Rule

- A custom hash must be **deterministic**: identical states must produce identical strings
- A custom hash must be **collision-free by design**: different states must NEVER produce the same string
- **The Delimiter Trap:** If your state is two integers `A=12, B=3`, joining them as `"123"` is dangerous. What if `A=1, B=23`? That also joins to `"123"`. You must use a delimiter: `"12,3"` vs `"1,23"`.

### Application 1: Matrix / Grid States

When doing BFS on a grid, you often need to track which cells you've visited. The state is `(row, col)`.
You cannot put the array `[r, c]` into a JavaScript/Python Set, because every new array has a new memory address.

```ts
// WRONG
const visited = new Set<number[]>();
visited.add([2, 3]);
console.log(visited.has([2, 3])); // FALSE! Different memory reference.

// CORRECT: Custom Hash
const visited = new Set<string>();
visited.add(`2,3`);
console.log(visited.has(`2,3`)); // TRUE! Strings compare by value.
```
