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
