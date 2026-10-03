### Where it appears

| Problem | Why it belongs here |
|---|---|
| [Critical Connections in a Network](https://leetcode.com/problems/critical-connections-in-a-network/) (LeetCode 1192) | Find all bridges using Tarjan's disc/low DFS |
| [Minimize Malware Spread II](https://leetcode.com/problems/minimize-malware-spread-ii/) (LeetCode 928) | Removing a node splits components; articulation-point logic |
| [Number of Operations to Make Network Connected](https://leetcode.com/problems/number-of-operations-to-make-network-connected/) (LeetCode 1319) | Count components and redundant edges for reconnection |

### Articulation Points

Finding Articulation Points uses the exact same `disc` and `low` arrays. The logic changes slightly:
- If `U` is the root of the DFS tree, it is an AP if it has *more than 1 independent child branch*.
- If `U` is not the root, it is an AP if there is some child `V` such that `low[v] >= disc[u]`. (Meaning `V` cannot reach strictly *above* `U` without going through `U`).
