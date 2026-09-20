## What the interviewer probes

- **Metadata sharding:** YouTube stores video metadata (title, views, author) in MySQL. As it grew, they built Vitess to shard MySQL horizontally
- **View counts:** (See →17 Top-K module). Do not update a view count on the video's database row every time someone watches. Put a click event into Kafka, and aggregate counts in batches
- **Copyright protection:** How do you catch pirated uploads? Add a "Fingerprint" step to the Transcoding DAG. It extracts audio/video hashes and compares them to a reference database of copyrighted material before publishing
- **DRM (Digital Rights Management):** How do you stop users downloading the `.m4s` files? The chunks are encrypted. The manifest tells the client to fetch a decryption key from a separate licensing server

### The failure

- Designing a system where the view count is an integer column on the `videos` table, updated with `UPDATE videos SET views = views + 1` 100,000 times a second

:::interview
A live stream has 500,000 concurrent viewers. How do you keep the live viewer count updated on everyone's screen?

Do not write to a database. Clients send presence heartbeats to a Redis cluster. A background worker periodically aggregates the presence counts and broadcasts the total down the WebSockets.
:::\n