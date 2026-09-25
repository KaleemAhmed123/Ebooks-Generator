### Variations

- **Number of Enclaves (LeetCode 1020):** same flood from border land; count the land cells left unmarked
- **Number of Closed Islands (LeetCode 1254):** here 0 is land. Flood the border islands away first, then every island still standing is closed; count them
- **Count Sub Islands (LeetCode 1905):** the seeds are not the border but every grid2 land cell that is water in grid1. Sink those islands first; the islands of grid2 that survive are sub-islands
- **Making A Large Island (LeetCode 827):** label each island with an id and store its size; for each 0, add 1 to the sizes of its *distinct* neighbouring ids
- **Pacific Atlantic Water Flow (LeetCode 417):** two border floods, one per ocean, walking *uphill*; Module 07 (01-02) works it

### The failure

- **Asking each region and returning early.** `return dfs(down) && dfs(up) && …` stops at the first border hit and leaves the region half-visited. On `OXO / OOO / OXO` the two side columns are explored and rejected first; the centre then starts a fresh search, finds every neighbour already visited, and is wrongly captured. Flooding from the border has no early exit to get wrong
- **Recursive flood on a big open board.** On a default Node 22 stack, a recursive flood of a 200 × 200 board of all `O` throws "Maximum call stack size exceeded". The explicit stack above has no depth limit

:::interview
"Why flood from the border?" — Enclosed means "not connected to the border", and connectivity is cheaper to prove forward than to refute region by region. I seed every border `O`, flood with an explicit stack, marking cells when they are pushed so none is pushed twice, then flip everything unmarked. O(m · n) time; the stack can hold O(m · n) cells.
:::
