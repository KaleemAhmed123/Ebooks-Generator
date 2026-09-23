## Persistent Data Structures 🔴

**The Problem:** You have an array. You perform Q updates. At query 100, the problem asks: "What was the sum of range [L, R] at the exact moment after query 14?"
You need to time-travel to a previous state of the array. 

If you copy the entire array after every update, you will run out of memory (MLE) and time (TLE). You need a data structure that remembers its history without copying everything.

### The Concept of Persistence

A Persistent Data Structure preserves the previous version of itself when modified.
Consider a Linked List: `A -> B -> C -> D`.
If we want to change `B` to `X`, we don't modify the original list. 
We create a new node `X`, point it to `C` (which already exists), and create a new head `A'`, which points to `X`.
Version 1 head is `A`. Version 2 head is `A'`. Both coexist in memory, sharing nodes `C` and `D`.

### The Persistent Segment Tree

A standard Segment Tree has 2N nodes. When we update an element, we traverse from the root to the leaf, updating exactly log₂ N nodes.
In a Persistent Segment Tree, instead of modifying those log₂ N nodes, we **create new copies of them**.

1. Create a new Leaf node with the updated value.
2. Create a new Parent node that points to the new Leaf and the *old* other child.
3. Continue up to the root, creating a new Root node.

We now have a new Root node representing Version 2 of the array. It shares all unmodified branches with the Version 1 Root!
Memory used per update: O(log N). Time per update: O(log N).

### Implementation Structure (C++)

Instead of `left_child = 2*i`, nodes must explicitly store pointers (or indices) to their left and right children because the tree is no longer perfectly balanced in an array.

```cpp
struct Node {
    int val;
    int left, right; // Indices of children in a global node array
};

vector<Node> tree;
vector<int> versions; // Stores the root index of each version

// Returns the index of the newly created node
int update(int prev_root, int L, int R, int idx, int val) {
    int curr = tree.size();
    tree.push_back(tree[prev_root]); // Copy the old node
    
    if (L == R) {
        tree[curr].val += val; // Apply update
        return curr;
    }
    
    int mid = (L + R) / 2;
    if (idx <= mid) {
        // Update left branch, point to old right branch
        tree[curr].left = update(tree[prev_root].left, L, mid, idx, val);
    } else {
        // Update right branch, point to old left branch
        tree[curr].right = update(tree[prev_root].right, mid + 1, R, idx, val);
    }
    
    tree[curr].val = tree[tree[curr].left].val + tree[tree[curr].right].val;
    return curr;
}

// To create Version V+1:
// versions.push_back(update(versions.back(), 0, N-1, target_idx, change));
```

### Advanced Application: K-th Smallest in a Range

You can use a Persistent Segment Tree as a frequency map to find the K-th smallest element in an arbitrary range [L, R] of a static array in O(log N) time.
You build a version of the tree for every prefix of the array. 
To query [L, R], you simultaneously traverse `Root[R]` and `Root[L-1]`, subtracting their node values to get the frequencies *specifically inside that range*, guiding your binary search down the tree!
