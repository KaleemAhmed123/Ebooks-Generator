# Module 6 - Multi-leader replication

## When you want more than one leader

- One leader means every write crosses the world to reach it. **Multi-leader** puts a leader in each region: writes commit locally, and each leader is a follower of the others
- Three workloads ask for it: multi-region writes with local latency; clients that work offline and sync later (a calendar on a phone is a leader with a very long lag); collaborative editing, where every editor's copy is a leader

<svg viewBox="0 0 460 140" role="img" aria-label="Multi-leader replication. User 1 writes Title: A to Leader 1. User 2 writes Title: B to Leader 2. Both writes succeed locally, but conflict when replicating across the network." xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif" font-size="8.5">
  <rect x="20" y="20" width="80" height="24" rx="3" fill="#fcfcfc" stroke="#1a1a1a"/>
  <text x="60" y="36" text-anchor="middle">User (Tokyo)</text>
  
  <rect x="130" y="10" width="100" height="40" rx="3" fill="#e2fcf3" stroke="#1d4e89"/>
  <text x="180" y="27" text-anchor="middle">Leader Tokyo</text>
  <text x="180" y="42" text-anchor="middle" font-size="7">Title: A</text>
  
  <rect x="260" y="90" width="100" height="40" rx="3" fill="#fce4e2" stroke="#b8541a"/>
  <text x="310" y="107" text-anchor="middle">Leader NY</text>
  <text x="310" y="122" text-anchor="middle" font-size="7">Title: B</text>
  
  <rect x="390" y="98" width="60" height="24" rx="3" fill="#fcfcfc" stroke="#1a1a1a"/>
  <text x="420" y="114" text-anchor="middle">User (NY)</text>
  
  <path d="M100 32 L130 32" stroke="#1a1a1a" fill="none"/><path d="M130 32 l-3 -3 v6 z" fill="#1a1a1a"/>
  <path d="M390 110 L360 110" stroke="#1a1a1a" fill="none"/><path d="M360 110 l3 -3 v6 z" fill="#1a1a1a"/>
  
  <path d="M210 50 L280 90" stroke="#1a1a1a" fill="none" stroke-dasharray="2 2"/><path d="M280 90 l-6 -1 v6 z" fill="#1a1a1a" transform="rotate(20 280 90)"/>
  <path d="M280 90 L210 50" stroke="#1a1a1a" fill="none" stroke-dasharray="2 2"/><path d="M210 50 l6 -1 v6 z" fill="#1a1a1a" transform="rotate(20 210 50)"/>
  
  <rect x="220" y="60" width="50" height="16" fill="#fff" stroke="#b8541a"/>
  <text x="245" y="71" text-anchor="middle" font-weight="bold" fill="#b8541a" font-size="7">CONFLICT</text>
</svg>

- The leaders' change streams cross in three topologies: all-to-all (every leader sends to every other), circular (each forwards to the next), and star (one hub). A ring or a star has a node whose failure stops replication; all-to-all does not, but its paths can deliver an update before the insert it depends on

### The failure

- The same record edited in two regions in the same second. Both writes succeeded locally; both are on their way to the other side. That is a **write conflict**, and with multi-leader it is not an edge case but the normal case. The rest of this module is what to do with it
- MySQL Group Replication's multi-primary mode names the cost: transactions run optimistically and the loser is rolled back later; the manual calls the result an "eventual consistency system"
