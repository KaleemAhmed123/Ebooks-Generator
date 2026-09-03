## Model Gateway

One internal service in front of every model provider, handling auth, routing,
retries, fallback, caching, rate limits and cost accounting.

Without one, six services each hold provider keys, each implement their own
retries, and nobody can total the spend.

### How it works

Once more than one service calls a model, the same concerns appear in each of
them: authentication, retries, timeouts, fallback, rate limiting, caching, cost
tracking. Implemented separately they are implemented differently, and the
differences are discovered during incidents.

A gateway is one service every call goes through. Credentials live in one place.
Retry and fallback logic is written once. Caching is shared across services
instead of per-process. Every request is accounted for.

**The cost accounting alone often justifies it.** Without a gateway you have a
monthly invoice and no idea which feature caused it. With one you have cost per
feature, per tenant, per model, as a query.

It also makes provider migration tractable — changing model or provider becomes
a gateway configuration change rather than a coordinated deploy across six
repositories.

### In practice

Because everything routes through it, it is a single point of failure and needs
treating as production infrastructure: health checks, its own capacity headroom,
and a documented way to bypass it in an emergency.

**Keep it thin** — routing, policy, accounting. Resist letting business logic
accumulate there. A gateway that grows features becomes a gateway team, and then
every other team is blocked on it for changes that used to be theirs to make.
