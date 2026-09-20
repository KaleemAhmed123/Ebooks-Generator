## Where you need linearizability

- Anywhere the system decides **who was first**. Two clients act at once; exactly one may win; the loser must learn it lost before it does anything with the result. That decision is a single-object, real-time question, which is the definition

| Decision | Why one order is required | What eventual consistency does to it |
|---|---|---|
| lock or lease | two holders means two writers (Module 8) | both clients "acquire"; both write |
| leader election | two leaders means split brain (Module 8, page 2) | two nodes each see themselves as newest |
| unique username, email | the check and the insert must agree across replicas | both sign-ups pass the check; both rows exist |
| account balance, stock count | the invariant is a bound on one value | two withdrawals each see enough balance |
| "latest" pointer, feature flag, config version | readers act on it; acting on a stale value is the bug | a node runs old config for the lag window |

- Everything else on a typical page can be stale: counts, feeds, search results, recommendations, analytics. The reader cannot tell 200 ms of lag from network time
- The uniqueness row is the common miss. Sharded databases build a unique constraint per shard (booklet 02); across shards, or on an eventually consistent secondary index, "unique" means "unique unless two arrive within the lag window". DynamoDB global secondary indexes are eventually consistent, so a username index built on one cannot enforce uniqueness; the condition must be on the primary key write

### The failure

- Uniqueness checked with a read, then written. Even on a linearizable store, two reads that both return "free" are linearizable; the write must carry the condition (`INSERT` against a unique index, DynamoDB `ConditionExpression: attribute_not_exists(pk)`), so the store, not the client, decides who was first
