## Treap (Tree + Heap)

- **What it is:** A randomized Binary Search Tree that guarantees probabilistic O(log N) operations
- **The Contract:** Combines the strict ordering of a BST with the randomized priority of a Heap to avoid the O(N) unbalanced worst-case
- **Why it matters:** Writing an AVL or Red-Black Tree in an interview is virtually impossible (hundreds of lines of rotation logic). A Treap is the easiest balanced tree to implement from scratch in under 15 minutes, making it the CP weapon of choice for custom Ordered Sets

### The Dual Identity

Every node in a Treap has two values:
1. `key`: The actual data you want to store (follows BST rules: left is smaller, right is larger).
2. `priority`: A completely random number assigned upon creation (follows Max-Heap rules: parent's priority is greater than children's priorities).

Because the priorities are random, the tree structure matches the structure of a BST where elements were inserted in a *random order*. A randomly built BST has an expected height of O(log N). Thus, the Treap is probabilistically balanced.

### Split and Merge

The power of the Treap (specifically the *Implicit Treap* or *Cartesian Tree*) lies in two elegant operations: `split` and `merge`.

- **Split(node, X):** Takes a Treap and splits it into two Treaps: one where all keys are $\le X$, and one where all keys are $> X$.
- **Merge(left, right):** Takes two Treaps (where max(left) $<$ min(right)) and merges them into a single valid Treap, using the `priority` to decide who becomes the root.

```ts
class TreapNode {
  left: TreapNode | null = null;
  right: TreapNode | null = null;
  priority = Math.random();
  constructor(public key: number) {}
}

// Split tree T into L (keys <= X) and R (keys > X)
function split(T: TreapNode | null, X: number): [TreapNode | null, TreapNode | null] {
  if (!T) return [null, null];
  
  if (T.key <= X) {
    const [L, R] = split(T.right, X);
    T.right = L;
    return [T, R];
  } else {
    const [L, R] = split(T.left, X);
    T.left = R;
    return [L, T];
  }
}

// Merge L and R back together
function merge(L: TreapNode | null, R: TreapNode | null): TreapNode | null {
  if (!L || !R) return L || R;
  
  if (L.priority > R.priority) {
    L.right = merge(L.right, R);
    return L;
  } else {
    R.left = merge(L, R.left);
    return R;
  }
}
```

### Insertion and Deletion in 3 Lines

With `split` and `merge`, insertion and deletion become incredibly simple:
- **Insert(X):** `split` the tree at X. Create a new node for X. `merge` the left half with X, then `merge` the result with the right half.
- **Delete(X):** `split` the tree into three parts: `< X`, `== X`, and `> X`. Discard the middle part. `merge` the left and right parts.

:::interview
"If a Treap relies on Math.random(), can it be hacked in competitive programming to run in O(N)?" — No, unless the attacker can predict your pseudo-random number generator (PRNG). Because the priority is assigned dynamically inside your code, the adversary feeding you inputs `[1, 2, 3, 4]` cannot force an unbalanced tree. It provides the same security against worst-case inputs as Randomized Quicksort.
:::
