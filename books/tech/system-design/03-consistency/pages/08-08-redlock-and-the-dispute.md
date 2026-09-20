## Redlock, and why it is contested

- **Redlock** is the Redis documentation's multi-instance algorithm: N = 5 independent instances, no replication; the client tries `SET NX PX` on all five, holds the lock if a majority (3) succeeded within the TTL, and treats it as valid for `TTL − elapsed − drift allowance`. Release is the page-7 script on each

| Claim | Kleppmann, 2016 | antirez, 2016 |
|---|---|---|
| a paused holder writes after expiry | no fencing token; nothing stops it; rules it out for correctness | true of every lease; a random token plus check-and-set on the resource covers it |
| a clock jumps (NTP step) | a key expires early; a second client gets a majority while the first still holds: safety lost to a clock, which consensus never risks | the clock need only count 5 s within 10%; a jump is an operational fault |
| verdict | for correctness use a consensus system | safe under its stated timing assumptions |

- The Redis documentation now carries both halves: the algorithm, and a disclaimer to implement fencing tokens and that Redis does not use a monotonic clock for TTL expiry. That is the vendor drawing the boundary: efficiency, yes; correctness without a resource-side check, no
- Five instances buy availability of the lock service, not safety of the lock; page 3's questions are unchanged by the count

:::interview
"Why not Redis for the lock?" — Redis gives a lease, not a fenced lock. A holder paused past the TTL writes after a new holder took over, and no Redis token lets the storage tell them apart. Fine for an efficiency lock. For correctness, use a consensus store's revision as the token and make the resource check it, or replace the lock with a conditional write.
:::

### The failure

- Choosing Redlock over one instance "because five nodes is safer". Same lease, better uptime; the failing case, a holder that outlives its lease, is identical on one node and on five
