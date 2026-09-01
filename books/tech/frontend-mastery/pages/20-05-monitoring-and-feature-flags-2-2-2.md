### Flags rot

Every flag is a branch, and two flags in the same component are four code paths that all need testing. A codebase with sixty stale flags is harder to change than one with none.

Give each flag an owner and a removal date when you create it. When a feature is fully rolled out, deleting the flag and the dead branch is part of finishing the feature, not a cleanup task for later.

### What to alert on

Alert on things a human should act on right now, and nothing else. A channel that fires forty times a day gets muted, and then it fires for something real.

- Error rate above baseline for five minutes.
- A spike in a single new error group, which usually means a bad release.
- p75 LCP or INP crossing the threshold.
- Checkout or sign-up completions dropping sharply, which catches breakage no exception ever reported.
