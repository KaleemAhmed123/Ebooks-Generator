### Where it appears

| Problem | What the weaving replaces |
|---|---|
| [Copy List with Random Pointer](https://leetcode.com/problems/copy-list-with-random-pointer/) (LeetCode 138) | a hash map from old to new nodes |

:::interview
"When would you use the map version instead of the weaving trick?"

When the list is a graph (nodes with neighbour lists, not just `next` + `random`), weaving breaks — you can only interleave along one chain. The map version works on any structure: clone every node, store `old → copy`, then set each copy's pointers by looking up the map. It costs O(n) space but is simpler and generalises.
:::
