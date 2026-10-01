### Where it appears

| Problem | The two sides |
|---|---|
| Is Graph Bipartite? (LeetCode 785) | any valid 2-colouring |
| Possible Bipartition (LeetCode 886) | people split so no disliked pair shares a group |
| Flower Planting With No Adjacent (LeetCode 1042) | a colouring variant (4 colours, always possible) |

- **Go deeper:** general k-colouring is NP-hard; only the 2-colour case has this linear test. Module 05 covers the odd-cycle proof.

:::interview
"What exactly stops a graph from being bipartite?"

An odd-length cycle. Two-colouring alternates sides along any path, so a cycle can close consistently only if its length is even. Any odd cycle forces two adjacent nodes onto the same side, which the BFS catches as a colour clash.
:::
