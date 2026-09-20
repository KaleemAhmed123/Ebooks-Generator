## Multi-leader replication

- If you deploy your application to data centers in New York and Tokyo, a single-leader database in New York means Tokyo users suffer 200 ms of latency on every write. To fix this, you can put a leader in both data centers
- In multi-leader replication, a client can write to any leader. The leaders then asynchronously replicate their writes to each other

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

- **The problem**: Because writes are accepted locally before being replicated globally, two users can edit the exact same row at the exact same time. The database now has a write conflict that it must resolve
- MySQL Group Replication (multi-primary mode) uses optimistic execution. The transaction commits locally, but when replicating, it might fail. The system is eventually consistent

### The failure

- Treating a multi-leader database exactly like a single-leader one. If you rely on `SERIALIZABLE` isolation, it will fail across leaders. If you rely on foreign key cascading deletes, they can trigger disastrous conflicts as they replicate
- Unless you absolutely need cross-region write speeds, or your clients operate offline (like a mobile calendar app that syncs later), avoid multi-leader replication. Conflict resolution code is extremely difficult to get right
