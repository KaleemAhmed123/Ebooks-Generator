## Consistency

- A cache is a duplicate copy of the database. When the database updates, the cache is instantly stale. This is the hardest problem in distributed systems
- The standard pattern is **look-aside** (or cache-aside) with **delete-on-write**. When a service updates a user's profile in the database, it immediately issues a `DEL` command to Redis for that user's cache key. The next read will miss, query the database, and repopulate the fresh data
- Why delete instead of update? Because updating the cache directly introduces a massive race condition. If two threads write to the DB concurrently, network delays can cause their cache updates to arrive out of order, leaving the cache permanently out of sync with the DB
- Deleting the key forces the next read to fetch the single source of truth. A TTL (Time to Live) acts as the ultimate backstop. If the delete command fails due to a network blip, the TTL ensures the stale data will eventually expire

<svg viewBox="0 0 500 150" role="img" aria-label="Cache Consistency: Write DB then Delete Cache." xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif" font-size="12">
  <rect x="20" y="60" width="80" height="40" fill="#e0e7ff" stroke="#6366f1" rx="4"/>
  <text x="60" y="85" text-anchor="middle" fill="#3730a3">Service</text>
  
  <rect x="200" y="20" width="100" height="40" fill="#fef3c7" stroke="#f59e0b" rx="4"/>
  <text x="250" y="45" text-anchor="middle" fill="#92400e">Database</text>
  
  <rect x="200" y="100" width="100" height="40" fill="#ffe4e6" stroke="#f43f5e" rx="4"/>
  <text x="250" y="125" text-anchor="middle" fill="#9f1239">Redis Cache</text>
  
  <path d="M 105 70 L 195 45" stroke="#6366f1" stroke-width="2" fill="none" marker-end="url(#arrow-blue)"/>
  <text x="140" y="45" fill="#3730a3" font-size="10" font-weight="bold">1. Write</text>
  
  <path d="M 105 90 L 195 115" stroke="#f43f5e" stroke-width="2" fill="none" marker-end="url(#arrow-red)"/>
  <text x="140" y="125" fill="#9f1239" font-size="10" font-weight="bold">2. Delete</text>
  
  <text x="330" y="125" fill="#52525b" font-size="10">Forces next read to hit DB</text>

  <defs>
    <marker id="arrow-blue" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto"><path d="M 0 0 L 10 5 L 0 10 z" fill="#6366f1"/></marker>
    <marker id="arrow-red" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto"><path d="M 0 0 L 10 5 L 0 10 z" fill="#f43f5e"/></marker>
  </defs>
</svg>

### The failure

- The failure mode is designing a system where you update the cache before updating the database. If the cache update succeeds but the database write fails, your cache contains a ghost record that does not exist in reality
- Always write to the database first. The database is the source of truth. The cache is a disposable performance optimization

:::interview
**The source of truth test**
The phrase "cache invalidation is one of the two hard things in computer science" is a cliché for a reason. Prove you understand it by explicitly designing the system to write to the DB *first*, and delete the cache *second*.
:::
