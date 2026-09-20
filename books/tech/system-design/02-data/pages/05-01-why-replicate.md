# Module 5 - Leader-based replication

## Why replicate

- **Replication** is keeping the same data on more than one machine. Three reasons, and a design usually wants two of them
- **Availability**: one machine dies, another has the data. **Read scale**: reads spread across copies. **Locality**: a copy near the reader, so a user in Mumbai reads from Mumbai, not Virginia
- Replication and partitioning (Module 8) compose. Each partition has its own set of replicas; "the database" is many small replica groups

<svg viewBox="0 0 460 118" role="img" aria-label="One dataset copied to three replicas. Each replica serves a purpose: the standby takes over on failure, the read replicas absorb reads, the remote replica sits near remote users." xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif" font-size="8.5">
  <rect x="20" y="42" width="90" height="34" rx="3" fill="#e2fcf3" stroke="#1d4e89"/><text x="65" y="56" text-anchor="middle" fill="#1d4e89">the data</text><text x="65" y="69" text-anchor="middle" font-size="7">one partition</text>
  <g fill="#fcfcfc" stroke="#1a1a1a"><rect x="200" y="8" width="100" height="28" rx="3"/><rect x="200" y="45" width="100" height="28" rx="3"/><rect x="200" y="82" width="100" height="28" rx="3"/></g>
  <text x="250" y="26" text-anchor="middle">copy: standby</text><text x="250" y="63" text-anchor="middle">copy: read replica</text><text x="250" y="100" text-anchor="middle">copy: other region</text>
  <g stroke="#1d4e89" fill="none"><path d="M110 59 L200 22"/><path d="M110 59 L200 59"/><path d="M110 59 L200 96"/></g>
  <text x="312" y="26" font-size="7.5">availability: promote it when the leader dies</text>
  <text x="312" y="63" font-size="7.5">read scale: reads go here, writes do not</text>
  <text x="312" y="100" font-size="7.5">locality: shorter round trip for those users</text>
</svg>

- Every copy raises the same question: when a write lands on one, how and when does it reach the others? That question is this module and the two after it

### The failure

- Replication is not backup. A `DELETE FROM orders` with no `WHERE` reaches every replica in milliseconds, faithfully. A backup is a copy that does not follow the leader; a replica is one that does
- Replication is not write scale. Ten followers give ten times the read capacity; every write still goes through one leader
