## The Spanner migration

- Sharding Postgres worked for a few years. But as Figma grew, they hit a wall. Some features *did* require distributed transactions across multiple files (like updating a Shared Component Library that cascades changes to thousands of dependent files)
- Writing distributed sagas and 2PC logic manually in Node.js was slowing down product development. Figma decided to migrate their entire storage layer from sharded Postgres to **Google Cloud Spanner**
- Spanner is a globally distributed SQL database. It uses TrueTime (atomic clocks and GPS receivers) and the Paxos consensus algorithm to provide **Linearizable cross-shard transactions**. It allows Figma to run a single `BEGIN ... COMMIT` block that updates File A in Shard 1 and File B in Shard 50, and Spanner handles the complex distributed locking invisibly

:::interview
**Only reach for Spanner when manual sharding fails**
In an interview, do not say "I will use Spanner" as your first solution. Spanner is a technological marvel, but it is also a crutch for teams who want to ignore distributed systems problems. An interviewer wants to see you manually shard a database (like Figma did first) to prove you understand the mechanics of scaling, before you deploy a magic bullet.
:::

### The failure

- Writing custom cross-shard transaction logic in Node.js. If you try to build a custom saga orchestrator to keep thousands of dependent Figma files in sync, you will inevitably introduce race conditions and isolation anomalies (as discussed in Module 4). Migrating to a database that supports distributed transactions natively is often cheaper than paying engineers to maintain buggy sagas
