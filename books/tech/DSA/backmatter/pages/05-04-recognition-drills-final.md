## Final Recognition Drills

You have 30 seconds per problem. Do not solve. Identify the likely pattern and the necessary transformation.

| # | Problem sketch | Your answer |
|---|---|---|
| **1** | You have N ≤ 10⁵ items with weights and values. Find the max value for capacity W ≤ 10⁹. | |
| **2** | Given a string of brackets `()[]{}`, return the minimum number of swaps to balance it. | |
| **3** | You have a stream of integers. At any time, you must be able to return the median. | |
| **4** | Given a 2D matrix of letters, find if a specific word exists via adjacent cells. | |
| **5** | You have N servers. Some are connected. You add new connections one by one. Find when all servers are connected. | |
| **6** | Given an array of integers, find the number of subarrays where the sum is divisible by K. | |

:::note
**Answers:** 
1. The capacity is too big for standard Knapsack DP. Since N is small, it's a **Meet-in-the-Middle** (split items, brute force halves, binary search). 
2. Bracket balancing with swaps usually requires tracking imbalance dynamically: **Greedy with a variable**. 
3. Median of a stream requires finding the middle instantly: **Two Heaps** (Max-Heap for left half, Min-Heap for right half). 
4. Grid search for a specific sequence: **Backtracking (DFS)** on the matrix. 
5. Dynamic connectivity: **DSU (Union-Find)**. 
6. Contiguous subarray sum matching a condition: **Prefix Sums + HashMap** (storing remainders modulo K).
:::
