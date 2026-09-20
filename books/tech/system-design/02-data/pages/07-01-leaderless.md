# Module 7 - Leaderless replication and quorums

## No leader at all

- **Leaderless replication** removes the special node. Every replica accepts writes; the client, or any node acting as **coordinator** on its behalf, sends each write to all N replicas of the key in parallel and each read to several of them
- Dynamo introduced the shape; Cassandra and Riak run it. In Cassandra any node can coordinate any request; it learns who holds what through gossip, where every second each node exchanges state with a random peer

<svg viewBox="0 0 460 104" role="img" aria-label="A client sends a write to a coordinator, which forwards it to all three replicas of the key in parallel. Two acknowledge quickly; the third is slow. No node is the leader; the coordinator is any node." xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif" font-size="8.5">
  <rect x="20" y="38" width="60" height="26" rx="3" fill="#fcfcfc" stroke="#1a1a1a"/><text x="50" y="55" text-anchor="middle">client</text>
  <rect x="130" y="38" width="90" height="26" rx="3" fill="#e2fcf3" stroke="#1d4e89"/><text x="175" y="50" text-anchor="middle" fill="#1d4e89">coordinator</text><text x="175" y="60" text-anchor="middle" font-size="6.5">any node</text>
  <path d="M80 51 L130 51" stroke="#1a1a1a" fill="none"/><path d="M130 51 l-4 -3 v6 z" fill="#1a1a1a"/>
  <g fill="#fcfcfc" stroke="#1a1a1a"><rect x="320" y="6" width="80" height="24" rx="3"/><rect x="320" y="40" width="80" height="24" rx="3"/><rect x="320" y="74" width="80" height="24" rx="3"/></g>
  <text x="360" y="22" text-anchor="middle">replica 1</text><text x="360" y="56" text-anchor="middle">replica 2</text><text x="360" y="90" text-anchor="middle">replica 3</text>
  <g stroke="#1d4e89" fill="none"><path d="M220 51 L320 18"/><path d="M220 51 L320 52"/><path d="M220 51 L320 86" stroke-dasharray="2 2"/></g>
  <text x="408" y="22" font-size="7">ack</text><text x="408" y="56" font-size="7">ack</text><text x="408" y="90" font-size="7" fill="#b8541a">slow…</text>
  <text x="175" y="90" text-anchor="middle" font-size="7">reply to client at W acks</text>
</svg>

- No leader means no failover: a dead replica is simply one that does not answer, and writes continue on the rest. Availability comes cheap; what gets expensive is knowing which copy is right

### The failure

- There is no single "latest". Replicas miss writes (they were down, or slow), so two of them can hold different values for one key, both believing they are current. Every read becomes a vote, and the next page is the arithmetic of that vote
