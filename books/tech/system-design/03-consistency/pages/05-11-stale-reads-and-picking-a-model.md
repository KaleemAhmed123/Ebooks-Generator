## Stale reads, and picking the model per operation

- Staleness has a small number of sources. Each has a fix, and the fix is chosen per operation, because no single setting serves the checkout and the recommendations feed at once

| Where the stale read comes from | Fix |
|---|---|
| replica lag on a read replica | route the operation to the leader, or carry a token (page 9) |
| a cache in front of the store | write-through, or a TTL the operation can tolerate (booklet 05) |
| a secondary index built asynchronously (DynamoDB global secondary indexes) | condition the write on the primary key; never enforce uniqueness on the index |
| a read model built from events (CQRS, booklet 04) | show the client its own command's result directly; poll the read model for others |

- The pick, per operation: linearizable where the system decides who was first (page 4); session guarantees where a user watches their own data; causal where readers follow a conversation; eventual where a stale value cannot hurt

| Operation | Model | Mechanism |
|---|---|---|
| reserve stock, take a lock, claim a username | linearizable | conditional write at the leader; consensus store for locks |
| show my profile after I edited it | read-your-writes | token or sticky session |
| chat thread, comment tree | causal | version vector; reply carries the parent's version |
| product list, search, recommendations | eventual | replicas, caches, CDN |

- The mechanism column is the design; the model column is what to say in the review

### The failure

- One global "consistency setting" for a service, chosen for the most demanding operation. Every listing page then pays the checkout's round-trip. Or chosen for the cheapest, and the checkout double-sells. The model is a property of the operation, not of the database
