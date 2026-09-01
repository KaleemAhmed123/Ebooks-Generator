### What actually breaks on Edge

- `pg`, `mysql2` and `mongodb` open TCP sockets. Edge has no TCP
- `fs` does not exist, so file reads and local uploads fail
- Many npm packages import `node:` modules somewhere in their tree and fail at build

### The honest default

- Stay on Node for anything that touches a database
- Reach for Edge for the small, latency-sensitive, dependency-free things: geolocation, redirects, A/B assignment, header rewriting
