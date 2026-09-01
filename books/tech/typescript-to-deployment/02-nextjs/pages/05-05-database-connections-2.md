### The three fixes

- **A connection pooler.** PgBouncer, Prisma Accelerate, Neon or Supabase pooling. One pool in front of the database, functions talk to it
- **A pool size of one per instance.** `connection_limit=1` in the URL. More instances, but each takes almost nothing
- **An HTTP database driver.** Neon and PlanetScale speak HTTP, so there is no TCP pool at all. This is also what makes them work on Edge

### On a long-running server

- Self-hosted with `next start` or in a container, there is one process and one pool
- The problem mostly disappears. It is a serverless problem, not a Next.js one
