# Top-K Leaderboard

### Requirements and numbers

- A Top-K system (or Leaderboard) calculates the most frequent items in a massive stream of events
- **In scope:** Top 100 most viewed videos in the last 1 minute, 1 hour, and 1 day
- **Out of scope:** Storing the actual video files

| Metric | Requirement |
|---|---|
| **Volume** | Billions of events per day |
| **Accuracy** | Approximate is acceptable for high-volume streams |
| **Latency** | Real-time updates for short windows |

- **The core constraint:** You cannot store a billion counts in memory and sort them every second. You must sacrifice absolute mathematical precision to gain real-time performance and bounded memory

### The failure

- Writing a single requirement that says "Must be 100% exact". An exact Top-K over a sharded, infinite stream requires infinite memory. You must clarify that the real-time stream is approximate, and the daily batch is exact.

:::interview
An interviewer asks you to design a real-time Top 10 trending hashtags list for Twitter (X). Do you guarantee 100% exact ranking?

No. At billions of events per second, guaranteeing exact global ranking across distributed shards is mathematically impossible without severe latency. You agree to provide a highly accurate approximation.
:::\n