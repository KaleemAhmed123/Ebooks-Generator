## Active-passive

- One region serves everything; a second holds a replica and waits. It is the cheapest arrangement that genuinely survives losing a region, because only one place accepts writes and there is nothing to reconcile

<svg viewBox="0 0 460 110" role="img" aria-label="Active-passive across two regions. Users reach region A, which is live and runs both the application and the database. Region A replicates asynchronously to region B, which is on standby holding a database replica and no traffic. The recovery point objective is whatever the replication lag loses; the recovery time objective is how long promoting the replica and repointing traffic takes. Both are measured, not chosen. An orange cross marks a failover that was never rehearsed: the replica was read-only, the credentials were stale, and the DNS record had a 24-hour time to live." xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif" font-size="8.5">
  <text x="4" y="14" font-size="7.5">one region takes every write; the other waits with a copy</text>
  <rect x="4" y="38" width="52" height="24" rx="3" fill="#fff" stroke="#1d4e89"/><text x="30" y="53" text-anchor="middle" font-size="7.5">users</text>
  <rect x="110" y="26" width="110" height="48" rx="3" fill="#e6f2ff" stroke="#1d4e89"/><text x="165" y="44" text-anchor="middle" font-size="7.5">region A · live</text><text x="165" y="58" text-anchor="middle" font-size="6.5">app + database</text>
  <rect x="300" y="26" width="110" height="48" rx="3" fill="#f3f3f3" stroke="#999"/><text x="355" y="44" text-anchor="middle" font-size="7.5" fill="#666">region B · standby</text><text x="355" y="58" text-anchor="middle" font-size="6.5" fill="#666">replica, no traffic</text>
  <line x1="56" y1="50" x2="108" y2="50" stroke="#1d4e89" marker-end="url(#b)"/>
  <line x1="220" y1="50" x2="298" y2="50" stroke="#1d4e89" stroke-dasharray="3 2" marker-end="url(#b)"/>
  <text x="259" y="46" text-anchor="middle" font-size="6.5">async replication</text>
  <text x="259" y="60" text-anchor="middle" font-size="6" fill="#bf4c28">lag = what a failover loses</text>
  <text x="4" y="92" font-size="7">RPO is how much the lag loses; RTO is how long promoting and repointing takes. Both are measured, not chosen</text>
  <text x="4" y="105" font-size="7.5" fill="#bf4c28">✕ a failover nobody rehearsed: a read-only replica, stale credentials, and a 24-hour DNS TTL</text>
  <defs><marker id="b" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6 z" fill="#1d4e89"/></marker></defs>
</svg>

- **RPO** — recovery point objective — is how much data may be lost, and with asynchronous replication it is exactly the replication lag at the moment of failure. It is a measured quantity that must be graphed, not a target written in a document
- **RTO** — recovery time objective — is how long it takes to be serving again: detect, decide, promote the replica, repoint traffic, and warm the caches. Every one of those steps is a place the rehearsal finds a problem and the incident does not have time to

### The failure

- The failover that has never been performed. Promotion needs a command nobody has run against production, the standby's credentials expired months ago, the application there is pinned to a config that names the old primary, and the DNS record the plan depends on has a TTL measured in hours (page 5)
- None of this shows up in monitoring, because a standby that is replicating looks healthy — replication is the one part being exercised continuously. The only way to know the rest works is to do it: fail over deliberately, on a Tuesday, and make the untested path the normal one
