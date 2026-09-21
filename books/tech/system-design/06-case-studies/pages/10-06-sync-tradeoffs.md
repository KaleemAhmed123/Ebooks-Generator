## What the interviewer probes

| Probe | The answer that holds |
| :--- | :--- |
| how does device B learn of a change | a held-open connection per client, long-poll or WebSocket, that carries only "namespace changed, cursor n"; the client then lists changes since its cursor. 100 M idle sockets are cheaper than 20 M polls a second (page 1); Module 6, page 2 owns the registry |
| sharing a folder | a shared folder is its own namespace, with a membership table; a user's tree is a mount of namespaces, and permission checks are per namespace, not per file. Sharding by namespace (page 3) means a shared folder's members all hit one shard for it |
| the underlying block store | an S3-shaped object store (booklet 05): immutable objects, keyed by hash, versioned by never overwriting. Durability is the store's promise; the design adds the hash check on every read |
| encryption at rest | server-side keys per namespace: dedupe still works because the server hashes plaintext blocks. Client-side end-to-end encryption breaks cross-user dedupe, since the same block encrypts differently under each user's key; say the trade out loud |
| deleting a file | metadata marks it deleted and keeps the blocklist for the retention window; a garbage collector deletes blocks no live blocklist references. Blocks are never deleted on the commit path |
| a 1 GB file, one byte prepended | fixed 4 MB boundaries shift every block (page 2); content-defined chunking is the fix, at the cost of variable block sizes and a more complex "have?" |

- The metric: seconds from a save on A to the file being openable on B, at p95, plus bytes uploaded per byte changed, which is the number that says the block design is working
- Cross-references the design leans on: versions and vectors (booklet 03); object storage and presigned URLs (booklet 05); sharding by namespace (booklet 02); connection registries (Module 6)

### The failure

- Polling 100 M clients every 5 seconds. 20 M requests a second, almost all answered "nothing", and the fleet is sized by the number of installs rather than by the number of changes. The held-open connection costs a socket and a heartbeat; the poll costs a request
