## Distroless / Slim Base

A runtime image with no shell and no package manager. Nothing to exec into,
which is the security argument and the debugging cost in one sentence.

Moving a Node service from `node:20` to `gcr.io/distroless/nodejs20` took
reported vulnerabilities from 180 to 3 — most of them lived in packages the
service never called.

The cost arrives during an incident. `docker exec sh` no longer works, so you
attach an ephemeral debug container instead. Prove that path works before you
need it at three in the morning.

| Base | Size | Reported CVEs |
|---|---|---|
| `node:20` | ~1.1GB | 180, full shell |
| `node:20-alpine` | ~180MB | fewer, still a shell |
| `distroless/nodejs20` | ~120MB | 3, no shell at all |

## DNS TTL & Propagation

Resolvers cache an answer for as long as the TTL allows. Until it expires, a
change you made is invisible to them and there is nothing you can do about it.

A failover with a 24-hour TTL means a day of traffic arriving at a dead address.
Editing the record does not shorten that; the resolvers already have their copy.

Lower the TTL to 60 seconds a week before the migration, not during it. Some
resolvers clamp very low values to their own minimum anyway, so treat 60 seconds
as a hope rather than a guarantee.
