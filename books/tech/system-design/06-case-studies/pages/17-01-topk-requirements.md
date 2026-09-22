# Module 17 - Top-K and leaderboard

## Requirements and numbers

- Top-K answers "which K items had the most events in a window": the 100 most-viewed videos in the last minute, hour and day; the top 10 players by score. The shape: a high event rate, a small answer, and two very different problems hiding behind one sentence, an exact ranking over a bounded set and an approximate one over a stream
- Functional, in: top 100 by view count for the last 1 minute, 1 hour and 1 day; a player's rank and the players around them on a game board. Out: what a view is (Module 16 owns counting one exactly), recommendations, the video store (Module 9)
- Non-functional: the minute board updates within seconds; the hour and day boards may lag a minute; the game board is exact; the video boards may be approximate and must say by how much
- Inputs, as assumptions: 1 B views a day over 100 M videos, of which 10 M are viewed in any given hour; a game with 10 M players and 1 000 score updates a second; K = 100

| Quantity | Arithmetic | Result |
| :--- | :--- | :--- |
| view rate | 1 B ÷ 86 400 | ≈ 11 600/s average; partitioned by video id over a few consumers (page 4) |
| exact game board | 10 M members × ≈ 100 bytes in a sorted set | ≈ 1 GB on one node, 1 000 `ZADD`s a second at O(log N): one node, done (page 2) |
| exact video counts, an hour | 10 M distinct videos × 8-byte count | a hash map of 10 M entries, feasible for an hour on one machine and not for a day across partitions; the sketch is for when this does not fit (page 3) |
| sketch | width 2 719 × depth 7 counters × 4 bytes | ≈ 76 KB per window per partition, whatever the number of videos (page 3) |

- The numbers say: an exact structure when the set is bounded (page 2), a sketch plus a heap when it is not (page 3), and an honest merge across partitions and windows, where the hour and day are built from minutes (page 4)

### The failure

- One requirement covering both. "Top 100, exact, real time, over a billion events a day across shards" is not a requirement; it is three that conflict. Ask which boards must be exact, and give those a bounded structure and a batch; give the rest a sketch and an error bound stated out loud
