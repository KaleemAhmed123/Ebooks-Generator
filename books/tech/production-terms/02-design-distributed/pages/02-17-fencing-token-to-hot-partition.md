## Fencing Token

A number that only ever increases, handed out with a lock, so a process that
woke up believing it still holds the lock can be rejected as stale.

Node A takes the lock and gets token 33, then stops for twenty seconds in a GC
pause and loses its lease. Node B takes the lock with token 34 and writes. Node
A wakes with no idea any of this happened and writes with token 33 — and the
storage layer rejects it, because it has already seen 34.

<svg viewBox="0 0 460 76" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Node A holds token 33 then pauses; node B takes token 34 and writes; node A wakes and its stale token 33 write is rejected">
  <path d="M46 22 H444 M46 54 H444" stroke="#1a1a1a" stroke-width="1"/>
  <text x="4" y="26" font-family="Consolas,monospace" font-size="8.5" fill="#6b6b6b">node A</text>
  <text x="4" y="58" font-family="Consolas,monospace" font-size="8.5" fill="#6b6b6b">node B</text>
  <circle cx="76" cy="22" r="3.5" fill="#1a1a1a"/>
  <text x="84" y="17" font-family="Consolas,monospace" font-size="8.5" fill="#1a1a1a">token 33</text>
  <rect x="120" y="14" width="150" height="16" fill="#f0f0f0"/>
  <text x="195" y="26" text-anchor="middle" font-family="Georgia,serif" font-size="9" fill="#6b6b6b">GC pause, lease lost</text>
  <circle cx="300" cy="54" r="3.5" fill="#2b5fa8"/>
  <text x="308" y="50" font-family="Consolas,monospace" font-size="8.5" fill="#2b5fa8">token 34, writes</text>
  <circle cx="300" cy="22" r="3.5" fill="#1a1a1a"/>
  <text x="308" y="70" font-family="Georgia,serif" font-size="9" fill="#1a1a1a">A wakes, writes token 33 — rejected, 34 was already seen</text>
</svg>

The lock alone cannot prevent this. Only the storage layer refusing a token
lower than the last one it accepted can.

## Hot / Warm / Cold Tiering

Moving data to cheaper and slower storage as it ages, because access frequency
falls away far faster than data volume does.

Last thirty days on SSD, the rest of the year on object storage, older than that
in archive. Storage cost drops by an order of magnitude and the ninety-five
percent of queries that only look at recent data never notice.

Define the retrieval time for each tier before moving anything. Archive tiers
can take hours to restore, and finding that out during an audit — with a
regulator waiting — is how a cost saving becomes an incident.

## Hot Partition

One shard taking disproportionate traffic because the partition key is not
uniformly distributed in practice, whatever it looked like in the schema.

Sharding events by `tenant_id` looks balanced until one enterprise customer
generates sixty percent of all events. That shard saturates while fifteen others
idle, and no amount of adding shards helps, because the key still sends
everything to one of them.

The fix is a composite key — `tenant_id` plus a bucket number — which spreads
one tenant across several shards at the cost of making that tenant's own
queries a scatter-gather.
