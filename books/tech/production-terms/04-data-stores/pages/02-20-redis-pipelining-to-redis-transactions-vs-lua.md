## Redis Pipelining

Sending many commands without waiting for each reply, collapsing N round trips
into one.

A thousand `GET`s at 0.6ms round-trip is 600ms of waiting — nearly all network,
almost none of it Redis. Pipelined, the same thousand commands are one flush and
roughly 8ms.

`MGET` and `MSET` are the built-in version of this for a single command type.
Reach for those first; reach for a pipeline when the commands differ.

**Pipelining is not a transaction.** Commands are sent together and executed in
order, nothing about the group is atomic, and another client's commands can
interleave.

## Redis Transactions vs Lua

`MULTI`/`EXEC` queues commands and runs them together. There is no rollback, and
no way to read a value mid-transaction and branch on it. A Lua script does both.

Check-then-decrement across two commands races. The same logic in one Lua script
cannot, because Redis runs the script to completion before anything else.

| | Does |
|---|---|
| `MULTI`/`EXEC` | queued commands, atomic, no logic and no rollback |
| `EVAL` a Lua script | read, branch, write — atomically |

**Keep scripts short.** The property that makes them atomic is that they block
the server, so a slow script stalls every other client.
