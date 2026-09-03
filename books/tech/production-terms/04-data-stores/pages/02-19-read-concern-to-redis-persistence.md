## Read Concern

What a read is allowed to see. `local` may return writes that could still be
rolled back; `majority` returns only durably committed data.

Reading with `local` after a failover can show data that no longer exists — the
write was accepted by a primary that then lost its election, and the rollback
takes it away afterwards.

| Level | Returns |
|---|---|
| `local` | anything written, including rollback-able writes |
| `majority` | only majority-committed data |
| `linearizable` | strongest, and slowest |

`majority` costs a little latency and never lies. That trade is worth making for
anything a user will act on.

## Redis Persistence

*RDB vs AOF*

RDB writes periodic snapshots — compact, and it loses everything since the last
one. AOF appends every write — larger, and close to no loss. The default
configuration can lose minutes.

| | Loses | Restart |
|---|---|---|
| RDB, snapshot every N seconds | up to N seconds | fast |
| AOF, fsync every second | about one second | slower |

Both can be enabled together, which is the usual production answer.

The more useful question is underneath: **if losing five minutes of these writes
matters, they belong in Postgres.** Redis persistence exists to make a warm
restart cheap, not to make Redis a system of record.
