## Exact leaderboard (Small K)

- If the scale is small (e.g., a gaming leaderboard with 1 million players), you do not need complex stream approximation
- **Redis Sorted Sets:** A single Redis node can easily hold a leaderboard of 1 million users
- Every time a user scores, you run `ZADD leaderboard score user_id`. This runs in `O(log N)` time
- To get the Top 10, you run `ZREVRANGE leaderboard 0 9`. This runs in `O(log N + K)` time
- **Limitations:** A single Redis node maxes out at ~100,000 writes per second and ~100 GB of RAM. You cannot put 1 billion YouTube videos into a single global Redis key

### The failure

- Recommending a single Redis Sorted Set for a global scale problem (Top 100 YouTube videos). It will become a massive bottleneck and memory limit.

:::interview
You design a leaderboard for a mobile game with 500,000 active players. Which specific database technology and data structure do you use?

A Redis Sorted Set. It is an in-memory data structure explicitly designed for ranking, easily handling hundreds of thousands of users on a single node with fast O(log N) updates.
:::\n