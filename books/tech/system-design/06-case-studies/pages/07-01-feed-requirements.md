# News Feed

### Requirements and numbers

- A news feed (Facebook, Twitter, Instagram) merges posts from people you follow into a single ranked timeline
- **In scope:** Publish posts, view timeline, follow/unfollow. 
- **Out of scope:** Complex AI ranking models (we design the architecture, not the ML weights)

| Metric | Requirement |
|---|---|
| **Ratio** | Read-heavy (100:1 to 1000:1 read:write) |
| **Volume** | Twitter 2012: 300K timeline reads/sec, 5K writes/sec |
| **Latency** | Feed generation under 200ms |

- The core problem: When you open your app, querying the database for "SELECT all posts FROM people I follow ORDER BY time DESC" requires a massive JOIN across millions of rows. It takes seconds. We must precompute the feed

### The failure

- Designing for the write path first. A news feed is defined by its read volume. If you optimise for fast publishing but leave feed generation as a SQL JOIN, your application will crash the moment it launches

:::interview
You pitch a simple relational design: `SELECT * FROM posts WHERE author_id IN (SELECT followee_id FROM follows WHERE follower_id = Me) ORDER BY time DESC`. Why does this fail at scale?

Because "Me" might follow 1,000 people. The database must scan indexes for all 1,000 people, merge the results, and sort them. Doing this 300,000 times a second will destroy any relational database.
:::
