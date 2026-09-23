## Custom Hashing

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

### Application 2: Subtree Serialization

- **Problem:** Find all duplicate subtrees in a Binary Tree
- **The Insight:** We can't compare TreeNodes directly. But we can convert every subtree into a string using a post-order traversal
- A leaf node with value 4 serializes to `"4,null,null"`
- We store these strings in a Hash Map. If we see a string that already has a count of 1, we found a duplicate

```ts
function findDuplicateSubtrees(root: TreeNode | null): TreeNode[] {
  const map = new Map<string, number>();
  const res: TreeNode[] = [];
  
  function serialize(node: TreeNode | null): string {
    if (!node) return "#"; // Delimiter for null
    
    // Post-order: left, right, then current
    const leftStr = serialize(node.left);
    const rightStr = serialize(node.right);
    
    // Construct the unique signature for THIS subtree
    const signature = `${node.val},${leftStr},${rightStr}`;
    
    const count = map.get(signature) || 0;
    if (count === 1) {
      res.push(node); // Only push on the SECOND occurrence
    }
    map.set(signature, count + 1);
    
    return signature;
  }
  
  serialize(root);
  return res;
}
```

:::interview
"Isn't string concatenation slow?" — Yes. In the subtree example, the strings get progressively larger, so string copying takes O(N). The overall time complexity becomes O(N²). For most interviews, this is the expected answer. In competitive programming, you would use a Rolling Hash (Polynomial Hash) to compute the subtree signature as an integer in O(1) time, bringing the total time back to O(N).
:::
