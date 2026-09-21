# Module 7 - News feed

## Requirements and numbers

- A news feed merges the posts of everyone a user follows into one list, newest or best first. The design is about the read path: a feed is opened far more often than a post is written, and the join-at-read-time query that looks obvious does not survive the ratio
- Functional, in: `POST /posts`; follow and unfollow; `GET /feed` returning a page of 20 posts and a cursor. Out: media processing (Module 9), search, direct messages (Module 6)
- Non-functional: a feed page well under a second; a post visible to followers within seconds, not instantly; no post lost, though its order may be off by seconds
- Inputs, as assumptions: say 100 M daily users, each opening the feed 10 times, 1 open in 100 producing a post; 200 followees on average; a cached feed of post ids, 8 bytes each

| Quantity | Arithmetic | Result |
| :--- | :--- | :--- |
| feed reads | 100 M × 10 ÷ 86 400 | ≈ 11 600/s average; say 50 000/s at peak |
| posts written | 1 % of reads | ≈ 116/s average, 500/s at peak |
| read : write | 11 600 ÷ 116 | 100 : 1 |
| fan-out writes | 500 posts/s × 200 followers | 100 000 cache writes/s at peak (page 3) |
| feed cache | 100 M × 800 ids × 8 B | ≈ 640 GB, memory-sized, spread over a cluster (Module 4) |

- Twitter's numbers for the same shape come from its 2012 QCon talk "Timelines at Scale": about 300 000 timeline reads a second for 150 M active users, and a per-user timeline cache capped at 800 entries. They are quoted here from the talk, not from a paper, and the page says so when it uses them
- The ratio decides the architecture before any box is drawn: at 100 reads per write, work done once at write time is paid back a hundred times. The whole module is that trade, and its one exception (page 4)

### The failure

- Designing the write path first. A `posts` table indexed on author and time, and "how is the feed built?" answered with a join over 200 followees, sorted, 50 000 times a second. The interviewer asks for the p99 and the answer is "it depends on the slowest of the 200 lookups". A feed is precomputed, or it is not a feed
