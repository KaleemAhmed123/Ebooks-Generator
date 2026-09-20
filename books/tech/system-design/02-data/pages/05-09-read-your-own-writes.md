## Read-your-own-writes

- The user posts a comment, the page reloads, the comment is not there. The write went to the leader; the reload read a lagging follower. The user does not think "eventual consistency"; they think "it lost my comment"
- **Read-your-own-writes** is the guarantee that a client sees its own writes. Not everyone's: just the ones it made

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

- Three ways to get it: read anything the user may have written from the leader (their own profile, their own comments); or remember the position of the last write and only read from a follower that has applied past it; or read from the leader for a short window after any write
- MongoDB packages this as a causal session, with one condition in the docs: the guarantees hold only with majority read concern and majority write concern together

### The failure

- The same user on two devices. The write position that says "wait for pos 1400" lives in one browser; the phone reads a follower at 900 and shows the old state. Per-user guarantees need per-user state that both devices can see, which usually means the server tracks it, not the client

:::interview
"A user updates their profile and the page still shows the old value. Why, and what do you do?" — The read hit a replica behind the leader. Route that user's reads for their own data to the leader, or track the write's log position and read only from replicas past it.
:::
