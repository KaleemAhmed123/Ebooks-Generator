## Binary Tree Maximum Path Sum <span class="lv lv2"></span>

This is one of the most notoriously tricky Tree DP problems. 

- **The Setup:** A path in a binary tree is a sequence of nodes where each pair of adjacent nodes has an edge connecting them. A node can only appear in the sequence at most once. The path does not need to pass through the root. Return the maximum path sum.
- **The Trap:** A valid path looks like an inverted `V` or `U`. It goes up from a leaf, hits a "peak" node, and goes back down to another leaf. 
- You cannot pass a full inverted `V` up to a parent, because if the parent tries to connect to it, it would create a 3-way junction (which violates the rule of a linear path).

### The State Split

For any given node `U`, we have to track two entirely different concepts:

**1. The "Return" Value (The Straight Line)**
- To allow our parent to extend the path, we must return the maximum sum of a straight, continuous line starting from `U` and going straight down into exactly one of its children (either left OR right, not both).
- `returnVal = U.val + Math.max(0, Math.max(leftStraight, rightStraight))`
- *(Note: We use `Math.max(0, ...)` because if a child branch is entirely negative, we can just refuse to go down it, terminating the line at `U`).*

**2. The "Global Maximum" (The Inverted V)**
- While calculating the straight lines, we must simultaneously check if `U` is the "peak" of the optimal path. 
- The peak path connects the best left straight line, the node `U`, and the best right straight line.
- `peakPath = U.val + Math.max(0, leftStraight) + Math.max(0, rightStraight)`
- We update a global `maxSum` variable with this `peakPath`.
