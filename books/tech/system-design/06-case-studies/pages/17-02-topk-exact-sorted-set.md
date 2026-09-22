## Exact leaderboard

- When the set of members is bounded, 10 M players, one node holds it, and a **sorted set** is the whole design: a Redis structure that keeps members ordered by a numeric score, with `ZADD` at O(log N) per update and a range read from either end. One key per board, and a board per window when the window matters

```typescript
// one board per key; a score is a double, exact for integers to ±2^53
const board = (window: string) => `top:${window}`;   // top:2026-09-21T09:41

async function scored(r: Redis, w: string, id: string, by = 1) {
  await r.zadd(board(w), "INCR", by, id);            // O(log N), one command
}
async function top(r: Redis, w: string, k = 100) {
  return r.zrange(board(w), 0, k - 1, "REV", "WITHSCORES");   // O(log N + k)
}
async function rankOf(r: Redis, w: string, id: string) {
  return r.zrevrank(board(w), id);                   // 0 = first; null = absent
}
```

- `ZADD … INCR` adds to the member's score in one command, so two updates that race are both applied; the Redis docs give O(log N) per added item, scores as doubles exact to ±2⁵³, and equal scores ordered lexicographically by member, which settles ties the same way on every replica. A minute board is a key with an `EXPIRE` a little past the windows that read it (page 4)
- "Players around me" is `ZREVRANK` for the position, then `ZRANGE` with `REV` around it; a rank is a count of members above, which the sorted set keeps in its skip list, not a scan. A billion-member set does not fit this page; that is where the sketch and the partitions begin (pages 3 and 4)

### The failure

- A global sorted set of 1 B members on one node. Memory of the order of 100 GB, every one of 11 600 views a second serialised through one process, and a restart that reloads 100 GB before the board is back. A sorted set is the right answer for a board that fits on a node, and the wrong one the moment the question is about a stream
