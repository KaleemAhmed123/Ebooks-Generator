## Monotonic reads and consistent prefix

- Two more anomalies with names, and each name is a guarantee you can ask for
- **Monotonic reads**: a client that has seen a value never sees an older one afterwards. Two reloads that land on two followers with different lag can show a comment, then not show it. Time went backwards

<svg viewBox="0 0 460 140" role="img" aria-label="Monotonic reads anomaly. The user refreshes the page twice. The first read hits a fast follower (sees the comment). The second read hits a slow follower (comment vanishes)." xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif" font-size="8.5">
  <rect x="20" y="30" width="60" height="24" rx="3" fill="#fcfcfc" stroke="#1a1a1a"/><text x="50" y="46" text-anchor="middle">User</text>
  
  <rect x="180" y="10" width="120" height="40" rx="3" fill="#e2fcf3" stroke="#1d4e89"/>
  <text x="240" y="27" text-anchor="middle">Follower A (Lag: 0s)</text>
  <text x="240" y="42" text-anchor="middle" font-size="7">Has comment</text>
  
  <rect x="180" y="90" width="120" height="40" rx="3" fill="#fce4e2" stroke="#b8541a"/>
  <text x="240" y="107" text-anchor="middle">Follower B (Lag: 5s)</text>
  <text x="240" y="122" text-anchor="middle" font-size="7">No comment</text>
  
  <path d="M80 42 L180 30" stroke="#1a1a1a" fill="none"/><path d="M180 30 l-6 -1 v6 z" fill="#1a1a1a" transform="rotate(-15 180 30)"/>
  <text x="130" y="30" text-anchor="middle" font-size="7">1. First read</text>
  
  <rect x="20" y="98" width="60" height="24" rx="3" fill="#fcfcfc" stroke="#1a1a1a"/><text x="50" y="114" text-anchor="middle">User</text>
  
  <path d="M80 110 L180 110" stroke="#1a1a1a" fill="none"/><path d="M180 110 l-3 -3 v6 z" fill="#1a1a1a"/>
  <text x="130" y="106" text-anchor="middle" font-size="7">2. Reload page</text>
  
  <path d="M180 120 L80 120" stroke="#b8541a" fill="none"/><path d="M80 120 l3 -3 v6 z" fill="#b8541a"/>
  <text x="130" y="130" text-anchor="middle" font-size="7" fill="#b8541a">Comment disappears!</text>
</svg>

- The fix is routing: pin each client to one replica, chosen by user ID, so successive reads see one replica's timeline. If that replica dies the client moves and may see the past once; that is the price of the cheap fix
- **Consistent prefix**: writes appear in the order they were made. Terry's definition: the reader sees "a version of the data store that existed at the master at some time in the past". With one leader and one log, followers have this for free. Across partitions with separate logs (Module 8) they do not: the answer can arrive before the question it replies to

### The failure

- A chat thread stored across two partitions. The reply's partition is caught up; the question's is behind. A reader sees "yes, ship it" with no message above it. Related writes need one partition, or a version the reader can wait on
