## Postgres fencing tokens

- Figma engineers knew that Redis locks were only for *efficiency* (preventing two servers from booting the file and wasting RAM). They are not for *correctness*.
- To guarantee correctness, Figma implemented **Fencing Tokens directly in Postgres**

| Step | Action | State in Postgres |
|---|---|---|
| 1. | Server 1 boots up File 42. It reads the file and sees `version = 5`. | `version: 5` |
| 2. | Server 1 pauses for 15 seconds (GC pause). Redis lock expires. | `version: 5` |
| 3. | Server 2 takes the Redis lock, boots the file. Reads `version = 5`. | `version: 5` |
| 4. | Server 2 flushes a checkpoint. It requires the version to match, and increments it: `UPDATE ... WHERE version = 5` | `version: 6` (Success) |
| 5. | Server 1 wakes up. Tries to flush its stale checkpoint: `UPDATE ... WHERE version = 5` | `0 rows updated` (Rejected!) |

- By combining a fast, sloppy lock in Redis (for routing) with a strict, pessimistic compare-and-set version check in Postgres (the fencing token), Figma guarantees that a GC-paused server can never corrupt the file
- If Server 1 gets rejected, it realizes it has been ousted. It immediately shuts down its in-memory WebSocket connections and tells the clients to reconnect to the new owner (Server 2)

### The failure

- Trusting Redis for absolute correctness. If Figma had skipped the Postgres version check, and just assumed "I hold the Redis lock, therefore my writes are safe", they would have corrupted millions of design files. Always enforce safety at the lowest possible storage layer
