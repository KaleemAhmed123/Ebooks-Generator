## Windows and merging

- We want the Top-K for the *last 1 hour*. We cannot keep a single sketch forever, because old views would never fall off
- **Tumbling Windows:** We create a new, empty Count-Min Sketch every 1 minute
- **Merging Upstream:** 
  - Shard A computes its Top 100 for Minute 1
  - Shard B computes its Top 100 for Minute 1
  - An aggregator node merges Shard A and Shard B to find the Global Top 100 for Minute 1
- **Hourly aggregation:** To find the Top 100 for the last hour, the aggregator simply merges the 60 1-minute Global results
- Note: Merging partial Top-K lists discards the long tail. The result is an approximation

### The failure

- Keeping a single global counter for all time, and trying to subtract old events when they expire. You cannot easily subtract from a Count-Min sketch. You must build discrete time-bucketed windows and merge them.

:::interview
Your stream processor computes the Top 10 hashtags across 5 different shards. You merge these 5 lists together by summing the counts. Is the final list mathematically exact?

No. If a hashtag was ranked #11 on all 5 shards, it was dropped before the merge. It might actually be the #1 global hashtag, but the merge will miss it completely. Merging partial Top-K lists is always an approximation.
:::\n