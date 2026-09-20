## Lessons from Figma

- Figma is a masterclass in pragmatic system design. They didn't start with the most complex architecture possible; they evolved it exactly when the pain became unbearable.
- **The Core Lessons:**
  1. **Build the hardest part in RAM**: Figma realized that 60fps multiplayer editing could never survive a database round-trip. They kept the entire document in RAM and used WebSockets to sync it, essentially building a game server rather than a web server.
  2. **Flush to disk asynchronously**: They protected their database by aggregating thousands of mouse movements into a single checkpoint written every 5 seconds.
  3. **Use fencing tokens for safety**: They didn't trust Redis locks to protect their Postgres data. They used Postgres itself (via version numbers) to guarantee no split-brain server could corrupt a file.
  4. **Delay distributed databases**: They manually sharded Postgres until the product (Shared Components) strictly required cross-shard transactions. Only then did they pay the tax for Spanner.

### The failure

- Starting day one with Spanner and CRDTs. If you try to build Figma's final 2024 architecture on day one of a startup, you will run out of money before you launch. Figma survived because they started with simple Postgres, pushed it to its absolute limits, sharded it, pushed that to its limits, and only then adopted Spanner
