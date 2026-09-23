## Choosing an ID

- Four questions settle it: who assigns it, does it need to sort, how many bytes can every index afford, and may an outsider read it

| | Bytes | Sorts by time | Assigned by | Leaks |
|---|---|---|---|---|
| Sequence | 8 | yes | one database | the row count and growth rate |
| UUIDv4 | 16 | no | the caller | nothing |
| UUIDv7 | 16 | yes | the caller | the creation time, to the millisecond |
| Snowflake | 8 | roughly | the caller, given a worker id | creation time, worker count, throughput |
| Instagram-style | 8 | roughly | the database, per shard | creation time and the shard |

- **UUIDv7 is the default for new work.** It removes the central authority, keeps index locality, and needs no worker-id allocator — which is the operational cost that makes Snowflake more expensive than it looks on paper
- Reach for 64 bits when the id count is enormous and the eight bytes per index entry are worth an allocator. That is a real reason at a certain scale and not a reason at most scales

### The failure

- Putting a time-ordered id in a public URL and treating the sort order as the only thing it reveals. Every Snowflake exposes its creation millisecond, its worker number and its per-millisecond sequence, so two ids taken a week apart give a competitor the signup rate, and the worker field gives the size of the generating fleet
- UUIDv7 has a milder version of the same property: the timestamp is right there in the first 48 bits. Where creation time is not public information, the external identifier has to be a separate opaque value — a random token stored beside the real id — rather than the primary key with the internals showing through
