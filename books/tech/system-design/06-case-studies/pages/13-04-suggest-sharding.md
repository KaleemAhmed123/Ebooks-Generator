## Sharding by prefix

- A global Trie is too big for one server's memory. You must shard it
- **Naive sharding:** Sharding by the first character (A-M on Server 1, N-Z on Server 2). This is a disaster because "s" and "c" are incredibly common starting letters, while "x" and "z" are rare. Server 1 will melt
- **Weighted sharding:** Shard based on historical letter frequency. You map prefixes to shards to ensure equal data distribution
  - Shard 1: `a` to `b`
  - Shard 2: `c` (because `c` is huge)
  - Shard 3: `d` to `f`
- The API gateway holds a routing table. When a user types "c", it routes the request to Shard 2

### The failure

- Sharding based on a hash of the prefix (e.g., `hash("app") % N`). This is impossible because as the user types "a" → "ap" → "app", their requests would hit three completely different servers, ruining any caching.

:::interview
You sharded your Trie by assigning exactly two letters of the alphabet to each server. Server 10 handles 'S' and 'T'. Why did Server 10 crash?

Because 'S' and 'T' are the most common starting letters in the English language. You created a massive hot partition. You must shard based on historical data volume, not alphabet division.
:::\n