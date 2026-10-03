## Rebalancing and hot partitions

- **Rebalancing** is moving partitions when the cluster changes — a node joins, dies, or fills up. The goal is to even out load **without** a full reshuffle and **without** going offline. The common techniques:
  - **Fixed, large partition count.** Create many more partitions than nodes up front (say 256 partitions on 8 nodes); rebalancing just **reassigns whole partitions** to nodes, moving data in coarse, predictable chunks. (Used by Elasticsearch, Riak.)
  - **Dynamic splitting.** Start with few partitions and **split** one when it grows past a threshold (and merge when it shrinks), like a B-tree node. (HBase, DynamoDB auto-scaling.)
  - Either way, moving a partition is a background data transfer that must be throttled so it doesn't starve live traffic — rebalancing during an incident can *deepen* the incident.

- **Hot partitions** are the failure that good overall balance hides. Even with perfectly even *data* distribution, **load** can concentrate on one partition when one **key** is disproportionately popular — a celebrity's account, a viral product, a single `status='pending'` value, or a monotonic timestamp key (Module 4's range hot-spot). That one partition's node saturates while the rest idle, and adding nodes **doesn't help** because the load is on one key, not spread.

:::warn
The hot-key outage you'll meet: a flash sale drives millions of reads to **one** product id. It lives on one partition, so one replica set takes the entire storm — CPU pegged, latency spiking — while the cluster dashboard shows 10% average utilisation and "plenty of headroom." Scaling out changes nothing. Fixes work *around* the key: **cache it** in front (Redis), **replicate the hot key** to extra read replicas, or **split the key** by appending a small random suffix (`product#42_0..9`) to spread writes across partitions — at the cost of a scatter-read to recombine. Detection needs **per-key/per-partition** metrics; averages will lie to you.
:::

### Module 4 — checkpoint
- **Key concepts:** partition to scale data+writes (orthogonal to replication) · range vs hash · compound partition+sort key · consistent hashing + virtual nodes · rebalancing (fixed-count vs splitting) · hot partitions and the averages-lie trap.
- **Task + questions:** pick a partition key + sort key for "get a user's recent messages fast, load even"; then say why `hash mod N` reshuffles everything on resize and why you can't scale out of a hot key.
- **Next:** Module 5 — consistency models and CAP.
