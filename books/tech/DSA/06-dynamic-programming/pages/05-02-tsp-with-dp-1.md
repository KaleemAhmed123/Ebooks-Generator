## Traveling Salesperson Problem (TSP) <span class="lv lv2"></span>

TSP is the classic NP-Hard problem. 
- **The Setup:** Given a list of cities and the distances between each pair of cities, what is the shortest possible route that visits each city exactly once and returns to the origin city?
- **Brute Force:** O(N!). For 15 cities, 15! is 1.3 trillion operations. Too slow.
- **Bitmask DP:** We can optimize this to O(N² · 2^N). For 15 cities, this is only 7.3 million operations. Blazing fast.

### The DP State

To figure out the optimal next city to visit, what do we need to know?
1. Where are we currently? (The `lastVisitedCity`).
2. Which cities have we already visited? (The `mask`).

- **State:** `dp[mask][u]` = the minimum distance to visit all the *unvisited* cities in `mask`, assuming we are currently standing at city `u`.

### The Transition

We are at city `u`. We look at every other city `v`. 
- If `v` is *not* in our `mask` (we haven't visited it yet):
- The cost to go to `v` is `dist[u][v]`.
- The remaining cost to finish the journey from `v` is `dp[mask | (1 << v)][v]`.
- We take the minimum of all possible valid `v`s.

`dp[mask][u] = min( dist[u][v] + dp[mask | (1<<v)][v] )`
