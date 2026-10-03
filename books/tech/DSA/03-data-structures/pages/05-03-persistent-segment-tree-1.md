## Persistent Segment Tree <span class="lv lv3"></span>

- **What it is:** A Segment Tree that remembers all its previous states after being updated
- **The Contract:** O(log N) time and O(log N) space per update, while granting access to the entire history of the tree
- **Why it matters:** Standard Segment Trees overwrite their nodes during an update. If you need to answer queries about the array *as it was at time T*, a Persistent Segment Tree makes this possible without copying the entire O(N) array at every step

### Path Copying (The Secret to O(log N) Space)

- If we update index `5` in a Segment Tree, we only traverse down one specific path from the root to the leaf.
- That path touches exactly $\approx \log_2 N$ nodes. The other $N - \log_2 N$ nodes are completely unaffected.
- **The mechanism:** Instead of modifying the nodes, we create a *brand new root*, and create *brand new copies* of only the $\log_2 N$ nodes on the path. 
- We point the new nodes' untouched children to the *existing nodes* from the previous version of the tree.
- Result: We get a whole new tree state representing "Time T+1", but it shares 99% of its memory with "Time T".
