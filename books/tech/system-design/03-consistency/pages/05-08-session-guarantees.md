## The session guarantees

- A **session** is one client's sequence of operations. The four session guarantees (Terry et al., 1994) promise things about that sequence only, and say nothing about what other clients see. They are cheap because they only need the session to be routed consistently

| Guarantee | Promise | The bug it stops |
|---|---|---|
| **read-your-writes** | a read after your own write sees it | user saves a profile, refreshes, sees the old one |
| **monotonic reads** | once you have seen a value you never see an older one | list shows a comment, refresh, comment is gone, refresh, it is back |
| **monotonic writes** | your writes apply everywhere in the order you issued them | "set name" then "clear name" applied in reverse on one replica |
| **writes-follow-reads** | a write you make after reading X is ordered after X everywhere | your reply lands before the message you replied to |

- All four together are the per-client half of causal consistency. Causal adds the cross-client rule (page 7); the session guarantees are what a single user can notice

<svg viewBox="0 0 460 120" role="img" aria-label="Monotonic reads broken. A client reads from a fast follower and sees a comment. The client refreshes; the load balancer routes it to a slow follower that does not have the comment yet, so the comment disappears." xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif" font-size="8.5">
  <rect x="10" y="44" width="60" height="30" rx="3" fill="#fcfcfc" stroke="#1a1a1a"/>
  <text x="40" y="63" text-anchor="middle">client</text>
  <rect x="140" y="44" width="80" height="30" rx="3" fill="#fcfcfc" stroke="#1a1a1a"/>
  <text x="180" y="63" text-anchor="middle">load balancer</text>
  <rect x="320" y="10" width="120" height="30" rx="3" fill="#e2fcf3" stroke="#1d4e89"/>
  <text x="380" y="24" text-anchor="middle">follower, caught up</text>
  <text x="380" y="34" text-anchor="middle" font-size="7">has comment #9</text>
  <rect x="320" y="80" width="120" height="30" rx="3" fill="#fce4e2" stroke="#b8541a"/>
  <text x="380" y="94" text-anchor="middle">follower, 2 s behind</text>
  <text x="380" y="104" text-anchor="middle" font-size="7">no comment #9 yet</text>
  <path d="M70 55 H140" stroke="#1a1a1a" fill="none"/><path d="M140 55 l-5 -2.5 v5 z" fill="#1a1a1a"/>
  <path d="M70 66 H140" stroke="#b8541a" fill="none"/><path d="M140 66 l-5 -2.5 v5 z" fill="#b8541a"/>
  <text x="105" y="50" text-anchor="middle" font-size="7">1 read</text>
  <text x="105" y="78" text-anchor="middle" font-size="7" fill="#b8541a">2 refresh</text>
  <path d="M220 55 L320 28" stroke="#1a1a1a" fill="none"/><path d="M320 28 l-5.5 -0.5 v5 z" fill="#1a1a1a"/>
  <path d="M220 66 L320 92" stroke="#b8541a" fill="none"/><path d="M320 92 l-5.5 -3 v5 z" fill="#b8541a"/>
  <text x="240" y="118" font-size="7" fill="#b8541a">the comment the client already saw is gone: monotonic reads violated</text>
</svg>

- The fix is the same for all four: **stickiness**. Route a session to one replica (hash the session id), or carry a version token and refuse to read from any replica behind it (page 9)

### The failure

- A load balancer that spreads a session across replicas round-robin. Every replica is individually consistent; the user still sees data appear and disappear. The guarantee is broken by routing, not by the database
