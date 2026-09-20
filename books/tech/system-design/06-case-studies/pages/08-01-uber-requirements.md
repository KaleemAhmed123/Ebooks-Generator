# Ride Matching (Uber)

### Requirements and numbers

- Ride matching (Uber) connects moving riders with moving drivers. The core complexity is spatial indexing of moving objects
- **In scope:** Driver location updates, rider requests, matching logic
- **Out of scope:** Map routing (Google Maps API handles ETA and paths), payments (→11)

| Metric | Requirement |
|---|---|
| **Volume** | Drivers stream location every 4 seconds. Billions of trips |
| **Latency** | Match must happen in < 10 seconds |
| **Consistency** | Strong. No double-booking a driver |

- Note the volume disparity: Riders only write once when they request a ride. Drivers write every 4 seconds while online. If 1 million drivers are online, that is 250,000 writes per second. This is an extreme write-heavy system

### The failure

- Storing driver locations in a relational database (Postgres). 250,000 updates per second will thrash the disk and destroy the B-tree indexes. Driver locations are ephemeral; they belong in memory, not on disk

:::interview
You design an Uber clone where drivers HTTP PUT their location to a PostgreSQL `drivers` table every 4 seconds. The interviewer smiles and asks what happens to the DB's disk I/O. Why is this wrong?

Relational databases use B-trees optimized for disk storage. 250k updates/sec creates massive write amplification and lock contention. Ephemeral location streams must go to an in-memory store like Redis.
:::
