## Monotonic reads

- Because a database has many followers, they will not all be lagging by the exact same amount. Follower A might be 100 milliseconds behind the leader, while Follower B is 5 seconds behind
- This difference in lag creates a time-travel anomaly for the end user

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

- A user reads a list of comments from Follower A. They see the newest comment. They reload the page. The load balancer routes the second request to Follower B, which hasn't received the comment yet. To the user, it appears the comment was deleted, only to reappear on the third reload. Time went backward
- **The fix**: Monotonic reads. Ensure a single user is always routed to the exact same replica. You can hash the user's ID (`hash(userId) % N`) to pick their replica. They may see old data, but they will never see time go backward

### The failure

- Using `hash(userId) % N` to stick users to a replica without accounting for node failure. If Follower A goes offline, $N$ changes, and every user is suddenly re-hashed to a completely different replica. The time-travel anomaly occurs en masse
