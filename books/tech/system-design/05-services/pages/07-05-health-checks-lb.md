## Health checks from the balancer

- **Active**: the balancer probes each instance on a schedule and ejects what fails. **Passive**: it draws conclusions from the real traffic it is already forwarding. They fail in opposite directions, which is why production runs both

| | Active probe | Passive observation |
|---|---|---|
| Traffic used | synthetic, on a timer | real user requests |
| Finds a dead instance | before a user reaches it | after some users have failed |
| Blind to | a fault the probe path does not touch | a fault on a rarely used route |
| Cost | a request per instance per interval | nothing |
| In NGINX open source | not available | `max_fails` (default 1), `fail_timeout` (default 10s) |

- Open-source NGINX ships passive checks only; active `health_check`, `slow_start` and the shared-memory `zone` they need are commercial features. It is a common and expensive surprise, because `max_fails=1` means one failed request inside the `fail_timeout` window takes an instance out
- A returning instance needs easing back in. Cold caches, an empty connection pool and a JIT that has not warmed mean a fresh instance handed its full share will fail its way straight back out. Slow start ramps its weight instead, which is the difference between recovery and an oscillation

### The failure

- Ejection tuned too tight, which turns a slowdown into an outage. One probe times out, an instance leaves the pool, its share lands on the rest, they slow down, their probes time out, and the balancer removes the entire healthy fleet — each decision locally correct
- Two settings prevent it. Require several consecutive failures before ejecting, so a blip is not a verdict. And cap how much of the pool may be ejected at all: past that threshold the sensible reading is that the checks are wrong, not that every instance died at once, so the balancer keeps sending traffic to instances it believes are unhealthy because the alternative is sending it nowhere
