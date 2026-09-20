## Replication lag

- The leader sends the WAL to followers over the network. By default, this is asynchronous. The leader commits the write to its own disk and replies "Success" to the client immediately, without waiting for the followers to acknowledge receipt
- This means the followers are always slightly behind the leader. This gap is called **replication lag**. Under normal load, it is a fraction of a second. Under heavy load, it can grow to minutes

<svg viewBox="0 0 460 140" role="img" aria-label="Read-your-writes anomaly caused by replication lag. The user writes to the leader, the leader replies 'Success'. The user immediately refreshes the page, reading from a follower that hasn't received the write yet." xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif" font-size="8.5">
  <rect x="20" y="20" width="60" height="24" rx="3" fill="#fcfcfc" stroke="#1a1a1a"/><text x="50" y="36" text-anchor="middle">User</text>
  
  <rect x="180" y="10" width="100" height="40" rx="3" fill="#e2fcf3" stroke="#1d4e89"/>
  <text x="230" y="27" text-anchor="middle">Leader</text>
  <text x="230" y="42" text-anchor="middle" font-size="7">Saves "Hello"</text>
  
  <rect x="180" y="90" width="100" height="40" rx="3" fill="#fce4e2" stroke="#b8541a"/>
  <text x="230" y="107" text-anchor="middle">Follower</text>
  <text x="230" y="122" text-anchor="middle" font-size="7">Empty (Lagging)</text>
  
  <path d="M80 32 L180 32" stroke="#1a1a1a" fill="none"/><path d="M180 32 l-3 -3 v6 z" fill="#1a1a1a"/>
  <text x="130" y="28" text-anchor="middle" font-size="7">1. Write</text>
  
  <path d="M230 50 L230 90" stroke="#1a1a1a" fill="none" stroke-dasharray="2 2"/><path d="M230 90 l-3 -6 h6 z" fill="#1a1a1a"/>
  <text x="240" y="70" font-size="7" fill="#6b6b6b">Delayed</text>
  
  <rect x="20" y="98" width="60" height="24" rx="3" fill="#fcfcfc" stroke="#1a1a1a"/><text x="50" y="114" text-anchor="middle">User</text>
  
  <path d="M80 110 L180 110" stroke="#1a1a1a" fill="none"/><path d="M180 110 l-3 -3 v6 z" fill="#1a1a1a"/>
  <text x="130" y="106" text-anchor="middle" font-size="7">2. Read immediately</text>
  
  <path d="M180 120 L80 120" stroke="#b8541a" fill="none"/><path d="M80 120 l3 -3 v6 z" fill="#b8541a"/>
  <text x="130" y="130" text-anchor="middle" font-size="7" fill="#b8541a">"Not found"</text>
</svg>

- **Read-your-writes anomaly**: A user submits a comment. The leader saves it. The website immediately reloads. The reload queries a follower. The follower hasn't received the comment yet. The user screams, "My comment was deleted!"
- **The fix**: When a user modifies something, route *their* reads to the leader for a short window (e.g., 5 seconds). Everyone else reads from the followers

### The failure

- Running long analytics queries on a Postgres read replica with `hot_standby_feedback` turned off. The leader runs `VACUUM` and deletes dead rows, replicating the deletes to the follower. But the follower's long query is still reading those rows. The query crashes
- If you turn `hot_standby_feedback` on, the follower tells the leader to pause vacuuming those rows. This prevents the crash, but causes database bloat on the primary disk
