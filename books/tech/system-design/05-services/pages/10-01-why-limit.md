# Module 10 - Rate limiting

## Why limit, and on what key

- Three separate reasons, often conflated: protecting capacity, keeping one caller from starving another, and controlling cost. They want different limits, and saying which one a limit serves is what makes its number defensible
- A **limit** bounds a short interval — 10 per second, to stop a spike. A **quota** bounds a long one — 10 000 a month, because that is what was purchased. The first is engineering, the second is billing, and they fail differently

| Key | Works for | Cost |
|---|---|---|
| API token or user id | anything authenticated | useless before the caller is identified |
| IP address | login, signup, password reset | many strangers share one address |
| Tenant or workspace | stopping one customer starving another | a busy tenant's own users compete |
| Endpoint + key | protecting one expensive route | more counters, and more to reason about |

- The key is the real decision. A limit on the wrong key either does nothing — the abuser rotates it — or punishes people who share it with the abuser
- Unauthenticated routes have no good key, which is why login is both the route that most needs limiting and the one hardest to limit fairly. The usual answer is layered: a loose limit per address, a tight one per account, and a proof-of-work or challenge when either trips

### The failure

- Limiting by IP address for mobile traffic. Carrier-grade address translation puts thousands of unrelated subscribers behind one address, so "10 per minute per IP" is shared by a city, and the first heavy user exhausts it for everyone else on that carrier
- University networks, offices and corporate VPNs do the same thing. The failure is silent and selective: the service works for most people, and is unusable for whole populations who have no way to tell you, because their requests are being rejected exactly as configured
