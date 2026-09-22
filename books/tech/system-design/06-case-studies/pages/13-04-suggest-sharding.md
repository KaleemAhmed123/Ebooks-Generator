## Sharding by prefix

- The unit that must stay together is a subtree: a node's top-5 list is built from its children, so a prefix and everything under it live on one shard. That rules out hashing the whole prefix and leaves splitting on the leading characters
- The split comes from the data, not the alphabet. Queries beginning with `s` outnumber those beginning with `x` by orders of magnitude, so shards are cut where the subtree size crosses the shard's memory budget: `s` alone may be a shard, `sa`–`sm` and `sn`–`sz` two shards if it is still too big, while `u`–`z` share one

| Scheme | How | What happens |
| :--- | :--- | :--- |
| one trie | everything on one machine | the several-GB structure fits, but every one of 60 000 requests/s lands on it; replicas fix reads, not the size ceiling |
| by first letter, 26 ways | `a` → shard 1 … `z` → shard 26 | the `s` shard holds a large multiple of the `x` shard and takes the load to match: a hot shard by construction, the failure below |
| by prefix, weighted | cut at one or two characters where the subtree exceeds the budget; a routing table maps prefix ranges to shards | shards of roughly equal size and traffic; the gateway looks the prefix up in the table (Module 3 for the gateway); the table is part of the snapshot (page 3) so it changes with the build |
| by hash of the prefix | `hash("app") mod N` | breaks the subtree: "ap" and "app" would need their lists computed on different machines, so the build would have to ship data between shards; nothing gained over prefix ranges |

- Reads scale by replicas of each shard, and the routing table is tiny, so the gateway holds it in memory. Both the table and the shard files change together at the hourly swap, which is why the split is recomputed by the builder and not configured by hand
- Replicas load the same snapshot, so a shard's answer is identical on every replica; a client that retries against another replica sees the same list, which is what makes the browser cache on page 5 safe

### The failure

- `s` and `x` on equal shards. An alphabet split looks balanced on the whiteboard and is a hot partition in production (booklet 02): the `s` shard runs out of memory first and takes the most traffic. Shard by measured size, and let the builder move the cut points as the data moves
