## Tree DP Basics

Dynamic Programming is not limited to arrays. When a problem asks for an optimal value on a Tree (e.g., maximum independent set, longest path, minimum vertex cover), you use **Tree DP**.

### The Core Concept

Tree DP is just **Post-Order Traversal** with a state. 
- You recursively call your children.
- You wait for them to return their optimal sub-answers.
- You combine their answers with your own node's value.
- You return the combined answer to your parent.

Because Trees are naturally acyclic and strictly hierarchical, they possess perfect Optimal Substructure.

### The House Robber III (Tree Robber)

- **The Setup:** The exact same rules as House Robber (cannot rob adjacent nodes), but the houses form a Binary Tree instead of an array.
- **The State:** At any given node `U`, we need to return two pieces of information to the parent:
  1. The maximum money we can rob from `U`'s subtree *if we ROB* node `U`.
  2. The maximum money we can rob from `U`'s subtree *if we SKIP* node `U`.

### The Transition

If we **ROB** node `U`:
- We get `U.val`.
- We are strictly forbidden from robbing `U.left` and `U.right`. So we must add the `SKIP` values of both children.
- `robU = U.val + left.skip + right.skip`

If we **SKIP** node `U`:
- We get $0 from `U`.
- We are *allowed* to rob `U.left` and `U.right`, but we don't *have* to. We should just take the absolute maximum of whatever the children returned, regardless of whether they were robbed or skipped.
- `skipU = Math.max(left.rob, left.skip) + Math.max(right.rob, right.skip)`

### Implementation

```ts
class TreeNode {
  val: number;
  left: TreeNode | null;
  right: TreeNode | null;
}

function rob(root: TreeNode | null): number {
  // Returns [robThisNode, skipThisNode]
  function dfs(node: TreeNode | null): [number, number] {
    if (!node) return [0, 0];

    const left = dfs(node.left);
    const right = dfs(node.right);

    const robNode = node.val + left[1] + right[1];
    
    const skipNode = Math.max(left[0], left[1]) + Math.max(right[0], right[1]);

    return [robNode, skipNode];
  }

  const result = dfs(root);
  return Math.max(result[0], result[1]);
}
```

By returning an array (or object) containing multiple state variables, we avoid needing a global Hash Map to memoize the Tree nodes, making the algorithm a blazing fast O(N) with O(H) space.
