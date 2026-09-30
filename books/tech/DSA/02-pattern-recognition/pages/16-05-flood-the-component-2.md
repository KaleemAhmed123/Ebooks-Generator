## Flood the Component - continued

### Where it appears

| Problem | The deciding fact |
|---|---|
| Number of Islands (LeetCode 200) | one flood per island |
| Max Area of Island (LeetCode 695) | flood returns the blob's size |
| Number of Provinces (LeetCode 547) | components of an adjacency matrix |
| Flood Fill (LeetCode 733) | recolour one component from a seed |

- **Go deeper:** cycle checks, weights and shortest paths over the same graph live in Module 05.

:::interview
"Grid flood — BFS or DFS?"

Either visits each cell once, so both are O(m · n). DFS by recursion is shortest to write but can overflow the call stack on a grid that is one giant blob (~10⁶ cells); an explicit stack or BFS queue avoids that. Reach for BFS when you also need the distance from the seed.
:::
