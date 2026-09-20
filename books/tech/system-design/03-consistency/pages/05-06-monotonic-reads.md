## Monotonic reads

- Even if you don't write any data yourself, replication lag can still create impossible anomalies. Imagine you are reading the comments on a post. You refresh the page. Suddenly, half the comments disappear
- This happens when your first request hits a fast Follower (lagging by 10ms), and your second request hits a slow Follower (lagging by 5 seconds). You have effectively travelled backward in time

<svg viewBox="0 0 460 140" role="img" aria-label="Monotonic reads violation. Client reads from Fast Follower and sees Comment X. Client refreshes, load balancer routes to Slow Follower, Comment X is gone." xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif" font-size="8.5">
  <rect x="20" y="50" width="80" height="40" rx="3" fill="#fcfcfc" stroke="#1a1a1a"/>
  <text x="60" y="74" text-anchor="middle" font-weight="bold">User's Browser</text>
  
  <rect x="220" y="20" width="100" height="30" rx="3" fill="#e2fcf3" stroke="#1d4e89"/>
  <text x="270" y="35" text-anchor="middle" font-weight="bold">Fast Follower</text>
  <text x="270" y="45" text-anchor="middle" font-size="6">Lag: 10ms (Has Comment X)</text>
  
  <rect x="220" y="90" width="100" height="30" rx="3" fill="#fce4e2" stroke="#b8541a"/>
  <text x="270" y="105" text-anchor="middle" font-weight="bold">Slow Follower</text>
  <text x="270" y="115" text-anchor="middle" font-size="6">Lag: 5000ms (Missing Comment X)</text>
  
  <path d="M100 60 L210 40" stroke="#1d4e89" fill="none" stroke-width="2"/><path d="M210 40 l-6 1 v-5 z" fill="#1d4e89" transform="rotate(20 210 40)"/>
  <text x="155" y="45" font-size="6">1. First visit</text>
  
  <path d="M100 80 L210 100" stroke="#b8541a" fill="none" stroke-width="2"/><path d="M210 100 l-6 -1 v5 z" fill="#b8541a" transform="rotate(-20 210 100)"/>
  <text x="155" y="90" font-size="6" fill="#b8541a" font-weight="bold">2. Refresh!</text>
</svg>

- **Monotonic Reads** is the guarantee that time never moves backward. If you have seen a piece of data, you will never be served an older snapshot where that data doesn't exist
- **The fix**: When a user connects, hash their User ID and use that hash to always route them to the *same* replica. If User 42 is always pinned to Follower B, they will only ever see time move forward, even if Follower B is slower than Follower A

### The failure

- Reading from random replicas behind a round-robin load balancer. If your application creates a connection pool that load-balances read queries randomly across five replicas, users will constantly jump back and forth in time on every click. Time anomalies will become a daily complaint
